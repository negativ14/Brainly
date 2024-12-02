import CrossIcon from "../Icons/CrossIcon";
import Button from "./Button";
import { useRef, useState } from "react";
import { DocumentModel, TweetModel, VideoModel } from "./contentModels";
import { BACKEND_URL } from "../config";

const AddContentModel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [content, setContent] = useState("Videos");
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const docRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);

    const submitHandler = async () => {
        if (file && content === 'Documents') {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", titleRef.current?.value || "");
            formData.append("tags", tagRef.current?.value || "");

            try {
                const response = await fetch(BACKEND_URL, {method: "POST",body: formData});

                if (!response.ok) {
                    throw new Error('File upload failed');
                }

                const data = await response.json();
                console.log("File uploaded successfully", data);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };


    const clearHandler = () => {
        if (titleRef.current) titleRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        if (docRef.current) docRef.current.value = "";
        if (tagRef.current) tagRef.current.value = "";
    };

    const [file, setFile] = useState<File | null>(null);

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
                                    {content === "Documents" && <DocumentModel titleRef={titleRef} docRef={docRef} tagRef={tagRef} onFileSelect={handleFileSelect} />}
                                    {content === "Tweets" && <TweetModel titleRef={titleRef} linkRef={linkRef} tagRef={tagRef} />}
                                </div>

                                {/* content type three button  */}
                                <div className="flex justify-between items-center mx-4 mb-4">
                                    <div className="flex gap-x-2 ml-1">
                                        <div onClick={() => setContent('Videos')}><Button size="sm" variant={content === 'Videos' ? 'primary' : 'secondary'} text="Videos" ></Button></div>
                                        <div onClick={() => setContent('Documents')}><Button size="sm" variant={content === 'Documents' ? 'primary' : 'secondary'} text="Documents"></Button></div>
                                        <div onClick={() => setContent('Tweets')}><Button size="sm" variant={content === 'Tweets' ? 'primary' : 'secondary'} text="Tweets"></Button></div>
                                    </div>
                                </div>

                                {/* submit and clear button */}
                                <div className="flex justify-center space-x-2">
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