const express = require('express');
const router = express.Router();
const authController=require('../Controllers/authController')
router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.get('/confirmEmail/:token',authController.confirmEmail)

module.exports = router