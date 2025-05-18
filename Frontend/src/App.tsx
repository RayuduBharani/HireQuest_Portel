import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import NavBar from "./components/NavBar";
import Onboard from "./Pages/Onboard";
import Jobs from "./Pages/Jobs";
import Activity from "./Pages/Activity";
import Feed from "./Pages/Feed";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Companies from "./Pages/Companies";
import { useEffect } from "react";
import Cookies from "js-cookie";
import NotFound from "./Pages/NotFound";
import Postjob from "./components/Postjob";
import Jobinfo from "./components/RecruiterPages/Jobinfo";
import ApplicantsPage from "./components/RecruiterPages/ApplicantsPage.tsx";
import CompanyJobs from "./components/CandidatePages/Companies/companyJobs";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const showNav = location.pathname === "/onboard";  useEffect(() => {
    const cookie = Cookies.get('bharani');
    const publicPaths = ['/sign-in', '/sign-up'];
    
    if (cookie) {
      const cookieData = JSON.parse(cookie);
      if (cookieData.role == null) {
        navigate('/onboard');
      } 
      else if (cookieData.role != null) {
        // If user is logged in and tries to access auth pages, redirect to home
        if (publicPaths.includes(location.pathname)) {
          navigate('/home');
        }
      }
    } 
    else {
      // If user is not logged in and tries to access protected pages
      if (!publicPaths.includes(location.pathname)) {
        navigate('/sign-in');
      }
    }
  }, [navigate, location.pathname]);

  return (
    <div className="h-screen w-full relative bg-cover bg-center bg-no-repeat max-sm:h-svh scrollbar-thin scrollbar-none overflow-auto">
      <div className="absolute inset-0 bg-background bg-opacity-50">
        {showNav ? null : <NavBar />}
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/" element={<Home />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/post-job" element={<Postjob />} />
          <Route path="jobs/Info/:id" element={<Jobinfo />} />
          <Route path="/jobs/Info/Applicants/:recruiterId" element={<ApplicantsPage/>}/>
          
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Account" element={<Account />} />          <Route path="/companies" element={<Companies />} />
          <Route path="/company/:id/jobs" element={<CompanyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
