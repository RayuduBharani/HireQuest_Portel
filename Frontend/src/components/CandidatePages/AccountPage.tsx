import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileUpload } from "../ui/file-upload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function CandidateAccountPage() {
  return (
    <div className="w-full h-full pt-[75px] flex justify-center items-center max-md:px-10 max-sm:px-5">
      <div className="w-[80%] h-[95%] overflow-y-scroll scrollbar-none max-sm:w-full">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">User Profile</TabsTrigger>
            <TabsTrigger value="password">Tecnical Info</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="w-full h-full overflow-y-scroll scrollbar-none">
            <div className="mt-3 justify-center flex p-3">
              <img className="w-[9rem] h-[9rem] rounded-3xl cursor-pointer" src="image" alt="g" />
            </div>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">Rayudu Bharani</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">rayudubharani7288@gmail.com</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">9782346877</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">B tech</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">Kiet</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">2026</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">Data science</p>
            <Dialog>
              <DialogTrigger asChild><Button className="w-full mt-4">Update Your Profile</Button></DialogTrigger>
              <DialogContent className="overflow-y-scroll scrollbar-none">
                <DialogHeader>
                  <DialogTitle>Update Your Profile</DialogTitle>
                  <DialogDescription>

                  </DialogDescription>
                </DialogHeader>
                <FileUpload />
                <Input placeholder="Enter Your Name " />
                <Input placeholder="Enter Your phone number " />
                <Input placeholder="Enter Your Education " />
                <Input placeholder="Enter Your College" />
                <Input placeholder="Enter Your graduation year " />
                <Input placeholder="Enter Your specialization " />
                <Button>Update</Button>
              </DialogContent>
            </Dialog>

          </TabsContent>

          <TabsContent value="password">
            <div className="flex justify-center items-center mt-5 gap-10 p-10">
              <img className="w-14 h-14 cursor-pointer" src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt="" />
              <img className="w-14 h-14 cursor-pointer" src="https://img.icons8.com/?size=100&id=naDnVpQ3BNkR&format=png&color=000000" alt="" />
              <img className="w-14 h-14 cursor-pointer" src="https://img.icons8.com/?size=100&id=AZOZNnY73haj&format=png&color=000000" alt="" />
            </div>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">Prefered locations</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">Prefered job roles</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4"><b className="text-primary">Expected Salary : </b>600000</p>
            <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">personal statement</p>

            <div className="bg-muted mt-4 text-center p-3 flex flex-col gap-2">
              <p className="font-bold text-primary text-lg">Workexperience</p>
              <p>Job title</p>
              <p>Comapny name</p>
              <p>Duration</p>
            </div>

            <div className="w-full h-fit flex gap-10 flex-wrap justify-center p-5 overflow-hidden">
              <p className="bg-primary cursor-pointer px-4 py-2 rounded-lg">Html</p>
            </div>

            <Dialog>
              <DialogTrigger asChild><Button className="w-full mt-4">Update Your Profile</Button></DialogTrigger>
              <DialogContent className="overflow-y-scroll scrollbar-none">
                <DialogHeader>
                  <DialogTitle>Update Your Profile</DialogTitle>
                  <DialogDescription>

                  </DialogDescription>
                </DialogHeader>
                <Input placeholder="Prefered location" />
                <Input placeholder="Prefered Job Roles" />
                <Input placeholder="Expected salary" />
                <Textarea placeholder="Update your personal statement" />
                <div className="flex gap-3">
                  <Input placeholder="Job role" />
                  <Input placeholder="Comapany name " />
                  <Input placeholder="Duration" />
                </div>
                <Input placeholder="Enter your skills separated by commas" />
                <Input placeholder="LinkedIn url" />
                <Input placeholder="Github url" />
                <Input placeholder="Portfolio url" />
                <Button>Update</Button>
              </DialogContent>
            </Dialog>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
