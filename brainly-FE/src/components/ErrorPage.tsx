import { useNavigate } from "react-router-dom"
import Button from "./Button"

const ErrorPage = ({error}: {error: string}) => {

    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate('/signup')
    }
  return (
    <div>
        <div className="h-screen w-screen flex justify-center items-center text-4xl text-red-500">{error}</div>
        <div onClick={navigateHandler} className="flex justify-center items-center "> <Button size='md' text="Go Home" variant="primary" ></Button></div>
    </div>
  )
}

export default ErrorPage