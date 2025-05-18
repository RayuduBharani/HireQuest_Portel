import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ArrowLeftSquare, CheckCircle2, Clock } from "lucide-react";
import LoadingComponent from "../Loading";
import ViewApplication from "../ViewApplication";
import { Badge } from "../ui/badge";

export default function ApplicantsPage() {
    const { recruiterId } = useParams();
    console.log(recruiterId)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [ApplicantsData, setApplicantsData] = useState<ICandidateApplication[]>([]);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!recruiterId) return;

        setLoading(true);
        fetch(`https://hirequest-portel-1.onrender.com/recruiter/applicant/${recruiterId}`)
            .then(response => response.json())
            .then((data) => {
                setApplicantsData(data);
                console.log("data : ", data);
            })
            .catch(err => {
                console.error('Error fetching applicants:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [recruiterId, url]);

    return (
        <div className="w-full h-screen pt-[75px] flex justify-center items-center font-poppins">
            <div className="w-[80%] h-[90%] flex flex-col gap-3 overflow-y-scroll scrollbar-none max-sm:w-[90%] max-sm:h-[95%]">
                {ApplicantsData.length > 0 && (
                    <div className="flex items-center justify-between">
                        <ArrowLeftSquare className="cursor-pointer" onClick={() => navigate(-1)} />
                        <div className="flex gap-2 items-center">
                            <div className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-sm">Accepted</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">Pending</span>
                            </div>
                        </div>
                    </div>
                )}
                {loading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <LoadingComponent />
                    </div>
                ) : (
                    ApplicantsData.length > 0 ? (
                        ApplicantsData.map((applicant, index: number) => (
                            <div key={index} className="bg-muted w-full h-20 p-3 rounded-lg flex justify-between items-center max-sm:h-fit max-sm:flex-col max-sm:gap-5">
                                <div className="flex items-center gap-x-5">
                                    <Avatar>
                                        <AvatarImage src={applicant.candidateId.ProfileImage} alt={applicant.candidateId.fullName} />
                                        <AvatarFallback>{applicant.candidateId.fullName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">{applicant.candidateId.fullName}</p>
                                            {applicant.Accept ? (
                                                <Badge variant="outline" className="bg-green-500/10 text-green-500">Accepted</Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-orange-500/10 text-orange-500">Pending</Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{applicant.candidateId.emailAddress}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <p className="text-sm text-neutral-400">{new Date(applicant.createdAt).toLocaleDateString()}</p>
                                    <div className="flex gap-3">
                                        <Button asChild variant="outline">
                                            <Link to={applicant.candidateId.resume}>Resume</Link>
                                        </Button>
                                        <ViewApplication applicants={applicant} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center w-full h-full flex-col gap-3">
                            <p className="font-semibold animate-pulse">No Applications Found</p>
                            <Button variant="ghost" onClick={() => navigate(-1)}>Back</Button>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
