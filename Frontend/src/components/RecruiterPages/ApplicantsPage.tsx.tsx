import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ArrowLeftSquare } from "lucide-react";
import LoadingComponent from "../Loading";
import ViewApplication from "../ViewApplication";
export default function ApplicantsPage() {
    const JobId = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [ApplicantsData, setApplicantsData] = useState<ICandidateApplication[]>()
    const url = import.meta.env.VITE_API_URL
    useEffect(() => {
        setLoading(true)
        fetch(`${url}/recruiter/applicant/${JobId.recruiterId}`)
            .then(response => response.json())
            .then((data) => {
                setApplicantsData(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return (
        <div className="w-full h-screen pt-[75px] flex justify-center items-center font-poppins">
            <div className="w-[80%] h-[90%] flex flex-col gap-3 overflow-y-scroll scrollbar-none max-sm:w-[90%] max-sm:h-[95%]">
                {
                    ApplicantsData &&
                        ApplicantsData?.length > 0 ? (
                        <ArrowLeftSquare className="cursor-pointer" onClick={() => {
                            navigate(-1)
                        }} />
                    ) : null
                }
                {
                    loading ? (<div className="w-full h-full flex justify-center items-center">
                        <LoadingComponent />
                    </div>
                    ) : (
                        ApplicantsData &&
                            ApplicantsData?.length > 0 ? (
                            ApplicantsData?.map((applicant, index: number) => {
                                return (
                                    <div key={index} className="bg-muted w-full h-20 p-3 rounded-lg flex justify-between items-center max-sm:h-fit max-sm:flex-col max-sm:gap-5">
                                        <div className="flex items-center gap-x-5">
                                            <Avatar>
                                                <AvatarImage src={applicant.candidateId.ProfileImage} />
                                                <AvatarFallback className="bg-neutral-500">{applicant.candidateId.fullName.split('')[0]}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold">{applicant.candidateId.fullName}</p>
                                        </div>
                                        <p className="text-sm text-neutral-400 font-bold">{new Date(applicant.createdAt).toLocaleDateString()}</p>
                                        <div className="gap-5 flex">
                                            <Button asChild><Link to={applicant.candidateId.resume}>Resume</Link></Button>
                                            <ViewApplication applicants={applicant}/>
                                        </div>
                                    </div>
                                )
                            })
                        ) : <div className="flex justify-center items-center w-full h-full flex-col gap-3">
                            <p className="font-semibold animate-pulse">Not found Any Apllications</p>
                            <Button variant="ghost" onClick={() => {
                                navigate(-1)
                            }}>Back</Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
