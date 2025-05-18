import { CompanieImg } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2Icon, Mail, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Company {
  _id: string;
  userId: {
    username: string;
    image: string;
    useremail: string;
  };
  name: string;
  currentCompany: string;
  currentRole: string;
  companyDescription: string;
  companyLogo: string;
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch("http://localhost:8000/companies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setCompanies(data.data);
        } else {
          throw new Error(data.message || "Failed to load companies");
        }
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setError(err.message || "Failed to load companies");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const handleViewJobs = (companyId: string) => {
    if (!companyId) {
      console.error("No company ID provided");
      return;
    }
    navigate(`/company/${companyId}/jobs`);
  };

  const filteredCompanies = companies.filter((company) =>
    company.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.userId.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-16 bg-background"
    >
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Featured Companies
          </h1>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Discover opportunities at leading technology companies that are
            shaping the future of innovation and digital transformation.
          </p>

          {/* Search Input */}
          <div className="flex justify-center mt-8">
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full max-w-sm px-4 py-2 rounded-lg border bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && !error && filteredCompanies.map((company) => (
            <Card
              key={company._id}
              className="group hover:shadow-lg transition-all"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle>{company.currentCompany}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Building2Icon className="h-3 w-3" />
                      {company.currentRole}
                    </CardDescription>
                  </div>
                  <div className="h-12 w-12 rounded-lg overflow-hidden border bg-background">
                    <img
                      src={
                        company.companyLogo ||
                        CompanieImg.find(
                          (img) =>
                            img.name.toLowerCase() ===
                            company.currentCompany.toLowerCase()
                        )?.img
                      }
                      alt={`${company.currentCompany} logo`}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {company.companyDescription || "No description available"}
                </p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UsersRound className="h-4 w-4" />
                    <span>Recruiter: {company.userId.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{company.userId.useremail}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => handleViewJobs(company._id)}
                >
                  View Jobs
                </Button>
              </CardContent>
            </Card>
          ))}

          {isLoading && (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">Loading companies...</p>
            </div>
          )}

          {!isLoading && !error && filteredCompanies.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {searchTerm ? "No companies found matching your search." : "No companies found."}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
