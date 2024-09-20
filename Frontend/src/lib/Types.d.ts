
interface WorkExperience {
    jobTitle: string;
    companyName: string;
    duration: string;
}

interface IJobCardProps {
    RecriterJobs: IrecruiterJobData[] | undefined
}

interface CandidateFormData {
    gender : string
    fullName: string;
    phoneNumber: string;
    dateOfBirth: string;
    profilePhoto: string;
    highestQualification: string;
    collegeName: string;
    graduationYear: string;
    specialization: string;
    workExperience: WorkExperience[];
    technicalSkills: string[];
    softSkills: string[];
    portfolioLinks: string[];
    githubProfile: string;
    linkedInProfile: string;
    resume: string;
    preferredJobRoles: string[];
    locationPreferences: string[];
    expectedSalary: string;
    availabilityToStart: string;
    personalStatement: string;
    _id?: string
    _v?: number
}

interface ILoginData {
    success: boolean,
    role: string | null,
    token: string
}

interface IcookieData {
    success: boolean,
    token: string,
    role: "recruiter" | "candidate" | null
}

interface Iitmes {
    label: string
}

interface IrecruiterJobData {
    _id: string;
    UserId: {
        _id: string;
        username: string;
        useremail: string;
        image: string;
        role: string;
        userpassword: string;
        __v: number;
        updatedAt: string;
    };
    recruiterId: {
        _id: string;
        userId: string;
        name: string;
        currentCompany: string;
        currentRole: string;
        companyLogo: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    JobTitle: string;
    CompanyName: string;
    Location: string;
    SalaryRange: string;
    JobType: string;
    RequiredSkills: string[];
    ExperienceLevel: string;
    ApplicationDeadline: string;
    JobDescription: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    UrlPath: string
    Apllications: [
        {
            Accept: boolean;
            Note: string;
            Pending: boolean;
            candidateId: string;
            recruiterId: string;
            _id: string;
        }
    ]
}


interface PostData {
    PostData: IrecruiterJobData | undefined
}

interface Applications {
    Accept: boolean,
    Note: string,
    Pending: boolean,
    candidateId: CandidateFormData,
    recruiterId: {
        _id: string;
        userId: string;
        name: string;
        currentCompany: string;
        currentRole: string;
        companyLogo: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}[]


interface ICandidateApplication {
    _id: string;
    Accept: boolean;
    Note: string;
    Pending: boolean;
    candidateId: {
        emailAddress : string
        ProfileImage: string
        fullName: string;
        phoneNumber: string;
        dateOfBirth: string;
        profilePhoto: string;
        highestQualification: string;
        collegeName: string;
        graduationYear: string;
        specialization: string;
        workExperience:[ {
            jobTitle: string;
            companyName: string;
            duration: string;
        }];
        technicalSkills: string[];
        softSkills: string[];
        portfolioLinks: string[];
        githubProfile: string;
        linkedInProfile: string;
        resume: string;
        preferredJobRoles: string[];
        locationPreferences: string[];
        expectedSalary: string;
        availabilityToStart: string;
        personalStatement: string;
        _id?: string
        _v?: number
        gender : string
    };
    jobId: {
        JobTitle: string;
        CompanyName: string;
        Location: string;
        SalaryRange: string;
        JobType: string;
        RequiredSkills: string[];
        ExperienceLevel: string;
        ApplicationDeadline: string;
        JobDescription: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        UrlPath: string
        Apllications: [
            {
                Accept: boolean;
                Note: string;
                Pending: boolean;
                candidateId: string;
                recruiterId: string;
                _id: string;
            }
        ]
    };
    recruiterId: {
        _id: string;
        userId: string;
        name: string;
        currentCompany: string;
        currentRole: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IAccountData {
    _id: string;
    companyLogo: string;
    createdAt: string;
    currentCompany: string;
    currentRole: string;
    name: string;
    updatedAt: string;
    userId: {
        image: string;
        role: string;
        useremail: string;
        username: string;
        userpassword: string;
        updatedAt: string;
        createdAt: string;
        _id : string;
    },
    companyDescription : string;
    __v: number;
}
