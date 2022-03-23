const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const StadiumController = require("../controllers/stadiumController");
router.get('/find/all',StadiumController.getAllStadiums)
router.post('/find/city',StadiumController.getStadiumsByCity)
router.post('/find/name',StadiumController.getStadiumsByName)
router.post('/find/rating',StadiumController.getStadiumsByRating)
router.post('/rate',Auth,StadiumController.rateStadium)
module.exports = router