import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cookies from "js-cookie";
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
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "@/lib/firebase";
import { Progress } from "../ui/progress";
import { toast } from "../ui/use-toast";
import { Briefcase, Building2, Mail, User } from "lucide-react";

export default function RecruiterAccountPage() {

    const cookie = Cookies.get("bharani");
    let CookieData: IcookieData | null = null;
    if (cookie) {
        CookieData = JSON.parse(cookie);
    }

    const [Image, setImage] = useState<File>()
    const [progress, setProgress] = useState<number>()
    const [Account, setAccount] = useState<IAccountData | null>(null);
    const [close , setClose] = useState(false)

    useEffect(() => {
        fetch("https://hirequest-portel-1.onrender.com/recruiter/Account", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${CookieData?.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [close]);

    const handleFileUpload = (files: File[]) => {
        setImage(files[0])
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatename = formData.get("updatename");
        const updaterole = formData.get("updaterole");
        const updatecompanyname = formData.get("updatecompanyname");

        try {
            let logoURL = Account?.userId.image;

            if (Image) {
                const storage = getStorage(app);
                const storageRef = ref(storage, `UpdatedProfiles/${Date.now()}_${Image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, Image as File);

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setProgress(prog);
                        },
                        (error) => {
                            console.error("Upload failed", error);
                            reject(error);
                        },
                        async () => {
                            logoURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            }

            const newData = {
                username: updatename,
                image: logoURL,
                currentCompany: updatecompanyname,
                currentRole: updaterole,
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/recruiter/userprofile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${CookieData?.token}`,
                },
                body: JSON.stringify(newData),
            });

            const data = await response.json();
            if(data.success){
                setClose(false)
                console.log(data)
                toast({
                    title : "Profile Updated Successfully"
                })
                setProgress(undefined)
                location.reload()
            }
        } 
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Tabs defaultValue="account" className="w-full space-y-6">
                    <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-muted/30 p-1 rounded-lg">
                        <TabsTrigger value="account" className="flex-1 py-3">User Profile</TabsTrigger>
                        <TabsTrigger value="password" className="flex-1 py-3">Company Profile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="space-y-6">
                        <div className="bg-card rounded-xl shadow-sm border p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative group">
                                    <img 
                                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" 
                                        src={Account?.userId.image || "https://github.com/shadcn.png"} 
                                        alt="Profile" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-sm">Change Photo</p>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-foreground">{Account?.name}</h2>
                                <p className="text-muted-foreground">{Account?.currentRole}</p>
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium truncate">{Account?.userId.useremail}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                                    <Building2 className="w-5 h-5 text-primary shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm text-muted-foreground">Company</p>
                                        <p className="font-medium truncate">{Account?.currentCompany}</p>
                                    </div>
                                </div>
                            </div>

                            <Dialog open={close} onOpenChange={setClose}>
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
                                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                                        <div className="space-y-2">
                                            <FileUpload onChange={handleFileUpload} />
                                            {progress && progress < 100 && (
                                                <Progress value={progress} className="h-2" />
                                            )}
                                        </div>
                                        <Input 
                                            name="updatename" 
                                            defaultValue={Account?.name} 
                                            placeholder="Enter Your Name"
                                            className="bg-muted/30"
                                        />
                                        <Input 
                                            name="updatecompanyname" 
                                            defaultValue={Account?.currentCompany} 
                                            placeholder="Enter Your Company Name"
                                            className="bg-muted/30"
                                        />
                                        <Input 
                                            name="updaterole" 
                                            defaultValue={Account?.currentRole} 
                                            placeholder="Enter Your Role"
                                            className="bg-muted/30"
                                        />
                                        <Button 
                                            disabled={!!progress && progress < 100} 
                                            className="w-full"
                                        >
                                            {progress && progress < 100 ? "Updating..." : "Update"}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </TabsContent>

                    <TabsContent value="password" className="space-y-6">
                        <div className="bg-card rounded-xl shadow-sm border p-6">
                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative group w-full max-w-md aspect-video flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
                                    {Account?.companyLogo ? (
                                        <img 
                                            className="w-full h-full object-contain p-4" 
                                            src={Account.companyLogo} 
                                            alt="Company Logo"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <Building2 className="w-12 h-12 mb-2" />
                                            <p>Company Logo</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-sm">Change Logo</p>
                                    </div>
                                </div>

                                <div className="w-full space-y-6">
                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building2 className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Company Name</h3>
                                        </div>
                                        <p className="text-muted-foreground">{Account?.currentCompany}</p>
                                    </div>

                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Briefcase className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Company Description</h3>
                                        </div>
                                        <p className="text-muted-foreground whitespace-pre-wrap">
                                            {Account?.companyDescription || "No description available"}
                                        </p>
                                    </div>
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full" variant="outline">
                                            <Building2 className="w-4 h-4 mr-2" />
                                            Update Company Profile
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-bold">Update Company Profile</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <FileUpload />
                                            <Input 
                                                placeholder="Company Name" 
                                                className="bg-muted/30"
                                                defaultValue={Account?.currentCompany}
                                            />
                                            <Textarea 
                                                placeholder="Update your company description" 
                                                className="bg-muted/30 min-h-[150px]"
                                                defaultValue={Account?.companyDescription}
                                            />
                                            <Button className="w-full">Update Company Profile</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
