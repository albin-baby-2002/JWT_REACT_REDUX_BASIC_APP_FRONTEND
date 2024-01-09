import React from 'react'

const Row = () => {
  return (
     <div className=" w-full  bg-slate-500 h-9 flex  ">
                
                <div className=" flex-grow font-bold  text-center  border-r border-r-black flex  items-center justify-center" >  <p> User Name</p></div>
                
                <div className=" flex-grow font-bold text-center  border-r border-r-black flex  items-center justify-center " >  <p>Email Id</p>  </div>
                <div className=" flex-grow font-bold  text-center border-r border-r-black flex  items-center justify-center "> <p>Phone</p>  </div>
                
                <div className=" flex-grow font-bold  text-center border-r border-r-black flex  items-center justify-center "> <p>Actions</p>  </div>
                
            </div>
  )
}

export default Row
