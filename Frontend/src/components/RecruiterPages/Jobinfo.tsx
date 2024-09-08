import Cookies from "js-cookie"
import RecruiterJobData from "../RecruiterJobData"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CandidateJobData from "../CandidateJobData"

export default function Jobinfo() {
    const cookies = Cookies.get("bharani")
    let CookieData: IcookieData | null = null
    if (cookies) {
        CookieData = JSON.parse(cookies)
    }
    const JobId = useParams()
    const [PostInfo, setPosstInfo] = useState<IrecruiterJobData>()
    useEffect(() => {
        fetch(`http://localhost:8000/recruiter/postinfo/${JobId.id}`)
            .then(response => response.json())
            .then((data) => {
                setPosstInfo(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            {
                CookieData?.role == "recruiter" ? (
                    <RecruiterJobData PostInfo={PostInfo} />
                ) : (
                    <CandidateJobData PostInfo={PostInfo} />
                )
            }
        </>
    )
}
