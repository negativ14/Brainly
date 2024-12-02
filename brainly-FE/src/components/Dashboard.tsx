import { format } from "date-fns"
import PlusIcon from "../Icons/PlusIcon"
import ShareIcon from "../Icons/ShareIcon"
import AddContentModel from "./AddContentModel"
import Button from "./Button"
import Cards from "./Cards"
import { useState } from "react"

const Dashboard = () => {
    const [modal,setModel] = useState(false);
    
    return (
        <div>
            <AddContentModel open={modal} onClose={() => setModel(false)}></AddContentModel>

            {/* 2 buttons add & share */}
            <div>
                <div onClick={() => setModel(true)}><Button size="sm" variant='primary' text='Add content' Icon={<PlusIcon colour='white' />}></Button></div>
                <Button size="sm" variant='secondary' text='Share brain' Icon={<ShareIcon colour='purple' />}></Button>
            </div>
            {/* //<div className='columns-2xs space-y-10 gap-4 bg-gray-300 p-16'> */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-300 p-8 auto-rows-masonry">
                <Cards key={1} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1633685473821425666" />
                <Cards key={2} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1862806422519521757" />
                <Cards key={3} date={format(new Date(), 'MM/dd/yyyy')} contentType='Videos' title='kal ki khabar' link="https://www.youtube.com/embed/ofHGE-85EIA?si=yhnD62Ft5ZeCc3po" tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd']} />
                <Cards key={13} date={format(new Date(), 'MM/dd/yyyy')} contentType='Documents' title='khabar' description='AAJ KAL PARSU b hjvgyuvhyjyvfujfut' tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh',]} />

                <Cards key={42} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1633685473821425666" />
                <Cards key={52} date={format(new Date(), 'MM/dd/yyyy')} contentType='Tweets' title='Ajj ki khabar' link="https://twitter.com/kirat_tw/status/1862806422519521757" />
                <Cards key={267} date={format(new Date(), 'MM/dd/yyyy')} contentType='Videos' title='kal ki khabar' link="https://www.youtube.com/embed/ofHGE-85EIA?si=yhnD62Ft5ZeCc3po" tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd']} />
                <Cards key={82} date={format(new Date(), 'MM/dd/yyyy')} contentType='Documents' title='khabar' description='AAJ KAL PARSU b hjvgyuvhyjyvfujfut' tags={['cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh', 'cd', 'cddcbydh',]} />
            </div>
        </div>
    )
}

export default Dashboard