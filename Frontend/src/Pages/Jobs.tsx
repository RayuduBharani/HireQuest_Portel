import CandidateDashboard from "@/components/CandidatePages/Dashboard";
import RecruiterDashboard from "@/components/RecruiterPages/Dashboard";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Jobs() {
  const [RecriterJobs, setRecruiterJobs] = useState<IrecruiterJobData[]>()
  const [Loading, setLoading] = useState(false)
  const cookie = Cookies.get("bharani") || null;
  let CookieData: IcookieData | null = null;
  if (cookie) {
    CookieData = JSON.parse(cookie);
  }
  useEffect(() => {
    async function FetchRecruiterJobs() {
      if (!CookieData)
        return;
      setLoading(true)

      try {
        const response = await fetch(CookieData.role === "recruiter" ? "http://localhost:8000/getjob"
          :
          "http://localhost:8000/getAllJobs",
          {
            headers: {
              "Authorization": `Bearer ${CookieData.token}`,
            },
          }
        );
        const data = await response.json();
        setRecruiterJobs(data.data || []);
      }
      catch (err) {
        console.error(err);
      }
      finally {
        setLoading(false)
      }
    }
    FetchRecruiterJobs();
  }, []);

  return (
    <>
      {
        CookieData?.role == "recruiter" ? (
          <RecruiterDashboard Loading={Loading} RecriterJobs={RecriterJobs} />
        ) : (
          <CandidateDashboard Loading={Loading} RecriterJobs={RecriterJobs} />
        )
      }
    </>
  )
}
