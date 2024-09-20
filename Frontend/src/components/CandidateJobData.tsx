import { CalendarSearch, CircleAlert, IndianRupee, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "./ui/use-toast";

export default function CandidateJobData({ PostInfo }: { PostInfo: IrecruiterJobData | undefined }) {
  const cookie = Cookies.get("bharani");
  let CookieData: IcookieData | null = null;
  if (cookie) {
    CookieData = JSON.parse(cookie);
  }
  console.log(PostInfo)
  const [open, setOpen] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const NewNote = {
      Note: note
    };
    try {
      const response = await fetch(`http://localhost:8000/candidate/applyjob/${PostInfo?._id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CookieData?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewNote),
      })
      const data = await response.json();
      if (data.success) {
        setNote('')
        toast({
          title: data.message
        })
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-screen pt-[75px] flex justify-center items-center">
      <div className="w-[85%] h-[90%] grid grid-cols-3 p-2 grid-rows-3">
        <div className="w-full h-full col-span-2">
          <img className="w-[35%] mb-7 rounded-md" src={PostInfo?.recruiterId.companyLogo} alt="" />
          <p className="font-semibold text-2xl pt-4">{PostInfo?.JobTitle}</p>
          <p className="font-semibold text-neutral-600 pt-3">{PostInfo?.CompanyName}</p>
          <Separator className="mt-3" />
        </div>

        <div className="w-full h-full row-span-2 flex justify-center items-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="w-[70%] h-[75%] bg-secondary p-5 text-sm flex flex-col gap-3">
              <div className="flex gap-2 items-center font-semibold">
                <IndianRupee size={30} className="bg-background p-2 rounded-md" />{PostInfo?.SalaryRange || "N/A"}
              </div>

              <div className="flex gap-2 items-center font-semibold">
                <MapPin size={30} className="bg-background p-2 rounded-md" />{PostInfo?.JobType || "N/A"}
              </div>

              <li className="self-center">{PostInfo?.Location}</li>

              <div className="flex gap-2 items-center font-semibold">
                <CalendarSearch size={30} className="bg-background p-2 rounded-md" />{PostInfo?.ExperienceLevel}
              </div>

              <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Apply Now</Button>
              </DialogTrigger>

              <div className="flex gap-2 items-center font-semibold">
                <CircleAlert size={17} />
                <p className="text-xs text-neutral-500 text-center">Job Deadline {PostInfo?.ApplicationDeadline}</p>
              </div>
            </div>

            <DialogContent className="overflow-y-scroll scrollbar-none">
              <DialogHeader>
                <DialogTitle>Apply to <span className="text-primary">{PostInfo?.CompanyName}</span></DialogTitle>
              </DialogHeader>
              <DialogDescription></DialogDescription>
              <form onSubmit={handleSubmit}>
                <Textarea
                  name="Note"
                  placeholder="Cover Letter"
                  className="h-[450px]"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Button onClick={() => setOpen(false)} disabled={!note.trim()} className="w-full mt-5">Apply Now</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full h-full col-span-2 row-span-1 py-5">
          <p className="font-medium text-xl pt-2">Job Description</p>
          <p className="pt-3 text-neutral-500">{PostInfo?.JobDescription}</p>
          <ul className="w-full h-full flex gap-4 py-10 justify-center items-center">
            {PostInfo?.RequiredSkills?.map((skill, index: number) => (
              <li className="bg-muted p-2 rounded-md" key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
