import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { CompanieImg } from "@/lib/utils";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";


export default function Home() {

  const words = ["find your perfect fit ", "discover your match.", "secure your ideal role"]

  const cookie = Cookies.get("bharani")
  let CookieData: IcookieData | null = null
  if (cookie) {
    CookieData = JSON.parse(cookie)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="pt-[75px] flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center pt-14 w-[80%] leading-relaxed max-sm:text-2xl">
        Join a community where talent meets opportunity. <br />
        Empower your journey with HireQuest. <br />
        <FlipWords words={words} />
      </h1>
      <p className="text-center mt-6 text-neutral-500 text-lg font-semibold">One Stop Solution to Find Jobs</p>
      <div className="mt-10 w-[100%] h-fit flex gap-9 justify-center">
        <Button asChild>{CookieData?.role == "candidate" ? <Link to="/jobs">Browse Jobs</Link> : <Link to="/jobs">Jobs Dashboard</Link>}</Button>
        <Button>{CookieData?.role == "candidate" ? <Link to="/activity">Your Activity</Link> : <Link to="/jobs/post-job">Post a Job</Link>}</Button>
      </div>

      <div className="w-[70%] h-[30%] mt-10">
        <InfiniteMovingCards items={CompanieImg} speed={'slow'} />
      </div>

    </motion.div>
  )
}
