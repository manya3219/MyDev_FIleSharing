import React, { useState } from "react";
import { Link } from "react-router-dom";



export default function FileCard({ file }) {
  const [uuid, setUuid] = useState(file.uuid);

 

  
  const showPdf = (uuid) => {
    window.open(
      `http://localhost:5000/api/file/${uuid}`,
      "_blank",
      "noreferrer"
    );
  };

  return (
    < div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md my-10  ">
  
    <div className="group relative w-full border mb-10 border-teal-500 hover:border-2 h-[360px] overflow-hidden rounded-lg sm:w-[260px] transition-all flex flex-wrap">
      <Link to={`/file/${file.uuid}`}>
        <img
          src={file.image}
          alt="post cover"
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2" >
       
      
        <p className="text-lg font-semibold line-clamp-2 ">{file.title}.pdf</p>
        <span className="italic text-sm">{file.uuid.substring(0, 13)}</span>
        
        <button  className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
         onClick={() => showPdf(file.uuid)}>
          Show Pdf
        </button>
      
      </div>
    </div>
    </div>
  );
}