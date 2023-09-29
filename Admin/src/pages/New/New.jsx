import "./new.scss";
import Sidebar from "../../component/sidebar/sidebar";
import Navbar from "../../component/Navbar/navbar";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState, useEffect } from 'react';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  // Update formInputs when inputs prop changes
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };



  const handleClick = async e=>{
    e.preventDefault()


  }



  return (
    <div className="New">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "http://cdn.onlinewebfonts.com/svg/img_211436.png"}
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="forminput">
                <label htmlFor="file">Image:<DriveFolderUploadIcon className="icon" /></label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs?.map((input) => (
                <div className="forminput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                   onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                   
                   
                  />
                </div>
              ))}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
