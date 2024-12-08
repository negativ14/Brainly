import { useState } from "react";
import Button from "./Button";
import ResponsePage from "./ResponsePage";

const ShareModel = ({ setShare, share }: { setShare: (arg: string | null) => void; share: string }) => {

    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const shareLink = "http://localhost:5173/api/v1/brain/:" + share;

    const copyHandler = () => {
        console.log("share link is ",shareLink)
        if (share) {
            navigator.clipboard.writeText(shareLink)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((error) => {
                    setError(true);
                    setTimeout(() => setError(false), 2000);
                });
        }
    };

    return (
        <div className="h-screen w-screen">

            {error && <ResponsePage message="Failed to copy link" />}

            <div className="w-full h-full bg-slate-400 opacity-50 fixed left-0 top-0"></div>
            <div className="w-full h-full fixed backdrop-blur-sm flex justify-center items-center" onClick={() => setShare(null)}>
                <div className="h-36 w-80 bg-white rounded-md flex flex-col justify-center items-center p-2 gap-y-2 overflow-hidden " onClick={(e) => e.stopPropagation()}>
                    {copied && <div className="text-xs text-green-400 text-center">Link copied</div>}
                    <h1 className="text-sm text-gray-500 text-clip">{shareLink.length > 20 ? shareLink.substring(0, 35) + "..." : shareLink}</h1>
                    <div className="flex gap-x-2">
                        <div onClick={copyHandler}>
                            <Button size="sm" text="Copy Link" variant="primary" />
                        </div>
                        <div onClick={() => setShare(null)}>
                            <Button size="sm" text="Cancel" variant="secondary" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShareModel