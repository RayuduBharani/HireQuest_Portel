const mongoose = require("mongoose");
const JobSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter',
        required: true,
    },
    JobTitle: {
        type: String,
        required: true
    },
    CompanyName: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    SalaryRange: {
        type: String,
        required: true
    },
    JobType: {
        type: String,
        enum: ["Full-Time",
            "Part-Time",
            "Contract",
            "Internship",
            "Temporary"],
        required: true
    },
    RequiredSkills: {
        type: [String],
        required: true
    },
    ExperienceLevel: {
        type: String,
        required: true
    },
    ApplicationDeadline: {
        type: String,
        required: true
    },
    JobDescription: {
        type: String,
        required: true
    },
    UrlPath : {
        type: String,
        required: true
    },
    Apllications : {
        type : Array,
        default : []
    }
}, { timestamps: true })

const JobModel = mongoose.model("jobs", JobSchema)
module.exports = JobModel