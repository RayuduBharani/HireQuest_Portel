const express = require('express');
const cors = require('cors');
const connectDb = require('./Utils/DB/database');
const UserModel = require('./Utils/Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JobModel = require('./Utils/Models/JobSModal');
const RecruiterModel = require('./Utils/Models/RecruiterModel');
const CandidateModel = require('./Utils/Models/CandidateModel');
const ApplicantModel = require('./Utils/Models/JobApplications');

const app = express()
app.use(express.json())
app.use(cors())

// signIn 

app.post("/signup", async (req, res) => {
    await connectDb()
    const UserData = req.body
    try {
        const ExistedUser = await UserModel.findOne({ useremail: UserData.useremail })

        if (ExistedUser) {
            res.status(409).send({ success: false, message: 'User Already Exists' })
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.userpassword, salt);

            const NewUserData = new UserModel({
                username: UserData.username,
                useremail: UserData.useremail,
                userpassword: hash
            })
            const Data = await NewUserData.save()
            if (Data) {
                res.status(201).send({ success: true, message: "You are Registered" })
            }
        }
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
})

// signup 

app.post('/signin', async (req, res) => {
    await connectDb()
    try {
        const userData = req.body
        const LoginData = await UserModel.findOne({ useremail: userData.useremail })
        if (LoginData) {
            bcrypt.compare(userData.userpassword, LoginData.userpassword, function (err, result) {
                if (result) {
                    const token = jwt.sign(
                        {
                            useremail: LoginData.useremail,
                            username: LoginData.username,
                            userId: LoginData._id,
                            image: LoginData.image,
                            role: LoginData.role
                        }, 'HireQuest'
                    );
                    res.status(201).send({ success: true, token: token, role: LoginData.role })
                }
                else {
                    res.status(403).send({ success: false, message: "Incorrect Password" })
                }
            });
        }
        else {
            res.status(404).send({ success: false, message: "User not Found" })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
})

// Google Auth 

app.post("/google-auth", async (req, res) => {
    await connectDb()
    try {
        const userData = req.body
        const ExistedUser = await UserModel.findOne({ useremail: userData.useremail })

        if (ExistedUser) {
            const token = jwt.sign({
                useremail: ExistedUser.useremail,
                username: ExistedUser.username,
                image: ExistedUser.image,
                userId: ExistedUser._id,
                role: ExistedUser.role
            }, "HireQuest")
            jwt.verify(token, 'HireQuest', function (err, decoded) {
                if (!err) {
                    res.send({
                        success: true,
                        token: token,
                        role: decoded.role
                    })
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: "Some err happened in the Google Auth Token Generation"
                    })
                }
            });
        }
        else {
            const GeneratePass = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2)
            const NewUser = {
                username: userData.username,
                useremail: userData.useremail,
                image: userData.image,
                userpassword: GeneratePass
            }
            const CreateUser = await UserModel.create(NewUser)
            // console.log(CreateUser)
            const token = jwt.sign(
                {
                    useremail: CreateUser.useremail,
                    username: CreateUser.username,
                    userId: CreateUser._id,
                    image: CreateUser.image,
                    role: CreateUser.role
                }, 'HireQuest'
            );
            if (CreateUser) {
                const decoded = jwt.verify(token, "HireQuest")
                res.send({ success: true, token: token, role: CreateUser.role })
            }
        }

    }
    catch (err) {
        res.send({ success: false, message: err.message })
    }
})

// Onboard as a recruiter 

app.post("/onboard-recruiter", async (req, res) => {
    await connectDb()
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, "HireQuest")

        const RecruiterFormData = new RecruiterModel({
            userId: decoded.userId,
            name: req.body.name,
            currentRole: req.body.currentRole,
            currentCompany: req.body.currentCompany,
            companyLogo: req.body.companyLogo
        })

        const ChangeRole = await UserModel.findOne({ _id: decoded.userId });
        if (ChangeRole) {
            await UserModel.updateOne({ _id: ChangeRole._id }, { $set: { role: "recruiter" } })
            await RecruiterFormData.save()
            res.send({ success: true, message: "You are Onboarded as a recruiter" })
        }
        else {
            res.send({ success: true, message: "You are Already Onboarded as a recruiter" })
        }
    }
    catch (err) {
        res.send({ success: false, message: err.message })
    }
})

// Onboard as a Candidate 

app.post("/onboard-candidate", async (req, res) => {
    await connectDb()
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, "HireQuest")
        const CandidateData = req.body
        const NewCandidateData = new CandidateModel({
            userId: decode.userId,
            fullName: CandidateData.fullName,
            emailAddress: decode.useremail,
            phoneNumber: CandidateData.phoneNumber,
            dateOfBirth: CandidateData.dateOfBirth,
            highestQualification: CandidateData.highestQualification,
            collegeName: CandidateData.collegeName,
            graduationYear: CandidateData.graduationYear,
            specialization: CandidateData.specialization,
            workExperience: [{
                jobTitle: CandidateData.workExperience.jobTitle,
                companyName: CandidateData.workExperience.companyName,
                duration: CandidateData.workExperience.duration
            }],
            technicalSkills: CandidateData.technicalSkills,
            softSkills: CandidateData.softSkills,
            portfolioLinks: CandidateData.portfolioLinks,
            githubProfile: CandidateData.githubProfile,
            linkedInProfile: CandidateData.linkedInProfile,
            resume: CandidateData.resume,
            preferredJobRoles: CandidateData.preferredJobRoles,
            locationPreferences: CandidateData.locationPreferences,
            expectedSalary: CandidateData.expectedSalary,
            availabilityToStart: CandidateData.availabilityToStart,
            personalStatement: CandidateData.personalStatement,
            role: "candidate",
            ProfileImage : decode.image,
            gender : CandidateData.gender
        })
        const FindCandidate = await UserModel.findOne({ _id: NewCandidateData.userId })
        if (FindCandidate) {
            await UserModel.updateOne({ _id: FindCandidate._id }, { $set: { role: "candidate" } })
            await NewCandidateData.save()
            res.send({ success: true, message: "You are onboarded as a Candidate" })
        }
        else {
            res.send({ success: false, message: "User Not Registerd" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: err })
    }
})

