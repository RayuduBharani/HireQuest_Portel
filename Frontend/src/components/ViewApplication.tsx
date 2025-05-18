import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { ArrowUpRightFromSquareIcon, Briefcase, Cake, GraduationCap, Mail, Phone, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"
import { toast } from "./ui/use-toast"
import { useState } from "react"

export default function ViewApplication({ applicants }: { applicants: ICandidateApplication }) {
  const [isAccepting, setIsAccepting] = useState(false);

  async function HandleAcceptJob() {
    try {
      setIsAccepting(true);
      const response = await fetch(`https://hirequest-portel-1.onrender.com/recruiter/acceptJob/${applicants._id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Application accepted",
          description: "You've successfully accepted this candidate"
        });
        // Update the local state by forcing a page refresh
        window.location.reload();
      } else {
        toast({
          title: "Failed to accept application",
          description: data.message || "Something went wrong",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error accepting application:', error);
      toast({
        title: "Error accepting application",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsAccepting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={applicants.Accept ? "outline" : "default"}>
          {applicants.Accept ? "Accepted" : "View Profile"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto scrollbar-thin w-[95vw] md:w-[80vw] lg:w-[70vw] p-6">
        <DialogHeader className="mb-8">
          <DialogTitle className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-sm">
              <img className="w-16 h-16 rounded-full object-cover border-2 border-primary" src={applicants.candidateId.ProfileImage} alt="" />
              <p className="text-xl font-semibold">{applicants.candidateId.fullName}</p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <a href={`mailto:${applicants.candidateId.emailAddress}`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto p-5" variant="outline">
                  <Mail className="size-4 mr-2" />Send Email
                </Button>
              </a>
              <Button 
                onClick={HandleAcceptJob}
                disabled={applicants.Accept || isAccepting}
                variant={applicants.Accept ? "outline" : "default"}
                className="w-full sm:w-auto"
              >
                {isAccepting ? (
                  <><ArrowUpRightFromSquareIcon className="size-4 mr-2 animate-spin" />Hiring...</>
                ) : applicants.Accept ? (
                  <>Application Accepted</>
                ) : (
                  <><ArrowUpRightFromSquareIcon className="size-4 mr-2" />Hire Candidate</>
                )}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mb-8">
          <Tabs defaultValue="account">
            <TabsList className="w-full flex flex-wrap h-auto gap-3 bg-muted/30 p-1 rounded-lg">
              <TabsTrigger value="account" className="flex-1 py-3">Personal Info</TabsTrigger>
              <TabsTrigger value="password" className="flex-1 py-3">Cover Letter</TabsTrigger>
              <TabsTrigger value="Experience" className="flex-1 py-3">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-6">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <h3 className="text-xl font-bold mb-6 text-center text-primary">Education Details</h3>
                  <div className="space-y-4">
                    <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-lg font-semibold min-w-[150px]">College Name:</span>
                      <span className="text-muted-foreground">{applicants.candidateId.collegeName}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-lg font-semibold min-w-[150px]">Graduation Year:</span>
                      <span className="text-muted-foreground">{applicants.candidateId.graduationYear}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-lg font-semibold min-w-[150px]">Specialization:</span>
                      <span className="text-muted-foreground">{applicants.candidateId.specialization}</span>
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 mt-8 pt-6 border-t">
                    <Link 
                      to={applicants.candidateId.linkedInProfile} 
                      target="_blank"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
                        <path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"/>
                      </svg>
                    </Link>
                    <Link 
                      target="_blank" 
                      to={applicants.candidateId.githubProfile}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-12 h-12 dark:bg-white rounded-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                        <path d="M36,12c-13.255,0-24,10.745-24,24c0,13.255,10.745,24,24,24s24-10.745,24-24C60,22.745,49.255,12,36,12z M44.839,44.839c-1.169,1.169-2.959,1.859-4.839,1.859c-3.794,0-6.872-3.078-6.872-6.872c0-1.88,0.69-3.67,1.859-4.839c1.169-1.169,2.959-1.859,4.839-1.859c3.794,0,6.872,3.078,6.872,6.872C46.698,41.88,46.008,43.67,44.839,44.839z"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-sm border row-span-2">
                  <h3 className="text-xl font-bold mb-8 text-center text-primary">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Cake className="w-8 h-8 mx-auto text-primary mb-3" />
                      <p className="font-semibold mb-1">Date of Birth</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(applicants.candidateId.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <GraduationCap className="w-8 h-8 mx-auto text-primary mb-3" />
                      <p className="font-semibold mb-1">Education</p>
                      <p className="text-sm text-muted-foreground">
                        {applicants.candidateId.highestQualification}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <User className="w-8 h-8 mx-auto text-primary mb-3" />
                      <p className="font-semibold mb-1">Gender</p>
                      <p className="text-sm text-muted-foreground">
                        {applicants.candidateId.gender}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Phone className="w-8 h-8 mx-auto text-primary mb-3" />
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {applicants.candidateId.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 space-y-6 pt-6 border-t">
                    <h4 className="font-bold text-center text-primary text-lg">Contact Information</h4>
                    
                    <a 
                      href={`mailto:${applicants.candidateId.emailAddress}`}
                      className="flex items-center justify-center gap-3 p-3 hover:bg-muted/30 rounded-lg transition-colors"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="font-medium truncate">{applicants.candidateId.emailAddress}</span>
                    </a>

                    <div className="flex items-center justify-center gap-3 p-3 hover:bg-muted/30 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="font-medium truncate">{applicants.candidateId.phoneNumber}</span>
                    </div>

                    {applicants.candidateId.portfolioLinks[0] && (
                      <a 
                        href={applicants.candidateId.portfolioLinks[0]} 
                        target="_blank"
                        className="flex items-center justify-center gap-3 p-3 hover:bg-muted/30 rounded-lg transition-colors"
                      >
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span className="font-medium truncate">{applicants.candidateId.portfolioLinks[0]}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <h3 className="text-xl font-bold mb-6 text-center text-primary">Skills</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {applicants.candidateId.technicalSkills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="password" className="mt-6">
              <div className="bg-card p-8 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-6 text-primary">Cover Letter</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {applicants.Note}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Experience" className="mt-6">
              <div className="space-y-8">
                <div className="bg-card p-8 rounded-xl shadow-sm border">
                  <h3 className="text-xl font-bold mb-6 text-primary">Work Experience</h3>
                  <div className="space-y-4">
                    <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold min-w-[120px]">Job Title:</span>
                      <span className="text-muted-foreground">
                        {applicants.candidateId.workExperience[0]?.jobTitle || "N/A"}
                      </span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold min-w-[120px]">Company Name:</span>
                      <span className="text-muted-foreground">
                        {applicants.candidateId.workExperience[0]?.companyName || "N/A"}
                      </span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold min-w-[120px]">Duration:</span>
                      <span className="text-muted-foreground">
                        {applicants.candidateId.workExperience[0]?.duration || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-xl shadow-sm border">
                  <h3 className="text-xl font-bold mb-6 text-primary">Personal Statement</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {applicants.candidateId.personalStatement}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>

  )
}