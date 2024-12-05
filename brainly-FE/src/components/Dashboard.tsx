import PlusIcon from "../Icons/PlusIcon"
import ShareIcon from "../Icons/ShareIcon"
import AddContentModel from "./AddContentModel"
import Button from "./Button"
import Cards from "./Cards"
import { useState } from "react"
import Sidebar from "./Sidebar"
import { useContent } from "../hooks/useContent"
import NoData from "./NoData"


const Dashboard = () => {

    const [modal, setModel] = useState(false);
    const [dashboardContent, setDashboardContent] = useState("All")
    const apiContent = useContent();

    interface Item {
        type: "Tweets" | "Videos" | "Documents"
        key: Number;
        date: string;
        title: string;
        link: string;
        tags: string[];
    }

    return (
        <div className="flex">
            <AddContentModel open={modal} onClose={() => setModel(false)}></AddContentModel>
            {!modal && <Sidebar dashboardContent={dashboardContent} setDashboardContent={setDashboardContent} />}

            <div className="flex flex-col p-4 ml-80 w-full h-screen bg-gray-100 rounded-md">
                <div className="flex justify-between items-center mt-4 gap-x-2 mr-2">
                    <div className="text-3xl text-gray-600 ml-16 font-semibold">All Content</div>
                    <div className="flex gap-x-2 mr-28">
                        <div onClick={() => setModel(true)}><Button size="md" variant='primary' text='Add content' Icon={<PlusIcon colour='white' />}></Button></div>
                        <div><Button size="md" variant='secondary' text='Share brain' Icon={<ShareIcon colour='purple' />}></Button></div>
                    </div>
                </div>

                <div className="mt-0">
                    <div className="columns-2xs space-y-10  p-16 ">

                        {dashboardContent == 'All' && (
                            apiContent.length ? apiContent.map((item: Item, index: number) => {
                                console.log(item);

                                return (
                                    <Cards
                                        key={index}
                                        date={item.date}
                                        contentType={item.type}
                                        title={item.title}
                                        link={item.link}
                                        tags={item.tags}
                                    />
                                );
                            }) : <NoData />
                        )}

                        {dashboardContent == 'Tweets' && (
                            apiContent.length ? apiContent.map((item: Item, index: number) => {
                                console.log(item);

                                return (
                                    item.type === "Tweets" && <Cards
                                        key={index}
                                        date={item.date}
                                        contentType={item.type}
                                        title={item.title}
                                        link={item.link}
                                        tags={item.tags}
                                    />
                                );
                            }) : <NoData />
                        )}

                        {dashboardContent == 'Videos' && (
                            apiContent.length ? apiContent.map((item: Item, index: number) => {
                                console.log(item);

                                return (
                                    item.type === 'Videos' && <Cards
                                        key={index}
                                        date={item.date}
                                        contentType={item.type}
                                        title={item.title}
                                        tags={item.tags}
                                    />
                                );
                            }) : <NoData />
                        )}

                        {dashboardContent == 'Documents' && (
                            apiContent.length ? apiContent.map((item: Item, index: number) => {
                                console.log(item);

                                return (
                                    item.type === 'Documents' && <Cards
                                        key={index}
                                        date={item.date}
                                        contentType={item.type}
                                        title={item.title}
                                        tags={item.tags}
                                    />
                                );
                            }) : <NoData />
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

{/* <Cards key={1} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1633685473821425666" />
<Cards key={2} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1862806422519521757" />
<Cards key={3} date={format(new Date(), 'MM/dd/yyyy')} contentType='Videos' title='kal ki khabar' link="https://www.youtube.com/embed/ofHGE-85EIA?si=yhnD62Ft5ZeCc3po" tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd']} />
<Cards key={13} date={format(new Date(), 'MM/dd/yyyy')} contentType='Documents' title='khabar' description='AAJ KAL PARSU b hjvgyuvhyjyvfujfut' tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh',]} />

<Cards key={42} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1633685473821425666" />
<Cards key={52} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1862806422519521757" />
<Cards key={267} date={format(new Date(), 'MM/dd/yyyy')} contentType='Videos' title='kal ki khabar' link="https://www.youtube.com/embed/ofHGE-85EIA?si=yhnD62Ft5ZeCc3po" tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd']} />
<Cards key={82} date={format(new Date(), 'MM/dd/yyyy')} contentType='Documents' title='khabar' description='AAJ KAL PARSU b hjvgyuvhyjyvfujfut' tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh',]} /> */}