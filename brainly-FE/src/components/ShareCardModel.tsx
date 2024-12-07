import { useState } from "react";
import Button from "./Button";

const ShareCardModel = ({ setShareCard, shareCard }: { setShareCard: (arg: string | null) => void; shareCard: string }) => {

  const [copied, setCopied] = useState(false);

  const copyHandler = () => {
    if (shareCard) {
      navigator.clipboard.writeText(shareCard)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy link: ", error);
        });
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="w-full h-full bg-slate-400 opacity-50 fixed left-0 top-0"></div>
      <div className="w-full h-full fixed backdrop-blur-sm flex justify-center items-center" onClick={() => setShareCard(null)}>
        <div className="h-36 w-80 bg-white rounded-md flex flex-col justify-center items-center p-2 gap-y-2 overflow-hidden " onClick={(e) => e.stopPropagation()}>
          {copied && <div className="text-xs text-green-400 text-center">Link copied</div>}
          <h1 className="text-sm text-gray-500 text-clip">{shareCard.length > 20 ? shareCard.substring(0, 20) + "..." : shareCard}</h1>
          <div className="flex gap-x-2">
            <div onClick={copyHandler}>
              <Button size="sm" text="Copy Link" variant="primary" />
              {/* <Button size="sm" text={copied ? "Link Copied!" : "Copy Link"} variant="primary" /> */}
            </div>
            <div onClick={() => setShareCard(null)}>
              <Button size="sm" text="Cancel" variant="secondary" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ShareCardModel