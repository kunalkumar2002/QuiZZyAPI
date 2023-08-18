import nodemailer from 'nodemailer'
// const nodemailer = require('nodemailer')

export const sendMailToAdmin = (req,res)=>{
    console.log("initiate")
    const { to, subject, text } = req.body;
  
    // Replace these credentials with your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'outlook', 'yahoo', etc.
      auth: {
        user: 'rahulMailTest123@gmail.com', // Your email address
        pass: 'cbmbidmplbzsvusy', // Your email password or application-specific password
      },
    });
  
    const mailOptions = {
      from:"rahulMailTest123@gmail.com", //'your-email@example.com', // Your email address
      to:"rahulicon6209@gmail.com",
      subject:`Please Create a ${subject} `,
      text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
}

// mail to user to reuested the quiz
export const sendMailToUser = (req,res)=>{
    console.log("email to users")
    const { to, subject, text } = req.body;

  // Replace these credentials with your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'outlook', 'yahoo', etc.
    auth: {
      user: 'rahulMailTest123@gmail.com', // Your email address
      pass: 'cbmbidmplbzsvusy', // Your email password or application-specific password
    },
  });

  const mailOptions = {
    from:"rahulMailTest123@gmail.com", //'your-email@example.com', // Your email address
    to:[...to],
    subject:`Your Quiz Is Ready`,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
}
