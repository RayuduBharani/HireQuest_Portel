import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
export default function JobCard({ RecriterJobs }: IJobCardProps) {
    console.log(RecriterJobs)
    const cookies = Cookies.get("bharani")
    let CookieData: IcookieData | null = null
    if (cookies) {
        CookieData = JSON.parse(cookies)
    }
    return (
        <>
            {
                RecriterJobs &&
                RecriterJobs.map((jobs, index: number) => {
                    return (
                        <div key={index} className="border-2 font-poppins h-[17rem] rounded-lg px-6 py-4">
                            <p className="font-bold text-xl truncate">{jobs.JobTitle}</p>
                            <div className="w-full h-[60px] mt-3 grid grid-cols-3 items-center">
                                <img className="w-[50%] h-[90%] col-span-2" src={jobs.recruiterId.companyLogo} alt={jobs.JobTitle} />
                                <p className="flex gap-1 justify-center items-center "><MapPin size={17} />{jobs.Location}</p>
                            </div>
                            <Separator className="bg-blue-500" />
                            <p className="mt-3 line-clamp-3 h-[64px] text-sm font-regular text-neutral-500">
                                {jobs.JobDescription}
                            </p>
                            <div className="grid grid-cols-2 justify-between items-center mt-5 gap-2">
                                {
                                    CookieData?.role == "recruiter" ? (
                                        <>
                                            <Button asChild><Link to={`/jobs/Info/Applicants/${jobs.UrlPath}`}>Applicants</Link></Button>
                                            <Button className="w-full" asChild><Link to={`/jobs/Info/${jobs.UrlPath}`}>Show Detailes</Link></Button>
                                        </>
                                    ) : null
                                }
                                {
                                    CookieData?.role == "candidate" ? (
                                        <Button className="w-full col-span-2" asChild><Link to={`/jobs/Info/${jobs.UrlPath}`}>Show Detailes</Link></Button>
                                    ) : null
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
