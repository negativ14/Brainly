import { ReactElement } from "react";


const SidebarItems = ({text, Icon} : {text: string; Icon: ReactElement}) => {
  return (
    <div className="flex gap-x-2 text-gray-600 text-sm items-center">
        {Icon}
        <h1>{text}</h1>
    </div>
  )
}

export default SidebarItems