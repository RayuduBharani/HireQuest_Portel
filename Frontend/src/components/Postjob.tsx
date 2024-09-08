import { items } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Postjob() {
  const navigate = useNavigate()

  const cookie = Cookies.get("bharani")


  async function handelSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const JobTitle = formData.get("JobTitle")
    const CompanyName = formData.get("CompanyName")
    const Location = formData.get('Location')
    const SalaryRange = formData.get('SalaryRange')
    const JobType = formData.get("JobType")
    const RequiredSkills = formData.get("RequiredSkills")?.toString().split(",")
    const ExperienceLevel = formData.get('ExperienceLevel')
    const ApplicationDeadline = formData.get("ApplicationDeadline")
    const JobDescription = formData.get('JobDescription')

    const NewData = {
      JobTitle: JobTitle,
      CompanyName: CompanyName,
      Location: Location,
      SalaryRange: SalaryRange,
      JobType: JobType,
      RequiredSkills: RequiredSkills,
      ExperienceLevel: ExperienceLevel,
      ApplicationDeadline: ApplicationDeadline,
      JobDescription: JobDescription
    }
    if (cookie) {
      try {
        const CookieData: IcookieData = JSON.parse(cookie);
        const response = await fetch("http://localhost:8000/postjob", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CookieData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(NewData),
        })
        const data = await response.json();
        console.log(data);
        navigate("/jobs");
      } 
      catch (error) {
        console.error("Error posting job:", error);
      }
    }
  }

  return (
    <div className="pt-[75px] w-full h-screen bg-background flex justify-center flex-col items-center">
      <p className="text-center font-bold text-lg">Post a Job</p>
      <div className="w-[70%] h-[90%] p-2 overflow-y-scroll hide-scrollbar max-sm:w-[90%]">
        <form onSubmit={handelSubmit} className="flex flex-col gap-5">
          {items.map((item) => {
            return (
              <div key={item.label}>

                <Label htmlFor={item.label}>{item.label}</Label>

                {item.label === "JobType" ? (
                  <Select name={item.label}>
                    <SelectTrigger id="JobType">
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Time">Full-Time</SelectItem>
                      <SelectItem value="Part-Time">Part-Time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>

                ) : item.label === "JobDescription" ? (
                  <textarea
                    id={item.label}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Enter job description"
                    rows={5}
                    name={item.label}
                  />
                ) : (
                  <Input id={item.label} name={item.label} type="text" />
                )}
              </div>
            );
          })}
          <Button>Post Job</Button>
        </form>
      </div>
    </div>
  );
}
