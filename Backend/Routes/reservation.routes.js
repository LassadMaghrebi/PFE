const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const ReservationController = require("../controllers/reservationController");
router.post('/add',ReservationController.AddReservation)
router.post('/find/all',ReservationController.getAllReservations)
module.exports = router