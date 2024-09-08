import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { ArrowUpRightFromSquareIcon, Briefcase, Cake, GraduationCap, Mail, Phone, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"
import { toast } from "./ui/use-toast"
import { useEffect } from "react"

export default function ViewApplication({ applicants }: { applicants: ICandidateApplication }) {
  async function HandleAcceptJob() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/recruiter/acceptJob/${applicants._id}`,{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const data = await response.json()
    if(data.success){
      toast({
        title : "Your Accepted the Candidate"
      })
    }
    else {
      toast({
        title : "Your are rejected the Candidate",
        variant : "destructive"
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild><Button>View Profile</Button></DialogTrigger>
      <DialogContent className="overflow-y-scroll scrollbar-none block">
        <DialogHeader>
          <DialogTitle className="flex justify-between mt-5">
            <div className="w-fit h-full flex items-center gap-4">
              <img className="w-14 h-14 rounded-full" src={applicants.candidateId.ProfileImage} alt="" />
              <p className="text-[1rem] text-muted-foreground">Anil sai Bharani Rayudu satya siva  durga prasad</p>
            </div>
            <div className="flex gap-2 items-center">
              <a href={`mailto:${applicants.candidateId.emailAddress}`}>
                <Button className="p-5" variant="outline"><Mail className="size-4 mr-2" />Send Email</Button>
              </a>
              <Button disabled={applicants.Accept} onClick={HandleAcceptJob}><ArrowUpRightFromSquareIcon className="size-4 mr-2" />Hire Candidate</Button>
            </div>
          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="mt-5">
          <TabsList>
            <TabsTrigger value="account">Personal Info</TabsTrigger>
            <TabsTrigger value="password">Cover Letter</TabsTrigger>
            <TabsTrigger value="Experience">Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="w-full h-fit px-2 grid grid-cols-2 grid-rows-2 gap-3">

              <div className="flex flex-col items-center justify-center">
                <p><span className="text-lg font-semibold">College Name : </span>{applicants.candidateId.collegeName}</p>
                <p><span className="text-lg font-semibold">Graduation Year : </span>{applicants.candidateId.graduationYear}</p>
                <p><span className="text-lg font-semibold">Specialization : </span>{applicants.candidateId.specialization}</p>

                <div className="flex w-[40%] h-12 mt-4 justify-around overflow-hidden">
                  <Link to={applicants.candidateId.linkedInProfile} target="_blank"><svg className="w-fit h-full" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
                  </svg></Link>
                  <Link target="_blank" to={applicants.candidateId.githubProfile}>
                    <svg className="w-fit h-full dark:bg-white dark:h-10 dark:mt-1 rounded-full" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 72 72">
                      <path d="M 36 12 C 22.745 12 12 22.745 12 36 C 12 49.255 22.745 60 36 60 C 49.255 60 60 49.255 60 36 C 60 22.745 49.255 12 36 12 z M 36 20 C 44.837 20 52 27.163 52 36 C 52 43.284178 47.128298 49.420174 40.46875 51.355469 C 40.198559 51.103128 39.941627 50.74363 39.953125 50.285156 C 39.980125 49.233156 39.953125 46.778953 39.953125 45.876953 C 39.953125 44.328953 38.972656 43.230469 38.972656 43.230469 C 38.972656 43.230469 46.654297 43.316141 46.654297 35.119141 C 46.654297 31.957141 45.003906 30.310547 45.003906 30.310547 C 45.003906 30.310547 45.872125 26.933953 44.703125 25.501953 C 43.393125 25.359953 41.046922 26.753297 40.044922 27.404297 C 40.044922 27.404297 38.457406 26.753906 35.816406 26.753906 C 33.175406 26.753906 31.587891 27.404297 31.587891 27.404297 C 30.586891 26.753297 28.239687 25.360953 26.929688 25.501953 C 25.760688 26.933953 26.628906 30.310547 26.628906 30.310547 C 26.628906 30.310547 24.974609 31.956141 24.974609 35.119141 C 24.974609 43.316141 32.65625 43.230469 32.65625 43.230469 C 32.65625 43.230469 31.782197 44.226723 31.693359 45.652344 C 31.180078 45.833418 30.48023 46.048828 29.8125 46.048828 C 28.2025 46.048828 26.978297 44.483766 26.529297 43.759766 C 26.086297 43.045766 25.178031 42.447266 24.332031 42.447266 C 23.775031 42.447266 23.503906 42.726922 23.503906 43.044922 C 23.503906 43.362922 24.285781 43.585781 24.800781 44.175781 C 25.887781 45.420781 25.866281 48.21875 29.738281 48.21875 C 30.196553 48.21875 31.021102 48.11542 31.677734 48.025391 C 31.674106 48.90409 31.663893 49.74536 31.677734 50.285156 C 31.688158 50.700354 31.476914 51.032045 31.236328 51.279297 C 24.726159 49.25177 20 43.177886 20 36 C 20 27.163 27.163 20 36 20 z"></path>
                    </svg>
                  </Link>
                </div>

              </div>

              <div className="w-full h-full flex justify-end items-center row-span-2">
                <div className="w-[100%] h-[100%] px-10">
                  <div className="border-2 w-full h-full py-6">
                    <div className="w-full h-[50%] grid grid-cols-2 grid-rows-2 gap-5">
                      <div className="grid justify-center items-center">
                        <Cake color="rgb(109, 40, 217)" />
                        <p className="font-semibold">Date of Birth</p>
                        <p className="text-sm text-muted-foreground">{new Date(applicants.candidateId.dateOfBirth).toLocaleDateString()}</p>
                      </div>

                      <div className="grid justify-center items-center">
                        <GraduationCap color="rgb(109, 40, 217)" />
                        <p className="font-semibold">Educations</p>
                        <p className="text-sm text-muted-foreground">{applicants.candidateId.highestQualification}</p>
                      </div>

                      <div className="grid px-6 items-center">
                        <User color="rgb(109, 40, 217)" />
                        <p className="font-semibold">Gender</p>
                        <p className="text-sm text-muted-foreground">{applicants.candidateId.gender}</p>
                      </div>

                      <div className="grid justify-center items-center">
                        <Phone color="rgb(109, 40, 217)" />
                        <p className="font-semibold">Phone</p>
                        <p className="text-sm text-muted-foreground">{applicants.candidateId.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="p-3 mt-5 w-full flex gap-4 flex-col">
                      <p className="font-bold text-center text-primary underline">Contact Infomation</p>
                      <div>
                        <a className="flex justify-center gap-3" href={`mailto:${applicants.candidateId.emailAddress}`}>
                          <Mail />
                          <p className="font-semibold truncate text-sky-400 cursor-pointer">{applicants.candidateId.emailAddress}</p>
                        </a>
                      </div>

                      <div className="flex justify-center gap-3 font-semibold">
                        <Phone />
                        <p className="truncate text-sky-400">98697879878</p>
                      </div>

                      <div className="flex justify-center gap-3 font-semibold">
                        <a href={applicants.candidateId.portfolioLinks[0]} target="_blank" className="flex justify-center gap-3">
                          <Briefcase />
                          <p className="truncate text-sky-400 cursor-pointer">http:portfolio.com</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden w-full h-full flex flex-col justify-center items-center">
                <p className="font-bold text-lg">Skills</p>
                <div className="flex gap-5 flex-wrap w-fit h-fit py-4">

                  {
                    applicants.candidateId.technicalSkills.map((skill, index) => {
                      return (
                        <div key={index}>
                          <p className="bg-primary text-white px-4 py-2 rounded-md">{skill}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

            </div>
          </TabsContent>

          {/* CoverLetter  */}

          <TabsContent value="password" className="">
            <div className="mt-5">
              <p className="text-lg font-bold">Cover Letter</p>
              <p className="text-muted-foreground mt-2">
                {applicants.Note}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="Experience">
            <div className="w-full pb-10 font-poppins flex flex-col">
              <p><b>Job Title : </b>{applicants.candidateId.workExperience[0].jobTitle == null ? "N/A" : applicants.candidateId.workExperience[0].jobTitle}  </p>
              <p><b>Comapny Name : </b>{applicants.candidateId.workExperience[0].companyName == null ? "N/A" : applicants.candidateId.workExperience[0].companyName} </p>
              <p><b>Duration : </b> {applicants.candidateId.workExperience[0].duration == null ? "N/A" : applicants.candidateId.workExperience[0].duration}</p>
            </div>
            <div>
              <p className="text-lg font-bold">Personel Statement</p>
              <p className="text-muted-foreground mt-2 line-clamp-6">
                {applicants.candidateId.personalStatement}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>

  )
}