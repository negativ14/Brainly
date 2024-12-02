export const VideoModel = ({ titleRef, linkRef, tagRef }: { titleRef: React.RefObject<HTMLInputElement>; linkRef: React.RefObject<HTMLInputElement>; tagRef: React.RefObject<HTMLInputElement>}) => {
    return (
        <div className="flex flex-col gap-4 justify-center m-5">
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="title" ref={titleRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="link" ref={linkRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="tags" ref={tagRef} />
        </div>
    );
};


export const TweetModel = ({ titleRef, linkRef, tagRef }: { titleRef: React.RefObject<HTMLInputElement>; linkRef: React.RefObject<HTMLInputElement>; tagRef: React.RefObject<HTMLInputElement>}) => {
    return (
        <div className="flex flex-col gap-4 justify-center m-5">
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="title" ref={titleRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="link" ref={linkRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="tags" ref={tagRef} />
        </div>
    );
};


// export const DocumentModel = ({ titleRef, docRef, tagRef }: { titleRef: React.RefObject<HTMLInputElement>; docRef: React.RefObject<HTMLInputElement>; tagRef: React.RefObject<HTMLInputElement>}) => {
//     return (
//         <div className="flex flex-col gap-4 justify-center m-5">
//             <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="title" ref={titleRef} />
//             {/* <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="file" placeholder="documents/text" ref={docRef} /> */}
//             <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="tags" ref={tagRef} />
//             <div className="flex flex-col items-start">
//                 <input className="hidden" type="file"placeholder="documents" ref={docRef} id="fileInput"/>
//                 <label htmlFor="fileInput" className="bg-gray-200 rounded-md h-7 p-2 border border-gray-300 cursor-pointer text-sm text-gray-500 flex items-center">
//                     Choose File
//                 </label>
//             </div>
//         </div>
//     );
// };




export const DocumentModel = ({ titleRef, docRef, tagRef, onFileSelect }: { 
  titleRef: React.RefObject<HTMLInputElement>; 
  docRef: React.RefObject<HTMLInputElement>; 
  tagRef: React.RefObject<HTMLInputElement>; 
  onFileSelect: (file: File | null) => void;
}) => {
  const fileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onFileSelect(file); // Pass the selected file to parent component
  };

  return (
    <div className="flex flex-col gap-4 justify-center m-5">
      <input
        className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none text-sm text-gray-500"
        type="text"
        placeholder="title"
        ref={titleRef}
      />
      <input
        className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none text-sm text-gray-500"
        type="text"
        placeholder="tags"
        ref={tagRef}
      />
      <div className="flex flex-col items-start">
        <input
          className="hidden"
          type="file"
          placeholder="documents"
          ref={docRef}
          id="fileInput"
          accept=".csv, .xlsx, .xls"
          onChange={fileInputHandler}
        />
        <label
          htmlFor="fileInput"
          className="bg-gray-200 rounded-md h-7 p-2 border border-gray-300 cursor-pointer text-sm text-gray-500 flex items-center"
        >
          Choose File
        </label>
      </div>
    </div>
  );
};



