import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { newFlameAvatar, newUnionAvatar, pAEClose } from "../../../Redux/AuthSlice";
import axios from "axios";
import "./AvatarEditor.css";
import Cropper from "react-easy-crop";
import { Slider } from "@material-ui/core";
import getCroppedImg from "../../../Utils/photoEditor/cropImage";
import { dataURLtoFile } from "../../../Utils/photoEditor/dataURLtoFile";
import { Cancel } from '@material-ui/icons';





function AvatarEditor() {

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
        const updateAvatar = user.unionName
            ? {unionId: user._id}
            : {userId: user._id}
        const canvas = await getCroppedImg(image, croppedArea);
        const canvasDataURL = canvas.toDataURL("image/jpg");
        const convertedURLToFile = dataURLtoFile(canvasDataURL, "avatar.jpg")
        const fileData = new FormData();
        const fileName = Date.now() + user._id + convertedURLToFile.name;
        fileData.append("name", fileName);
        fileData.append("file", convertedURLToFile);
        user.unionName ? updateAvatar.unionProfilePicture = PF + fileName : updateAvatar.profilePicture = PF + fileName;
        try {
            await axios.post("/upload", fileData);
        } catch (err) {
            console.log(err);
        }
        if (user.unionName) {
            try {
                await axios.put(`/unions/${user._id}`, updateAvatar);
                dispatch(newUnionAvatar(updateAvatar.unionProfilePicture));
                localStorage.setItem("user", JSON.stringify({...user, unionProfilePicture: updateAvatar.unionProfilePicture}));
                localStorage.setItem("union", JSON.stringify({...user, unionProfilePicture: updateAvatar.unionProfilePicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axios.put(`/users/${user._id}`, updateAvatar);
                dispatch(newFlameAvatar(updateAvatar.profilePicture));
                localStorage.setItem("user", JSON.stringify({...user, profilePicture: updateAvatar.profilePicture}));
                localStorage.setItem("flame", JSON.stringify({...user, profilePicture: updateAvatar.profilePicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            } 
        }
        
    };

    console.log(user)

    const cancelHandler = () => {
        dispatch(pAEClose())
    }

    return (
        <div className="avatarEditor">
            <div className="avatarEditorContainer">
                <div className="avatarEditorContainerTop">
                    <div className="avatarEditorContainerCropper" style={image ? {backgroundColor: "#aeb4b7"} : {backgroundColor: "#565a5b"}}>
                        {image &&
                            <Cropper
                                className="cropper" 
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        }
                    </div>
                    {!image && <img className="avatarEditorBlankAvatar" src={`/picBlanks/no${user.unionName ? "-union" : ""}-avatar.jpg`} alt="" />}
                    <button 
                        className="avatarEditorCancelButton" 
                        onClick={cancelHandler}
                    >
                        <Cancel />
                    </button>
                    <div className="avatarEditorContainerSlider">
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
                <div className="avatarEditorContainerBottom">
                    {user.unionName ?
                        (
                            <>
                                {user.spectrum === "rainbow" ||
                                 user.spectrum === "silver" ||
                                 user.spectrum === "gold" ||
                                 user.spectrum === "platinum" ||
                                 user.spectrum === "diamond" ?
                                    (
                                        <div className="avatarEditorContainerButtons">
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                ref={inputRef} 
                                                onChange={onSelectFile}
                                                style={{display: "none"}} 
                                            />
                                            <button 
                                                className={
                                                    `avatarEditorContainerButton base left
                                                    ${user.spectrum ? user.spectrum : "gray"}`
                                                } 
                                                onClick={() => setImage(null)}
                                            >
                                                <span
                                                    className={
                                                        `avatarEditorContainerButton font left
                                                        ${user.spectrum ? user.spectrum : "gray"}`
                                                    } 
                                                >
                                                    Clear
                                                </span>
                                            </button>
                                            <button 
                                                className={
                                                    `avatarEditorContainerButton base middle
                                                    ${user.spectrum ? user.spectrum : "gray"}`
                                                } 
                                                onClick={filePopupHandler} 
                                            >
                                                <span
                                                    className={
                                                        `avatarEditorContainerButton font middle
                                                        ${user.spectrum ? user.spectrum : "gray"}`
                                                    } 
                                                >
                                                    + Upload
                                                </span>
                                            </button>
                                            <button 
                                                className={
                                                    `avatarEditorContainerButton base right
                                                    ${user.spectrum ? user.spectrum : "gray"}`
                                                }  
                                                onClick={onUpload}
                                            >
                                                <span
                                                    className={
                                                        `avatarEditorContainerButton font right
                                                        ${user.spectrum ? user.spectrum : "gray"}`
                                                    } 
                                                >
                                                    Save
                                                </span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="avatarEditorContainerButtons">
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                ref={inputRef} 
                                                onChange={onSelectFile}
                                                style={{display: "none"}} 
                                            />
                                            
                                            <button 
                                                className={
                                                    `avatarEditorContainerButton base left
                                                    ${user.spectrum ? user.spectrum : "gray"}`
                                                } 
                                                onClick={() => setImage(null)}
                                            >
                                                Clear
                                            </button>
                                            <button 
                                                className={
                                                    `avatarEditorContainerButton base middle
                                                    ${user.spectrum ? user.spectrum : "gray"}`
                                                } 
                                                onClick={filePopupHandler} 
                                            >
                                                + Upload
                                            </button>
                                            <button 
                                                className={
                                                    `avatarEditorContainerButton base right
                                                    ${user.spectrum ? user.spectrum : "gray"}`
                                                }  
                                                onClick={onUpload}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <div className="avatarEditorContainerButtons">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    ref={inputRef} 
                                    onChange={onSelectFile}
                                    style={{display: "none"}} 
                                />
                                
                                <button 
                                    className={
                                        `avatarEditorContainerButton base left
                                        ${user.energy ? user.energy : "gray"}`
                                    } 
                                    onClick={() => setImage(null)}
                                >
                                    Clear
                                </button>
                                <button 
                                    className={
                                        `avatarEditorContainerButton base middle
                                        ${user.energy ? user.energy : "gray"}`
                                    } 
                                    onClick={filePopupHandler} 
                                >
                                    + Upload
                                </button>
                                <button 
                                    className={
                                        `avatarEditorContainerButton base right
                                        ${user.energy ? user.energy : "gray"}`
                                    }  
                                    onClick={onUpload}
                                >
                                    Save
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AvatarEditor;