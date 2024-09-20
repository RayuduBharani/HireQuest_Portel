import CandidateAccountPage from "@/components/CandidatePages/AccountPage"
import RecruiterAccountPage from "@/components/RecruiterPages/AccountPage"
import Cookies from "js-cookie"

export default function Account() {
  const cookie = Cookies.get("bharani")
  let CookieData: IcookieData | null = null
  if (cookie) {
    CookieData = JSON.parse(cookie)
  }
  return (
    <>
      {
        CookieData?.role == "recruiter" ?
          <RecruiterAccountPage /> :
          <CandidateAccountPage />
      }
    </>
  )
}
