const mongose = require('mongoose')
const ReservationSchema = mongose.Schema({
    stadeId: {
        type: String,
        required: true
    },
    joueurId: {
        type: String,
        required: true,
    },
    reservationDate: {
        type: Date,
    },
    etat: {
        type: Boolean,
        default: false
    },
    montant: {
        type: Boolean,
        default: false
    },
})
module.exports = mongose.model('Reservation', ReservationSchema)