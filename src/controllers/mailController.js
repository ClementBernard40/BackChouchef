const nodemailer = require("nodemailer");
require("dotenv").config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = (req, res) => {
  const { prenom, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Nouveau message de contact de ${prenom}`,
    text: `Prenom: ${prenom}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Prénom:</strong> ${prenom}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email envoyé: " + info.response);
  });
};
