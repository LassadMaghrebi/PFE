const mongose =require('mongoose')
const UserSchema=mongose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:String,
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
        enum: [ "PLAYER", "OWNER"],
        default:"PLAYER"
    },
    accountStatus: {
        type: Boolean,
        default: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})
module.exports =mongose.model('Users',UserSchema)