// Import Express
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Create an Express app instance
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//mongoose.connect("mongodb+srv://KaalBhairav:Shivam@123@cluster0.culmxnd.mongodb.net/Cluster0")
mongoose.connect("mongodb+srv://KaalBhairav:Shivam123@cluster0.culmxnd.mongodb.net/Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Cluster0"
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("MongoDB connection error:", error);
});

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivambhairav@gmail.com',
      pass: 'oprtmpwookgtdbzd'
    }
  });

//create a data schema for Login
const usersSchema = {
    name : String,
    email :String
}

//create model for log
const User = new mongoose.model('User',usersSchema);


app.post("/popsubmit", function(req, res) {
    const { popup_name, popup_email } = req.body;
    // create user object from request payload and save it to database using Mongoose's `save()`
    const newUser = new User({
        name: popup_name,
        email : popup_email,
    });

    // Create the email message
    const mailOptions = {
    from: 'shivambhairav@gmail.com',
    to: popup_email,
    subject: 'Thank You for Visiting My Portfolio',
    text: 'Dear ' + popup_name + ', \n \n I hope this email finds you well. I wanted to take a moment to express my sincere gratitude for taking the time to visit my portfolio. I truly appreciate your interest in my work and your valuable time spent exploring my projects.\n \n I am passionate about Full Stack web development, Python Developer & Robotics, and I am thrilled to have had the opportunity to showcase my skills and accomplishments through my portfolio. Your visit means a lot to me, and I hope you found my projects inspiring and engaging.\n \n If you have any feedback, suggestions, or questions regarding my portfolio or any of the projects displayed, I would be more than happy to hear from you. Your insights are invaluable to me as I continue to grow and refine my work.\n \n Once again, thank you for your visit and your interest. It means a great deal to me. If you have any further inquiries or if there is anything else I can assist you with, please do not hesitate to reach out.\n \n Warmest regards, \n \n Yesveer Singh \n Email: - Yesveersingh.official@gmail.com \n Phone: - +918787016919'
    };
    newUser.save();
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
      return;
    }
    console.log('Message sent successfully!');
    console.log('Message ID:', info.messageId);
  });
    res.redirect("/main.html");
});


app.get('/redirect', (req, res) => {
    res.redirect('/donate.html'); // Redirect to the '/nextpage' route
});

// Define a route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Start the server
app.listen(process.env.PORT || 5000, function(){
    console.log("Server started at Port 5000");
});










