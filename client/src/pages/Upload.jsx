// src/components/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import {FileInput} from "flowbite-react";


const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const handleTitleChange = async (e) => {
    e.preventDefault();
    try{
    setTitle(e.target.value);}
    catch(err) {
      console.log(err);
    }
  };

  const handleUpload = async () => {
    
    try {
      const formData = new FormData();
      formData.append('myfile', file);
      
      formData.append('title', title); 
      await axios.post('http://localhost:5000/api/files', formData);
      setMessage('File uploaded successfully');
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md my-10">
      <div>
      <div className="shadow-lg rounded-lg overflow-hidden mb-20 items-center bg-[url('https://i.pinimg.com/originals/6f/00/9b/6f009b5860b8047bedc05330e5bfc5c3.jpg')] bg-cover ">
       <h1 className=" font-semibold text-white mb-40 mt-20 text-3xl">Upload File</h1>
        <img src="https://gloriathemes.com/wp-content/uploads/2023/02/wordpress-svg.jpg" alt="Uploaded File" className=" mb-40  mt-10  mx-auto shadow-lg rounded-lg overflow-hidden" /></div>
        <div className="mb-8">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Title"
            required
          />
        </div>
        <label className="block text-gray-700  font-bold text-2xl mb-3" htmlFor="fileInput">
          Choose a file to be Upload:
        </label>
        <FileInput type="file" id="fileInput" onChange={handleChange} className="mb-4 appearance-none block w-full px-6 py-9 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        <button
          onClick={handleUpload}
          disabled={!file}
          className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-5 rounded disabled:opacity-100"
        >
          Upload
        </button>

        
      </div>
      <div className="mt-4">
        <p className="text-md font-bold text-gray-500">{message}</p>
      </div>
    </div>
    
  );
  
};

export default Upload;