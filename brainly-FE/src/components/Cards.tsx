import DeleteIcon from "../Icons/DeleteIcon";
import ShareIcon from "../Icons/ShareIcon";
import {format} from "date-fns"

const typeArray: { [key in CardsProps['contentType']]: React.ReactNode } = {
    Videos: <svg xmlns="http://www.w3.org/2000/svg" x="0px" fill="gray" y="0px" width="20" height="20" viewBox="0 0 50 50"><path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path></svg>,
    Tweets: <svg className="w-5 h-5 text-black dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clipRule="evenodd"/></svg>,
    Posts: <svg className="w-5 h-5 text-black dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd"/><path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd"/></svg>,
    Documents: <svg className="w-5 h-5 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/></svg>,
};

interface CardsProps {
    contentType: 'Tweets' | 'Videos' | 'Documents' | 'Posts';
    link?: string;
    title: string;
    tags?: string[];
    description?: string;
}

const Cards = (props: CardsProps) => {

    const { tags, contentType, description, link } = props;
    const formattedDate = format(new Date(), 'MM/dd/yyyy');

  return (
    <div className="bg-white rounded-md shadow-md border-slate-100 h-72 w-56 flex flex-col justify-start p-4 gap-y-4">
        <div className="flex justify-between">
            <div className="flex gap-x-1 items-center">
                <div className="flex-shrink-0">{ typeArray[contentType] }</div>
                <h1 className="line-clamp-1 font-montserrat font-medium">{props?.title }</h1>
            </div>

            <div className="flex gap-x-2 items-center flex-shrink-0">
                <ShareIcon colour='gray'/>
                <DeleteIcon colour='gray'/>
            </div>
        </div>

        {/* <div className="my-1"> {description && <Documents description={description} />} </div> */}
        {/* <div className=""> {link && <Videos link={link} />} </div> */}
        <div className=""> {link && <Tweets link={link} />} </div>

        <div className="flex flex-col gap-2 ">
            <div className="flex flex-wrap gap-1">
                {tags?.map( (tag, index) => {
                    return <Tags key={index} tag={tag} />;
                })}
            </div> 

            <div className="text-xs text-gray-500">
                Added on {formattedDate}
            </div>
        </div>

    </div>
  )
}

const Tags = ({tag}: {tag : string}) => {
    return <div className="inline-block px-1.5 py-0.25 bg-purple-100 rounded-2xl text-purple-600 text-xs">
        #{tag}
    </div>
}

export const Documents = ({ description }: {description: string}) => {
    return (
        <div className="text-gray-700 text-sm bg-gray-100 rounded-md p-2 font-medium ">
            {description}
        </div>
    )
}

export const Videos = ({ link }: {link: string}) => {
    return (
        <div className="text-gray-700 text-sm bg-gray-100 rounded-md h-28">
            {<iframe 
            className="h-full w-full rounded-md" 
            src={link} title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen></iframe>}
        </div>
    )
}

export const Tweets = ({ link }: {link: string}) => {
    return (
        <div className="bg-gray-100 rounded-md h-52 w-60">
            <blockquote className="twitter-tweet ">
                <a href={link}></a>
            </blockquote> 
        </div>
    )
}

export default Cards;