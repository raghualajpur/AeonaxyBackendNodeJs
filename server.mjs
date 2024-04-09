import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
dotenv.config();

// PostgreSQL connection parameters
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// Initializing PostgreSQL client
const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

// Middleware to authenticate JWT tokens
const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.json({ message: "Not an authorized user" });
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.email = payload.email;
        next();
      }
    });
  }
};

// Middleware to check if user is a super user
const superUserMiddleWare = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.json({ message: "Not an authorized user" });
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.email = payload.email;
        const data = await sql`select * from super_user where email=${payload.email}`
        if (data) {
          next();
        } else {
          response.json({ message: "You are not a super user" });
        }
      }
    });
  }
};

// Cloudinary configuration
const { v2: cloudinaryV2 } = cloudinary;
cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer storage setup with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});
const upload = multer({ storage: storage });

// Route to upload profile picture
app.post('/upload-profile-dp', authenticateToken, upload.single('image'), async (req, res) => {
  const { email } = req;
  await sql`UPDATE user_details SET profile_photo=${req.file.path} WHERE email=${email}`;
  res.json({ 
    success: true, 
    message: 'Image uploaded successfully', 
    imageUrl: req.file.path 
  });
});

// Valid tokens for registration
const validTokens = ['token1', 'token2', 'token3'];

// Route for user registration
app.post('/register', async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(regex.text(password)===false){
      res.status(400).json({message:"password is Not Strong Plase enter a Strong Password"})
    }else{
      const code = validTokens[Math.floor(Math.random() * validTokens.length)];
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      res.redirect(302, `/get-verified?email=${email}&code=${code}&username=${username}&password=${hashedPassword}`);
    }
  } catch (error) {
    console.log(error);
  }
});

// Route to get verified
app.get('/get-verified',async (req,res)=>{
  let {email,code,username,password}=req.query
  const link=`http://localhost:3004/create-user?token=${code}&liam=${Buffer.from(email).toString('base64')}&un=${Buffer.from(username).toString('base64')}&wop=${password}`
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
      type: process.env.TYPE,
      user: process.env.USER,
      pass: process.env.PASS,
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      refreshToken: process.env.REFRESHTOKEN
      }
  });

  let mailOptions = {
      from: process.env.FROM,
      to: email,
      subject: 'Verification',
      html: `<a href=${link}>Click here</a>`
  };

  const sendMailPromise = await transporter.sendMail(mailOptions);
  const result = await sendMailPromise;

    if (result) {
        res.status(200).json({ message: "Link sent to the given email for verification" });
    } else {
        res.status(400).json({ message: "Error sending email" });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
})

// Route to create user after verification
app.get('/create-user',async (req,res)=>{
  const {token,liam,un,wop}=req.query
  try{
    if(validTokens.includes(token)){
      await sql`INSERT INTO user_details(user_id,username,email,password) VALUES (${uuidv4()},${Buffer.from(un,'base64').toString('utf-8')},${Buffer.from(liam,'base64').toString('utf-8')},${wop})`
      res.status(200).json({Message:"user created succussfully"})
    }
  }catch(error){
    console.log(error)
  }
})

// Route for user login
app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const selectUserQuery = await sql`SELECT * FROM user_details WHERE email = ${email}`;
  if (selectUserQuery.length === 0) { // Check if no user found
    response.status(400);
    response.json({message:"Invalid User"});
  } else {
    const user = selectUserQuery[0]; // Access the first user object
    const isPasswordMatched = await bcrypt.compare(password, user.password); // Compare password
    if (isPasswordMatched === true) {
      const payload = {
        email: email,
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.json({message:"Invalid Password"});
    }
  }
});

// Route to fetch user profile
app.get("/profile", authenticateToken, async (req, res) => {
  let { email } = req;
  const selectUserQuery = await sql`SELECT * FROM user_details WHERE email = ${email}`;
  res.send(selectUserQuery[0]);
});

// Route to get courses based on filters
app.get('/get-courses', authenticateToken, async (req, res) => {
  try {
    const {rating, category,level}=req.body
    if(rating && category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating} AND category=${category} AND level=${level};`
      res.status(200).json({courses})
    }
    else if(rating && category && !level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating} AND category=${category};`
      res.status(200).json({courses})
    }
    else if(rating && !category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating} AND level=${level};`
      res.status(200).json({courses})
    }
    else if(!rating && category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND category=${category} AND level=${level};`
      res.status(200).json({courses})
    }
    else if(rating && !category && !level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating};`
      res.status(200).json({courses})
    }
    else if(!rating && category && !level){
      const courses=await sql`SELECT * FROM courses WHERE true AND category=${category};`
      res.status(200).json({courses})
    }
    else if(!rating && !category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND level=${level};`
      res.status(200).json({courses})
    }
    else if(!rating && !category && !level){
      const courses=await sql`SELECT * FROM courses;`
      res.status(200).json({courses})
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to enroll in a course
app.post('/enroll-course',authenticateToken, async (req,res)=>{
  try{
    const {email}=req
    const {course_id}=req.body
    const isPresentCourse=sql`select * from courses where id=${course_id}`
    if(!isPresentCourse){
      res.status(400).json({message:"InValid Course"})
    }else{
      const getUserDetails=await sql`select email,username,user_id from user_details where email=${email}`
      const insertData=await sql`INSERT INTO user_buyed_courses (username, email, user_id, course_id) VALUES (${getUserDetails[0].username},${getUserDetails[0].email},${getUserDetails[0].user_id},${course_id})`
      if(insertData){
        res.status(200).json({message:"Course Enrolled Succussfully"})
      }
    }
  }catch(error){
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// Route to fetch enrolled courses of a user
app.get('/my-enrolled-courses', authenticateToken,async (req,res)=>{
  try{
    const {email}=req
    const getCourses=await sql`SELECT * FROM user_buyed_courses WHERE email=${email}`
    res.status(200).json({courses:getCourses[0]})
  }catch(error){
    res.status(500).json({message:"internal Error"})
  }
})

// Route to update user profile
app.post( "/profile-update", authenticateToken, async (req, res) => {
  try{
    const {email}=req
    if(req.body.firstName){
      await sql`UPDATE user_details SET first_name=${req.body.firstName} WHERE email=${email}`
    }
    if(req.body.lastName){
      await sql`UPDATE user_details SET last_name=${req.body.lastName} WHERE email=${email}`
    }
    if(req.body.gender){
      await sql`UPDATE user_details SET gender=${req.body.gender} WHERE email=${email}`
    }
    if(req.body.dateOfBirth){
      const [day, month, year] = req.body.dateOfBirth.split('-');
      const dateOfBirth = new Date(year, month - 1, day);
      await sql`UPDATE user_details SET date_of_birth=${dateOfBirth} WHERE email=${email}`
    }
    
    res.status(200).json({message:"profile Details Updated Succusfully"});
  }catch(error){
    res.status(500).json({message:"internal Error"})
  }
  } 
);

// Route for super user login
app.post("/super-user-login", async (request, response) => {
  const { email, password } = request.body;
  const selectUserQuery = await sql`SELECT * FROM super_user WHERE email = ${email}`;
  if (selectUserQuery.length === 0) { // Check if no user found
    response.status(400);
    response.json({message:"Invalid User"});
  } else {
    const user = selectUserQuery[0]; // Access the first user object
    const isPasswordMatched = await bcrypt.compare(password, user.password); // Compare password
    if (isPasswordMatched === true) {
      const payload = {
        email: email,
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.json({message:"Invalid Password"});
    }
  }
});

// Route to read courses (only accessible to super user)
app.get('/read-courses',superUserMiddleWare,async(req,res)=>{
  try {
    const {rating, category,level}=req.body
    if(rating && category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating} AND category=${category} AND level=${level};`
      res.status(200).json({courses})
    }
    else if(rating && category && !level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating} AND category=${category};`
      res.status(200).json({courses})
    }
    else if(rating && !category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating} AND level=${level};`
      res.status(200).json({courses})
    }
    else if(!rating && category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND category=${category} AND level=${level};`
      res.status(200).json({courses})
    }
    else if(rating && !category && !level){
      const courses=await sql`SELECT * FROM courses WHERE true AND rating>=${rating};`
      res.status(200).json({courses})
    }
    else if(!rating && category && !level){
      const courses=await sql`SELECT * FROM courses WHERE true AND category=${category};`
      res.status(200).json({courses})
    }
    else if(!rating && !category && level){
      const courses=await sql`SELECT * FROM courses WHERE true AND level=${level};`
      res.status(200).json({courses})
    }
    else if(!rating && !category && !level){
      const courses=await sql`SELECT * FROM courses;`
      res.status(200).json({courses})
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// Route to create a new course (only accessible to super user)
app.post('/create-course', superUserMiddleWare,async (req,res)=>{
  try{
  const {name,description,rating,level,category}=req.body
  await sql `INSERT INTO courses (id, name, description, rating, category, level) VALUES (${uuidv4()},${name},${description},${rating},${category},${level})`
  res.status(200).json({message:'course Created SucessFully'})
  }catch{
    res.status(500).json({message:"internal Error"})
  }
})

// Route to update a course (only accessible to super user)
app.put('/update-course',superUserMiddleWare,async (req,res)=>{
  try{
  const {id}=req.body
  if(req.body.description){
    await sql`UPDATE courses SET description=${req.body.description} WHERE id=${id}`
  }
  if(req.body.name){
    await sql`UPDATE courses SET name=${req.body.name} WHERE id=${id}`
  }
  if(req.body.rating){
    await sql`UPDATE courses SET rating=${req.body.rating} WHERE id=${id}`
  }
  if(req.body.level){
    await sql`UPDATE courses SET level=${req.body.level} WHERE id=${id}`
  }
  if(req.body.category){
    await sql`UPDATE courses SET category=${req.body.category} WHERE id=${id}`
  }
  res.status(200).json({message:"updated Successfully"})
  }catch(error){
    res.status(500).json({message:"internor error",error:error})
  }
})

// Route to delete a course (only accessible to super user)
app.delete('/delete-course',superUserMiddleWare,async (req,res)=>{
  const {id}=req.body
  await sql`DELETE FROM courses WHERE id = ${id}`
})


// Starting the server
app.listen(3004, () => {
  console.log('Server Started');
});