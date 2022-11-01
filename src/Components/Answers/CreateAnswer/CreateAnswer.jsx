import React, { useEffect, useState, useRef, memo, useContext, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import "./CreateAnswer.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel, AddAPhoto } from "@material-ui/icons";
import ReactQuill from "react-quill";
import "../../../../node_modules/react-quill/dist/quill.bubble.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import TextEditorToolbar, { modules, formats } from "../../../Utils/TextEditorToolbar";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";

function CreateAnswer({ user }) {

    const description = useRef();
    const focusRef = useRef();
    const quillRef = useRef();

    const { id } = useParams();

    //const { user: currentUser } = useContext(AuthContext);
    const { user: currentUser, flame: currentFlame } = useSelector((state) => state.auth);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [ value, setValue ] = useState("");
    const [state, setState] = useState({ value: null });
    const [ pH, setPH ] = useState("")
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ author, setAuthor ] =useState(JSON.parse(localStorage.getItem("author")))
    const [ tagValue, setTagValue ] = useState([]);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ eHeight, setEHeight ] = useState(20)
   
    const colorTheme = currentUser.unionName ? currentUser.spectrum : currentUser.energy;
    
    useEffect(() => {
        //if (currentUser.unionName) {
            const getDims = () => {
                const displayHeight = quillRef.current.clientHeight;
                setEHeight(displayHeight);
            }
            getDims();
       // }
    }, [value]);

