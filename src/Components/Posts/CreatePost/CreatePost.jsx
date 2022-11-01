import React, { useState, useEffect, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cPClose } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import "./CreatePost.css";
import { Cancel, ArrowDropDown, AddAPhoto } from "@material-ui/icons";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import { energyIcon, spectrumIcon, visibilityIcon } from "../../../Utils/icons/icons";
import AudienceVisibilityDropdown from "../../Dropdowns/AudienceVisibilityDropdown/AudienceVisibilityDropdown";
import FlareTypeDropdown from "../../Dropdowns/FlareTypeDropdown/FlareTypeDropdown";
import {useDropzone} from 'react-dropzone';
import VisibilityIcon from "../../../Utils/icons/VisibilityIcon";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
   

function CreatePost() {

    
    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const editor = useRef(); 
    const createPostRef = useRef();

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [files, setFiles] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState("");
    const [ titleValue, setTitleValue ] = useState("");
    const [ tagValue, setTagValue ] = useState([]);
    const [ visible, setVisible ] = useState("Public");
    const [ visDD, setVisDD ] = useState(false);
    const [ fKind, setFKind ] = useState("Journey")
    const [ fTDD, setFTDD ] = useState(false);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ shareAct, setShareAct ] = useState(false);
    const [ error1, setError1 ] = useState(true);

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


    async function handleSubmit(event) {
        event.preventDefault();
        const newPost = user.unionName 
            ? { 
                unionId: union._id, 
                union: true,
                feed: fKind,
                access: visible,
                title: titleValue, 
                description: value, 
                hashtags: tagValue, 
                photos: fileNames
            }
            : { 
                userId: user._id,
                union: false,
                feed: fKind,
                access: visible, 
                title: titleValue, 
                description: value, 
                hashtags: tagValue,
                photos: fileNames 
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
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
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
        dispatch(cPClose())
    };

    const imgDZCancelHandler = () => {
        setImgDrop(false);
        setImgBtn(false);
    };


    return ReactDom.createPortal(
        <div className="createPostPortal">
            <div className={`createPostBackdropOverlay POPUP_BACKGROUND ${colorTheme}`} />
            <div className="createPostModal">
                <div className={`createPost flame ${colorTheme}`}>
                    <div className="createPost-container" >
                        <div className="createPostTop">
                            <div className="createPostTopUpper">
                                <img className="createPostLogo" src="/logo/ConnectTF-logo-Icon.png" alt="" />    
                                <span className="creatPostTitle">Create Post</span>
                                {colorTheme === "rainbow" ||
                                colorTheme === "silver" ||
                                colorTheme === "gold" ||
                                colorTheme === "platinum" ||
                                colorTheme === "diamond" 
                                    ? <img 
                                        className={`createPostCancelPNGIcon ${colorTheme}`}  
                                        src={`/icons/cancel/cancel-${colorTheme}${cancelAct ? "-drk" : cancelHov ? "" : "-lgt"}.png`} 
                                        alt="" 
                                        onClick={cancelHandler}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <Cancel className={`createPostCancelSVGIcon ${colorTheme}`} onClick={cancelHandler}/>
                                }
                            </div>
                            <hr 
                                className={`createPostHr ${colorTheme}`} 
                                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}}
                            />
                            <div className="createPostTopLower">
                                <Link className="createPostLink" to={`/flame-profile/id/${user._id}`}>
                                    <img 
                                        className="createPostProfilePic" 
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
                                        className="createPostProfileIcon" 
                                        src={user.unionName ? spectrumIcon(user.spectrum) : energyIcon(user.energy)} 
                                        alt="" 
                                    />
                                    <span className="createPostName">{user.profileName}</span>
                                </Link>
                                <div className="createPostDropdownBtns">
                                    <button 
                                        className={`createPostDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={flareTypeHandler}
                                    >
                                        <span className="createPostDropdownTitle feed">{`${fKind} Posts`}</span>
                                        <ArrowDropDown className="createPostDropdownIcon"/>
                                    </button>
                                    <button 
                                        className={`createPostDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={audienceVisibiltyHandler}
                                    >
                                        <div  className="createPostVisibilityIcon public">
                                            <VisibilityIcon 
                                                visible={visible} 
                                                primary={{fontSize: "18px"}}
                                                secondary={{fontSize: "12px"}}
                                            />
                                        </div>
                                        <span className="createPostDropdownTitle visibility">{visible}</span>
                                        <ArrowDropDown className="createPostDropdownIcon"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="createPostCenter">
                            <div className="createPostTitleEditorContainer">
                                <div 
                                    className={`createPostTitleHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover", opacity: ".3"}}
                                />
                                <div className="createPostTitleWhiteBackground" />
                                <div className={`createPostTitleEditor INNER_BOX_SHADOW ${colorTheme}`}>
                                    <input 
                                        className="createPostTitleEditorInput"
                                        type="text" 
                                        placeholder=" Add a title."
                                        onChange={(e) => setTitleValue(e.target.value)}
                                    />
                                    <span className="createPostTitleRequirementText">{"(Optional)"}</span>
                                </div>
                            </div>
                            <div 
                                className="createPostEditorContainerContainer editor">
                                <div 
                                    className={`createPostHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "100% 256px", opacity: ".3"}}
                                />
                                <div className="createPostWhiteBackground" />
                                <div className={`createPostEditor INNER_BOX_SHADOW ${colorTheme}`}>
                                    <div className="createPostEditorContainer" >
                                        <FlareTextEditor
                                            setValue={setValue} 
                                            ph=" Write a description... "
                                        />
                                        <div className="createPostEditorContainerContainer imgDZ">
                                            <div className={`createPostHigherSpectrumBackground ${colorTheme}`} />
                                            <div
                                                className={`creatPostImgDropzoneContainer INNER_BOX_SHADOW ${colorTheme}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`createPostImgDZContainer ${colorTheme}`}
                                                >
                                                    {
                                                        colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img className="createPostImgDZBorder" src={`/misc/img-dz-border-${colorTheme}.png`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `createPostImgDropzone ${colorTheme}`})}>
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
                                                            className={`createPostImgDZCancelPNGIcon ${colorTheme}`}  
                                                            src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <Cancel 
                                                                className={`createPostImgDZCancelSVGIcon ${colorTheme}`}
                                                                onClick={imgDZCancelHandler}
                                                            />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="createPostImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`createPostImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="createPostImg" src={URL.createObjectURL(file)} alt="" />
                                                        {colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                                className={`createPostCancelImgPNGBtn ${colorTheme}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <Cancel className={`createPostCancelImgSVGBtn ${colorTheme}`} onClick={() => removeFiles(index)}/>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}                                
                                    </div>
                                </div>
                            </div>
                            <div className="createPostHashtagEditor">
                                <HashtagEditor setTagValue={setTagValue} />
                            </div>
                        </div>
                        <hr 
                            className={`createPostHr ${colorTheme}`} 
                            style={
                                colorTheme === "diamond" 
                                    ? {
                                        backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                                        backgroundSize: "cover"
                                    } 
                                    : {}
                            }
                        />
                        <div className="createPostBottom">
                            <div className="createPostOptions">
                                <label htmlFor="file" className="createPostOption">
                                    <AddAPhoto className="createPostAddPhotoSVGIcon" onClick={imgDZHandler}/>
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
                            <div className="createPostBottomRight">
                                <div 
                                    className={
                                        `createPostShareButtonBackground 
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
                                            createPostShareButton 
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
                                        onClick={handleSubmit}
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

export default CreatePost;