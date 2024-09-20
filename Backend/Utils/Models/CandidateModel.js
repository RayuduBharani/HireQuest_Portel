const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    // Personal Information
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    role: {
        type: String,
    },
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },

    // Educational Background

    highestQualification: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },

    // Work Experience
    workExperience: [
        {
            jobTitle: {
                default: null,
                type: String
            },
            companyName: {
                default: null,
                type: String
            },
            duration: {
                default: null,
                type: String
            }
        }
    ],

    // Skills 
    technicalSkills: [String],
    softSkills: [String],

    // Social
    portfolioLinks: [String],
    githubProfile: String,
    linkedInProfile: String,
    resume: {
        type: String,
        required: true
    },

    // Preferences
    preferredJobRoles: [String],
    locationPreferences: [String],
    expectedSalary: {
        type: Number,
        required: true
    },
    availabilityToStart: {
        type: Date
    },
    ProfileImage: {
        type: String,
        required: true
    },
    gender: {
        required: true,
        enum: ["Male", "Female", "TransGender"],
        type: String
    },
    OriginalName: {
        required: true,
        type: String
    }
    ,
    // Additional Information
    personalStatement: String
}, { timestamps: true });

const CandidateModel = mongoose.model('Candidate', CandidateSchema);

module.exports = CandidateModel;
