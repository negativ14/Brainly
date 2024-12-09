import { useEffect, useState } from "react";
import { ObjectId } from "mongoose";
import ErrorPage from "./components/ErrorPage";
import Sidebar from "./components/Sidebar";
import Cards from "./components/Cards";
import NoData from "./components/NoData";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useParams } from "react-router-dom";


const ShareLinkPage = () => {
    const [dashboardContent, setDashboardContent] = useState("All");
    const { shareLink } = useParams<{ shareLink: string }>();
    const [apiContent, setApiContent] = useState<Item[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); 

    interface Item {
        type: "Tweets" | "Videos" | "Documents";
        key: number;
        date: string;
        title: string;
        link: string;
        tags: string[];
        _id: ObjectId;
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(BACKEND_URL + `/api/v1/brain/${shareLink}`)
            setApiContent(response.data.content)
            console.log(response.data);
            console.log(apiContent);
        } catch (error) {
            setError("Server side error")
        }
        finally{
            setLoading(false)
        }
    } 

    useEffect(() => {
        fetchData();
        console.log(apiContent);
    },[])

    const filteredContent = dashboardContent === "All"
        ? apiContent
        : apiContent?.filter((item: Item) => item.type === dashboardContent);

    return (
        <div className="flex">

            {error ? (
                <ErrorPage error={error} />
            ) : (

                <>
                    <Sidebar dashboardContent={dashboardContent} setDashboardContent={setDashboardContent} />

                    <div className="flex flex-col p-4 ml-80 w-full h-screen bg-gray-100 rounded-md">
                        <div className="flex justify-start items-center mt-4 gap-x-2 mr-2">
                            <div className="text-3xl text-gray-600 ml-16 font-semibold">All Content</div>
                        </div>

                        <div className="mt-0">
                            <div className="flex flex-wrap gap-5 p-10 ">
                                {loading ? (<div className="flex justify-center items-center text-4xl text-gray-500">Loading content...</div>)
                                    : (filteredContent?.length ? (
                                        filteredContent?.map((item: Item, index: number) => (
                                            <Cards
                                                key={index}
                                                date={item.date}
                                                contentType={item.type}
                                                title={item.title}
                                                link={item.link}
                                                tags={item.tags}
                                                _id={item._id}
                                                
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

export default ShareLinkPage;
