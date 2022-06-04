const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer=require('multer')

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json("Utilisateur n'existe pas");
    if (bcrypt.compareSync(password, user.password)) {
      if (user.emailConfirmer === false) return res.status(400).json( "Veuillez  Confirmer votre email" );
      if (user.etatDeCompte === false) return res.status(400).json("votre compte a éte bloqué !");
      const payload = {
          id: user.id,
          prenom: user.prenom,
          role: user.role
        };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY)
      return res.status(200).json({ token: token });
    } else {
      return res.status(400).json("mot de passe incorrect !" );
    }
  } catch (e) {
    res.status(500).json("autre erreur !");
  }
}

exports.register = async (req, res) => {
    try {
      const email = req.body.email
      const password = req.body.password
      
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(password, salt);
      let userInformations = await User.findOne({ email });
      if (userInformations) return res.status(400).json("Compte deja existe ");
      User(req.body).save().then(data => {
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
        let url = `http://localhost:3000/auth/confirmeEmail/${Token}`
        var mailOptions = {
          from: 'lassedmaghrebi1@gmail.com',
          to: req.body.email,
          subject: 'Account Activation',
          html: "<h1>Bienvenu " + req.body.prenom + "</h1><p>Cliquez sur le lien ci-dessous pour activer votre compte MiniFoot.tn</p>"
            + `<a href="${url}" style="background-color: #3498DB;color: white;padding: 14px;text-align: center;text-decoration: none;
            border-radius:8px;font-size:1.5rem;">
            Activez votre compte</a>`
            + "<p style='color:#E74C3C;'>ce lien expire dans 24h</p>"

        };
        transporter.sendMail(mailOptions).then(()=> {
          return res.status(200).json('E-mail de vérification envoyé Vérifiez votre boîte aux lettres');
        }).catch(err => {
          User.findByIdAndDelete(data.id).then(()=> {
          return res.status(400).json('Entrer un email valide');
          })
        })
      }).catch(err => {
        return res.status(400).json('Erreur de registration')})
    } catch (error) {
      res.status(500).json("Autre Erreur.");
    }
}

exports.confirmeEmail = async (req, res) => {
  try {
    const token = req.params.token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decoded.user.sub != "email confirmation") return res.status(401).json("lien de confirmation invalide ou expiré !");
    let userInformations = await User.findById(decoded.user.userId);
    if (userInformations.emailConfirmer) return res.status(401).json("Votre e-mail a été bien verifier");
    User.findByIdAndUpdate(userInformations.id, { $set: { emailConfirmer: true } }).then(()=> {
      return res.send(`<meta http-equiv = "refresh" content = "1; url = http://localhost:4200/login" />`);
      }).catch(() => {
        return res.send('autre Error !');
      })
  } catch (err) {
    res.status(500).send("autre Error !");
  }
}

exports.desactiverCompte = async (req, res) => {
  try {
    console.log(req.body);
    User.findByIdAndUpdate(req.body.userId, { $set: { etatDeCompte: false, DeconnectionTime: Date.now() } }, (err, result) => {
      if (result) return res.status(200).json("Le compte de " + result.prenom+" "+result.nom + "a été désactiver");
      if (err) return res.status(400).json("Erreur");
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error." });
  }
}

exports.activerCompte =(req, res) => {
  try {
    User.findByIdAndUpdate(req.body.userId, { $set: { etatDeCompte: true} }, (err, result) => {
      if (result) return res.status(200).json("Le compte de " + result.prenom+" "+result.nom + "a été activer");
      if (err) return res.status(400).json("Erreur");
    })
  } catch (e) {
    console.error(e);
    res.status(500).json("Server Error.");
  }
}

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    if (email == null) return res.status(404).json("entrer votre adresse e-mail!");
    let user = await User.findOne({ email: email })
    if (!user) return res.status(404).json("Le compte n'existe pas ou a été supprimé !");
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
      html: "<h1>Bonjour" + user.prenom + "</h1> <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe</p>"
        + `<a href="${url}" style="background-color: #3498DB;color: white;padding: 14px;text-align: center;text-decoration: none;
      border-radius:8px;font-size:1.5rem;">
      Reset Password</a>`+ "<p style='color:#E74C3C;'>ce lien expire dans 5 minutes</p>"
    };
    transporter.sendMail(mailOptions).then(()=> {
    return res.status(200).json('E-mail de réinitialisation de mot de passe envoyé Vérifiez votre boîte aux lettres');
    })
  } catch (err) {
    res.status(500).json("autre erreur !");
  }
}

