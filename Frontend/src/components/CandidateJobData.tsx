import { useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { BriefcaseIcon, Building2Icon, CalendarIcon, CheckCircle, Clock, DollarSign, MapPin, Users } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useToast } from "./ui/use-toast";
import Cookies from "js-cookie";

interface Props {
    PostInfo: IrecruiterJobData | undefined;
}

export default function CandidateJobData({ PostInfo }: Props) {
    const [isApplying, setIsApplying] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [note, setNote] = useState("");
    const { toast } = useToast();

    if (!PostInfo) return null;
    
    const handleApply = async () => {
        try {
            setIsApplying(true);
            
            const cookies = Cookies.get("bharani");
            if (!cookies) {
                toast({
                    title: "Error",
                    description: "Please login to apply",
                    variant: "destructive",
                });
                return;
            }
            
            const cookieData = JSON.parse(cookies);
            
            const response = await fetch(`https://hirequest-portel-1.onrender.com/candidate/applyjob/${PostInfo._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookieData.token}`
                },
                body: JSON.stringify({
                    Note: note
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to apply");
            }

            toast({
                title: "Application Submitted",
                description: "Your application has been successfully submitted!",
            });
            setDialogOpen(false);
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to submit application",
                variant: "destructive",
            });
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Job Details */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-bold">
                                    {PostInfo.JobTitle}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 text-base">
                                    <Building2Icon className="h-4 w-4" />
                                    {PostInfo.recruiterId.currentCompany}
                                </CardDescription>
                            </div>
                            <div className="h-16 w-16 rounded-lg overflow-hidden border bg-background">
                                <img
                                    src={PostInfo.recruiterId.companyLogo}
                                    alt="Company Logo"
                                    className="h-full w-full object-contain p-2"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Job Metadata */}
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {PostInfo.Location}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <BriefcaseIcon className="h-3 w-3" />
                                {PostInfo.JobType || 'Full-time'}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {PostInfo.SalaryRange || 'Competitive'}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Posted {formatDistanceToNow(new Date(PostInfo.createdAt), { addSuffix: true })}
                            </Badge>
                        </div>

                        <Separator />

                        {/* Job Description */}
                        <ScrollArea className="h-[calc(100vh-400px)]">
                            <div className="space-y-6 pr-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">About the Role</h3>
                                    <p className="text-muted-foreground whitespace-pre-line">
                                        {PostInfo.JobDescription}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        {PostInfo.Requirements?.map((req: string, index: number) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                {PostInfo.Responsibilities && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                            {PostInfo.Responsibilities.map((resp: string, index: number) => (
                                                <li key={index}>{resp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Side Panel */}
                <div className="space-y-4">
                    {/* Quick Apply Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Apply</CardTitle>
                            <CardDescription>
                                Submit your application now
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{PostInfo.ApplicationsReceived || 0} applications</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>Apply by {new Date(PostInfo.LastDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full" disabled={isApplying}>
                                        {isApplying ? (
                                            "Applying..."
                                        ) : (
                                            <>
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Apply Now
                                            </>
                                        )}
                                    </Button>
                                </DialogTrigger>                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Apply for {PostInfo.JobTitle}</DialogTitle>
                                        <DialogDescription>
                                            Add a note to your application (optional)
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <textarea
                                            className="w-full min-h-[100px] p-3 rounded-md border bg-background"
                                            placeholder="Tell the recruiter why you're a great fit for this role..."
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                        <div className="flex justify-end space-x-2">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setDialogOpen(false);
                                                    setNote("");
                                                }}
                                                disabled={isApplying}
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleApply} 
                                                disabled={isApplying}
                                            >
                                                {isApplying ? "Applying..." : "Confirm Application"}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    {/* Company Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About the Company</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-lg overflow-hidden border bg-background">
                                    <img
                                        src={PostInfo.recruiterId.companyLogo}
                                        alt="Company Logo"
                                        className="h-full w-full object-contain p-2"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium">{PostInfo.recruiterId.currentCompany}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {PostInfo.recruiterId.currentRole}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
