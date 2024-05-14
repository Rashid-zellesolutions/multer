import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import { upload } from '@testing-library/user-event/dist/upload';

function App() {
  const [files, setFile] = useState()
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
    </div>
  );
}

export default App;
