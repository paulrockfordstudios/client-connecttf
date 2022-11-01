import React, { useState, useEffect, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { eFClose } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import "./EditPost.css";
import { Cancel, ArrowDropDown, AddAPhoto } from "@material-ui/icons";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import { energyIcon, spectrumIcon, visibilityIcon } from "../../../Utils/icons/icons";
import AudienceVisibilityDropdown from "../../Dropdowns/AudienceVisibilityDropdown/AudienceVisibilityDropdown";
import FlareTypeDropdown from "../../Dropdowns/FlareTypeDropdown/FlareTypeDropdown";
import {useDropzone} from 'react-dropzone';
import VisibilityIcon from "../../../Utils/icons/VisibilityIcon";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
   

function EditPost({ post }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const editor = useRef(); 
    const editPostRef = useRef();

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [files, setFiles] = useState([]);
    const [photos, setPhotos] = useState(post.photos);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState(post.description);
    const [ titleValue, setTitleValue ] = useState(post.title);
    const [ tagValue, setTagValue ] = useState(post.hashtags);
    const [ visible, setVisible ] = useState(post.access);
    const [ visDD, setVisDD ] = useState(false);
    const [ fKind, setFKind ] = useState(post.feed)
    const [ fTDD, setFTDD ] = useState(false);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ shareAct, setShareAct ] = useState(false);

    const colorTheme = user.unionName ? user.spectrum : user.energy;
    

    useEffect(() => {
        setFiles(files.concat(acceptedFiles));
        setImgDrop(false);
        setImgBtn(false);
    }, [acceptedFiles]);

    useEffect(() => {
        files.map((file) => {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            dataFiles.push(data);
            fileNames.push(fileName);
        });
    }, [files]);

    async function submitPost(event) {
        event.preventDefault();
        const newPost = user.unionName 
            ? { 
                feed: fKind,
                access: visible,
                title: titleValue, 
                description: value, 
                hashtags: tagValue, 
                photos: photos.concat(fileNames)
            }
            : { 
                feed: fKind,
                access: visible, 
                title: titleValue, 
                description: value, 
                hashtags: tagValue,
                photos: photos.concat(fileNames) 
            }
        if (dataFiles.length > 0) {
            try {
                await Promise.all(
                    dataFiles.map((df) => axios.post("/upload", df))
                )
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.put(`/posts/${post._id}`, newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const removePhotos = (idx2Rmv) => {
        setPhotos(photos.filter((_, index) => index !== idx2Rmv));
    };


    const removeFiles = (idx2Rmv) => {
        setFiles(files.filter((_, index) => index !== idx2Rmv));
    };

    const imgDZHandler = () => {
        if (imgDrop === false) {
            setImgDrop(true);
        } else if (imgDrop === true) {
            setImgBtn(true);
        }
    };

    const imgBtnHandler = (event) => {
        setFiles(files.concat(Array.from(event.target.files)));
        setImgDrop(false);
        setImgBtn(false);
    };

    const flareTypeHandler = () => {
        setFTDD(true)
        setImgDrop(false);
        setImgBtn(false);
    };

    const audienceVisibiltyHandler = () => {
        setVisDD(true)
        setImgDrop(false);
        setImgBtn(false);
    };

    const cancelHandler = () => {
        dispatch(eFClose())
    };

    const imgDZCancelHandler = () => {
        setImgDrop(false);
        setImgBtn(false);
    };


    return ReactDom.createPortal(
        <div className="editPostPortal">
            <div className={`editPostBackdropOverlay POPUP_BACKGROUND ${colorTheme}`} />
            <div className="editPostModal">
                <div className={`editPost flame ${colorTheme}`}>
                    <div className="editPost-container" >
                        <div className="editPostTop">
                            <div className="editPostTopUpper">
                                <img className="editPostLogo" src="/logo/ConnectTF-logo-Icon.png" alt="" />    
                                <span className="creatPostTitle">Edit Post</span>
                                {colorTheme === "rainbow" ||
                                colorTheme === "silver" ||
                                colorTheme === "gold" ||
                                colorTheme === "platinum" ||
                                colorTheme === "diamond" 
                                    ? <img 
                                        className={`editPostCancelPNGIcon ${colorTheme}`}  
                                        src={`/icons/cancel/cancel-${colorTheme}${cancelAct ? "-drk" : cancelHov ? "" : "-lgt"}.png`} 
                                        alt="" 
                                        onClick={cancelHandler}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <Cancel className={`editPostCancelSVGIcon ${colorTheme}`} onClick={cancelHandler}/>
                                }
                            </div>
                            <hr 
                                className={`editPostHr ${colorTheme}`} 
                                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}}
                            />
                            <div className="editPostTopLower">
                                <Link className="editPostLink" to={`/flame-profile/id/${user._id}`}>
                                    <img 
                                        className="editPostProfilePic" 
                                        src={user.unionName 
                                                ? user.unionProfilePicture
                                                    ? user.unionProfilePicture
                                                    : "/picBlanks/no-union-avatar.jpg"
                                                : user.profilePicture 
                                                    ? user.profilePicture
                                                    : "/picBlanks/no-avatar.jpg"
                                        } 
                                        alt="" 
                                    />
                                    <img 
                                        className="editPostProfileIcon" 
                                        src={user.unionName ? spectrumIcon(user.spectrum) : energyIcon(user.energy)} 
                                        alt="" 
                                    />
                                    <span className="editPostName">{user.profileName}</span>
                                </Link>
                                <div className="editPostDropdownBtns">
                                    <button 
                                        className={`editPostDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={flareTypeHandler}
                                    >
                                        <span className="editPostDropdownTitle feed">{`${fKind} Posts`}</span>
                                        <ArrowDropDown className="editPostDropdownIcon"/>
                                    </button>
                                    <button 
                                        className={`editPostDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={audienceVisibiltyHandler}
                                    >
                                        <div  className="editPostVisibilityIcon public">
                                            <VisibilityIcon 
                                                visible={visible} 
                                                primary={{fontSize: "18px"}}
                                                secondary={{fontSize: "12px"}}
                                            />
                                        </div>
                                        <span className="editPostDropdownTitle visibility">{visible}</span>
                                        <ArrowDropDown className="editPostDropdownIcon"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="editPostCenter">
                            <div className="editPostTitleEditorContainer">
                                <div 
                                    className={`editPostTitleHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover", opacity: ".3"}}
                                />
                                <div className="editPostTitleWhiteBackground" />
                                <div className={`editPostTitleEditor INNER_BOX_SHADOW ${colorTheme}`}>
                                    <input 
                                        className="editPostTitleEditorInput"
                                        type="text" 
                                        placeholder=" Add a title."
                                        onChange={(e) => setTitleValue(e.target.value)}
                                    />
                                    <span className="editPostTitleRequirementText">{"(Optional)"}</span>
                                </div>
                            </div>
                            <div 
                                className="editPostEditorContainerContainer editor">
                                <div 
                                    className={`editPostHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "100% 256px", opacity: ".3"}}
                                />
                                <div className="editPostWhiteBackground" />
                                <div className={`editPostEditor INNER_BOX_SHADOW ${colorTheme}`}>
                                    <div className="editPostEditorContainer" >
                                        <FlareTextEditor 
                                            value={value}
                                            setValue={setValue} 
                                            ph=" Write a description... "
                                        />
                                        <div className="editPostEditorContainerContainer imgDZ">
                                            <div className={`editPostHigherSpectrumBackground ${colorTheme}`} />
                                            <div
                                                className={`creatPostImgDropzoneContainer INNER_BOX_SHADOW ${colorTheme}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`editPostImgDZContainer ${colorTheme}`}
                                                >
                                                    {
                                                        colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img className="editPostImgDZBorder" src={`/misc/img-dz-border-${colorTheme}.png`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `editPostImgDropzone ${colorTheme}`})}>
                                                        <input {...getInputProps()} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    </div>
                                                    {
                                                        colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                            className={`editPostImgDZCancelPNGIcon ${colorTheme}`}  
                                                            src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <Cancel 
                                                                className={`editPostImgDZCancelSVGIcon ${colorTheme}`}
                                                                onClick={imgDZCancelHandler}
                                                            />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {photos.length > 0 ? (
                                            <div className="editPostImages-container">
                                                {photos.map((photo, index) => (
                                                    <div 
                                                        className={
                                                            `editPostImageContainer 
                                                            ${index === 0 ? "top" : ""}`
                                                        } 
                                                        key={index}
                                                    >
                                                        <img 
                                                            className="editPostImg" 
                                                            src={PF + photo}
                                                            alt="" 
                                                        />
                                                        {colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                                className={`editPostCancelImgPNGBtn ${colorTheme}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                                alt="" 
                                                                onClick={() => removePhotos(index)}
                                                            />
                                                            : <Cancel 
                                                                className={`editPostCancelImgSVGBtn ${colorTheme}`} 
                                                                onClick={() => removePhotos(index)}
                                                            />
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}     
                                        {files.length > 0 ? (
                                            <div className="editPostImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`editPostImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="editPostImg" src={URL.editObjectURL(file)} alt="" />
                                                        {colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                                className={`editPostCancelImgPNGBtn ${colorTheme}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <Cancel className={`editPostCancelImgSVGBtn ${colorTheme}`} onClick={() => removeFiles(index)}/>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}                                
                                    </div>
                                </div>
                            </div>
                            <div className="editPostHashtagEditor">
                                <HashtagEditor tagValue={tagValue} setTagValue={setTagValue} />
                            </div>
                        </div>
                        <hr 
                            className={`editPostHr ${colorTheme}`} 
                            style={
                                colorTheme === "diamond" 
                                    ? {
                                        backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                                        backgroundSize: "cover"
                                    } 
                                    : {}
                            }
                        />
                        <div className="editPostBottom">
                            <div className="editPostOptions">
                                <label htmlFor="file" className="editPostOption">
                                    <AddAPhoto className="editPostAddPhotoSVGIcon" onClick={imgDZHandler}/>
                                    {imgBtn === true &&
                                        <input 
                                            style={{display: "none"}} 
                                            type="file" 
                                            id="file" 
                                            multiple="multiple"
                                            accept="image/*" 
                                            onChange={(event) => imgBtnHandler(event)} 
                                        />
                                    }
                                </label>
                            </div>
                            <div className="editPostBottomRight">
                                <div 
                                    className={
                                        `editPostShareButtonBackground 
                                        ${colorTheme} 
                                        ${value === null || value === "" || value === "<p><br></p>" 
                                            ? "disabled" 
                                            : ""
                                        }`
                                    } 
                                    style={colorTheme === "diamond"
                                        ? {backgroundImage: `url(/misc/${colorTheme}-background${shareAct ? "-drk" : ""}.jpg)`, backgroundSize: "cover"} 
                                        : {}
                                    }
                                >
                                    <button 
                                        className={`
                                            editPostShareButton 
                                            ${value === null || value === "" || value === "<p><br></p>" 
                                                ? "disabled" 
                                                : colorTheme
                                            }`
                                        } 
                                        disabled={
                                            value === null || value === "" || value === "<p><br></p>" 
                                                ? true 
                                                : false
                                            }
                                        type="button|submit|reset" 
                                        onClick={submitPost}
                                        onMouseDown={() => setShareAct(true)}
                                        onMouseUp={() => setShareAct(false)}
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FlareTypeDropdown
                        type={"Post"} 
                        fKind={fKind} 
                        setFKind={setFKind}
                        fTDD={fTDD}
                        setFTDD={setFTDD}
                    />
                    <AudienceVisibilityDropdown
                        type={"Post"} 
                        visible={visible} 
                        setVisible={setVisible}
                        visDD={visDD}
                        setVisDD={setVisDD}
                    />
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default EditPost;