import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function Feed() {
  return (
    <div className="w-full h-screen pt-[75px] flex justify-center items-center">
      <div className="w-[91%] h-[90%] hide-scrollbar">
        <div className="w-full h-fit flex justify-between items-center">
          <p className="font-bold text-xl">Explore Feed</p>
          <Button>Add New Post</Button>
        </div>
        <Separator className="mt-2 bg-primary" />
        <div className="w-full h-[95%] overflow-y-scroll hide-scrollbar flex flex-col gap-5">
          <div className="w-full h-[200px] grid grid-cols-3">
            <div className="p-3">
              <img className="w-[70%] h-[80%] rounded-lg" src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="" />
            </div>
            <p className="col-span-2 p-3 line-clamp-10" >WorkExperts of your project, ensuring that all related data is organized and typed correctly.</p>
          </div>
          
          <div className="w-full h-[200px] grid grid-cols-3">
            <div className="p-3">
              <img className="w-[70%] h-[80%] rounded-lg" src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="" />
            </div>
            <p className="col-span-2 p-3 line-clamp-10" >WorkExperts of your project, ensuring that all related data is organized and typed correctly.</p>
          </div>

          <div className="w-full h-[200px] grid grid-cols-3">
            <div className="p-3">
              <img className="w-[70%] h-[80%] rounded-lg" src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="" />
            </div>
            <p className="col-span-2 p-3 line-clamp-10" >WorkExperts of your project, ensuring that all related data is organized and typed correctly.</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Feed