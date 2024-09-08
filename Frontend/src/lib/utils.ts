import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tiles = [
  { label: "Name", name: "name" },
  { label: "Current Company", name: "currentCompany" },
  { label: "Current Job Location", name: "currentJobLocation" },
  { label: "Preferred Job Location", name: "preferredJobLocation" },
  { label: "Current Salary", name: "currentSalary" },
  { label: "Notice Period", name: "noticePeriod" },
  { label: "Previous Companies", name: "previousCompanies" },
  { label: "Total Experience", name: "totalExperience" },
  { label: "College", name: "college" },
  { label: "College Location", name: "collegeLocation" },
  { label: "Graduation Year", name: "graduateYear" },
  { label: "CGPA", name: "CGPA" },
  { label: "LinkedIn Profile", name: "linkedInProfile" },
  { label: "GitHub Profile", name: "githubProfile" },
  { label: "Resume", name: "resume", type: "file" },
];


export const items : Iitmes[] = [
  {
    label: "JobTitle",
  },
  {
    label: "CompanyName",
  },
  {
    label: "Location",
  },
  {
    label: "SalaryRange",
  },
  {
    label: "JobType",
  },
  {
    label: "RequiredSkills",
  },
  {
    label: "ExperienceLevel",
  },
  {
    label: "ApplicationDeadline",
  },
  {
    label: "JobDescription",
  },
];


export const CompanieImg = [
  {
    img: "src/assets/google.webp",
    name: "google"
  },
  {
    img: "src/assets/amazon.svg",
    name: "amazon"
  },
  {
    img: "src/assets/atlassian.svg",
    name: "atlassian"
  },{
    img : "src/assets/ibm.svg",
    name : "ibm"
  },{
    img : "src/assets/meta.svg",
    name : "meta"
  },
  {
    img : "src/assets/microsoft.webp",
    name : "microsoft"
  },
  {
    img : "src/assets/netflix.png",
    name : "Netflix"
  }
]