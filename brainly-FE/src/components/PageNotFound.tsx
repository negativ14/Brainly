import { useNavigate } from "react-router-dom"
import Button from "./Button"

const PageNotFound = () => {

    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate('/signup')
    }
    return (
        <div className=" h-screen w-screen flex flex-col justify-center items-center">
            <div><h1 className="text-4xl text-gray-500 font-semibold mb-4">Page Not Found</h1>
                <div onClick={navigateHandler} className="flex justify-center items-center "><Button size='md' text="Go Home" variant="primary" ></Button></div></div>
        </div>
    )
}

export default PageNotFound