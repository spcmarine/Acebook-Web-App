import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Images.css";

const UploadImage = ({ navigate, setRes, handleSubmit, res }) => {

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleSelectFile = (e) => setFile(e.target.files[0]); 
  
  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.set("sample_file", file);
    try {
      const response = await axios.post("/images", data);
      setRes(response.data.secure_url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return(

<div className="App">
      <label htmlFor="file" >
        Select an image for your post 
      </label>
      <br></br>
      <input 
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      {file && <p className="file_name"></p>}
      
      {file && (
        <>
          <button className="button" onClick={uploadFile}>
            {loading ? "uploading..." : "Upload your image"}
          </button>
        </>
      )}
    </div>

  )
}

export default UploadImage;
