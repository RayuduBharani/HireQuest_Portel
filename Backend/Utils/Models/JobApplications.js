const mongoose = require("mongoose")

const ApplicationDetailesSchema = mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recruiter",
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
        required: true
    },
    Note: {
        type: String,
        required: true
    }
    ,
    Accept: {
        type: Boolean,
        default: false
    },
    Pending: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const ApplicantModel = mongoose.model("Activities", ApplicationDetailesSchema)

module.exports = ApplicantModel