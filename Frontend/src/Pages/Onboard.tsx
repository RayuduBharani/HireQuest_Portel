import CandidateForm from "@/components/CandidateForm"
import RecruiterForm from "@/components/RecriterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Onboard() {
    const navigate = useNavigate()
    let isRole = false
    const cookie = Cookies.get('bharani')
    if (cookie) {
        const cookieData: IcookieData = JSON.parse(cookie)
        isRole = cookieData.role === null ? false : true
    }
    useEffect(() => {
        if (isRole) {
            toast({ title: 'You are already Onboarded.' })
            navigate('/home')
        }
    }, [])

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[60%] h-[90%] p-5 max-sm:h-full max-sm:w-[90%]">
                <Tabs defaultValue="candidate">
                    <div className="w-full h-fit flex justify-between max-sm:flex-col">
                        <p className="text-xl font-bold mt-1 max-sm:text-center max-sm:mb-5">Welcome To Onboarding</p>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recuiter</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="w-full h-[540px] mt-3 overflow-y-scroll hide-scrollbar">
                        <TabsContent value="candidate"><CandidateForm /></TabsContent>
                        <TabsContent value="recruiter"><RecruiterForm /></TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}
