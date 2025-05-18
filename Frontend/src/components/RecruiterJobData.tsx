import { BriefcaseIcon, Building2Icon, CalendarIcon, Clock, DollarSign, MapPin, Users } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';

export default function RecruiterJobData({ PostInfo }: { PostInfo: IrecruiterJobData | undefined }) {
    if (!PostInfo) return null;

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
                                    <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {PostInfo.RequiredSkills.map((skill, index) => (
                                            <Badge key={index} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {PostInfo.Requirements && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                            {PostInfo.Requirements.map((req: string, index: number) => (
                                                <li key={index}>{req}</li>
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
                    {/* Job Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Status</CardTitle>
                            <CardDescription>
                                Track applications and manage your listing
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{PostInfo.ApplicationsReceived || 0} applications received</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>Deadline: {new Date(PostInfo.ApplicationDeadline).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <Button className="w-full" asChild>
                                <Link to={`/jobs/Info/Applicants/${PostInfo.UrlPath}`}>
                                    View Applications
                                </Link>
                            </Button>
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
