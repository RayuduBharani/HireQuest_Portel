import OAuth from "@/components/OAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';



export default function SignIn() {

  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const email = formData.get('useremail')
    const password = formData.get('userpassword')

    const NewLoginData = {
      useremail: email,
      userpassword: password
    }

    const response = await fetch('http://localhost:8000/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(NewLoginData)
    })
    const data: ILoginData = await response.json()
    if (data.success) {
      Cookies.set("bharani", JSON.stringify(data) , {expires : 365})
      navigate("/onboard")
    }
  }

  return (
    <div className="box w-svw h-fit flex my-auto pt-[75px]">
      <form onSubmit={handleSubmit} className="w-[30%] h-[500px] mx-auto my-auto shadow-2xl border-2 border-neutral-300 rounded-lg mt-6 p-5 flex flex-col max-lg:w-[40%] max-md:w-[60%] max-sm:w-[90%]">
        <p className="text-sm mt-4">Welcome !</p>
        <OAuth />
        <p className="text-center mt-5">or</p>
        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="name">Email</Label>
          <Input id="name" type="email" name="useremail" />
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="Password">Password</Label>
          <Input id="Password" type="password" name="userpassword" />
        </div>

        <Button className="mt-7">Login</Button>
        <p className="text-sm mt-5">Dont have an accout ? <Link to={'/sign-up'} className="text-primary font-medium">SignUp</Link></p>
      </form>
    </div>
  )
}
