import { NavLink, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavBar() {
  const location = useLocation();
  const isPublicPage = location.pathname === '/sign-up' || location.pathname === '/sign-in';
  let isCandidate = false;
  const [Open, setOpen] = useState(false);

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  const cookie = Cookies.get('bharani')
  let cookieData: IcookieData | null = null
  if (cookie) {
    cookieData = JSON.parse(cookie)
    const role = cookieData?.role
    isCandidate = role === 'candidate'
  }

  const [Account, setAccount] = useState<IAccountData>()

  useEffect(() => {
    fetch(cookieData?.role == "recruiter" ? 
      "http://localhost:8000/recruiter/Account" : 
      "http://localhost:8000/candidate/Account", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${cookieData?.token}`
      }
    })
      .then(response => response.json())
      .then((data) => {
        setAccount(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cookieData?.role, cookieData?.token])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            {/* Mobile Menu Trigger - Only visible on sm-md */}
            <Sheet open={Open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden -ml-2 mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <NavLink to="/home" className="text-xl font-bold text-primary">
                HireQuest
              </NavLink>

              {/* Sheet Content - Only for sm-md */}
              <SheetContent side="left" className="w-[280px] sm:w-[350px] md:hidden">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-lg font-bold text-primary">
                    HireQuest
                  </SheetTitle>
                </SheetHeader>

                <nav className="mt-8 flex flex-col space-y-1">
                  {isPublicPage ? (
                    <>
                      <NavLink
                        to="/sign-in"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/sign-up"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Register
                      </NavLink>
                    </>
                  ) : isCandidate ? (
                    <>
                      <NavLink
                        to="/home"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/jobs"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Jobs
                      </NavLink>
                      <NavLink
                        to="/companies"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Companies
                      </NavLink>
                      <NavLink
                        to="/feed"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Feed
                      </NavLink>
                      <NavLink
                        to="/activity"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Activity
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/home"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/jobs"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Jobs
                      </NavLink>
                      <NavLink
                        to="/feed"
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent"
                          )
                        }
                      >
                        Feed
                      </NavLink>
                    </>
                  )}
                  {!isPublicPage && (
                    <NavLink
                      to="/account"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        cn("px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-muted-foreground hover:bg-accent"
                        )
                      }
                    >
                      Account
                    </NavLink>
                  )}
                </nav>

                <div className="absolute bottom-4 left-4">
                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation - Hidden on sm-md */}
          <div className="hidden md:flex items-center space-x-6">
            {isPublicPage ? (
              <>
                <Button variant="ghost" asChild>
                  <NavLink to="/sign-in">Login</NavLink>
                </Button>
                <Button variant="ghost" asChild>
                  <NavLink to="/sign-up">Register</NavLink>
                </Button>
              </>
            ) : isCandidate ? (
              <>
                <Button variant="ghost" asChild>
                  <NavLink to="/home">Home</NavLink>
                </Button>
                <Button variant="ghost" asChild>
                  <NavLink to="/jobs">Jobs</NavLink>
                </Button>
                <Button variant="ghost" asChild>
                  <NavLink to="/companies">Companies</NavLink>
                </Button>
                <Button variant="ghost" asChild>
                  <NavLink to="/feed">Feed</NavLink>
                </Button>
                <Button variant="ghost" asChild>
                  <NavLink to="/activity">Activity</NavLink>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <NavLink to="/home">Home</NavLink>
                </Button>
                <Button variant="ghost" asChild>
                  <NavLink to="/jobs">Jobs</NavLink>
                </Button>
                <Button variant="ghost" asChild>
                  <NavLink to="/feed">Feed</NavLink>
                </Button>
              </>
            )}
          </div>

          {/* User Menu & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {!isPublicPage && (
              <NavLink to="/account">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={Account?.userId.image} alt="Profile" />
                  <AvatarFallback>
                    {Account?.userId?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </NavLink>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
