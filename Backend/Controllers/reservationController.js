const Reservation = require("../models/Reservation");
const Stade = require("../Models/Stade");
exports.AddReservation =async (req, res) => {
    req.body.joueurId=req.body.user
    let startDate=new Date(req.body.date)
    let endDate= new Date(req.body.date)
    startDate.setHours(startDate.getHours()-1)
    startDate.setMinutes(startDate.getMinutes()-29)
    endDate.setHours(endDate.getHours()+1)
    endDate.setMinutes(endDate.getMinutes()+30)
    console.log("starrrrrrrrrrrr",startDate);
    console.log("enddddddddddddddd",endDate);
    req.body.montant=req.body.equipe*5-10
    if(req.body.date<Date.now()) return res.status(400).json("date de reseervation doit etre superieur a la date actuel");
    let reservations = await Reservation.find({stadeId:req.body.stadeId,date:{$gte: startDate, $lt: endDate}});
    if(reservations.length>0) return res.status(400).json("il y a une autre reservation dans ce date essaie une a autre date");
    Reservation(req.body).save().then(() => {
        return res.status(200).json("Votre reservation a ete envoye avec success");
    }).catch(err => {
        console.log(err)
        res.status(500).send("Autre Erreur !");
    })
}
exports.acceptReservatiaon = (req, res) => {
    Reservation.findByIdAndUpdate(req.body.id,{$set:{etat:true}}).then(()=> {
        return  res.status(200).json("reservation accepter")   
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}
exports.refuserReservatiaon = (req, res) => {
    Reservation.findByIdAndDelete(req.params.id).then(()=> {
        return  res.status(200).json("reservation supprimer")   
    }).catch(err => {
        console.log(err)
        res.status(500).send("Server Error.");
    })
}

exports.getAllReservations = (req, res) => {
    Reservation.find().then((result)=> {
        if (result) {
            res.status(200).send(result)
        }
        else {
            res.status(404).send("Aucun reservation trouvé")
        }
    }).catch(err => {
        res.status(500).send("Server Error.")
    })
}

exports.getProprietaireReservation =async (req, res) => {
    req.body.joueurId=req.body.user
    let stadesId=[]
    let stades = await Stade.find({proprietaire:req.body.user})
    stades.forEach(element => {
        stadesId.push(element._id)
    });
    console.log(stadesId);
    console.log(stades);
        Reservation.find({ stadeId:{ $in: stadesId } }).then((result)=> {
            res.status(200).send(result)  
        })    
    
}


exports.getReservationsByStadeId = (req, res) => {
    
    Reservation.find({ 'stadeId': req.body.stadeId }).then((result)=> {
        res.status(200).send(result)   
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}

exports.getReservationsByDate = (req, res) => {
    console.log(req.params.date);
    let d=new Date(req.params.date)
    d.setDate(d.getDate()+7)
    console.log(d);
    Reservation.find({ date: {$gte: req.params.date, $lt: d}}).then((result)=> {
        res.status(200).send(result)   
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}