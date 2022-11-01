import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { pBEClose } from "../../../Redux/AuthSlice";
import axios from "axios";
import "./BackgroundPicEditor.css";
import Cropper from "react-easy-crop";
import { Slider } from "@material-ui/core";
import getCroppedImg from "../../../Utils/photoEditor/cropImage";
import { dataURLtoFile } from "../../../Utils/photoEditor/dataURLtoFile";
import { Cancel } from '@material-ui/icons';





function BackgroundPicEditor() {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const inputRef = useRef();

    const dispatch = useDispatch();

    const [ image, setImage ] = useState(null);
    const [ croppedArea, setCroppedArea ] = useState(null);
    const [ crop, setCrop ] = useState({ x: 0, y: 0});
    const [ zoom, setZoom ] = useState(1);

    const filePopupHandler = () => {
        inputRef.current.click();
    }

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

    const onUpload = async () => {
        const updateBackgroundPic = user.unionName
            ? {unionId: user._id}
            : {userId: user._id}
        const canvas = await getCroppedImg(image, croppedArea);
        const canvasDataURL = canvas.toDataURL("image/jpg");
        const convertedURLToFile = dataURLtoFile(canvasDataURL, "BackgroundPic.jpg")
        const fileData = new FormData();
        const fileName = Date.now() + user._id + convertedURLToFile.name;
        fileData.append("name", fileName);
        fileData.append("file", convertedURLToFile);
        updateBackgroundPic.backgroundPicture = PF + fileName
        try {
            await axios.post("/upload", fileData);
        } catch (err) {
            console.log(err);
        }
        if (user.unionName) {
            try {
                await axios.put(`/unions/${user._id}`, updateBackgroundPic);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                localStorage.setItem("union", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axios.put(`/users/${user._id}`, updateBackgroundPic);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                localStorage.setItem("flame", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const cancelHandler = () => {
        dispatch(pBEClose())
    }

    return (
        <div className="backgroundPicEditor">
            <div className="backgroundPicEditorContainer">
                <div className="backgroundPicEditorContainerTop">
                    <div className="backgroundPicEditorContainerCropper" style={image ? {backgroundColor: "#aeb4b7"} : {backgroundColor: "#565a5b"}}>
                        {image &&
                            <Cropper
                                className="cropper" 
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropSize={{width: 550, height: 200}}
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        }
                    </div>
                    <button 
                        className="backgroundPicEditorCancelButton" 
                        onClick={cancelHandler}
                    >
                        <Cancel />
                    </button>
                    <div className="backgroundPicEditorContainerSlider">
                        <Slider
                            size="large"
                            color="primary"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e, zoom) => setZoom(zoom)}
                        />
                    </div>
                </div>
                <div className="backgroundPicEditorContainerBottom">
                    <div className="backgroundPicEditorContainerButtons">
                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={inputRef} 
                            onChange={onSelectFile}
                            style={{display: "none"}} 
                        />
                        
                        <button 
                            className={`backgroundPicEditorContainerButton ${user.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`} 
                            onClick={() => setImage(null)}
                        >
                            Clear
                        </button>
                        <button 
                            className={`backgroundPicEditorContainerButton ${user.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`} 
                            onClick={filePopupHandler} 
                        >
                            + Upload
                        </button>
                        <button 
                            className={`backgroundPicEditorContainerButton ${user.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`}  
                            onClick={onUpload}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackgroundPicEditor;