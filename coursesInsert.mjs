import postgres from 'postgres';
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid'

dotenv.config()

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

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

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}


const generateCourses = () => {
  const courses = [
    {
      "name": "Introduction to Web Development",
      "description": "Learn the basics of web development including HTML, CSS, and JavaScript.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Beginner"
    },
    {
      "name": "Python Programming Masterclass",
      "description": "Become a Python expert with hands-on projects and practical examples.",
      "rating": 4.8,
      "category": "Programming",
      "level": "Intermediate"
    },
    {
      "name": "Data Science Bootcamp",
      "description": "Explore the world of data science with Python and machine learning techniques.",
      "rating": 4.7,
      "category": "Data Science",
      "level": "Advanced"
    },
    {
      "name": "Introduction to Machine Learning",
      "description": "Get started with machine learning algorithms and techniques.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Beginner"
    },
    {
      "name": "iOS App Development with Swift",
      "description": "Build your own iOS apps from scratch using Swift programming language.",
      "rating": 4.4,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Graphic Design Fundamentals",
      "description": "Learn the basics of graphic design including typography, color theory, and layout.",
      "rating": 4.3,
      "category": "Design",
      "level": "Beginner"
    },
    {
      "name": "Introduction to Artificial Intelligence",
      "description": "Explore the fundamentals of artificial intelligence and its applications.",
      "rating": 4.7,
      "category": "Artificial Intelligence",
      "level": "Intermediate"
    },
    {
      "name": "Digital Marketing Essentials",
      "description": "Master the essential concepts and techniques of digital marketing.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Beginner"
    },
    {
      "name": "Advanced JavaScript Concepts",
      "description": "Deep dive into advanced JavaScript topics such as closures, prototypes, and asynchronous programming.",
      "rating": 4.6,
      "category": "Web Development",
      "level": "Advanced"
    },
    {
      "name": "Introduction to Cybersecurity",
      "description": "Learn the basics of cybersecurity and protect yourself from cyber threats.",
      "rating": 4.5,
      "category": "Cybersecurity",
      "level": "Beginner"
    },
    {
      "name": "Blockchain Fundamentals",
      "description": "Understand the core concepts of blockchain technology and cryptocurrencies.",
      "rating": 4.7,
      "category": "Blockchain",
      "level": "Intermediate"
    },
    {
      "name": "Android App Development with Kotlin",
      "description": "Build powerful Android apps using the Kotlin programming language.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Game Development with Unity",
      "description": "Create your own games with Unity game engine and C# programming language.",
      "rating": 4.5,
      "category": "Game Development",
      "level": "Intermediate"
    },
    {
      "name": "Cloud Computing Essentials",
      "description": "Learn about cloud computing services and deploy applications on the cloud.",
      "rating": 4.6,
      "category": "Cloud Computing",
      "level": "Beginner"
    },
    {
      "name": "SQL Database Administration",
      "description": "Master SQL database administration skills including installation, configuration, and maintenance.",
      "rating": 4.5,
      "category": "Databases",
      "level": "Intermediate"
    },
    {
      "name": "Deep Learning and Neural Networks",
      "description": "Dive deep into deep learning concepts and build neural network models from scratch.",
      "rating": 4.8,
      "category": "Machine Learning",
      "level": "Advanced"
    },
    {
      "name": "WordPress Website Development",
      "description": "Build professional websites using WordPress content management system.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Beginner"
    },
    {
      "name": "Network Security Fundamentals",
      "description": "Understand the fundamentals of network security and secure network infrastructure.",
      "rating": 4.6,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "React Native Mobile App Development",
      "description": "Create cross-platform mobile apps with React Native framework and JavaScript.",
      "rating": 4.7,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Advanced Data Analysis with Python",
      "description": "Perform advanced data analysis tasks using Python libraries like Pandas and NumPy.",
      "rating": 4.7,
      "category": "Data Science",
      "level": "Advanced"
    },
    {
      "name": "UX/UI Design Principles",
      "description": "Learn the principles of user experience (UX) and user interface (UI) design.",
      "rating": 4.5,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Ethical Hacking Essentials",
      "description": "Master the essentials of ethical hacking and penetration testing.",
      "rating": 4.6,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Angular Framework Fundamentals",
      "description": "Get started with the Angular framework for building modern web applications.",
      "rating": 4.7,
      "category": "Web Development",
      "level": "Beginner"
    },
    {
      "name": "Digital Photography Basics",
      "description": "Learn the basics of digital photography including camera settings, composition, and editing.",
      "rating": 4.3,
      "category": "Photography",
      "level": "Beginner"
    },
    {
      "name": "Natural Language Processing with Python",
      "description": "Explore natural language processing (NLP) techniques using Python and NLTK library.",
      "rating": 4.7,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "iOS App Design Principles",
      "description": "Learn the principles of designing user-friendly iOS apps.",
      "rating": 4.5,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Introduction to Quantum Computing",
      "description": "Discover the basics of quantum computing and its potential applications.",
      "rating": 4.6,
      "category": "Quantum Computing",
      "level": "Beginner"
    },
    {
      "name": "Node.js Backend Development",
      "description": "Build scalable and efficient backend applications using Node.js and Express framework.",
      "rating": 4.6,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Unity Game Design Principles",
      "description": "Learn the principles of designing immersive and engaging games with Unity game engine.",
      "rating": 4.4,
      "category": "Game Development",
      "level": "Intermediate"
    },
    {
      "name": "Deep Reinforcement Learning",
      "description": "Explore deep reinforcement learning algorithms and applications in artificial intelligence.",
      "rating": 4.7,
      "category": "Machine Learning",
      "level": "Advanced"
    },
    {
      "name": "Vue.js Frontend Development",
      "description": "Build interactive and dynamic user interfaces with Vue.js frontend framework.",
      "rating": 4.6,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Introduction to Robotics",
      "description": "Discover the basics of robotics and explore robot design and programming.",
      "rating": 4.5,
      "category": "Robotics",
      "level": "Beginner"
    },
    {
      "name": "Flutter Mobile App Development",
      "description": "Develop cross-platform mobile apps with Flutter framework and Dart programming language.",
      "rating": 4.7,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Advanced Java Programming",
      "description": "Take your Java programming skills to the next level with advanced topics and techniques.",
      "rating": 4.6,
      "category": "Programming",
      "level": "Advanced"
    },
    {
      "name": "Introduction to Virtual Reality",
      "description": "Explore the world of virtual reality (VR) and learn about VR devices and applications.",
      "rating": 4.5,
      "category": "Virtual Reality",
      "level": "Beginner"
    },
    {
      "name": "Full Stack Web Development Bootcamp",
      "description": "Become a full stack web developer by mastering frontend and backend technologies.",
      "rating": 4.7,
      "category": "Web Development",
      "level": "Advanced"
    },
    {
      "name": "Python for Data Analysis",
      "description": "Learn data analysis techniques using Python programming language and Pandas library.",
      "rating": 4.6,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "Responsive Web Design Fundamentals",
      "description": "Master the fundamentals of responsive web design with HTML and CSS.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Beginner"
    },
    {
      "name": "iOS App Development with Objective-C",
      "description": "Build iOS apps using Objective-C programming language and Xcode IDE.",
      "rating": 4.3,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Data Visualization with Tableau",
      "description": "Create interactive and visually appealing data visualizations with Tableau software.",
      "rating": 4.7,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "Artificial Intelligence Ethics",
      "description": "Explore the ethical implications of artificial intelligence (AI) technologies.",
      "rating": 4.6,
      "category": "Artificial Intelligence",
      "level": "Intermediate"
    },
    {
      "name": "JavaScript Frameworks: React, Angular, Vue",
      "description": "Learn popular JavaScript frameworks including React, Angular, and Vue.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Introduction to Docker Containers",
      "description": "Get started with Docker containers and containerize your applications.",
      "rating": 4.6,
      "category": "DevOps",
      "level": "Beginner"
    },
    {
      "name": "C++ Programming Basics",
      "description": "Learn the basics of C++ programming language including syntax, data types, and control structures.",
      "rating": 4.4,
      "category": "Programming",
      "level": "Beginner"
    },
    {
      "name": "Machine Learning Algorithms",
      "description": "Explore various machine learning algorithms and their applications in data science.",
      "rating": 4.7,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "CSS Flexbox and Grid Layouts",
      "description": "Master CSS flexbox and grid layouts for building responsive web designs.",
      "rating": 4.6,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Digital Marketing Strategy",
      "description": "Develop an effective digitalmarketing strategy for your business or organization.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "TensorFlow Machine Learning",
      "description": "Learn machine learning with TensorFlow framework and build deep learning models.",
      "rating": 4.7,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Game Development with Unreal Engine",
      "description": "Create stunning games with Unreal Engine game development platform.",
      "rating": 4.8,
      "category": "Game Development",
      "level": "Advanced"
    },
    {
      "name": "Advanced SQL Database Design",
      "description": "Design advanced SQL databases with normalization, indexing, and optimization techniques.",
      "rating": 4.6,
      "category": "Databases",
      "level": "Advanced"
    },
    {
      "name": "Python Web Scraping",
      "description": "Scrape data from websites using Python programming language and BeautifulSoup library.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "Responsive Web Design with Bootstrap",
      "description": "Build responsive websites with Bootstrap framework for frontend development.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Threat Detection",
      "description": "Detect and respond to cybersecurity threats using advanced threat detection techniques.",
      "rating": 4.6,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java Spring Framework Basics",
      "description": "Learn the basics of Java Spring framework for building enterprise Java applications.",
      "rating": 4.5,
      "category": "Java",
      "level": "Beginner"
    },
    {
      "name": "Advanced Digital Marketing Strategies",
      "description": "Implement advanced digital marketing strategies to drive growth and engagement.",
      "rating": 4.7,
      "category": "Marketing",
      "level": "Advanced"
    },
    {
      "name": "Swift Programming Basics",
      "description": "Learn the basics of Swift programming language for iOS and macOS app development.",
      "rating": 4.4,
      "category": "Programming",
      "level": "Beginner"
    },
    {
      "name": "Natural Language Processing with SpaCy",
      "description": "Perform natural language processing (NLP) tasks using SpaCy library in Python.",
      "rating": 4.7,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "Android App Design Principles",
      "description": "Design visually appealing and user-friendly Android apps.",
      "rating": 4.5,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Introduction to Quantum Machine Learning",
      "description": "Explore the intersection of quantum computing and machine learning.",
      "rating": 4.6,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js RESTful API Development",
      "description": "Build RESTful APIs using Node.js and Express framework for backend development.",
      "rating": 4.6,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UI/UX Design Fundamentals",
      "description": "Master the fundamentals of user interface (UI) and user experience (UX) design.",
      "rating": 4.5,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Introduction to Augmented Reality",
      "description": "Discover the basics of augmented reality (AR) and its applications.",
      "rating": 4.4,
      "category": "Augmented Reality",
      "level": "Beginner"
    },
    {
      "name": "ASP.NET Core Web Development",
      "description": "Build modern web applications with ASP.NET Core framework and C# programming language.",
      "rating": 4.6,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Advanced Data Structures and Algorithms",
      "description": "Explore advanced data structures and algorithms for solving complex problems.",
      "rating": 4.7,
      "category": "Programming",
      "level": "Advanced"
    },
    {
      "name": "Data Mining Techniques",
      "description": "Learn data mining techniques for extracting useful insights and patterns from large datasets.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "JavaScript Frameworks: Angular and React",
      "description": "Master Angular and React frameworks for building modern web applications.",
      "rating": 4.6,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Introduction to Cloud Computing",
      "description": "Get started with cloud computing and learn about cloud services and deployment models.",
      "rating": 4.5,
      "category": "Cloud Computing",
      "level": "Beginner"
    },
    {
      "name": "iOS App Development with SwiftUI",
      "description": "Build iOS apps with SwiftUI framework and Swift programming language.",
      "rating": 4.7,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Advanced Python Programming",
      "description": "Advance your Python programming skills with advanced topics and best practices.",
      "rating": 4.6,
      "category": "Programming",
      "level": "Advanced"
    },
    {
      "name": "Network Protocol Analysis",
      "description": "Analyze network protocols and traffic to detect security threats and vulnerabilities.",
      "rating": 4.5,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Web Application Development",
      "description": "Build enterprise web applications with Java EE framework and Java programming language.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Digital Marketing Analytics",
      "description": "Gain insights from digital marketing data and analytics to optimize marketing campaigns.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "iOS App Design with Sketch",
      "description": "Design visually stunning iOS app interfaces using Sketch design tool.",
      "rating": 4.4,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Reinforcement Learning with Python",
      "description": "Implement reinforcement learning algorithms and train agents to solve complex tasks.",
      "rating": 4.7,
      "category": "Machine Learning",
  
  
      "level": "Intermediate"
    },
    {
      "name": "Web Accessibility Basics",
      "description": "Ensure your websites are accessible to all users including those with disabilities.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Beginner"
    },
    {
      "name": "Game Development with Godot Engine",
      "description": "Create 2D and 3D games with Godot game engine and GDScript programming language.",
      "rating": 4.8,
      "category": "Game Development",
      "level": "Advanced"
    },
    {
      "name": "Advanced SQL Query Optimization",
      "description": "Optimize SQL queries for performance and efficiency in database applications.",
      "rating": 4.6,
      "category": "Databases",
      "level": "Advanced"
    },
    {
      "name": "Python Data Visualization with Matplotlib",
      "description": "Visualize data with Matplotlib library and create insightful data visualizations.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "Responsive Email Design",
      "description": "Design responsive and mobile-friendly email templates for effective email marketing.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Penetration Testing Fundamentals",
      "description": "Master the fundamentals of penetration testing and assess security vulnerabilities.",
      "rating": 4.6,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java GUI Programming",
      "description": "Create graphical user interfaces (GUIs) with Java Swing and JavaFX libraries.",
      "rating": 4.5,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Strategy",
      "description": "Develop a content marketing strategy to attract and engage your target audience.",
      "rating": 4.7,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "SwiftUI App Development",
      "description": "Build cross-platform apps with SwiftUI framework for iOS, macOS, watchOS, and tvOS.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Advanced JavaScript Frameworks",
      "description": "Master advanced JavaScript frameworks including React, Angular, and Vue.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Advanced"
    },
    {
      "name": "Introduction to Cloud Security",
      "description": "Learn about cloud security principles and best practices for securing cloud environments.",
      "rating": 4.4,
      "category": "Cloud Computing",
      "level": "Beginner"
    },
    {
      "name": "Android App Development with Java",
      "description": "Build Android apps using Java programming language and Android Studio IDE.",
      "rating": 4.3,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Data Science with R Programming",
      "description": "Perform data analysis and visualization with R programming language and RStudio IDE.",
      "rating": 4.6,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Animation and Transitions",
      "description": "Create engaging and dynamic animations and transitions with CSS.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Incident Response",
      "description": "Develop incident response plans and procedures to effectively respond to cybersecurity incidents.",
      "rating": 4.6,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Web Services",
      "description": "Develop web services and APIs with Java EE framework for building scalable and interoperable applications.",
      "rating": 4.5,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Social Media Marketing Essentials",
      "description": "Master the essentials of social media marketing and build a strong social media presence.",
      "rating": 4.7,
      "category": "Marketing",
      "level": "Beginner"
    },
    {
      "name": "Flutter App Design",
      "description": "Design beautiful and intuitive mobile app interfaces with Flutter framework.",
      "rating": 4.6,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Introduction to Quantum Mechanics",
      "description": "Discover the principles of quantum mechanics and its applications in modern physics.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Beginner"
    },
    {
      "name": "Node.js Microservices",
      "description": "Build scalable and modular microservices architectures with Node.js and Express framework.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UI/UX Design with Adobe XD",
     
  
   "description": "Design interactive prototypes and wireframes with Adobe XD design tool.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Augmented Reality App Development",
      "description": "Develop augmented reality (AR) apps for iOS and Android platforms.",
      "rating": 4.6,
      "category": "Augmented Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET MVC Web Development",
      "description": "Build modern web applications with ASP.NET MVC framework for scalable and maintainable code.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning Interpretability",
      "description": "Understand and interpret machine learning models for better decision-making.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Database Design and Modeling",
      "description": "Design efficient and scalable databases with proper data modeling techniques.",
      "rating": 4.5,
      "category": "Databases",
      "level": "Intermediate"
    },
    {
      "name": "JavaScript Design Patterns",
      "description": "Learn common design patterns and best practices for writing clean and maintainable JavaScript code.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Social Media Advertising",
      "description": "Create effective social media ad campaigns to reach your target audience and drive conversions.",
      "rating": 4.7,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "React Native App Design",
      "description": "Design engaging and intuitive user interfaces for React Native mobile apps.",
      "rating": 4.6,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing Algorithms",
      "description": "Explore quantum computing algorithms and their applications in various fields.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Real-Time Applications",
      "description": "Build real-time web applications with Node.js, Socket.IO, and WebSockets.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design with Figma",
      "description": "Design responsive and collaborative user interfaces with Figma design tool.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Game Development",
      "description": "Develop immersive and interactive games for virtual reality (VR) platforms.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Web API Development",
      "description": "Build scalable and RESTful web APIs with ASP.NET Core framework.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Advanced Machine Learning Techniques",
      "description": "Explore advanced machine learning techniques including deep learning, reinforcement learning, and more.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Advanced"
    },
    {
      "name": "Big Data Analytics with Hadoop",
      "description": "Analyze large datasets with Hadoop framework and perform big data analytics.",
      "rating": 4.5,
      "category": "Big Data",
      "level": "Intermediate"
    },
    {
      "name": "JavaScript Unit Testing",
      "description": "Write unit tests for JavaScript code using testing frameworks like Jest and Mocha.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Digital Marketing Campaign Management",
      "description": "Plan, execute, and optimize digital marketing campaigns for maximum ROI.",
      "rating": 4.7,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "React Native App Development with Expo",
      "description": "Develop cross-platform mobile apps with Expo development environment for React Native.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing Programming",
      "description": "Learn programming languages and frameworks for quantum computing development.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Authentication and Authorization",
      "description": "Implement secure authentication and authorization mechanisms in Node.js applications.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UI/UX Design for Mobile Apps",
      "description": "Design intuitive and user-friendly interfaces for mobile applications.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Development with Unity",
      "description": "Develop virtual reality (VR) experiences with Unity game engine for various platforms.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core MVC Web Development",
      "description": "Build modern web applications with ASP.NET Core MVC framework for clean and maintainable code.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning Model Deployment",
      "description": "Deploy machine learning models into production environments for real-world applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Advanced"
    },
    {
      "name": "Data Warehousing and Business Intelligence",
      "description": "Build data warehouses and implement business intelligence solutions for data-driven decision-making.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Preprocessors: SASS and LESS",
      "description": "Write CSS more efficiently with preprocessors like SASS and LESS.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Risk Management",
      "description": "Assess, mitigate, and manage cybersecurity risks to protect organizational assets and data.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java Web Application Security",
      "description": "Secure Java web applications from common security vulnerabilities and attacks.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Inbound Marketing Strategy",
      "description": "Develop inbound marketing strategies to attract and engage prospects and customers.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Development with Firebase",
      "description": "Build cross-platform mobile apps with Flutter framework and Firebase backend services.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Machine Learning Algorithms",
      "description": "Explore quantum machine learning algorithms and their applications in various domains.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Web Scraping",
      "description": "Scrape data from websites and build web scraping applications with Node.js.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UI/UX Design for Web Applications",
      "description": "Design user-friendly interfaces for web applications with a focus on usability and accessibility.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality App Development with Oculus",
      "description": "Develop virtual reality (VR) applications for Oculus VR headsets and platforms.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Identity Management",
      "description": "Implement user authentication, authorization, and identity management in ASP.NET Core applications.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning Operations (MLOps)",
      "description": "Implement machine learning models into production environments with MLOps practices.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Advanced"
    },
    {
      "name": "Data Science for Business",
      "description": "Apply data science techniques to solve real-world business problems and drive decision-making.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Grid Layout",
      "description": "Learn CSS grid layout for building responsive and grid-based web layouts.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Compliance and Regulations",
      "description": "Ensure compliance with cybersecurity regulations and standards to protect sensitive data.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java EE RESTful Web Services",
      "description": "Develop RESTful web services with Java EE framework for building scalable and interoperable applications.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Email Marketing Automation",
      "description": "Automate email marketing campaigns to save time and increase efficiency.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
   
  
   },
    {
      "name": "SwiftUI App Development for Beginners",
      "description": "Learn SwiftUI framework for building iOS, macOS, watchOS, and tvOS apps as a beginner.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Beginner"
    },
    {
      "name": "Quantum Computing Simulations",
      "description": "Simulate quantum computing systems and algorithms for experimentation and learning.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js GraphQL API Development",
      "description": "Build flexible and efficient APIs with GraphQL and Node.js for modern web applications.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UI/UX Design for Wearable Devices",
      "description": "Design intuitive interfaces for wearable devices such as smartwatches and fitness trackers.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Game Design Principles",
      "description": "Learn the principles of designing immersive and engaging games for virtual reality (VR) platforms.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core SignalR",
      "description": "Build real-time web applications with ASP.NET Core SignalR for bi-directional communication.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning Model Interpretability",
      "description": "Understand and interpret machine learning models for transparency and accountability.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Healthcare",
      "description": "Apply data science techniques to analyze healthcare data and improve patient outcomes.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Custom Properties (CSS Variables)",
      "description": "Learn CSS custom properties (variables) for more dynamic and reusable stylesheets.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Incident Response Planning",
      "description": "Develop comprehensive incident response plans to effectively respond to cybersecurity incidents.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java Microservices Development",
      "description": "Build microservices architectures with Java programming language for scalable and modular applications.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Social Media Content Strategy",
      "description": "Develop a content strategy for social media platforms to engage and grow your audience.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter State Management",
      "description": "Manage state in Flutter applications for efficient and scalable app development.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Cryptography",
      "description": "Explore quantum cryptography principles and protocols for secure communication.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Security Best Practices",
      "description": "Implement security best practices to secure Node.js applications from common vulnerabilities.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UI/UX Design for Voice User Interfaces (VUI)",
      "description": "Design user-friendly voice user interfaces (VUIs) for voice-controlled devices and applications.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Content Creation",
      "description": "Create immersive virtual reality (VR) content for various platforms and experiences.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Razor Pages",
      "description": "Build dynamic web pages with ASP.NET Core Razor Pages for simpler and more productive web development.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning Explainability",
      "description": "Understand and explain machine learning models and predictions for transparency and trust.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Finance",
      "description": "Apply data science techniques to analyze financial data and make informed investment decisions.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "Responsive Web Design with CSS Frameworks",
      "description": "Build responsive websites with popular CSS frameworks like Bootstrap and Foundation.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Threat Hunting",
      "description": "Proactively search for cybersecurity threats and vulnerabilities within network environments.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Security Best Practices",
      "description": "Implement security best practices to secure Java EE applications from common vulnerabilities.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing for SEO",
      "description": "Create and optimize content for search engines to improve organic search visibility.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Deployment",
      "description": "Deploy Flutter mobile apps to iOS App Store and Google Play Store for distribution.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing Programming with Qiskit",
      "description": "Learn quantum computing programming with Qiskit framework for quantum algorithm development.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Performance Optimization",
      "description": "Optimize the performance of Node.js applications for faster response times and scalability.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for E-commerce Websites",
      "description": "Design user-friendly interfaces for e-commerce websites to improve user experience and conversion rates.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Interaction Design",
      "description": "Design intuitive and immersive interactions for virtual reality (VR) experiences.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Middleware Development",
      "description": "Develop custom middleware components for ASP.NET Core applications to handle requests and responses.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning Model Deployment with TensorFlow Serving",
      "description": "Deploy machine learning models with TensorFlow Serving for scalable and efficient inference.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Advanced"
    },
    {
      "name": "Data Science for Marketing",
      "description": "Apply data science techniques to analyze marketing data and optimize marketing strategies.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Flexbox Layout",
      "description": "Learn CSS flexbox layout for building flexible and responsive web layouts.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Risk Assessment",
      "description": "Assess and analyze cybersecurity risks to identify vulnerabilities and potential impacts.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java EE Microservices Architecture",
      "description": "Design and develop microservices architectures with Java EE framework for scalable and resilient applications.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Metrics and Analytics",
      "description": "Measure and analyze content marketing performance using key metrics and analytics tools.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter State Management with Provider",
      "description": "Manage state in Flutter applications using Provider package for state management.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Post-Quantum Cryptography",
      "description": "Explore post-quantum cryptography algorithms and protocols for secure communication in the era of quantum computing.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Testing with Jest",
      "description": "Write unit and integration tests for Node.js applications using Jest testing framework.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UI/UX Design for AR Applications",
      "description": "Design intuitive and immersive interfaces for augmented reality (AR) applications.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Storytelling",
      "description": "Learn storytelling techniques for creating compelling narratives in virtual reality (VR) experiences.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Dependency Injection",
      "description": "Implement dependency injection in ASP.NET Core applications for better maintainability and testability.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Natural Language Processing",
      "description": "Apply machine learning techniques to process and analyze natural language text data.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Retail",
      "description": "Apply data science techniques to analyze retail data and improve business operations and customer experiences.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Animation Libraries",
      "description": "Explore CSS animation libraries and frameworks for creating animated web experiences.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Threat Intelligence",
      "description": "Gather and analyze threat intelligence to identify and mitigate cybersecurity threats.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java EE Performance Optimization",
      "description": "Optimize the performance of Java EE applications for better scalability and responsiveness.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Copywriting",
      "description": "Write compelling and engaging content for content marketing campaigns.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Localization",
      "description": "Localize Flutter mobile apps for internationalization and better user experience.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Machine Learning Applications",
      "description": "Explore applications of quantum machine learning in various domains such as finance, healthcare, and optimization.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Continuous Integration and Deployment (CI/CD)",
      "description": "Set up continuous integration and deployment pipelines for Node.js applications.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for IoT Devices",
      "description": "Design intuitive interfaces for Internet of Things (IoT) devices and applications.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Motion Design",
      "description": "Create dynamic and immersive motion designs for virtual reality (VR) experiences.",
      "rating": 4.6,
      "category":
  
   "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Logging and Monitoring",
      "description": "Implement logging and monitoring solutions in ASP.NET Core applications for better visibility and troubleshooting.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Computer Vision",
      "description": "Apply machine learning techniques to analyze and interpret visual data for various applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Supply Chain Management",
      "description": "Apply data science techniques to optimize supply chain operations and logistics.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Grid Layout Frameworks",
      "description": "Explore CSS grid layout frameworks for building complex and responsive web layouts.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Digital Forensics",
      "description": "Conduct digital forensics investigations to identify and analyze cybersecurity incidents.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java EE Scalability and Performance",
      "description": "Optimize the scalability and performance of Java EE applications for handling large workloads.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Video Production",
      "description": "Produce engaging video content for content marketing campaigns to attract and engage audiences.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Testing",
      "description": "Write and execute tests for Flutter mobile apps to ensure quality and reliability.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Artificial Intelligence",
      "description": "Explore the intersection of quantum computing and artificial intelligence (AI) for solving complex problems.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Security Auditing",
      "description": "Perform security audits on Node.js applications to identify and remediate vulnerabilities.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Smart Home Devices",
      "description": "Design intuitive interfaces for smart home devices and applications for seamless user experiences.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Sound Design",
      "description": "Create immersive soundscapes for virtual reality (VR) experiences to enhance user immersion.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Security Best Practices",
      "description": "Implement security best practices to secure ASP.NET Core applications from common security threats.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Time Series Analysis",
      "description": "Apply machine learning techniques to analyze and forecast time series data.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Human Resources",
      "description": "Apply data science techniques to optimize human resources processes and workforce management.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Animation Techniques",
      "description": "Explore advanced CSS animation techniques for creating dynamic and interactive web experiences.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Threat Modeling",
      "description": "Model potential cybersecurity threats and vulnerabilities to prioritize security controls and defenses.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Intermediate"
    },
    {
      "name": "Java EE Testing and Test-Driven Development (TDD)",
      "description": "Write automated tests and practice test-driven development (TDD) for Java EE applications.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Social Media Strategy",
      "description": "Develop a social media strategy to amplify content marketing efforts and reach target audiences.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App State Management with Bloc",
      "description": "Manage state in Flutter applications using the Bloc state management pattern.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Optimization Problems",
      "description": "Apply quantum computing algorithms to solve optimization problems more efficiently.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Security Best Practices",
      "description": "Implement security best practices to secure Node.js applications from common security vulnerabilities.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Automotive Interfaces",
      "description": "Design user-friendly interfaces for automotive applications and infotainment systems.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality User Experience (VR UX)",
      "description": "Design intuitive and immersive user experiences for virtual reality (VR) applications.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core WebHooks",
      "description": "Implement and consume webhooks in ASP.NET Core applications for event-based integration.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Anomaly Detection",
      "description": "Apply machine learning techniques to detect anomalies and outliers in datasets.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
  
  
    {
      "name": "Data Science for Customer Relationship Management (CRM)",
      "description": "Apply data science techniques to analyze customer data and improve customer relationship management strategies.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Responsive Typography",
      "description": "Learn techniques for creating responsive typography with CSS for better readability and user experience across devices.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Penetration Testing",
      "description": "Conduct penetration tests to identify and exploit vulnerabilities in cybersecurity defenses.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Continuous Integration and Deployment (CI/CD)",
      "description": "Set up continuous integration and deployment pipelines for Java EE applications.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Email Strategy",
      "description": "Develop an email marketing strategy to engage and nurture leads through targeted email campaigns.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Performance Optimization",
      "description": "Optimize the performance of Flutter mobile apps for faster rendering and responsiveness.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Machine Learning",
      "description": "Explore the intersection of quantum computing and machine learning for solving complex computational problems.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Web Application Security",
      "description": "Secure Node.js web applications from common security threats and vulnerabilities.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Smart Cities",
      "description": "Design user-friendly interfaces for smart city applications and services.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Content Distribution",
      "description": "Distribute virtual reality (VR) content across various platforms and channels for wider reach.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Health Checks",
      "description": "Implement health checks in ASP.NET Core applications to monitor application health and performance.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Recommender Systems",
      "description": "Apply machine learning techniques to build recommender systems for personalized recommendations.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Energy Management",
      "description": "Apply data science techniques to optimize energy usage and management for sustainability.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Architecture and Scalability",
      "description": "Develop scalable CSS architectures and methodologies for large and complex web projects.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Threat Simulation",
      "description": "Simulate cybersecurity threats and attacks to test and improve security defenses.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Monitoring and Alerting",
      "description": "Monitor Java EE applications and set up alerting mechanisms for proactive issue detection and resolution.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Influencer Strategy",
      "description": "Develop an influencer marketing strategy to leverage influencers for brand promotion and awareness.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Accessibility",
      "description": "Ensure accessibility in Flutter mobile apps for users with disabilities for inclusive app experiences.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Financial Services",
      "description": "Apply quantum computing techniques to solve complex financial problems and optimize financial services.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Performance Monitoring",
      "description": "Monitor the performance of Node.js applications to identify bottlenecks and optimize performance.",
      "rating": 4.4,
      "category": "Web Development",
      "level":
  
   "Intermediate"
    },
    {
      "name": "UX/UI Design for Education Technology (EdTech)",
      "description": "Design intuitive interfaces for educational technology (EdTech) applications and platforms.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Advertising",
      "description": "Create immersive and interactive advertising experiences in virtual reality (VR) environments.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Performance Optimization",
      "description": "Optimize the performance of ASP.NET Core applications for faster response times and scalability.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Fraud Detection",
      "description": "Apply machine learning techniques to detect and prevent fraud in various domains.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Environmental Sustainability",
      "description": "Apply data science techniques to address environmental challenges and promote sustainability.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Maintenance and Refactoring",
      "description": "Learn strategies for maintaining and refactoring CSS codebases for improved maintainability and performance.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Threat Hunting and Incident Response",
      "description": "Proactively hunt for cybersecurity threats and effectively respond to security incidents.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE High Availability and Failover",
      "description": "Ensure high availability and implement failover strategies for Java EE applications to minimize downtime.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Podcast Strategy",
      "description": "Develop a podcast marketing strategy to reach and engage audiences through audio content.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Theming",
      "description": "Implement theming in Flutter mobile apps for customizable and visually appealing user interfaces.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Logistics Optimization",
      "description": "Apply quantum computing techniques to optimize logistics and supply chain operations.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Security Hardening",
      "description": "Harden the security of Node.js applications by implementing additional security measures.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Healthcare Applications",
      "description": "Design intuitive interfaces for healthcare applications and platforms for improved patient experiences.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality User Interaction Design",
      "description": "Design intuitive and immersive user interactions for virtual reality (VR) applications.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Caching",
      "description": "Implement caching in ASP.NET Core applications for improved performance and scalability.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Customer Segmentation",
      "description": "Apply machine learning techniques to segment customers for targeted marketing campaigns and personalization.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Social Impact",
      "description": "Apply data science techniques to address social challenges and make a positive impact on society.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Performance Optimization",
      "description": "Optimize the performance of CSS stylesheets for faster loading times and improved rendering.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Threat Intelligence Analysis",
      "description": "Analyze and interpret cybersecurity threat intelligence to identify emerging threats and trends.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Cloud-Native Development",
      "description": "Develop cloud-native applications with Java EE technologies for scalability and resilience in cloud environments.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
   
  
   },
    {
      "name": "Content Marketing Webinar Strategy",
      "description": "Develop a webinar marketing strategy to educate and engage audiences through live online events.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Localization with Provider",
      "description": "Localize Flutter mobile apps using the Provider package for internationalization and better user experience.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Materials Science",
      "description": "Apply quantum computing techniques to accelerate materials discovery and design.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Security Best Practices and Threat Modeling",
      "description": "Implement security best practices and threat modeling techniques to secure Node.js applications.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Financial Applications",
      "description": "Design intuitive interfaces for financial applications and platforms for improved user experiences.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Multiplayer Game Development",
      "description": "Develop multiplayer games for virtual reality (VR) platforms for immersive multiplayer experiences.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Authentication and Authorization",
      "description": "Implement authentication and authorization in ASP.NET Core applications for secure access control.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Sentiment Analysis",
      "description": "Apply machine learning techniques to analyze sentiment in text data for sentiment analysis applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Nonprofit Organizations",
      "description": "Apply data science techniques to support nonprofit organizations and drive social impact.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Preprocessors (Sass, Less)",
      "description": "Learn CSS preprocessors like Sass and Less for more efficient and maintainable stylesheets.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Incident Response Team (CSIRT) Management",
      "description": "Manage cybersecurity incident response teams (CSIRTs) for effective response to security incidents.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE DevOps",
      "description": "Implement DevOps practices in Java EE projects for faster delivery and improved collaboration.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Content Calendar",
      "description": "Develop a content calendar to plan and organize content marketing efforts for consistent and strategic content creation.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Internationalization",
      "description": "Internationalize Flutter mobile apps for global audiences with multiple languages and locales.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Chemistry",
      "description": "Apply quantum computing techniques to solve complex problems in computational chemistry.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Error Handling and Debugging",
      "description": "Implement error handling and debugging techniques to troubleshoot Node.js applications effectively.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Travel Applications",
      "description": "Design intuitive interfaces for travel applications and platforms for seamless user experiences.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Training Simulations",
      "description": "Develop virtual reality (VR) training simulations for various industries and training scenarios.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Microservices Architecture",
      "description": "Design microservices architectures with ASP.NET Core for scalable and modular applications.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Image Recognition",
      "description": "Apply machine learning techniques to recognize and classify images for image recognition applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Government Agencies",
      "description": "Apply data science techniques to support government agencies in decision-making and policy formulation.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Grid Layout Responsive Design",
      "description": "Create responsive web layouts using CSS grid layout for optimal viewing across devices.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Red Team Operations",
      "description": "Conduct red team operations to simulate real-world cyber attacks and test organizational security defenses.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Data Persistence with JPA",
      "description": "Implement data persistence in Java EE applications using the Java Persistence API (JPA).",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing SEO Strategy",
      "description": "Develop a search engine optimization (SEO) strategy to improve content visibility and attract organic traffic.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Push Notifications",
      "description": "Implement push notifications in Flutter mobile apps for real-time communication with users.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Drug Discovery",
      "description": "Apply quantum computing techniques to accelerate drug discovery and development processes.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Scalability and Load Testing",
      "description": "Test the scalability and performance of Node.js applications under heavy loads to ensure optimal performance.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Food Delivery Apps",
      "description": "Design user-friendly interfaces for food delivery applications for seamless ordering experiences.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Healthcare Applications",
      "description": "Develop virtual reality (VR) applications for healthcare training, therapy, and medical simulations.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core GraphQL APIs",
      "description": "Build GraphQL APIs with ASP.NET Core for flexible and efficient data fetching.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Voice Recognition",
      "description": "Apply machine learning techniques to recognize and process human speech for voice recognition applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Healthcare Analytics",
      "description": "Apply data science techniques to analyze healthcare data and improve patient outcomes and operational efficiency.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Architecture for Large-Scale Projects",
      "description": "Develop scalable CSS architectures for large-scale web projects with maintainability and performance in mind.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Governance and Compliance",
      "description": "Establish cybersecurity governance frameworks and ensure compliance with industry regulations and standards.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Security Best Practices",
      "description": "Implement security best practices to secure Java EE applications from common security threats.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Content Distribution Strategy",
      "description": "Develop a content distribution strategy to reach target audiences through various channels and platforms.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Firebase Integration",
      "description": "Integrate Firebase services into Flutter mobile apps for backend functionality and cloud storage.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Materials Simulation",
      "description": "Simulate and model materials properties and behaviors using quantum computing techniques.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Design Patterns",
      "description": "Learn and apply design patterns in Node.js applications for scalable and maintainable code.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Social Networking Platforms",
      "description": "Design intuitive interfaces for social networking platforms for seamless user interactions and engagement.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Industrial Training",
      "description": "Develop virtual reality (VR) training simulations for industrial applications and workforce training.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Real-Time Applications with SignalR",
      "description": "Build real-time web applications with ASP.NET Core using SignalR for bi-directional communication.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Predictive Maintenance",
      "description": "Apply machine learning techniques to predict equipment failures and schedule maintenance proactively.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Predictive Analytics",
      "description": "Apply data science techniques to build predictive models for forecasting future trends and outcomes.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Frameworks (Bootstrap, Foundation)",
      "description": "Learn popular CSS frameworks like Bootstrap and Foundation for faster and responsive web development.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Incident Handling and Response",
      "description": "Handle cybersecurity incidents effectively and respond to security breaches to minimize impact.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Microservices Deployment with Docker and Kubernetes",
      "description": "Deploy Java EE microservices applications using Docker containers and Kubernetes orchestration.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Content Promotion",
      "description": "Promote content effectively through various channels and platforms to increase visibility and engagement.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Firebase Authentication",
      "description": "Implement Firebase authentication in Flutter mobile apps for secure user authentication and authorization.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Cryptography",
      "description": "Apply quantum computing techniques to enhance cryptographic algorithms and protocols.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js API Development",
      "description": "Develop RESTful APIs with Node.js for building scalable and data-driven web applications.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for E-Commerce Platforms",
      "description": "Design user-friendly interfaces for e-commerce platforms for seamless shopping experiences.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Architectural Visualization",
      "description": "Create immersive architectural visualizations and walkthroughs in virtual reality (VR) for design presentations.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core Reactive Programming with Rx.NET",
      "description": "Implement reactive programming in ASP.NET Core applications using the Rx.NET library for asynchronous and event-driven programming.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Natural Language Processing (NLP)",
      "description": "Apply machine learning techniques to analyze and process natural language data for various NLP applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Retail Analytics",
      "description": "Apply data science techniques to analyze retail data and optimize business operations and strategies.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Grid Layout Advanced Techniques",
      "description": "Explore advanced techniques and use cases for CSS grid layout to create complex and responsive web layouts.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Risk Management",
      "description": "Manage cybersecurity risks effectively through risk assessment, mitigation, and monitoring strategies.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Reactive Programming with Spring WebFlux",
      "description": "Implement reactive programming in Java EE applications using Spring WebFlux for asynchronous and non-blocking I/O.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Influencer Outreach",
      "description": "Engage with influencers and leverage their networks for content promotion and brand awareness.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App State Management with Riverpod",
      "description": "Manage state in Flutter applications using the Riverpod state management library for improved scalability and testability.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Artificial Intelligence",
      "description": "Explore the intersection of quantum computing and artificial intelligence (AI) for solving complex problems.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Authentication and Authorization",
      "description": "Implement authentication and authorization mechanisms in Node.js applications for secure access control.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Mobile Applications",
      "description": "Design intuitive interfaces for mobile applications for seamless user experiences on smartphones and tablets.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Game Development with Unity",
      "description": "Develop virtual reality (VR) games using Unity for immersive gaming experiences on VR platforms.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core OAuth 2.0 Authentication",
      "description": "Implement OAuth 2.0 authentication in ASP.NET Core applications for secure third-party authentication and authorization.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Computer Vision",
      "description": "Apply machine learning techniques to analyze and interpret visual data for various applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Supply Chain Management",
      "description": "Apply data science techniques to optimize supply chain operations and logistics.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    },
    {
      "name": "CSS Grid Layout Frameworks",
      "description": "Explore CSS grid layout frameworks for building complex and responsive web layouts.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Cybersecurity Digital Forensics",
      "description": "Conduct digital forensics investigations to identify and analyze cybersecurity incidents and breaches.",
      "rating": 4.7,
      "category": "Cybersecurity",
      "level": "Advanced"
    },
    {
      "name": "Java EE Reactive Microservices with Vert.x",
      "description": "Develop reactive microservices with Vert.x in Java EE applications for scalable and resilient architectures.",
      "rating": 4.6,
      "category": "Java",
      "level": "Intermediate"
    },
    {
      "name": "Content Marketing Video Strategy",
      "description": "Develop a video marketing strategy to engage and captivate audiences through visual storytelling.",
      "rating": 4.5,
      "category": "Marketing",
      "level": "Intermediate"
    },
    {
      "name": "Flutter App Testing and Debugging",
      "description": "Test and debug Flutter mobile apps effectively to ensure quality and performance.",
      "rating": 4.6,
      "category": "Mobile Development",
      "level": "Intermediate"
    },
    {
      "name": "Quantum Computing for Optimization Problems",
      "description": "Apply quantum computing techniques to solve optimization problems in various domains.",
      "rating": 4.5,
      "category": "Quantum Computing",
      "level": "Intermediate"
    },
    {
      "name": "Node.js Real-Time Chat Applications",
      "description": "Build real-time chat applications with Node.js using WebSocket for bi-directional communication.",
      "rating": 4.4,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "UX/UI Design for Fitness Apps",
      "description": "Design user-friendly interfaces for fitness applications for tracking workouts and progress.",
      "rating": 4.7,
      "category": "Design",
      "level": "Intermediate"
    },
    {
      "name": "Virtual Reality Simulation Development",
      "description": "Develop virtual reality (VR) simulations for training, education, and entertainment.",
      "rating": 4.6,
      "category": "Virtual Reality",
      "level": "Intermediate"
    },
    {
      "name": "ASP.NET Core API Development with Swagger",
      "description": "Develop RESTful APIs with ASP.NET Core and document them using Swagger for interactive API exploration.",
      "rating": 4.5,
      "category": "Web Development",
      "level": "Intermediate"
    },
    {
      "name": "Machine Learning for Time Series Analysis",
      "description": "Apply machine learning techniques to analyze and forecast time series data for various applications.",
      "rating": 4.6,
      "category": "Machine Learning",
      "level": "Intermediate"
    },
    {
      "name": "Data Science for Predictive Maintenance",
      "description": "Apply data science techniques to predict equipment failures and schedule maintenance proactively.",
      "rating": 4.5,
      "category": "Data Science",
      "level": "Intermediate"
    }
  ]
  console.log(courses.length)
  
  return courses;
};

async function insertCourses() {
  try {
    const getCourses=generateCourses()
    for(let i=0;i<getCourses.length;i++){
      await  sql`INSERT INTO courses (id, name, description, rating, category, level) VALUES (${uuidv4()},${getCourses[i].name},${getCourses[i].description},${getCourses[i].rating},${getCourses[i].category},${getCourses[i].level})`
      console.log("insertedSuccesfully")
    }
  } catch (error) {
    console.error('Error inserting courses:', error);
  }
}

//insertCourses();
generateCourses()
getPgVersion();