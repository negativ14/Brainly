import CrossIcon from "../Icons/CrossIcon";
import Button from "./Button";
import { useRef, useState } from "react";
import { DocumentModel, TweetModel, VideoModel } from "./contentModels";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { format } from "date-fns";
import { useContent } from "../hooks/useContent";

const AddContentModel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [content, setContent] = useState("Videos");
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const docRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const date = format(new Date,("MM/dd//yyyy"))


    const submitHandler = async () => {
        setFileError(null);  // Clear any previous file error messages
        const link = linkRef.current?.value;
        const token = localStorage.getItem("Authorization");  // Ensure the token is retrieved correctly

        // Check for required fields before making the API request
        if (!titleRef.current?.value || (content === "Documents" && !file)) {
            setResponseMessage("Fill all the fields");
            setTimeout(() => {
                setResponseMessage(null);
            }, 3000);
            return; // If fields are missing, stop further execution
        }

        // Gather form data
        const title = titleRef.current?.value;
        const tagsString = tagRef.current?.value || "";
        const tagsArray = tagsString
            .split(/\s+/) // Split by one or more spaces
            .filter((tag) => tag.trim() !== ""); // Remove any empty strings

        // Handle Document upload
        if (file && content === 'Documents') {
            try {
                console.log(file);
                const response = await axios.post(BACKEND_URL + "/api/v1/add-content", {
                    type: content,
                    title: title,
                    tags: tagsArray,
                    file: file,
                    date: date,
                }, {
                    headers: {
                        Authorization: token
                    }
                });

                // Check if upload is successful or failed
                if (response.status === 500) {
                    setResponseMessage("File upload failed");
                } else {
                    setResponseMessage("Added content successfully!");
                }

                useContent();
            } catch (error) {
                setResponseMessage("Error uploading file!");
            }
        }

        // Handle Video or Tweet content submission
        else if (link && (content === 'Videos' || content === 'Tweets')) {
            try {
                const response = await axios.post(BACKEND_URL + "/api/v1/add-content", {
                    type: content,
                    title: title,
                    tags: tagsArray,
                    link: link,
                    date: date,
                }, {
                    headers: {
                        Authorization: token
                    }
                });

                // Check if upload is successful or failed
                if (response.status === 500) {
                    setResponseMessage("Content upload failed");
                } else {
                    setResponseMessage("Added content successfully!");
                }

                useContent();
            } catch (error) {
                setResponseMessage("Error uploading content!");
            }
        }

        // If the content type is invalid or missing required fields
        else {
            setResponseMessage("Fill all the fields");
            setTimeout(() => {
                setResponseMessage(null);
            }, 3000);
        }

        // Clear the response message after 3 seconds
        setTimeout(() => {
            setResponseMessage(null);
        }, 3000);
    };


    const clearHandler = () => {
        if (titleRef.current) titleRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        if (docRef.current) docRef.current.value = "";
        if (tagRef.current) tagRef.current.value = "";
        setFileError(null);
        setFile(null);
        setResponseMessage(null);
    };

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    return (
        <div>
            {open && (
                <div>
                    {/* Semi-transparent background */}
                    <div className="w-full h-full bg-slate-400 opacity-50 fixed left-0 top-0"></div>

                    {/* Blurred background for the modal */}
                    <div className="w-full h-full fixed flex justify-center items-center left-0 top-0 backdrop-blur-sm " onClick={onClose}>
                        <div className="bg-white rounded-md shadow-md h-80 w-80" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col justify-center">

                                {/* cancel button */}
                                <div className="flex justify-between items-center m-4 mb-1">
                                    <div className="ml-2 font-medium">
                                        <h1>Adding Content</h1>
                                    </div>
                                    <div className="flex justify-center items-center bg-purple-200 rounded-full h-5 w-5 hover:scale-125 transition-all duration-500" onClick={onClose}>
                                        <CrossIcon colour="purple" />
                                    </div>
                                </div>

                                {/* contentModel rendering conditional */}
                                <div>
                                    {content === "Videos" && <VideoModel titleRef={titleRef} linkRef={linkRef} tagRef={tagRef} />}
                                    {content === "Documents" && <DocumentModel titleRef={titleRef} docRef={docRef} tagRef={tagRef} onFileSelect={handleFileSelect} setFileError={setFileError} />}
                                    {content === "Tweets" && <TweetModel titleRef={titleRef} linkRef={linkRef} tagRef={tagRef} />}
                                </div>

                                <div >{fileError && fileError.includes("successfully!") ? <p className="text-xs text-green-500 text-start ml-5"> {fileError} </p> : <p className="text-xs text-red-500 text-start ml-5"> {fileError} </p>}</div>
                                <div >{responseMessage && responseMessage.includes("successfully!") ? <p className="text-xs text-green-500 text-start ml-5"> {responseMessage} </p> : <p className="text-xs text-red-500 text-start ml-5"> {responseMessage} </p>}</div>

                                {/* content type three button  */}
                                <div className="flex justify-between items-center mx-4 mb-4 mt-3">
                                    <div className="flex gap-x-2 ml-1">
                                        <div onClick={() => setContent('Videos')}><Button size="sm" variant={content === 'Videos' ? 'primary' : 'secondary'} text="Videos" ></Button></div>
                                        <div onClick={() => setContent('Documents')}><Button size="sm" variant={content === 'Documents' ? 'primary' : 'secondary'} text="Documents"></Button></div>
                                        <div onClick={() => setContent('Tweets')}><Button size="sm" variant={content === 'Tweets' ? 'primary' : 'secondary'} text="Tweets"></Button></div>
                                    </div>
                                </div>

                                {/* submit and clear button */}
                                <div className="flex justify-center space-x-2 ">
                                    <div onClick={submitHandler}><Button size="sm" variant="primary" text="Submit"></Button></div>
                                    <div onClick={clearHandler}><Button size="sm" variant="secondary" text="Clear"></Button></div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};





export default AddContentModel


    // const submitHandler = async () => {

    //     setFileError(null);
    //     const link = linkRef.current?.value;
    //     const token = localStorage.getItem("Authorization")

    //     if (file && content === 'Documents') {

    //         const title = titleRef.current?.value
    //         const tagsString = tagRef.current?.value || "";

    //         const tagsArray = tagsString
    //             .split(/\s+/) // Split by one or more spaces
    //             .filter((tag) => tag.trim() !== ""); // Remove any empty strings

    //         if (!title) {
    //             setResponseMessage("Title is required.");
    //             return;
    //         }

    //         try {
    //             const response = await axios.post(BACKEND_URL + "/api/v1/add-content", {
    //                 type: content,
    //                 title: title,
    //                 tags: tagsArray,
    //                 file: file
    //             }, {
    //                 headers: {
    //                     Authorization: token
    //                 }
    //             });

    //             if (response.status === 500) {
    //                 // throw new Error('File upload failed');
    //                 setResponseMessage("File upload failed");
    //             } else {
    //                 setResponseMessage("Added content successfully!")
    //             }

    //             setTimeout(() => {
    //                 setResponseMessage(null);
    //             }, 3000);

    //         } catch (error) {
    //             // console.error("Error uploading file:", error);
    //             setResponseMessage("Error uploading file!");
    //         }
    //     }
    //     else {
    //         setResponseMessage("Fill all the fields");
    //         setTimeout(() => {
    //             setResponseMessage(null);
    //         }, 3000);
    //     }

    //     if (link && (content === 'Videos' || content === 'Tweets')) {
    //         const title = titleRef.current?.value
    //         const tagsString = tagRef.current?.value || "";

    //         const tagsArray = tagsString
    //             .split(/\s+/) // Split by one or more spaces
    //             .filter((tag) => tag.trim() !== ""); // Remove any empty strings

    //         if (!title) {
    //             setResponseMessage("Title is required.");
    //             return;
    //         }

    //         try {
    //             const response = await axios.post(BACKEND_URL + "/api/v1/add-content", {
    //                 type: content,
    //                 title: title,
    //                 tags: tagsArray,
    //                 link: link,
    //             }, {
    //                 headers: {
    //                     Authorization: token
    //                 }
    //             });

    //             if (response.status === 500) {
    //                 // throw new Error('File upload failed');
    //                 setResponseMessage("Content upload failed");
    //             } else {
    //                 setResponseMessage("Added content successfully!")
    //             }

    //             setTimeout(() => {
    //                 setResponseMessage(null);
    //             }, 3000);

    //         } catch (error) {
    //             // console.error("Error uploading file:", error);
    //             setResponseMessage("Error uploading content!");
    //         }
    //     }
    //     else {
    //         setResponseMessage("Fill all the fields");
    //         setTimeout(() => {
    //             setResponseMessage(null);
    //         }, 3000);
    //     }
    // };