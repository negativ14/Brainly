import { useState } from "react";
import PlusIcon from "../Icons/PlusIcon";
import ShareIcon from "../Icons/ShareIcon";
import AddContentModel from "./AddContentModel";
import Button from "./Button";
import Cards from "./Cards";
import Sidebar from "./Sidebar";
import { useContent } from "../hooks/useContent";
import NoData from "./NoData";
import { ObjectId } from "mongoose";
import ErrorPage from "./ErrorPage";
import ShareCardModel from "./ShareCardModel";
import ShareModel from "./ShareModel";
import axios from "axios";
import { BACKEND_URL } from "../config";
import ResponsePage from "./ResponsePage";

const Dashboard = () => {
    const [modal, setModel] = useState(false);
    const [dashboardContent, setDashboardContent] = useState("All");
    const { apiContent, error, loading, refresh } = useContent();
    const [shareCard, setShareCard] = useState<string | null>(null);
    const [share, setShare] = useState<string | null>(null);
    const [shareResponse, setShareResponse] = useState<string | null>(null);
    const[isShareable, setIsShareable] = useState<boolean>(false);

    const filteredContent = dashboardContent === "All"
        ? apiContent
        : apiContent.filter((item: Item) => item.type === dashboardContent);

    interface Item {
        type: "Tweets" | "Videos" | "Documents";
        key: number;
        date: string;
        title: string;
        link: string;
        tags: string[];
        _id: ObjectId;
    }

    const shareHandler = async () => {
        const jwt = localStorage.getItem("Authorization");
        try {
            if(isShareable){
                await axios.post(BACKEND_URL + "/api/v1/brain/share", {
                    share: false
                },{
                    headers: {
                        Authorization: jwt
                    }
                })
                setIsShareable(false);
                setShareResponse("Share Disabled")
            }else{

                const response = await axios.post(BACKEND_URL + "/api/v1/brain/share",{
                    share: true
                },{
                    headers: {
                        Authorization : jwt
                    }
                })
                setIsShareable(true);
                setShare(response.data.hash)
            }

            setTimeout(() => {
                setShareResponse(null);
            }, 2000);
        } catch (error) {
            setShareResponse("Error in DB connection");
            setTimeout(() => {
                setShareResponse(null);
            }, 2000);
        }
    }

    return (
        <div className="flex">

            {error ? (
                <ErrorPage error={error} />
            ) : (

                <>
                    <AddContentModel open={modal} onClose={() => setModel(false)} refresh={refresh} />
                    {!modal && <Sidebar dashboardContent={dashboardContent} setDashboardContent={setDashboardContent} />}
                    {shareCard && <ShareCardModel shareCard={shareCard} setShareCard={setShareCard} />}
                    {share && <ShareModel share={share} setShare={setShare} />}
                    {shareResponse && <ResponsePage message={shareResponse}/>}

                    <div className="flex flex-col p-4 ml-80 w-full h-screen bg-gray-100 rounded-md">
                        <div className="flex justify-between items-center mt-4 gap-x-2 mr-2">
                            <div className="text-3xl text-gray-600 ml-16 font-semibold">All Content</div>
                            <div className="flex gap-x-2 mr-28">
                                <div onClick={() => setModel(true)}>
                                    <Button size="md" variant="primary" text="Add content" Icon={<PlusIcon colour="white" />} />
                                </div>
                                <div onClick={shareHandler}>
                                    <Button size="md" variant="secondary" text={isShareable ? "Dont Share" : "Share brain"} Icon={<ShareIcon colour="purple" />} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-0">
                            <div className="flex flex-wrap gap-5 p-10 ">
                                {loading ? (<div className="flex justify-center items-center text-4xl text-gray-500">Loading content...</div>)
                                    : (filteredContent.length > 0 ? (
                                        filteredContent.map((item: Item, index: number) => (
                                            <Cards
                                                key={index}
                                                date={item.date}
                                                contentType={item.type}
                                                title={item.title}
                                                link={item.link}
                                                tags={item.tags}
                                                _id={item._id}
                                                refresh={refresh}
                                                setShareCard={setShareCard}
                                                // shareCard={shareCard}
                                            />
                                        ))) : (<NoData />))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
