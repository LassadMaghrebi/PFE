const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const ReservationController = require("../controllers/reservationController");
router.post('/reserver',Auth,ReservationController.AddReservation)
router.get('/all',ReservationController.getAllReservations)
router.get('/date/:date',ReservationController.getReservationsByDate)
router.get('/proprietaire',Auth,ReservationController.getProprietaireReservation)
router.put('/accepter',ReservationController.acceptReservatiaon)
router.delete('/refuser/:id',ReservationController.refuserReservatiaon)
module.exports = router