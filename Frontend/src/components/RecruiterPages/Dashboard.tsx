import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import LoadingComponent from "../Loading";
import JobCard from "../JobCard";

interface Data {
    Loading: boolean,
    RecriterJobs: IrecruiterJobData[] | undefined
}

export default function RecruiterDashboard({ Loading, RecriterJobs }: Data) {
    return (
        <div className="container mx-auto px-4 py-6 mt-16">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold tracking-tight">Your Job Listings</h1>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                            <Button size="sm" asChild>
                                <Link to="post-job">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Post Job
                                </Link>
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input 
                            type="search" 
                            placeholder="Search your listings..." 
                            className="max-w-xs"
                        />
                        <Button type="submit" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Jobs Grid */}
                <ScrollArea className="h-[calc(100vh-240px)]">
                    {Loading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <LoadingComponent />
                        </div>
                    ) : RecriterJobs?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                            <JobCard RecriterJobs={RecriterJobs} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                            <p className="text-sm">You haven't posted any jobs yet</p>
                            <p className="text-xs mt-1">Click "Post Job" to create your first listing</p>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}
