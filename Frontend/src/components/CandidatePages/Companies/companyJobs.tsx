import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  ArrowLeft
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';

interface ICompanyJobs {
  _id: string;
  Applications: Array<{
    candidateId: string;
    recruiterId: string;
    jobId: string;
    Note: string;
    Pending: boolean;
    Accept: boolean;
  }>;
  ApplicationDeadline: string;
  CompanyName: string;
  ExperienceLevel: string;
  JobDescription: string;
  JobTitle: string;
  JobType: string;
  Location: string;
  RequiredSkills: string[];
  SalaryRange: string;
  UrlPath: string;
  createdAt: string;
  updatedAt: string;
  UserId: {
    _id: string;
    username: string;
    useremail: string;
    image: string;
    role: string;
  };
  recruiterId: {
    _id: string;
    userId: string;
    name: string;
    currentCompany: string;
    currentRole: string;
    companyLogo: string;
    companyDescription: string;
  };
  __v: number;
}
/* Duplicate interface removed to resolve type conflict */

export default function CompanyJobs() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<ICompanyJobs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  useEffect(() => {
    if (!id) {
      setError("Invalid company ID");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`https://hirequest-portel-1.onrender.com/company/jobs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch company jobs");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setJobs(data.data || []);
          if (data.data && data.data.length > 0) {
            const company = data.data[0].recruiterId;
            setCompanyName(company.currentCompany || "Unknown Company");
            setCompanyLogo(company.companyLogo || "");
            setCompanyDesc(company.companyDescription || "No description available");
          } 
          
          else {
            // If no jobs found, we still want to show the company name
            setCompanyName("Unknown Company");
            setCompanyDesc("No description available");
          }
        } else {
          throw new Error(data.message || "Failed to load jobs");
        }
      })
      .catch((err) => {
        console.error("Error fetching company jobs:", err);
        setError(err.message || "Failed to load jobs");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.JobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || job.Location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    return matchesSearch && job.JobType.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-16 bg-background"
    >
      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/companies')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-6 flex-1">
            {companyLogo && (
              <div className="h-16 w-16 rounded-lg overflow-hidden border bg-background">
                <img
                  src={companyLogo}
                  alt={`${companyName} logo`}
                  className="h-full w-full object-contain p-2"
                />
              </div>
            )}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                {companyName || "Company Jobs"}
              </h1>
              <p className="text-muted-foreground">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
              </p>
            </div>
          </div>
        </div>

        {/* Company Description */}
        {companyDesc && (
          <Card>
            <CardHeader>
              <CardTitle>About {companyName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{companyDesc}</p>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-2 rounded-lg border bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border bg-background"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-destructive">
            <p>{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}
          {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job._id} className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">{job.JobTitle}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {job.recruiterId.currentCompany}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Metadata */}
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.Location}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {job.SalaryRange}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {job.JobType}
                    </Badge>                        
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {(() => {
                        try {
                          // Parse the date in DD/MM/YYYY format
                          const [day, month, year] = job.ApplicationDeadline.split("/");
                          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                          
                          // Check if the date is valid
                          if (isNaN(date.getTime())) {
                            return job.ApplicationDeadline;
                          }
                          
                          return formatDistanceToNow(date, { addSuffix: true });                          } catch {
                            return job.ApplicationDeadline;
                          }
                      })()}
                    </Badge>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.RequiredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {job.JobDescription}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <Button asChild>
                      <a href={`/jobs/Info/${job.UrlPath}`}>
                        View Details
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {searchTerm || filterType !== "all" 
                ? "No jobs found matching your search criteria."
                : "No jobs found for this company."}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}