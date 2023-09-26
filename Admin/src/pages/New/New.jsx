
import "./New.scss";
import Sidebar from "../../component/sidebar/sidebar";
import Navbar from "../../component/Navbar/navbar";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState } from 'react';

const New = ({input, title}) => {
	const [file, setFile] = useState("");
	console.log(file)
	return (

		<div className="New" >
			<Sidebar />
			<div className="newContainer">
			<Navbar />
			<div className="top">
			<h1>{title}</h1></div>
	
			<div className="bottom">
			<div className="left">
				<img src={file ? URL.createObjectURL(file) : "http://cdn.onlinewebfonts.com/svg/img_211436.png"} alt=""/>
			</div>
			<div className="right">
				<form>
				<div className="forminput">
				<label htmlFor="file">Image:<DriveFolderUploadIcon className="icon" /></label>
				<input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{ display: "none"}} />
				</div>
				{input.map((input) => (

				<div className="forminput" key={input.id}>
				<label>{input.label}</label>
				<input type={input.type} placeholder={input.placeholder} />
				</div>
				))}
				
				<button>Send</button>



				</form>
			</div>
		</div>
		</div>
		</div>


		);
}

export default New;