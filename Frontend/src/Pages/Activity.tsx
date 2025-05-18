import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingComponent from "@/components/Loading";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { BriefcaseIcon, CalendarIcon, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Activity() {
  const [applications, setApplications] = useState<ICandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const cookie = Cookies.get("bharani");
        if (!cookie) {
          setError("Please login to view your applications");
          setLoading(false);
          return;
        }

        const cookieData = JSON.parse(cookie);
        const response = await fetch("http://localhost:8000/activity", {
          headers: {
            Authorization: `Bearer ${cookieData.token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setApplications(data);
        } else {
          setError(data.message || "Failed to fetch applications");
        }
      } catch (err) {
        setError("Error fetching your applications");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium text-muted-foreground">{error}</p>
          <Button asChild variant="outline">
            <Link to="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium text-muted-foreground">
            You haven't applied to any jobs yet
          </p>
          <Button asChild>
            <Link to="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (    <div className="container max-w-4xl mx-auto px-4 py-6 mt-16">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Application History</h2>
        <div className="grid gap-4">
          {applications.map((application) => (
            <div key={application._id} 
              className="p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={application.jobId.UserId?.image} />
                    <AvatarFallback>
                      {application.jobId.CompanyName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                      {application.jobId.JobTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {application.jobId.CompanyName}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                      <span className="text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {application.jobId.Location}
                      </span>
                      <span className="text-muted-foreground flex items-center">
                        <BriefcaseIcon className="h-3 w-3 mr-1" />
                        {application.jobId.JobType}
                      </span>
                      <span className="text-muted-foreground flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant={application.Accept ? "default" : "outline"}
                  className="shrink-0 h-8 text-xs"
                >
                  {application.Accept ? "Accepted" : application.Pending ? "Pending" : "Rejected"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
