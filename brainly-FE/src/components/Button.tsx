import { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    // size: 'sm' | 'md' | 'lg';
    text: string;
    Icon?: ReactElement;
}

const ButtonStyle = {
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-300 text-purple-700"
}

// const sizeStyle = {
//     "sm": "text-sm py-1 px-3",
//     "md": "text-base py-2 px-4",
//     "lg": "text-lg py-3 px-5"
// }

const defaultStyle = "flex rounded-md items-center px-6 py-1 pr-8 font-light justify-center m-2"

const Button = (props: ButtonProps) => {
  return (
    <button className={ ButtonStyle[props.variant] + " " + defaultStyle }>
        <div className="pr-1">
            {props.Icon}
        </div>
        {props.text}
    </button>
  )
}

export default Button;