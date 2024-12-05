import { ReactElement } from "react";


const SidebarItems = ({ text, Icon, active }: { text: string; Icon: ReactElement; active: boolean; }) => {
    return (
        <div>
            {active ? <div className="flex h-8 p-2 gap-x-2 bg-gray-200 text-gray-600 text-sm items-center hover:bg-gray-200 rounded-md transition-all duration-300">
                {Icon}
                <h1>{text}</h1>
            </div> : <div className="flex h-8 p-2 gap-x-2 text-gray-600 text-sm items-center hover:bg-gray-200 rounded-md transition-all duration-300">
                {Icon}
                <h1>{text}</h1>
            </div>}
        </div>
    )
}

export default SidebarItems