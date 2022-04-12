const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email);
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Exist" });
    if (bcrypt.compareSync(password, user.password)) {
      if (user.confirmed === false) return res.status(400).json({ message: "Please Confirm your email" });
      if (user.accountStatus === false) return res.status(400).json({ message: "Your account is blocked !" });
      const payload = {
        user: {
          id: user.id,
          firstname: user.firstname,
          role: user.role
        }
      };
      const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY)
      return res.status(200).json({ Token: Token });
    } else {
      return res.status(400).json({ message: "Incorrect Password !" });
    }
  } catch (e) {
    res.status(500).json({
      message: "Server Error"
    });
  }
}
exports.signup = async (req, res) => {
  if (req.body.email != "" && req.body.password.length > 6) {
    try {
      const email = req.body.email
      const password = req.body.password
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(password, salt);
      let userInformations = await User.findOne({ email });

      if (userInformations) return res.status(400).json({ message: "Account alredy exist " });
      const user = new User(req.body).save().then(data => {
        const payload = {
          user: {
            userId: data.id,
            sub: "email confirmation"
          }
        };

        const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.MAILER_EMAIL_ID,
            pass: process.env.MAILER_PASSWORD
          },
        });
        let url = `http://localhost:3000/auth/confirmEmail/${Token}`
        var mailOptions = {
          from: 'lassedmaghrebi1@gmail.com',
          to: req.body.email,
          subject: 'Account Activation',
          html: "<h1>Hello " + req.body.firstname + "</h1> <p>Click the link below to activate your account in MiniFoot.tn</p>"
            + `<a href="${url}" style="background-color: #3498DB;color: white;padding: 14px;text-align: center;text-decoration: none;
            border-radius:8px;font-size:1.5rem;">
            Activate Your Account</a>`
            + "<p style='color:#E74C3C;'>this link will expire in 24h</p>"

        };

        transporter.sendMail(mailOptions).then(resp => {
          return res.status(200).json({
            message: 'Verification Email sent Verify you mailbox'
          });
        },
          err => {
            return res.status(400).json({
              message: 'Enter a valid email'
            });
          })

      })
    } catch (error) {
      res.status(500).json({
        message: error.message || "Server Error."
      });
    }
  }
}
exports.confirmEmail = async (req, res) => {
  try {
    const token = req.params.token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log(decoded)
    if (decoded.user.sub != "email confirmation") return res.status(401).json({ message: "Please Use a valid token" });
    let userInformations = await User.findById(decoded.user.userId);
    if (userInformations.confirmed) return res.status(401).json({ message: "Your email has been verified" });
    User.findByIdAndUpdate(userInformations.id, { $set: { confirmed: true } }, (err, result) => {
      if (result) {
        return res.send(`<meta http-equiv = "refresh" content = "1; url = http://localhost:4200/Signin" />`);
      }
      else {
        return res.send('Erreur');
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message || "Server Error." });
  }
}
exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    if (email == null) return res.status(404).json({ message: "Email adress required !" });
    let user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "Account doesn't exist or deleted" });
    const payload = {
      user: {
        userId: user.id,
        sub: "Reset Password"
      }
    };
    const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '5m' })
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_EMAIL_ID, // generated ethereal user
        pass: process.env.MAILER_PASSWORD // generated ethereal password
      },
    });
    let url = `http://localhost:4200/reset-password/${Token}`
    var mailOptions = {
      from: 'lassedmaghrebi1@gmail.com',
      to: req.body.email,
      subject: 'Reset Password',
      html: "<h1>Hello " + user.firstname + "</h1> <p>Click the link below to reset your password in MiniFoot.tn</p>"
        + `<a href="${url}" style="background-color: #3498DB;color: white;padding: 14px;text-align: center;text-decoration: none;
      border-radius:8px;font-size:1.5rem;">
      Reset Password</a>`+ "<p style='color:#E74C3C;'>this link will expire in 5m</p>"
    };
    transporter.sendMail(mailOptions)
    return res.status(200).json({
      message: 'Verification Email sent Verify your mailbox'
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server Error." });
  }
}
exports.resetPassword = async (req, res) => {
  const token = req.header("token");
  if (!token) { return res.status(401).json({ message: "Please use the link in your email to reset your password" }); }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    if (decoded.user.sub != "Reset Password") return res.status(401).json({ message: "Please Use a valid token" });
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    let userInformations = await User.findById(decoded.user.userId)
    if (bcrypt.compareSync(req.body.password, userInformations.password)) return res.status(400).json({ message: "Please don't use the same password" });
    User.findByIdAndUpdate(decoded.user.userId, { $set: { password: password } }, function (err, result) {
      if (result) return res.status(200).json({ message: "Your password has been changed successfully" })
      return res.status(400).json({ message: 'Email Verification error' });
    })
  } catch (error) {
    res.status(500).send({ message: "inValid token" });
  }
}