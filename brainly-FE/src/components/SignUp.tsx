import { useRef, useState } from "react"
import Button from "./Button"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const signinHandler = async () => {
        const username = userRef.current?.value;
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;

        if (!username || !password || !email) {
            setResponseMessage("All fields are required! Please fill all details.");
            return;
        }

        try {
            await axios.post(BACKEND_URL + "/api/v1/signUp", {
                username,
                password,
                email,
            })
            setResponseMessage("Sign-up successful!");
            setTimeout(() => {
                clearHandler();
            }, 3000);

            navigate('/signIn')

        } catch (error: any) {
            if (error.response?.status === 400 && error.response?.data?.error) {
                const validationErrors = error.response.data.error.join(", ");
                setResponseMessage(`Validation errors: ${validationErrors}`);
            } else if (error.response?.status === 403) {
                setResponseMessage("Sign-up failed. Please try again.");
            } else if(error.response?.status === 409){
                setResponseMessage("User already exist")
            }
            else {
                setResponseMessage("An unexpected error occurred. Please try later.");
            }
        }
    }

    const clearHandler = () => {
        if (userRef.current) userRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";

        setResponseMessage(null);
    }

    return (
        <div>
            <div className="fixed top-0 left-0 flex gap-2 justify-center items-center m-4">
                <div><svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="purple" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185" /></svg></div>
                <h1 className="font-semibold text-2xl">BRAINLY</h1>
            </div>

            <div className="fixed top-0 right-0 flex gap-2 m-6">
                <div onClick={() => navigate('/signUp')}><Button text="SignUp" variant="secondary" size="md"></Button></div>
                <div onClick={() => navigate('/signIn')}><Button text="SignIn" variant="primary" size="md"></Button></div>
            </div>
            <div className="w-screen h-screen bg-white bg-gradient-to-tr  from-white to-purple-200 flex p-4">
                <div className="h-full w-3/5  flex flex-col justify-center items-center">
                    <div><svg className="w-80 h-80 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="purple" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185" /></svg></div>
                    <h1 className="text-6xl font-bold text-purple-500 m-4">Your Second Brain</h1>
                    <h3 className="text-center text-wrap w-11/12 text-gray-800">Brainly is a simple and efficient platform for saving and organizing your favorite tweets, videos, and document links all in one place. Keep your content accessible for future use and never lose track valuable resources!</h3>
                </div>
 
                <div className="h-full w-2/5 bg-gradient-to-r from-purple-600 to-purple-400 flex justify-center items-center rounded-md">
                    <div className="h-64 w-64 bg-white rounded-md shadow-md flex flex-col p-4 justify-between items-center">
                        <input className="bg-gray-100 rounded-md h-8 p-2 w-56 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="username" ref={userRef} />
                        <input className="bg-gray-100 rounded-md h-8 p-2 w-56 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="password" placeholder="password" ref={passwordRef} />
                        <input className="bg-gray-100 rounded-md h-8 p-2 w-56 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="email" placeholder="email" ref={emailRef} />
                        {responseMessage && (<p className={`${responseMessage.includes("successful!") || responseMessage.includes("successfully") ? "text-green-500" : "text-red-500 "} text-xs`}> {responseMessage} </p>)}
                        <div className="flex gap-2">
                            <div onClick={signinHandler}><Button variant="primary" text="SignUp" size="sm"></Button></div>
                            <div onClick={clearHandler}><Button variant="secondary" text="Clear" size="sm"></Button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp