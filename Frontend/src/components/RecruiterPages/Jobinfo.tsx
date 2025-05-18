import Cookies from "js-cookie"
import RecruiterJobData from "../RecruiterJobData"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CandidateJobData from "../CandidateJobData"
import LoadingComponent from "../Loading"

export default function Jobinfo() {
    const cookies = Cookies.get("bharani")
    let CookieData: IcookieData | null = null
    if (cookies) {
        CookieData = JSON.parse(cookies)
    }
    
    const { id } = useParams()
    const [postInfo, setPostInfo] = useState<IrecruiterJobData>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()

    useEffect(() => {
        async function fetchJobInfo() {
            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:8000/recruiter/postinfo/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${CookieData?.token}`
                    }
                })
                
                if (!response.ok) {
                    throw new Error('Failed to fetch job information')
                }
                
                const data = await response.json()
                setPostInfo(data)
            } catch (err) {
                console.error(err)
                setError(err instanceof Error ? err.message : 'Failed to load job details')
            } finally {
                setIsLoading(false)
            }
        }

        if (id) {
            fetchJobInfo()
        }
    }, [id, CookieData?.token])

    if (isLoading) {
        return (
            <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
                <LoadingComponent />
            </div>
        )
    }

    if (error || !postInfo) {
        return (
            <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="text-center space-y-2">
                    <p className="text-lg font-medium text-muted-foreground">
                        {error || 'Job not found'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please try again later or contact support if the problem persists.
                    </p>
                </div>
            </div>
        )
    }

    return CookieData?.role === "recruiter" ? (
        <RecruiterJobData PostInfo={postInfo} />
    ) : (
        <CandidateJobData PostInfo={postInfo} />
    )
}
