import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { CompanieImg } from "@/lib/utils";

export default function Home() {
  const words = ["your perfect fit", "your dream job", "your next opportunity"];
  const cookie = Cookies.get("bharani");
  let CookieData: IcookieData | null = null;
  if (cookie) {
    CookieData = JSON.parse(cookie);
  }

  const stats = [
    { number: "10K+", label: "Active Jobs" },
    { number: "50K+", label: "Successful Hires" },
    { number: "2M+", label: "Job Seekers" },
    { number: "98%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-20 pb-16 text-center relative"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative space-y-8 max-w-3xl mx-auto"
          >
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Find Your Next Career Move
              </h1>
              
              <div className="text-2xl text-muted-foreground font-medium">
                <FlipWords words={words} />
              </div>

              <p className="text-muted-foreground/80 max-w-xl mx-auto">
                Join thousands of professionals who trust HireQuest to advance
                their careers
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="min-w-[200px] shadow-lg hover:shadow-primary/20 transition-all bg-gradient-to-r from-primary to-primary/80"
                asChild
              >
                {CookieData?.role === "candidate" ? (
                  <Link to="/jobs">Browse Jobs</Link>
                ) : (
                  <Link to="/jobs">Jobs Dashboard</Link>
                )}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="min-w-[200px] shadow-lg hover:shadow-secondary/20 transition-all border-2"
                asChild
              >
                {CookieData?.role === "candidate" ? (
                  <Link to="/activity">Your Activity</Link>
                ) : (
                  <Link to="/jobs/post-job">Post a Job</Link>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center space-y-2"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Companies Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="py-12"
        >
          <h2 className="text-center text-xl font-medium text-muted-foreground mb-8">
            Trusted by leading companies worldwide
          </h2>
          <div className="relative">
            <InfiniteMovingCards
              items={CompanieImg}
              direction="right"
              speed="slow"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