// Post Jobs - recriter 

app.post("/postjob", async (req, res) => {
    await connectDb();
    try {
        const JobData = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ success: false, message: "No token provided" });
        }

        const decode = jwt.verify(token, "HireQuest");
        const RecruiterInfo = await RecruiterModel.findOne({ userId: decode.userId });
        const uniqueName = Date.now().toString(36) + Math.random().toString(36).substr(2, 9) + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
        console.log(req.body)

        if (RecruiterInfo) {
            const NewJobData = new JobModel({
                UserId: decode.userId,
                recruiterId: RecruiterInfo._id,
                JobTitle: JobData.JobTitle,
                CompanyName: JobData.CompanyName,
                Location: JobData.Location,
                SalaryRange: JobData.SalaryRange,
                JobType: JobData.JobType,
                RequiredSkills: JobData.RequiredSkills,
                ExperienceLevel: JobData.ExperienceLevel,
                ApplicationDeadline: JobData.ApplicationDeadline,
                JobDescription: JobData.JobDescription,
                UrlPath: uniqueName
            });
            console.log(NewJobData)

            const SaveData = await NewJobData.save();
            console.log(SaveData)

            if (SaveData) {
                return res.status(201).send({ success: true, message: "Job Created" });
            }
            else {
                return res.status(500).send({ success: false, message: "Failed to create job" });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ success: false, message: err.message });
    }
});

// Getting Jobs - recriter 

app.get("/getjob", async (req, res) => {
    await connectDb();
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, "HireQuest")
        const RecruiterJobs = await JobModel.find({ UserId: decode.userId }).populate("UserId").populate("recruiterId")
        if (RecruiterJobs) {
            res.send({
                success: true,
                data: RecruiterJobs
            })
        }
    }
    catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

// Getting Jobs - candidate 

app.get("/getAllJobs", async (req, res) => {
    await connectDb()
    try {
        const TotalJobs = await JobModel.find().populate("UserId").populate("recruiterId")
        if (TotalJobs) {
            res.send({ success: true, data: TotalJobs })
        }
        else {
            res.send({ success: false, message: "Some err happened Please try again !" })
        }
    }
    catch (err) {
        res.send({ success: false, message: err.message })
    }
})

// Getting Job info - receruiter

app.get("/recruiter/postinfo/:id", async (req, res) => {
    await connectDb()
    try {
        const PostId = req.params.id
        const postinfo = await JobModel.findOne({ UrlPath: PostId }).populate("recruiterId").populate("UserId")
        if (postinfo) {
            res.send(postinfo)
        }
    }
    catch (err) {
        res.send({ success: false, message: err.message })
    }

})

// Apply a job - candidate

app.post("/candidate/applyjob/:recruiterId", async (req, res) => {
    await connectDb()
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, "HireQuest")
        const FindCandidateId = await CandidateModel.findOne({ userId: decode.userId })
        if (!FindCandidateId) {
            res.send({ success: false, message: "Can't find candidateId" })
        }
        const FindJobForApplication = await JobModel.findOne({ recruiterId: req.params.recruiterId })
        const NewJobApplicationData = new ApplicantModel({
            candidateId: FindCandidateId._id,
            recruiterId: req.params.recruiterId,
            jobId: FindJobForApplication._id,
            Note: req.body.Note
        })
        if (FindJobForApplication) {
            await JobModel.updateOne({ _id: FindJobForApplication._id }, { $set: { Apllications: NewJobApplicationData } })
            await NewJobApplicationData.save()
            res.send({ success: true, message: "Congratulations for Apply the job" })
        }
        else {
            res.send({ success: true, message: "We are not found any job" })
        }
    }
    catch (err) {
        res.send({ success: false, message: err.message })
    }
})

app.get("/recruiter/applicant/:Urlpath", async (req, res) => {
    await connectDb()
    try {
        // const token = req.headers.authorization.split(" ")[1]
        // const decode = jwt.verify(token , "HireQuest")
        const FindJob = await JobModel.findOne({ UrlPath: req.params.Urlpath })
        const FindApplicants = await ApplicantModel.find({ jobId: FindJob._id }).populate("recruiterId").populate("jobId").populate("candidateId")
        if (FindApplicants) {
            res.send(FindApplicants)
        }
    } catch (err) {
        res.send({ success: false, message: err.message })
    }
})


app.listen(8000, () => {
    console.log('Server Running')
})