console.log(eHeight)

    const handleChange = value => {
        setState({ value });
    };

    useEffect(() => {
        setAuthor(JSON.parse(localStorage.getItem("author")))
    }, [])

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newAnswer = currentUser.unionName
            ? { unionId: currentUser._id, AnswerId: id, description: value, hashtags: tagValue, union: true}
            : { userId: currentUser._id, AnswerId: id, description: value, hashtags: tagValue, union: false}
        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newAnswer.photos = fileName;
            console.log(fileName)
            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log(err);
            }
        }
        try {
            await axios.post("/answers", newAnswer);
            currentUser.unionName
                ? await axios.put(`/questions/${id}/unionAnswer`, {unionId: currentUser._id})
                : await axios.put(`/questions/${id}/flameAnswer`, {userId: currentUser._id})
            window.location.reload();
        } catch(err) {
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

    const imgDZCancelHandler = () => {
        setImgDrop(false);
        setImgBtn(false);
    };

    /*
    const handleFocusRef = () => {
        if (focusRef) {
        focusRef.current.focus();
        }
    }
    */
    console.log(value)
    
    
    return (
        <>
        {author !== undefined &&
        <div className={`createAnswer ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
            {/*<form className="createAnswer-container" onSubmit="return false;">*/}
            <div className="createAnswer-container">
                <div className="createAnswerTop">
                    {currentUser.unionName
                        ? <img className="createAnswerProfilePic" src={currentUser.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                        : <img className="createAnswerProfilePic" src={currentUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                    }
                    <div className="createAnswerEditorsContainer">
                        <div className="createAnswerTextEditorWrapper">
                            
                            
                            <div className="text-editor">
                            <div 
                                className="createAnswerEditorContainerContainer editor"
                                style={{height: `${eHeight + 16}px`}}
                            >
                                <div 
                                    className={`createAnswerHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "100% 256px", opacity: ".3"}}
                                />
                                <div 
                                    className="createAnswerWhiteBackground" 
                                    
                                />
                                <div 
                                    className={`createAnswerEditor INNER_BOX_SHADOW ${colorTheme}`}
                                    
                                >
                                    <div className="createAnswerEditorContainer" ref={quillRef} >
                                        <FlareTextEditor
                                            setValue={setValue} 
                                        />
                                        
                                        {files.length > 0 ? (
                                            <div className="createAnswerImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`createAnswerImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="createAnswerImg" src={URL.createObjectURL(file)} alt="" />
                                                        {colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                                className={`createAnswerCancelImgPNGBtn ${colorTheme}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <Cancel className={`createAnswerCancelImgSVGBtn ${colorTheme}`} onClick={() => removeFiles(index)}/>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}                                
                                    </div>
                                </div>
                            </div>
                           
                                
                                {value === null || value === "" || value === "<p><br></p>" ?
                                    (
                                        <>
                                            <label className="editorPlaceHolder">
                                                <span className="editorPlaceHolderText intangible">{"Do you have an answer for "}</span>
                                                <>
                                                    {user ?
                                                        (
                                                            <>
                                                                {user._id === currentUser._id || user._id === currentFlame._id?
                                                                    (
                                                                        <span className="editorPlaceHolderText intangible grey">{"your own"}</span> 
                                                                    ) : (   
                                                                        <>
                                                                            {user.unionName 
                                                                                ? <Link to={`/union-profile/${user.unionName}`}>
                                                                                    <span className={`editorPlaceHolderText tangible ${user.spectrum}`}>
                                                                                        {`${user.profileName}'s`}
                                                                                    </span>
                                                                                </Link>
                                                                                : <Link to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.userName}`}>
                                                                                    <span className={`editorPlaceHolderText tangible ${user.isAnonymous ? "grey" : user.energy}`}>
                                                                                        {`${user.isAnonymous ? "Anonymous" : user.firstName}'s`}
                                                                                    </span>
                                                                                </Link>
                                                                            }
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        ) : (
                                                            <span className="editorPlaceHolderText intangible grey">{"the questioner's"}</span> 
                                                        )
                                                    }
                                                </>
                                                <span className="editorPlaceHolderText intangible">{" question, "}</span>
                                                <Link to={`/flame-profile/userName/${currentFlame.userName}`}>
                                                    <span className={`editorPlaceHolderText tangible ${currentFlame.energy}`}>
                                                        {`${currentFlame.firstName} `}
                                                    </span>
                                                </Link>
                                                <>{currentUser.unionName && <span className="editorPlaceHolderText intangible">{" of "}</span>}</>
                                                <>
                                                    {currentUser.unionName && 
                                                        <Link to={`/union-profile/${currentUser.unionName}`}>
                                                            <span className={`editorPlaceHolderText tangible ${currentUser.spectrum}`}>
                                                                {`${currentUser.profileName} `}
                                                            </span>
                                                        </Link>
                                                    }
                                                </>
                                                <span className="editorPlaceHolderText intangible">{"?"}</span>
                                            </label>
                                        </>
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {currentUser.unionName ?
                    (
                        <>
                            {currentUser.spectrum === "diamond" ?
                                (
                                    <>
                                        <img className="createAnswerHrDiamond" src="/misc/diamond-sparkle.jpg" alt=""/>
                                    </>
                                ) : (
                                    <>
                                        <hr className={`createAnswerHr ${currentUser.spectrum}`} />
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <hr className={`createAnswerHr ${currentUser.energy}`} />
                        </>
                    )
                }
                {file && (
                    <div className="createAnswerImages-container">
                        <img className="createAnswerImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className='createAnswerCancelImgBtn' onClick={() => setFile(null)} />
                    </div>
                )}
                <div className="createAnswerBottom">
                    <div className="createAnswerOptions">
                        <label htmlFor="file" className="createAnswerOption">
                            <AddAPhoto className="createAnswerIcon" />
                            <input 
                                style={{display: "none"}} 
                                type="file" 
                                id="file" 
                                accept=".png,.jpeg,.jpg" onChange={(event) => setFile(event.target.files[0])} 
                            />
                        </label>
                    </div>
                    {currentUser.unionName ?
                        (
                            <>
                                {currentUser.spectrum === "diamond" ? 
                                    (
                                        <>
                                            <button className="createAnswerShareButton" style={{backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover"}} type="submit"><span className="caDiamondText">Answer</span></button>
                                        </>
                                    ) : (
                                        <>  
                                            <button className={`createAnswerShareButton ${currentUser.spectrum}`} type="submit">Answer</button>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <button className={`createAnswerShareButton ${currentUser.energy}`} type="submit" onClick={handleSubmit}>Answer</button>
                            </>
                        )
                    }
                </div>
            </div>
            {/*</form>*/}
        </div>
}
                </>
    )
}

export default CreateAnswer;