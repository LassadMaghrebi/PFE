const mongose =require('mongoose')
const UserSchema=mongose.Schema({
    prenom:{
        type: String,
        required: true
    },
    nom:String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:String,
    age:Number,
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum: [ "PLAYER", "proprietaire"],
        default:"PLAYER"
    },
    etatDeCompte: {
        type: Boolean,
        default: true
    },
    emailConfirmer: {
        type: Boolean,
        default: false
    },
    image:{
        type:String,
        default:'profile.png'
    },
    DeconnectionDate: {
        type: Date,
        default: Date.now(),
    }
})
module.exports =mongose.model('Users',UserSchema)