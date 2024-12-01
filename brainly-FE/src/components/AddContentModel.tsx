
const AddContentModel = ({open, onClose}: {open:boolean; onClose: ()=> void}) => {
  return (
    <div>
        {open &&
        <div>
            <div className="w-screen h-screen bg-slate-500 opacity-50 fixed">
            </div> 
            <div className="bg-white rounded-md shadow-sm h-72 w-64">
                
            </div>
        </div>
        }
    </div>
  )
}

export default AddContentModel