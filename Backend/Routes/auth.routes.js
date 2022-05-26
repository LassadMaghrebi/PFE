const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const proprietaireAuth = require("../middlewares/proprietaireAuth");
const AdminAuth = require("../middlewares/adminAuth");
const authController=require('../Controllers/authController')
router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/profile',Auth,authController.getUserData)
router.get('/all',Auth,authController.getAllUsers)
router.get('/:id',Auth,authController.getUserById)
router.post('/activer',AdminAuth,authController.activerCompte)
router.post('/desactiver',AdminAuth,authController.desactiverCompte)
router.get('/confirmeEmail/:token',authController.confirmeEmail)
router.post('/forgot-password',authController.forgotPassword)
router.post('/reset-password',authController.resetPassword)
router.post('/email',authController.findByEmail)
router.post('/image',authController.AjoutImage)
router.get('/image/:name',authController.getImage)
router.post('/test',Auth,authController.test)
module.exports = router