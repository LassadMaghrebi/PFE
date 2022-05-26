const Stade = require("../Models/Stade");
exports.ajoutStade = async (req, res) => {
    console.log(req.body);
    try {
        req.body.proprietaire=req.body.user
        console.log(req.body);
        Stade(req.body).save().then(()=> {
            return res.status(200).json("Votre demande a ete bien reçu ");
        }).catch((error) => {
            return res.status(400).json("Erreur d'ajout !")
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e.error || "autre erreur");
    }
}
exports.getAllStades =async (req, res) => {
    if(req.query.page==null||isNaN(req.query.page)||req.query.page==1) req.query.page=0
    if(req.query.orderBy==null||req.query.orderBy!="nom"||req.query.orderBy!="evaluation") req.query.orderBy="nom"
    if(req.query.ville==null) req.query.ville=""
    try {
        Stade.find({ 'adresse.ville':{ $regex: req.query.ville }},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json("aucun stades trouver")
        }).skip(req.query.page*12).limit(12).sort(req.query.orderBy)
    } catch (e) {
        res.status(500).send(e || "autre erreur !");
    }
}

exports.countStades = (req, res) => {
    try {
        Stade.count({verifier:true},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json("aucun stades trouver")
        })
    } catch (e) {
        res.status(500).send(e || "autre erreur !");
    }
}

exports.getStadeById = (req, res) => {
    try {
        Stade.findById(req.params.id).then((result) => {
            if (result) return res.status(200).json(result)
        }).catch((error) => {
            return res.status(400).json("Stade n'existe pas")
        })
    } catch (e) {
        res.status(500).send("autre erreur !");
    }
}
exports.getStadesByNom = (req, res) => {
    let name = req.body.name
    try {
        Stadium.find({ nom: { $regex: nom } }, (err, result)=> {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun stade trouvé" })
        }).limit(10)
    } catch (e) {
        res.status(500).send({ message: e });
    }
}
exports.getStadesByProprietaire = (req, res) => {
    
    try {
        Stadium.find({ proprietaire:req.body.user }, (err, result)=> {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "Aucun stade trouvé" })
        }).limit(10)
    } catch (e) {
        res.status(500).send({ message: e });
    }
}