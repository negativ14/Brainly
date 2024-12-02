import { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    size: 'sm' | 'md' | 'lg' | 'xs';
    text: string;
    Icon?: ReactElement;
}

const ButtonStyle = {
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-200 text-purple-700"
}

const sizeStyle = {
    "xs": "text-xs py-0.5 px-2",
    "sm": "text-sm py-1 px-3",
    "md": "text-base py-2 px-4",
    "lg": "text-lg py-3 px-5"
}

const defaultStyle = "flex rounded-md items-center px-4 py-1 font-light justify-cente text-xs hover:scale-110 transition-all duration-500"

const Button = (props: ButtonProps) => {
  return (
    <button className={ ButtonStyle[props.variant] + " " + defaultStyle + " " + sizeStyle[props.size] }>
        <div className="pr-1">
            {props.Icon}
        </div>
        {props.text}
    </button>
  )
}

export default Button;