export const VideoModel = ({ titleRef, linkRef, tagRef }: { titleRef: React.RefObject<HTMLInputElement>; linkRef: React.RefObject<HTMLInputElement>; tagRef: React.RefObject<HTMLInputElement> }) => {
    return (
        <div className="flex flex-col gap-4 justify-center mx-5 my-3">
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="title" ref={titleRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="link" ref={linkRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="tags" ref={tagRef} />
        </div>
    );
};


export const TweetModel = ({ titleRef, linkRef, tagRef }: { titleRef: React.RefObject<HTMLInputElement>; linkRef: React.RefObject<HTMLInputElement>; tagRef: React.RefObject<HTMLInputElement> }) => {
    return (
        <div className="flex flex-col gap-4 justify-center mx-5 my-3">
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="title" ref={titleRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="link" ref={linkRef} />
            <input className="bg-gray-100 rounded-md h-8 p-2 border border-gray-300 focus:border-gray-400 focus:outline-none  text-sm text-gray-500 " type="text" placeholder="tags" ref={tagRef} />
        </div>
    );
};


export const DocumentModel = ({ titleRef, docRef, tagRef, onFileSelect, setFileError, }: {
    titleRef: React.RefObject<HTMLInputElement>;
    docRef: React.RefObject<HTMLInputElement>;
    tagRef: React.RefObject<HTMLInputElement>;
    onFileSelect: (file: File | null) => void;
    setFileError: (fileError: string | null) => void;
}) => {
    const fileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            //make sure noo unsupported or waste or big file get stored in Db
            //very very Important
            const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            const maxSize = 5 * 1024 * 1024; // 5 MB    yad rakhna 1024 * 1024 = 1MB

            if (!allowedTypes.includes(file.type)) {
                // alert('');
                setFileError("Only CSV, XLS, or XLSX files are allowed.");
                return;
            }
            else if (file.size > maxSize) {
                // alert('File size exceeds the 5MB limit.');
                setFileError("File size exceeds the 5MB limit.");
                return;
            }
            else {
                setFileError("File Selected successfully!")
            }
        }
        onFileSelect(file); // Passing the file to parent component
    };

    return (
        <div className="flex flex-col gap-4 justify-center mx-5 my-3">
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
                    ref={docRef}
                    id="fileInput"
                    accept=".csv, .xlsx, .xls"
                    onChange={fileInputHandler}
                />
                <label htmlFor="fileInput" className="bg-gray-200 rounded-md h-7 p-2 border border-gray-300 cursor-pointer text-sm text-gray-500 flex items-center">
                    Choose File
                </label>
            </div>
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

