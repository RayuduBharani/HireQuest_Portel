import OAuth from "@/components/OAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate()

  async function HandleForm(event : FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('username')
    const email = formData.get('useremail')
    const password = formData.get('userpassword')
    const NewFormData = {
      username : name ,
      useremail : email ,
      userpassword : password
    }
    
    const response = await fetch("http://localhost:8000/signup", {
      method : "POST" ,
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(NewFormData)
    })
    const data = await response.json()
    if(data.success){
      toast({
        title: "Registration Successful!",
        description: "You have been registered successfully. Please login to continue.",
        duration: 5000
      });
      navigate('/sign-in')
    }
  }

  return (
    <div className="w-svw h-full flex pt-[75px]">
      <form onSubmit={HandleForm} className="w-[30%] h-[555px] mx-auto my-auto shadow-2xl border-2 border-neutral-300 rounded-lg mt-5 p-5 flex flex-col max-sm:w-[90%]">
        <p className="text-sm mt-2">Welcome !</p>
        <OAuth />
        <p className="text-center mt-5">or</p>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" name="username" />
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="useremail" />
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="password">Password</Label>
          <Input id='password' type="password" name="userpassword" />
        </div>

        <Button className="mt-7">Register</Button>
        <p className="text-sm mt-5">Already have an Account ? <Link to={'/sign-in'} className="text-primary font-medium">SignIn</Link></p>
      </form>
    </div>
  )
}
