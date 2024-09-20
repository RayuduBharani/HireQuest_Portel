import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "@/lib/firebase";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";

export default function RecruiterForm() {
  const navigate = useNavigate();
  const [progress , setProgress] = useState<number>()

  async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cookie = Cookies.get("bharani");
    const cookieData: IcookieData = cookie ? JSON.parse(cookie) : null;

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const currentCompany = formData.get("companyName") as string;
    const currentRole = formData.get("companyRole") as string;
    const companyLogo = formData.get("companyLogo") as File;
    const companyDescription = formData.get("companyDescription") as string
    if (companyLogo) {
      const storage = getStorage(app);
      const storageRef = ref(storage, `logos/${Date.now()}_${companyLogo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, companyLogo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(prog);
        },
        (error) => {
          console.error("Upload failed", error);
        },
        async () => {
          const logoURL = await getDownloadURL(uploadTask.snapshot.ref);

          const NewRecData = {
            name,
            currentCompany,
            currentRole,
            companyLogo: logoURL,
            companyDescription
          };

          const response = await fetch("http://localhost:8000/onboard-recruiter", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${cookieData?.token}`,
            },
            body: JSON.stringify(NewRecData),
          });

          const data = await response.json();
          if (data) {
            const RecruiterCookie = Cookies.get("bharani") || "";
            const RecruiterCookieData: IcookieData = JSON.parse(RecruiterCookie);
            RecruiterCookieData.role = "recruiter";
            Cookies.set("bharani", JSON.stringify(RecruiterCookieData) , {expires:365});
            navigate("/home");
          }
        }
      );
    }
  }

  return (
    <form
      onSubmit={HandleSubmit}
      className="flex flex-col gap-5 border-t-2 pt-4 border-primary p-1">
      <div>
        <Label htmlFor="name" className="ml-1">
          Your Name
        </Label>
        <Input id="name" name="name" />
      </div>

      <div>
        <Label htmlFor="companyName" className="ml-1">
          Current Company
        </Label>
        <Input id="companyName" name="companyName" />
      </div>

      <div>
        <Label htmlFor="companyRole" className="ml-1">
          Current Role
        </Label>
        <Textarea id="companyRole" name="companyRole" />
      </div>

      <div>
        <Label htmlFor="companyDescription" className="ml-1">
          Company Description
        </Label>
        <Input id="companyDescription" name="companyDescription" />
      </div>

      <div>
        <Label htmlFor="Logo" className="ml-1">
          Company Logo
        </Label>
        <Input type="file" accept=".jpg,.png,.jpeg" id="Logo" name="companyLogo" />
      </div>
      <Progress value={progress}/>

      <Button type="submit">
        Onboard as a Recruiter
      </Button>
    </form>
  );
}
