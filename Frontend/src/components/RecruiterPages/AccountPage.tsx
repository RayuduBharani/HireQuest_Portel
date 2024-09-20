import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cookies from "js-cookie";
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

export default function RecruiterAccountPage() {

    const cookie = Cookies.get("bharani");
    let CookieData: IcookieData | null = null;
    if (cookie) {
        CookieData = JSON.parse(cookie);
    }
    const [Account, setAccount] = useState<IAccountData | null>(null);
    useEffect(() => {
        fetch("http://localhost:8000/recruiter/Account", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${CookieData?.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="w-full h-full pt-[75px] flex justify-center items-center max-md:px-10 max-sm:px-5">
            <div className="w-[80%] h-[95%] max-sm:w-full">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList>
                        <TabsTrigger value="account">User Profile</TabsTrigger>
                        <TabsTrigger value="password">Comapny Profile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account">
                        <div className="mt-3 justify-center flex p-3">
                            <img className="w-[9rem] h-[9rem] rounded-3xl cursor-pointer" src={Account?.userId.image} alt="g" />
                        </div>
                        <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">{Account?.name}</p>
                        <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">{Account?.userId.useremail}</p>
                        <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">{Account?.currentCompany}</p>
                        <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">{Account?.currentRole}</p>
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
                                <Input placeholder="Enter Your Company Name" />
                                <Input placeholder="Enter Your Role " />
                                <Button>Update</Button>
                            </DialogContent>
                        </Dialog>

                    </TabsContent>

                    <TabsContent value="password">
                        <div className="mt-3 justify-center flex p-10">
                            <img className="w-fit h-[9rem] cursor-pointer" src={Account?.companyLogo} alt="g" />
                        </div>
                        <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">{Account?.currentCompany}</p>
                        <p className="w-full bg-muted p-3 rounded-lg text-center mt-4">
                            {Account?.companyDescription}
                        </p>
                        <Dialog>
                            <DialogTrigger asChild><Button className="w-full mt-4">Update Your Profile</Button></DialogTrigger>
                            <DialogContent className="overflow-y-scroll scrollbar-none">
                                <DialogHeader>
                                    <DialogTitle>Update Your Profile</DialogTitle>
                                    <DialogDescription>

                                    </DialogDescription>
                                </DialogHeader>
                                <FileUpload />
                                <Input placeholder="Company Name" />
                                <Textarea placeholder="Change your Company Description" />
                                <Button>Update</Button>
                            </DialogContent>
                        </Dialog>

                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}
