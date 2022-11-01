import React, { useState, useEffect, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cQNClose } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import "./CreateQuestion.css";
import { Cancel, ArrowDropDown, AddAPhoto } from "@material-ui/icons";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import { energyIcon, spectrumIcon, visibilityIcon } from "../../../Utils/icons/icons";
import AudienceVisibilityDropdown from "../../Dropdowns/AudienceVisibilityDropdown/AudienceVisibilityDropdown";
import FlareTypeDropdown from "../../Dropdowns/FlareTypeDropdown/FlareTypeDropdown";
import {useDropzone} from 'react-dropzone';
import VisibilityIcon from "../../../Utils/icons/VisibilityIcon";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
   

function CreateQuestion() {

    
    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const editor = useRef(); 
    const createQuestionRef = useRef();

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [files, setFiles] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState();
    const [ titleValue, setTitleValue ] = useState("");
    const [ tagValue, setTagValue ] = useState([]);
    const [ visible, setVisible ] = useState(user.defaultAudience ? user.defaultAudience : "Public");
    const [ visDD, setVisDD ] = useState(false);
    const [ defaultVis, setDefaultVis ] = useState(false);
    const [ defaultFT, setDefaultFT ] = useState(false);
    const [ feed, setFeed ] = useState(user.defaultFeed ? user.defaultFeed : "Journey")
    const [ fTDD, setFTDD ] = useState(false);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ shareAct, setShareAct ] = useState(false);
    const [ error1, setError1 ] = useState(false);
    const [ error2, setError2 ] = useState(false);
    const [ error3, setError3 ] = useState(false);
    const [ error4, setError4 ] = useState(false);
    const [ initDefAud, setInitDefAud ] = useState("");

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        setInitDefAud(user.defaultAudience);
    }, []);
    
    
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

