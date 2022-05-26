const mongose = require('mongoose')
const StadeSchema = mongose.Schema({
    proprietaire: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true,
        unique: true
    },
    adresse: {
        ville: {
            type: String,
            enum: ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
                "Kairouan", "Kasserine", "Kebili", "Manouba", "Kef", "Mahdia", "Médenine", "Monastir",
                "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"],
            required: true,
        },
        rue: String
    },
    coordonnes: {
        long: String,
        lat: String
    },
    images: [
        {
            type: String,
        }
    ],
    verifier: {
        type: Boolean,
        default: false
    },
    etat: {
        type: Boolean,
        default: false
    },
    evaluation:Number,
    terrains: {
        type: Number,
        default: 1
    },
    capacite: {
        type: Number,
        default: 12
    },
})
module.exports = mongose.model('Stade', StadeSchema)