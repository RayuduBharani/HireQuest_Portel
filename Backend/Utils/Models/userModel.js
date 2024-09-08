const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        required : true,
        type : String
    },
    useremail : {
        required : true,
        type : String,
        unique : true
    },
    image : {
        type : String,
        default : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
    },
    role :{
        type : String,
        enum : ["recruiter" , "candidate" , "admin"],
        default : null
    },
    userpassword : {
        required : true,
        type : String,
        min : 8
    }
},{timestamps : true})

const UserModel = mongoose.models.users || mongoose.model('users' , userSchema)

module.exports = UserModel