console.log(defaultVis)
console.log(initDefAud)

    async function submitQuestion(event) {
        event.preventDefault();
        let updateDefaults;
        const newQuestion = user.unionName 
            ? { 
                unionId: union._id, 
                union: true,
                feed: feed,
                access: visible,
                title: titleValue, 
                description: value, 
                hashtags: tagValue, 
                photos: fileNames,
            }
            : { 
                userId: user._id,
                union: false,
                feed: feed,
                access: visible, 
                title: titleValue, 
                description: value, 
                hashtags: tagValue,
                photos: fileNames 
            }
        if (user.defaultAudience !== initDefAud && defaultFT === true) {
            updateDefaults = user.unionName 
                ? {
                    unionId: union._id,
                    defaultAudience: visible, 
                    defaultFeed: feed
                }
                : {
                    userId: user._id,
                    defaultAudience: visible, 
                    defaultFeed: feed
                }
        }
        if (user.defaultAudience !== initDefAud) {   
            updateDefaults = user.unionName
                ? {unionId: union._id, defaultAudience: visible}
                : {userId: user._id, defaultAudience: visible}
        }
        if (defaultFT === true) {   
            updateDefaults = user.unionName
                ? {unionId: union._id, defaultFeed: feed}
                : {userId: user._id, defaultFeed: feed}
        }
        if (user.defaultAudience !== initDefAud || defaultFT === true) {
            try {
                await axios.put(
                    `/${user.unionName ? "unions" : "users"}/${user.unionName ? union._id : user._id}`, 
                    updateDefaults
                );
            } catch (err) {
                console.log(err);
            }
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
            await axios.post("/questions", newQuestion);
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

    function startsWithCapital(str){
        return str.charAt(0) === str.charAt(0).toUpperCase()
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
        dispatch(cQNClose())
    };

    const imgDZCancelHandler = () => {
        setImgDrop(false);
        setImgBtn(false);
    };


    const handleSubmit = (event) => {
        if (titleValue[titleValue.length - 1] !== "?") {
            if (titleValue[titleValue.length - 2] === "?" && titleValue[titleValue.length - 1] === " ") {
                if (titleValue[0] === " ") {
                    setError1(false);
                    setError2(false);
                    setError4(false);
                    setError3(true);
                } else if (!startsWithCapital(titleValue)) {
                    setError1(false);
                    setError2(false);
                    setError3(false);
                    setError4(true);
                } else if (!titleValue.includes(" ") || !titleValue.substring(0, titleValue.length - 2).includes(" ")) {
                    setError1(false);
                    setError3(false);
                    setError4(false);
                    setError2(true);
                } else {
                    setError1(false);
                    setError2(false);
                    setError3(false);
                    setError4(false);
                    submitQuestion(event);
                }
            } else {
                setError2(false);
                setError3(false);
                setError4(false);
                setError1(true);
            }
        } else {
            if (titleValue[0] === " ") {
                setError1(false);
                setError2(false);
                setError4(false);
                setError3(true);
            } else if (!startsWithCapital(titleValue)) {
                setError1(false);
                setError2(false);
                setError3(false);
                setError4(true);
            } else if (!titleValue.includes(" ") || !titleValue.substring(0, titleValue.length - 2).includes(" ")) {
                setError1(false);
                setError3(false);
                setError4(false);
                setError2(true);
            } else {
                setError1(false)
                setError2(false);
                setError3(false);
                setError4(false);
                submitQuestion(event);
            }
        }
    };

    


    return ReactDom.createPortal(
        <div className="createQuestionPortal">
            <div className={`createQuestionBackdropOverlay POPUP_BACKGROUND ${colorTheme}`} />
            <div className="createQuestionModal">
                <div className={`createQuestion flame ${colorTheme}`}>
                    <div className="createQuestion-container" >
                        <div className="createQuestionTop">
                            <div className="createQuestionTopUpper">
                                <img className="createQuestionLogo" src="/logo/ConnectTF-logo-Icon.png" alt="" />    
                                <span className="creatQuestionTitle">Create Question</span>
                                {colorTheme === "rainbow" ||
                                colorTheme === "silver" ||
                                colorTheme === "gold" ||
                                colorTheme === "platinum" ||
                                colorTheme === "diamond" 
                                    ? <img 
                                        className={`createQuestionCancelPNGIcon ${colorTheme}`}  
                                        src={`/icons/cancel/cancel-${colorTheme}${cancelAct ? "-drk" : cancelHov ? "" : "-lgt"}.png`} 
                                        alt="" 
                                        onClick={cancelHandler}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <Cancel className={`createQuestionCancelSVGIcon ${colorTheme}`} onClick={cancelHandler}/>
                                }
                            </div>
                            <hr 
                                className={`createQuestionHr ${colorTheme}`} 
                                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}}
                            />
                            <div className="createQuestionTopLower">
                                <Link className="createQuestionLink" to={`/flame-profile/id/${user._id}`}>
                                    <img 
                                        className="createQuestionProfilePic" 
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
                                        className="createQuestionProfileIcon" 
                                        src={user.unionName ? spectrumIcon(user.spectrum) : energyIcon(user.energy)} 
                                        alt="" 
                                    />
                                    <span className="createQuestionName">{user.profileName}</span>
                                </Link>
                                <div className="createQuestionDropdownBtns">
                                    <button 
                                        className={`createQuestionDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={flareTypeHandler}
                                    >
                                        <span className="createQuestionDropdownTitle feed">{`${feed} Questions`}</span>
                                        <ArrowDropDown className="createQuestionDropdownIcon"/>
                                    </button>
                                    <button 
                                        className={`createQuestionDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={audienceVisibiltyHandler}
                                    >
                                        <div  className="createQuestionVisibilityIcon public">
                                            <VisibilityIcon 
                                                visible={visible} 
                                                primary={{fontSize: "18px"}}
                                                secondary={{fontSize: "12px"}}
                                            />
                                        </div>
                                        <span className="createQuestionDropdownTitle visibility">{visible}</span>
                                        <ArrowDropDown className="createQuestionDropdownIcon"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="createQuestionCenter">
                            <div className="createQuestionTitleEditorContainer">
                                <div 
                                    className={`createQuestionTitleHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover", opacity: ".3"}}
                                />
                                <div className="createQuestionTitleWhiteBackground" />
                                <div 
                                    className={`createQuestionTitleEditor INNER_BOX_SHADOW ${colorTheme}`}
                                    style={
                                        error1 || 
                                        error2 || 
                                        error3 || 
                                        error4
                                            ? {border: "2px solid red", width: "606px", height: "44px"} 
                                            : {width: "610px", height: "48px"}
                                        }
                                >
                                    <input 
                                        className="createQuestionTitleEditorInput"
                                        required
                                        type="text" 
                                        placeholder="What is your question?"
                                        onChange={(e) => setTitleValue(e.target.value)}
                                    />
                                    <span 
                                        className="createQuestionTitleRequirementText"
                                        style={
                                            error1 || 
                                            error2 || 
                                            error3 || 
                                            error4 
                                                ? {color: "red", fontWeight: "500"} 
                                                : {color: "#aeb4b7"}
                                        }
                                    >
                                        {"(Required)"}
                                    </span>
                                </div>
                            </div>
                            <div 
                                className="createQuestionEditorContainerContainer editor">
                                <div 
                                    className={`createQuestionHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "100% 256px", opacity: ".3"}}
                                />
                                <div 
                                    className="createQuestionWhiteBackground" 
                                    
                                />
                                <div 
                                    className={`createQuestionEditor INNER_BOX_SHADOW ${colorTheme}`}
                                    
                                >
                                    <div className="createQuestionEditorContainer" >
                                        <FlareTextEditor 
                                            setValue={setValue} 
                                            ph={<span>{" Write a description... "}<span className="phRequirementText">{"(Optional)"}</span></span>}
                                        />
                                        <div className="createQuestionEditorContainerContainer imgDZ">
                                            <div className={`createQuestionHigherSpectrumBackground ${colorTheme}`} />
                                            <div
                                                className={`creatQuestionImgDropzoneContainer INNER_BOX_SHADOW ${colorTheme}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`createQuestionImgDZContainer ${colorTheme}`}
                                                >
                                                    {
                                                        colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img className="createQuestionImgDZBorder" src={`/misc/img-dz-border-${colorTheme}.png`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `createQuestionImgDropzone ${colorTheme}`, name: "dropzone"})}>
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
                                                            className={`createQuestionImgDZCancelPNGIcon ${colorTheme}`}  
                                                            src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <Cancel 
                                                                className={`createQuestionImgDZCancelSVGIcon ${colorTheme}`}
                                                                onClick={imgDZCancelHandler}
                                                            />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="createQuestionImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`createQuestionImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="createQuestionImg" src={URL.createObjectURL(file)} alt="" />
                                                        {colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                                className={`createQuestionCancelImgPNGBtn ${colorTheme}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <Cancel className={`createQuestionCancelImgSVGBtn ${colorTheme}`} onClick={() => removeFiles(index)}/>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}                                
                                    </div>
                                </div>
                            </div>
                            <div className="createQuestionHashtagEditor">
                                <HashtagEditor setTagValue={setTagValue} />
                            </div>
                        </div>
                        <hr 
                            className={`createQuestionHr ${colorTheme}`} 
                            style={
                                colorTheme === "diamond" 
                                    ? {
                                        backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                                        backgroundSize: "cover"
                                    } 
                                    : {}
                            }
                        />
                        <div className="createQuestionBottom">
                            <div className="createQuestionOptions">
                                <label htmlFor="file" className="createQuestionOption">
                                    <AddAPhoto className="createQuestionAddPhotoSVGIcon" onClick={imgDZHandler}/>
                                    {imgBtn === true &&
                                        <input 
                                            style={{display: "none"}} 
                                            type="file" 
                                            id="file" 
                                            name="photosBtn"
                                            multiple="multiple"
                                            accept="image/*" 
                                            onChange={(event) => imgBtnHandler(event)} 
                                        />
                                    }
                                </label>
                            </div>
                            <div className="createQuestionBottomRight">
                                {error1 && 
                                    <span className="createQuestionError">
                                        Your question must be in the form of a question.
                                    </span>
                                }
                                {error2 && 
                                    <span className="createQuestionError">
                                        Your question must be longer than 1 word.
                                    </span>
                                }
                                {error3 && 
                                    <span className="createQuestionError">
                                        Your question can NOT start with a space.
                                    </span>
                                }
                                {error4 && 
                                    <span className="createQuestionError">
                                        The first Letter of your question must be Capitalized.
                                    </span>
                                }
                                <div 
                                    className={
                                        `createQuestionShareButtonBackground 
                                        ${colorTheme} 
                                        ${titleValue.length === 0 ? "disabled" : ""}`
                                    } 
                                    style={colorTheme === "diamond"
                                        ? {backgroundImage: `url(/misc/${colorTheme}-background${shareAct ? "-drk" : ""}.jpg)`, backgroundSize: "cover"} 
                                        : {}
                                    }
                                >
                                    <button 
                                        className={`createQuestionShareButton ${titleValue.length === 0 ? "disabled" : colorTheme}`} 
                                        disabled={titleValue.length === 0 ? true : false}
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
                        type={"Question"} 
                        feed={feed} 
                        setFeed={setFeed}
                        fTDD={fTDD}
                        setFTDD={setFTDD}
                        defaultFT={defaultFT}
                        setDefaultFT={setDefaultFT}
                    />
                    <AudienceVisibilityDropdown
                        type={"Question"} 
                        feed={feed}
                        visible={visible} 
                        setVisible={setVisible}
                        visDD={visDD}
                        setVisDD={setVisDD}
                        defaultVis={defaultVis}
                        setDefaultVis={setDefaultVis}
                    />
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default CreateQuestion;