const Reservation = require("../models/Reservation");
exports.AddReservation = (req, res) => {
    req.body.joueurId=req.body.user
    Reservation(req.body).save().then(data => {
        return res.status(200).json("Votre reservation a ete envoye avec success");
    }).catch(err => {
        console.log(err)
        res.status(500).send("Server Error.");
    })
}
exports.getAllReservations = (req, res) => {
    Reservation.find((err, result)=> {
        if (result) {
            res.send(result)
        }
        else {
            res.send("Aucun reservation trouvé")
        }
    }).catch(err => {
        res.status(500).send("Server Error.")
    })
}
exports.getReservationsByStadiumId = (req, res) => {
    
    Reservation.find({ 'statiumId': req.body.statiumId },(err, result)=> {
        
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}
exports.acceptReservatiaon = (req, res) => {
    
    Reservation.find({ 'statiumId': req.body.statiumId },(err, result)=> {
        
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}