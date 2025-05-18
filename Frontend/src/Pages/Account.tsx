import CandidateAccountPage from "@/components/CandidatePages/AccountPage"
import RecruiterAccountPage from "@/components/RecruiterPages/AccountPage"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function Account() {
  const cookie = Cookies.get("bharani")
  const navigate = useNavigate()
  let CookieData: IcookieData | null = null
  if (cookie) {
    CookieData = JSON.parse(cookie)
  }

  const handleLogout = () => {
    Cookies.remove("bharani")
    navigate("/sign-in")
  }

  return (
    <div className="relative mt-[5rem] flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-[#eaeaea]">
      <Button
        variant="destructive"
        onClick={handleLogout}
        className="absolute right-4 top-4 flex items-center gap-2"
      >
        <LogOut/>
        Logout
      </Button>
      {
        CookieData?.role == "recruiter" ?
          <RecruiterAccountPage /> :
          <CandidateAccountPage />
      }
    </div>
  )
}
