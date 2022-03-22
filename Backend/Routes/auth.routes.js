const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const AdminAuth = require("../middlewares/adminAuth");
const authController = require("../controllers/authController");
router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.post('/email',authController.findByEmail)
router.post('/signout',Auth,authController.signout)
router.get('/confirmEmail/:token',authController.confirmEmail)
router.post('/forgot-password',authController.forgotPassword)
router.post('/reset-password',authController.resetPassword)
router.post('/add-phone-number',Auth,authController.addPhoneNumber)
router.post('/verif-phone-number',Auth,authController.verifPhoneNumber)
module.exports = router