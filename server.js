const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this to parse URL-encoded bodies

// Serve static files (your HTML, CSS, and JS files)
app.use(express.static('public'));

// Handle form submission
app.post('/schedule', (req, res) => {
    const formData = req.body;

    // Check if formData.days is an array and convert it to a string
    const days = Array.isArray(formData.days) ? formData.days.join(', ') : formData.days;

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
        text: `
            Caregiver First Name: ${formData['caregiver-first-name']}
            Caregiver Last Name: ${formData['caregiver-last-name']}
            Other Caregiver Name: ${formData['other-caregiver-name']}
            Email: ${formData['email']}
            Phone: ${formData['phone']}
            Tour Date: ${formData['tour-date']}
            Tour Time: ${formData['tour-time']}
            Start Date: ${formData['start-date']}
            Days Seeking Enrollment: ${days}
            Child's First Name: ${formData['child-first-name']}
            Child's Last Name: ${formData['child-last-name']}
            Child's Gender: ${formData['child-gender']}
            Child's Birthday: ${formData['child-birthday']}
            Desired Start Date: ${formData['desired-start-date']}
            Additional Children: ${formData['additional-children']}
            Most Important Qualities: ${formData['most-important-qualities']}
            How Did You Hear About Us: ${formData['how-did-you-hear']}
            Additional Comments: ${formData['additional-comments']}
        ` // plain text body
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