exports.resetPassword = async (req, res) => {
  
  // if (!token) { return res.status(401).json({ message: "Please use the link in your email to reset your password" }); }
  try {
    const token=req.headers.authorization.replace('Bearer ',"")
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    if (decoded.user.sub != "Reset Password") return res.status(401).json("Please Use a valid token");
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    let userInformations = await User.findById(decoded.user.userId)
    if (bcrypt.compareSync(req.body.password, userInformations.password)) return res.status(400).json("Please don't use the same password");
    User.findByIdAndUpdate(decoded.user.userId, { $set: { password: password } }, function (err, result) {
      if (result) return res.status(200).json("Your password has been changed successfully")
      return res.status(400).json('Email Verification error');
    })
  } catch (error) {
    res.status(500).send("inValid token");
  }
}

exports.findByEmail =(req, res) => {
  try {
    User.findOne({ email: req.body.email }).then((result)=> {
      if (result)return res.status(200).json({message:true})
      if (!result)return res.status(200).json({message:false})
    })
  } catch (e) {
    res.status(500).json("autre erreur !");
  }
}

exports.getUserData =(req, res) => {
  try {
    User.findById(req.body.user).then((result)=> {
      if (result)return res.status(200).json(result)
      if (!result)return res.status(200).json("utilisateur n'existe pas")
    })
  } catch (e) {
    res.status(500).json("autre erreur !");
  }
}

exports.getAllUsers =(req, res) => {
  try {
    User.find({role:{$in:["joueur","proprietaire"]}}).then((result)=> {
      if (result)return res.status(200).json(result)
      if (!result)return res.status(200).json("Aucun utilisateur trouvé !")
    })
  } catch (e) {
    res.status(500).json("autre erreur !");
  }
}

exports.getUserById =(req, res) => {
  try {
    User.findById(req.params.id).then((result)=> {
      if (result)return res.status(200).json(result)
      if (!result)return res.status(200).json("utilisateur n'existe pas")
    })
  } catch (e) {
    res.status(500).json("autre erreur !");
  }
}
exports.getUserName =(req, res) => {
  try {
    User.findById(req.params.id,{nom:1,prenom:1}).then((result)=> {
      if (result)return res.status(200).json(result)
      if (!result)return res.status(200).json("utilisateur n'existe pas")
    })
  } catch (e) {
    res.status(500).json("autre erreur !");
  }
}

exports.test =(req, res) => {
  try {
    // console.log(req.header('authorization'))
    // console.log(req.headers.authorization)
    const token=jwt.verify(req.headers.authorization.split(' ')[1],process.env.TOKEN_SECRET_KEY)
  } catch (e) {
    res.status(500).json({  message: e.message|| "Server Error."});
  }
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file);
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname.replace(' ', '_'));
  }
})
const upload = multer({ storage: storage }).single('image');
exports.AjoutImage = (req, res) => {
  upload(req, res, (err) => {
    try {
      User.findByIdAndUpdate(req.body.user,{ $set: { image: req.file.filename} }, (err, result) => {
        if (result) res.status(200).json(req.file.filename)
      })
    } catch (e) {
      res.status(500).send("server error");
    }
  })
}
exports.getImage = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/images/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  })
}