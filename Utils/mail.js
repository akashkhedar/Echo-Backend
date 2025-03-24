const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const mailService = (email, code, routePath) => {
  let emailHTML;
  if (routePath === "/user/create") {
    const templatePath = path.join(
      __dirname,
      "../public/templates/verifyEmail.html"
    );
    emailHTML = fs.readFileSync(templatePath, "utf-8");
    emailHTML = emailHTML.replace(/{{code}}/g, code);
    emailHTML = emailHTML.replace(/{{email}}/g, email);
  } else {
    const templatePath = path.join(
      __dirname,
      "../public/templates/forgetPassword.html"
    );
    emailHTML = fs.readFileSync(templatePath, "utf-8");
    emailHTML = emailHTML.replace(/{{code}}/g, code);
    emailHTML = emailHTML.replace(/{{email}}/g, email);
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASSWORD,
    },
  });

  var mailOptions = {
    from: "akashkhedar262@gmail.com",
    to: "akashkhedar262@gmail.com",
    subject:
      routePath === "/user/create"
        ? "Account Verification Code"
        : "Forget Password?",
    html: emailHTML,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = mailService;
