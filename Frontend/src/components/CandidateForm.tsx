import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "@/lib/firebase";
import { Progress } from "./ui/progress";
import { toast } from "./ui/use-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CandidateForm() {
  const navigate = useNavigate();
  const [candidateFormData, setCandidateFormData] = useState<CandidateFormData>({
    fullName: '',
    phoneNumber: '',
    dateOfBirth: '',
    profilePhoto: '',
    highestQualification: '',
    collegeName: '',
    graduationYear: '',
    specialization: '',
    workExperience: [{ jobTitle: '', companyName: '', duration: '' }],
    technicalSkills: [''],
    softSkills: [''],
    portfolioLinks: [''],
    githubProfile: '',
    linkedInProfile: '',
    resume: '',
    preferredJobRoles: [''],
    locationPreferences: [''],
    expectedSalary: '',
    availabilityToStart: '',
    personalStatement: '',
    gender: '' // Add gender here
  });
  const [progress, setProgress] = useState<number>(0);
  const [resume, setResume] = useState<File | null>(null);
  const storage = getStorage(app);

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    setResume(selectedFile);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    if (name.startsWith('workExperience_')) {
      const index = parseInt(name.split('_')[1], 10);
      const fieldName = name.split('_')[0];

      setCandidateFormData((prevData) => {
        const updatedWorkExperience = [...prevData.workExperience];
        updatedWorkExperience[index] = {
          ...updatedWorkExperience[index],
          [fieldName]: value,
        };

        return {
          ...prevData,
          workExperience: updatedWorkExperience,
        };
      });
    }
    else if (['technicalSkills', 'softSkills', 'portfolioLinks', 'preferredJobRoles', 'locationPreferences'].includes(name)) {
      setCandidateFormData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map(skill => skill.trim())
      }));
    }
    else {
      setCandidateFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  }

  function handleGenderChange(value: string) {
    setCandidateFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!resume) {
      toast({
        title: "Please choose Your Resume first!"
      });
      return;
    }

    const storageRef = ref(storage, `resumes/${Date.now()}_${resume.name}`);
    const uploadTask = uploadBytesResumable(storageRef, resume);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setCandidateFormData((prevData) => ({
              ...prevData,
              resume: downloadURL,
            }));
            // ----          
          });
      }
    );

    const cookie = Cookies.get("bharani");
    if (cookie) {
      const CookieData: IcookieData = JSON.parse(cookie);

      const response = await fetch("http://localhost:8000/onboard-candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CookieData.token}`
        },
        body: JSON.stringify(candidateFormData)
      });
      const data = await response.json();
      if (data.success) {
        const cookie = Cookies.get("bharani") || "";
        const CookieData: IcookieData = JSON.parse(cookie);
        CookieData.role = "candidate";
        Cookies.set("bharani", JSON.stringify(CookieData), { expires: 365 });
        navigate('/home');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border-t-2 pt-4 border-primary p-1">
      {/* Personal Information */}
      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input id="fullName" name="fullName" value={candidateFormData.fullName} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number *</Label>
        <Input required id="phoneNumber" name="phoneNumber" value={candidateFormData.phoneNumber} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input required id="dateOfBirth" name="dateOfBirth" type="date" value={candidateFormData.dateOfBirth} onChange={handleChange} />
      </div>

      {/* Educational Background */}
      <div>
        <Label htmlFor="highestQualification">Highest Qualification *</Label>
        <Input required id="highestQualification" name="highestQualification" value={candidateFormData.highestQualification} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="collegeName">College Name *</Label>
        <Input required id="collegeName" name="collegeName" value={candidateFormData.collegeName} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="graduationYear">Graduation Year *</Label>
        <Input required id="graduationYear" name="graduationYear" type="number" value={candidateFormData.graduationYear} onChange={handleChange} />
      </div>

      <div className="w-full">
        <Select name="gender" onValueChange={handleGenderChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Transgender">Transgender</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="specialization">Specialization *</Label>
        <Input required id="specialization" name="specialization" value={candidateFormData.specialization} onChange={handleChange} />
      </div>

      {/* Work Experience */}
      <div className="w-full flex flex-wrap gap-4">
        {candidateFormData.workExperience.map((_experience, index) => (
          <div key={index} className="flex flex-row gap-4 w-full">
            <div className="flex flex-col w-[33%]">
              <Label htmlFor={`jobTitle_${index}`}>Job Title</Label>
              <Input id={`jobTitle_${index}`} name={`jobTitle_${index}`} onChange={handleChange} />
            </div>

            <div className="flex flex-col w-[33%]">
              <Label htmlFor={`companyName_${index}`}>Company Name</Label>
              <Input id={`companyName_${index}`} name={`companyName_${index}`} onChange={handleChange} />
            </div>

            <div className="flex flex-col w-[33%]">
              <Label htmlFor={`duration_${index}`}>Duration</Label>
              <Input id={`duration_${index}`} name={`duration_${index}`} onChange={handleChange} />
            </div>

          </div>
        ))}
      </div>

      {/* Skills & Certifications */}
      <div>
        <Label htmlFor="technicalSkills">Technical Skills *</Label>
        <Input required id="technicalSkills" name="technicalSkills" value={candidateFormData.technicalSkills.join(', ')} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="softSkills">Soft Skills *</Label>
        <Input required id="softSkills" name="softSkills" value={candidateFormData.softSkills.join(', ')} onChange={handleChange} />
      </div>

      {/* Portfolio */}
      <div>
        <Label htmlFor="portfolioLinks">Portfolio Links</Label>
        <Input id="portfolioLinks" name="portfolioLinks" value={candidateFormData.portfolioLinks.join(', ')} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="githubProfile">GitHub Profile *</Label>
        <Input required id="githubProfile" name="githubProfile" value={candidateFormData.githubProfile} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="linkedInProfile">LinkedIn Profile *</Label>
        <Input required id="linkedInProfile" name="linkedInProfile" value={candidateFormData.linkedInProfile} onChange={handleChange} />
      </div>

      {/* Preferences */}
      <div>
        <Label htmlFor="preferredJobRoles">Preferred Job Roles *</Label>
        <Input required id="preferredJobRoles" name="preferredJobRoles" value={candidateFormData.preferredJobRoles.join(', ')} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="locationPreferences">Location Preferences *</Label>
        <Input required id="locationPreferences" name="locationPreferences" value={candidateFormData.locationPreferences.join(', ')} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="expectedSalary">Expected Salary *</Label>
        <Input required id="expectedSalary" name="expectedSalary" type="number" value={candidateFormData.expectedSalary} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="availabilityToStart">Availability to Start</Label>
        <Input id="availabilityToStart" name="availabilityToStart" type="date" value={candidateFormData.availabilityToStart} onChange={handleChange} />
      </div>

      {/* Additional Information */}
      <div>
        <Label htmlFor="personalStatement">Personal Statement</Label>
        <Input id="personalStatement" name="personalStatement" placeholder="Below 6 lines" value={candidateFormData.personalStatement} onChange={handleChange} className="border rounded px-3 py-2" />
      </div>

      <div>
        <Label htmlFor="resume">Resume *</Label>
        <Input required type="file" id="resume" accept=".pdf" onChange={handleFileUpload} />
      </div>
      <Progress value={progress} />

      <Button type="submit">Onboard as a Candidate</Button>
    </form>
  );
}
