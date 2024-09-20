const mongoose = require("mongoose");

const RecruiterSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    currentCompany : {
        type : String ,
        required : true
    },
    currentRole : {
        type : String ,
        required : true
    },
    companyLogo : {
        type : String
    },
    companyDescription : {
        type : String,
        required : true
    }
} ,{timestamps : true})

const RecruiterModel = mongoose.model("recruiter" , RecruiterSchema)
module.exports = RecruiterModel

