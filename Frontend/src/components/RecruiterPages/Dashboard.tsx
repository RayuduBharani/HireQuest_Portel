import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import LoadingComponent from "../Loading";
import JobCard from "../JobCard";

interface Data {
    Loading : boolean,
    RecriterJobs : IrecruiterJobData[] | undefined
}

export default function RecruiterDashboard({Loading , RecriterJobs} : Data) {
  return (
    <div className="w-full h-screen pt-[75px] flex justify-center items-center">
            <div className="w-[91%] h-[90%] hide-scrollbar">
              <div className="w-full h-fit flex justify-between items-center">
                <p className="font-bold text-xl">Job DashBoard</p>
                <Button><Link to='post-job'>Post Jobs</Link></Button>
              </div>
              <Separator className="mt-2 bg-primary" />
              {
                Loading ?
                  <div className="w-full h-[90%] flex justify-center items-center">
                    <LoadingComponent />
                  </div>
                  : RecriterJobs?.length ?
                    <div className="hide-scrollbar py-10 w-full h-[90%] grid gap-5 grid-cols-3 overflow-y-scroll max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
                      <JobCard RecriterJobs={RecriterJobs} />
                    </div>
                    :
                    <div className="hide-scrollbar w-full h-[90%] flex justify-center items-center">
                      <p className="">Your are not post any jobs</p>
                    </div>
              }
            </div>
          </div>
  )
}
