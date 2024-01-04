const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const User = require("../models/user.model");

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tatawwu3@gmail.com",
    pass: "gusgqdxdxzntrtdt",
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

const sendEmail = async (req, res) => {
  const { email, name } = req.body;

  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: '"Tatawwu3" <my@company.com>', // sender address
    template: "email", // the name of the template file, i.e., email.handlebars
    to: email,
    subject: `Welcome to Tatawwu3,`,
    context: {
      name: name,
    },
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully"); // Sending a success response
    return;
  } catch (error) {
    console.log(`Nodemailer error sending email to `, error);
    res.status(500).send("Error sending email");
  }
};

const ResetPassword = async (req, res) => {
  const { email } = req.body;

  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions));
  const token = Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
  try {
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        passwordResetToken: token,
        passwordResetTokenExpiry: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const mailOptions = {
      from: '"Tatawwu3" <my@company.com>', // sender address
      template: "passwordToken", // the name of the template file, i.e., email.handlebars
      to: email,
      subject: `Reset Your Password,`,
      context: {
        name: user.firstName,
        token: token,
      },
    };
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully"); // Sending a success response
      return;
    } catch (error) {
      console.log(`Nodemailer error sending email to `, error);
      res.status(500).send("Error sending email");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendEmail,
  ResetPassword,
};
