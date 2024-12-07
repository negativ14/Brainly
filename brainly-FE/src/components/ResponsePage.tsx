
const ResponsePage = ({message} : {message : string}) => {
  return (
    <div className="h-screen w-screen fixed flex justify-center mt-6 ">
        <div className="h-16 w-80 bg-gray-200 rounded-lg flex justify-center items-center text-sm text-purple-500 border-2 border-purple-500 ">
            {message}
        </div>
    </div>
  )
}

export default ResponsePage