import { CalendarSearch, CircleAlert, IndianRupee, MapPin } from "lucide-react"

import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
export default function RecruiterJobData({ PostInfo }: { PostInfo: IrecruiterJobData | undefined }) {
    return (
        <div className="w-full h-screen pt-[75px] flex justify-center items-center">
            <div className="w-[85%] h-[90%] grid grid-cols-3 p-2 grid-rows-3">
                <div className="w-full h-full col-span-2">
                    <img className="w-fit h-[80px] rounded-md" src={PostInfo?.recruiterId.companyLogo} alt="" />
                    <p className="font-semibold text-2xl pt-4">{PostInfo?.JobTitle}</p>
                    <p className="font-semibold text-neutral-600 pt-3">{PostInfo?.CompanyName}</p>
                    <Separator className="mt-3" />
                </div>
                <div className="w-full h-full row-span-2 flex justify-center items-center">
                    <div className="w-[70%] h-[75%] bg-secondary p-5 text-sm flex flex-col gap-3">
                        <div className="flex gap-2 items-center font-semibold">
                            <IndianRupee size={30} className="bg-background p-2 rounded-md" />{PostInfo?.SalaryRange || "N/A"}
                        </div>
                        <div className="flex gap-2 items-center font-semibold">
                            <MapPin size={30} className="bg-background p-2 rounded-md" />{PostInfo?.JobType || "N/A"}
                        </div>
                        <li className="self-center">{PostInfo?.Location}</li>
                        <div className="flex gap-2 items-center font-semibold">
                            <CalendarSearch size={30} className="bg-background p-2 rounded-md" />{PostInfo?.ExperienceLevel}
                        </div>

                        <Button asChild><Link to={`/jobs/Info/Applicants/${PostInfo?.UrlPath}`}>Applicants</Link></Button>

                        <div className="flex gap-2 items-center font-semibold"><CircleAlert size={17} />
                            <p className="text-xs text-neutral-500 text-center">Job Deadline {PostInfo?.ApplicationDeadline}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full col-span-2 row-span-1 py-5">
                    <p className="font-medium text-xl pt-2">Job Description</p>
                    <p className="pt-3 text-neutral-500">{PostInfo?.JobDescription}</p>
                    <ul className="w-full h-full flex gap-4 py-10 justify-center items-center">
                        {
                            PostInfo?.RequiredSkills.map((skill, index: number) => {
                                return (
                                    <li className="bg-muted p-2 rounded-md" key={index}>{skill}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
