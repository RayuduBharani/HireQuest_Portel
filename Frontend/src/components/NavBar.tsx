import { NavLink, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";

export default function NavBar() {
  const location = useLocation();
  const isPublicPage = location.pathname === '/sign-up' || location.pathname === '/sign-in';
  let isCandidate = false;
  const [Open, setOpen] = useState(false);

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  const cookie = Cookies.get('bharani')
  if (cookie) {
    const cookieData : IcookieData = JSON.parse(cookie)
    const  role = cookieData.role
    isCandidate = role === 'candidate'
  }


  return (
    <div className="w-full absolute h-[75px] flex justify-around max-sm:pr-0">
      <Sheet open={Open} onOpenChange={setOpen}>
        
        <div className="hidden max-sm:flex max-sm:items-center">
          <SheetTrigger><AlignLeft className="hidden max-sm:flex" /></SheetTrigger>
        </div>
        <div className="w-fit h-full flex justify-center items-center text-primary max-sm:w-[45%]">
          <p className="text-2xl font-bold">HireQuest</p>
        </div>

        <div className="w-[55%] h-full max-sm:hidden">
          <ul className="flex items-center w-[100%] font-medium text-md text-neutral-500 h-full">
            {
              isPublicPage ? (
                <div className="flex w-[50%] justify-around ml-16 font-normal text-sm">
                  <NavLink to={'/sign-in'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Login</li></NavLink>
                  <NavLink to={'/sign-up'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Register</li></NavLink>
                </div>
              ) : isCandidate ? (
                <div className="w-full text-sm font-normal flex justify-around">
                  <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Home</li></NavLink>
                  <NavLink to={'/jobs'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Jobs</li></NavLink>
                  <NavLink to={'/companies'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Companies</li></NavLink>
                  <NavLink to={'/feed'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Feed</li></NavLink>
                  <NavLink to={'/activity'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Activity</li></NavLink>
                  <NavLink to={'/account'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer ">Account</li></NavLink>
                </div>
              ) : (
                <div className="w-[95%] text-sm font-normal flex justify-around">
                  <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Home</li></NavLink>
                  <NavLink to={'/jobs'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Jobs</li></NavLink>
                  <NavLink to={'/feed'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Feed</li></NavLink>
                  <NavLink to={'/account'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer ">Account</li></NavLink>
                </div>
              )
            }
          </ul>
        </div>
        <div className="w-fit h-full flex justify-center items-center max-sm:w-[11%]">
          {
            isPublicPage ? <ModeToggle /> : (
              isCandidate ?
                <>
                  <div className="w-10 h-10 bg-foreground mr-5 rounded-full max-sm:w-[2.5rem] max-sm:h-[2.5rem] max-sm:ml-0 text-white">

                  </div>
                  <div className="max-sm:hidden">
                    <ModeToggle />
                  </div>
                </>
                :
                <>
                  <div className="w-10 h-10 bg-foreground mr-5 rounded-full max-sm:w-[2.5rem] max-sm:h-[2.5rem] max-sm:ml-0 text-white">

                  </div>
                  <div className="max-sm:hidden">
                    <ModeToggle />
                  </div>
                </>
            )
          }
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-primary font-bold pl-4 pt-5 text-center">Welcome To HireQuest</SheetTitle>
            <SheetDescription asChild>
              <div className="w-full h-full flex flex-col">
                <ul className="w-full font-medium text-md text-neutral-500 h-full flex justify-center">
                  {
                    isPublicPage ? (
                      <div className="w-[63%] flex flex-col justify-around gap-5 mt-10">
                        <NavLink to={'/sign-in'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Login</li></NavLink>
                        <NavLink to={'/sign-up'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Register</li></NavLink>
                      </div>
                    ) : isCandidate ? (
                      <div className="w-[63%] text-sm font-normal flex flex-col items-center gap-5 mt-5">
                        <NavLink to={"/home"} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Home</li></NavLink>
                        <NavLink to={'/jobs'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Jobs</li></NavLink>
                        <NavLink to={'companies'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Companies</li></NavLink>
                        <NavLink to={'/feed'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Feed</li></NavLink>
                        <NavLink to={'/activity'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Activity</li></NavLink>
                        <NavLink to={'/account'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer ">Account</li></NavLink>
                        <ModeToggle />
                      </div>
                    ) : (
                      <div className="w-[30%] text-sm font-normal flex flex-col gap-5 mt-5 items-center">
                        <NavLink to={"/home"} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Home</li></NavLink>
                        <NavLink to={'/jobs'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Jobs</li></NavLink>
                        <NavLink to={'/feed'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Feed</li></NavLink>
                        <NavLink to={'/account'} onClick={handleNavLinkClick} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer ">Account</li></NavLink>
                        <ModeToggle />
                      </div>
                    )
                  }
                </ul>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>

  );
}
