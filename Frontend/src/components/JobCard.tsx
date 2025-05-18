import { MapPin, BriefcaseIcon, Building2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface IJobCardProps {
    RecriterJobs: IrecruiterJobData[]
}

export default function JobCard({ RecriterJobs }: IJobCardProps) {
    const cookies = Cookies.get("bharani")
    let CookieData: IcookieData | null = null
    if (cookies) {
        CookieData = JSON.parse(cookies)
    }

    return (
        <>
            {RecriterJobs?.map((job, index) => (
                <Card key={index} className="group hover:shadow-md transition-all">
                    <CardHeader className="space-y-2">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <CardTitle className="line-clamp-1">{job.JobTitle}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    <Building2Icon className="h-3 w-3" />
                                    {job.recruiterId.currentCompany}
                                </CardDescription>
                            </div>
                            <div className="h-12 w-12 rounded-lg overflow-hidden border bg-background">
                                <img
                                    src={job.recruiterId.companyLogo}
                                    alt={job.recruiterId.currentCompany}
                                    className="h-full w-full object-contain p-1"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.Location}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <BriefcaseIcon className="h-3 w-3" />
                                {job.JobType || 'Full-time'}
                            </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {job.JobDescription}
                        </p>

                        <div className={cn(
                            "flex gap-2",
                            CookieData?.role === "candidate" ? "justify-end" : "justify-between"
                        )}>
                            {CookieData?.role === "recruiter" && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link to={`/jobs/Info/Applicants/${job.UrlPath}`}>
                                        View Applicants
                                    </Link>
                                </Button>
                            )}
                            <Button size="sm" asChild>
                                <Link to={`/jobs/Info/${job.UrlPath}`}>
                                    View Details
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
