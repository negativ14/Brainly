import { useNavigate } from "react-router-dom"
import Button from "./Button"

const ErrorPage = ({error}: {error: string}) => {

    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate('/signup')
    }
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-y-2">
        <div className="text-4xl text-red-400">{error}</div>
        <div onClick={navigateHandler}> <Button size='md' text="Go Home" variant="primary" ></Button></div>
    </div>
  )
}

export default ErrorPage