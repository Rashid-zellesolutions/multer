import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import { upload } from '@testing-library/user-event/dist/upload';

function App() {
  const [files, setFile] = useState()
  const [image, setImage] = useState([])
  // const handleChange = (e) => {
  //   setFile(e.target.value)
  // }
  // const handleFile = () => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   axios.post('http://localhost:3001/uploads', formData)
  //   .then(res => {})
  //   .catch(err => console.log(err))
  // }
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach(file => {
      formData.append('file', file)
    })
    try {
      const res = await axios.post('http://localhost:3001/uploads', formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      });
      
      console.log(res)
    } catch (error) {
      if(error.response.status === 500){
        console.log(error)
      }else {
        console.log(error.response.data.msg)
      }
    }
    // alert("Image Saved")
  } 

  const getIamges = async() => {
    const response = await axios.get('http://localhost:3001/images');
    console.log(response.data.images)
    setImage(response.data.images)
  }

  // const onSubmit = () => {}
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type='file' id='file' name='uplaodImages' multiple onChange={(e) => setFile(e.target.files)}/>
        </div>
        <button onClick={onSubmit}> Click </button>
      </form>
      <button onClick={getIamges}>Get Images</button>
      {/* {Array.isArray(image) && image.map(image => {
          return <img
            key={image._id}
            src={`data:image/jpg;base64,${image.imageData.data}`}
            alt={image.imageName}
            style={{ width: '200px', height: '200px', margin: '10px' }}
          />
      })} */}
    </div>
  );
}

export default App;
