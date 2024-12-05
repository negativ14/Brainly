import AllIcon from "../Icons/AllIcon"
import BrainIcon from "../Icons/BrainIcon"
import { DocumentIcon, TweetIcon, VideoIcon } from "../Icons/TypeIcon"
import SidebarItems from "./SidebarItems"

const Sidebar = ({dashboardContent, setDashboardContent}: {dashboardContent: string; setDashboardContent: (dashboardContent : string) => void}) => {
  return (
    <div className="h-screen w-80 bg-white flex flex-col  gap-y-4 fixed top-0 left-0 p-8" >
        <div className="flex gap-x-3 items-center text-3xl text-gray-700 mb-3 shadow-md">
            <BrainIcon colour="purple"/> 
            <h1>BRAINLY</h1>
        </div>

        <div onClick={() => setDashboardContent('All')}> {dashboardContent === 'All' ? <SidebarItems text="All" active={true} Icon={<AllIcon/>}/> : <SidebarItems text="All" active={false} Icon={<AllIcon/>}/> } </div>
        <div onClick={() => setDashboardContent('Tweets')}>{dashboardContent === 'Tweets' ? <SidebarItems text="Tweets" active={true} Icon={<TweetIcon/>}/> : <SidebarItems text="Tweets" active={false} Icon={<TweetIcon/>}/>} </div>
        <div onClick={() => setDashboardContent('Videos')}>{dashboardContent === 'Videos' ? <SidebarItems text="Videos" active={true} Icon={<VideoIcon/>}/> : <SidebarItems text="Videos" active={false} Icon={<VideoIcon/>}/>} </div>
        <div onClick={() => setDashboardContent('Documents')}>{dashboardContent === 'Documents' ? <SidebarItems text="Documents" active={true} Icon={<DocumentIcon/>}/> : <SidebarItems text="Documents" active={false} Icon={<DocumentIcon/>}/>}</div>
    </div>
  )
}

export default Sidebar