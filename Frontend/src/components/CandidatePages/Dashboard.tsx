import JobCard from "../JobCard";
import { Separator } from "../ui/separator";
import LoadingComponent from "../Loading";

interface Data {
    Loading: boolean,
    RecriterJobs: IrecruiterJobData[] | undefined
}

export default function CandidateDashboard({ Loading, RecriterJobs }: Data) {
    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="space-y-6">
                {/* Header Section */}                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold tracking-tight">Available Positions</h1>
                    </div>
                </div>                <Separator className="my-6" />

                {/* Jobs Grid */}
                <div className="min-h-[calc(100vh-240px)]">
                    {Loading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <LoadingComponent />
                        </div>
                    ) : RecriterJobs?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                            <JobCard RecriterJobs={RecriterJobs} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                            <p className="text-lg">No jobs available at the moment</p>
                            <p className="text-sm mt-2">Check back later for new opportunities</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
