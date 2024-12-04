import BrainIcon from "../Icons/BrainIcon"
import { DocumentIcon, TweetIcon, VideoIcon } from "../Icons/TypeIcon"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  return (
    <div className="h-full w-80 bg-white flex flex-cols p-4 gap-y-2" >
        <div className="flex gap-x-1 items-center text-md text-gray-600">
            <BrainIcon colour="purple"/> 
            <h1>BRAINLY</h1>
        </div>

        <SidebarItems text="Tweets" Icon={<TweetIcon/>}/>
        <SidebarItems text="Videos" Icon={<VideoIcon/>}/>
        <SidebarItems text="Doucuments" Icon={<DocumentIcon/>}/>
    </div>
  )
}

export default Sidebar