import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileUpload } from "../ui/file-upload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Briefcase, Mail, MapPin, Phone, School, User } from "lucide-react";

export default function CandidateAccountPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="account" className="w-full space-y-6">
          <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-muted/30 p-1 rounded-lg">
            <TabsTrigger value="account" className="flex-1 py-3">User Profile</TabsTrigger>
            <TabsTrigger value="password" className="flex-1 py-3">Technical Info</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <div className="bg-card rounded-xl shadow-sm border p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <img 
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" 
                    src="image" 
                    alt="Profile" 
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm">Change Photo</p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Rayudu Bharani</h2>
                <p className="text-muted-foreground">Data Science Enthusiast</p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">rayudubharani7288@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">9782346877</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <School className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Education</p>
                      <p className="font-medium">B tech - Data Science</p>
                      <p className="text-sm text-muted-foreground">Kiet, Class of 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-8" variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Update Your Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <FileUpload />
                    <Input placeholder="Enter Your Name" className="bg-muted/30" />
                    <Input placeholder="Enter Your phone number" className="bg-muted/30" type="tel" />
                    <Input placeholder="Enter Your Education" className="bg-muted/30" />
                    <Input placeholder="Enter Your College" className="bg-muted/30" />
                    <Input placeholder="Enter Your graduation year" className="bg-muted/30" type="number" />
                    <Input placeholder="Enter Your specialization" className="bg-muted/30" />
                    <Button className="w-full">Update Profile</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          <TabsContent value="password" className="space-y-6">
            <div className="bg-card rounded-xl shadow-sm border p-6">
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <a 
                  href="#" 
                  className="p-4 bg-muted/30 rounded-xl hover:bg-muted transition-colors"
                >
                  <img 
                    className="w-12 h-12" 
                    src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" 
                    alt="LinkedIn" 
                  />
                </a>
                <a 
                  href="#" 
                  className="p-4 bg-muted/30 rounded-xl hover:bg-muted transition-colors"
                >
                  <img 
                    className="w-12 h-12" 
                    src="https://img.icons8.com/?size=100&id=naDnVpQ3BNkR&format=png&color=000000" 
                    alt="GitHub" 
                  />
                </a>
                <a 
                  href="#" 
                  className="p-4 bg-muted/30 rounded-xl hover:bg-muted transition-colors"
                >
                  <img 
                    className="w-12 h-12" 
                    src="https://img.icons8.com/?size=100&id=AZOZNnY73haj&format=png&color=000000" 
                    alt="Portfolio" 
                  />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Preferred Locations</p>
                    <p className="font-medium">Bangalore, Mumbai, Delhi</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Preferred Job Roles</p>
                    <p className="font-medium">Data Scientist, ML Engineer</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-lg mb-2">Expected Salary</p>
                  <p className="text-2xl font-bold text-primary">₹6,00,000</p>
                  <p className="text-sm text-muted-foreground mt-2">per annum</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-4">Work Experience</h3>
                <div className="space-y-2">
                  <p className="font-medium">Software Engineer</p>
                  <p className="text-muted-foreground">Company Name</p>
                  <p className="text-sm text-muted-foreground">2 years</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'].map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-8" variant="outline">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Update Technical Info
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Update Technical Information</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input placeholder="Preferred location" className="bg-muted/30" />
                    <Input placeholder="Preferred Job Roles" className="bg-muted/30" />
                    <Input placeholder="Expected salary" className="bg-muted/30" type="number" />
                    <Textarea 
                      placeholder="Update your personal statement" 
                      className="bg-muted/30 min-h-[100px]" 
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input placeholder="Job role" className="bg-muted/30" />
                      <Input placeholder="Company name" className="bg-muted/30" />
                      <Input placeholder="Duration" className="bg-muted/30" />
                    </div>
                    <Input 
                      placeholder="Enter your skills separated by commas" 
                      className="bg-muted/30" 
                    />
                    <Input placeholder="LinkedIn URL" className="bg-muted/30" />
                    <Input placeholder="GitHub URL" className="bg-muted/30" />
                    <Input placeholder="Portfolio URL" className="bg-muted/30" />
                    <Button className="w-full">Update Technical Info</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
