const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (your HTML, CSS, and JS files)
app.use(express.static('public'));

// Handle form submission
app.post('/schedule', (req, res) => {
    const formData = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'kidzkornerinfo47@gmail.com', // Replace with your email
            pass: 'qqch bjzg obhm jdba' // Replace with your email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Kid Korner Indy" <kidzkornerinfo47@gmail.com>', // sender address
        to: 'Kidzkornerindy@gmail.com', // list of receivers
        subject: 'New Tour Schedule Request', // Subject line
        text: JSON.stringify(formData, null, 2) // plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error: ' + error.message);
        }
        res.send('Form submitted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
