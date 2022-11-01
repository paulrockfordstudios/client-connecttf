import React, { component, useState, useRef, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import "./CreateReply.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";


   

function CreateReply({ prompt, promptId, rCntNum}) {

    const editor = useRef();
    const description = useRef();

    const { id } = useParams();

    const { user: currentUser } = useSelector((state) => state.auth);
    
    

    const [ file, setFile ] = useState(null);
    const [ rCount, setRCount ] = useState("one");
    const [ cntRender, setCntRender ] = useState(false);
    //const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty());

    

    
    useEffect(() => {
        const rCountHandler = () => {
            if(rCntNum) {
                switch(rCntNum) {
                    case 2:
                        setRCount("two");
                        setCntRender(true);
                        break;
                    case 3:
                        setRCount("three");
                        setCntRender(true);
                        break;
                    case 4:
                        setRCount("four");
                        setCntRender(true);
                        break;
                    default:
                        setRCount("one");
                        setCntRender(true);
                } 
            }
        }
        rCountHandler();
    }, [rCntNum]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newAnswerReply =  currentUser.unionName
            ? { unionId: currentUser._id, answerId: promptId, description: description.current.value, union: true, replyCnt: 1}
            : { userId: currentUser._id, answerId: promptId, description: description.current.value, union: false, replyCnt: 1}
        const newCommentReply =  currentUser.unionName
            ? { unionId: currentUser._id, commentId: promptId, description: description.current.value, union: true, replyCnt: 1}
            : { userId: currentUser._id, commentId: promptId, description: description.current.value, union: false, replyCnt: 1}
        const newReplyReply =  currentUser.unionName
            ? { unionId: currentUser._id, replyId: promptId, description: description.current.value, union: true, replyCnt: rCntNum + 1}
            : { userId: currentUser._id, replyId: promptId, description: description.current.value, union: false, replyCnt: rCntNum + 1}
        // description.current.value
        // JSON.stringify(convertToRaw(contentState))
        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            if(prompt === "answer") {
                newAnswerReply.photos = fileName;
            } if(prompt === "comment") {
                newCommentReply.photos = fileName;
            } else {
                newReplyReply.photos = fileName;
            }
            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log(err);
            }
        }
        if(prompt === "answer") {
            try {
                await axios.post("/replies", newAnswerReply)
                currentUser.unionName
                    ? await axios.put(`/answers/${promptId}/unionReply`, {unionId: currentUser._id})
                    : await axios.put(`/answers/${promptId}/flameReply`, {userId: currentUser._id})
            } catch(err) {
                console.log(err);
            }
            window.location.reload(); 
            return   
        } if(prompt === "comment") {
            try {
                await axios.post("/replies", newCommentReply);
                currentUser.unionName
                    ? await axios.put(`/comments/${promptId}/unionReply`, {unionId: currentUser._id})
                    : await axios.put(`/comments/${promptId}/flameReply`, {userId: currentUser._id})
            } catch(err) {
                console.log(err);
            }
            window.location.reload();
            return
        } else {
            try {
                await axios.post("/replies", newReplyReply);
                currentUser.unionName
                    ? await axios.put(`/replies/${promptId}/unionReply`, {unionId: currentUser._id})
                    : await axios.put(`/replies/${promptId}/flameReply`, {userId: currentUser._id})
            } catch(err) {
                console.log(err);
            }
            window.location.reload();
            return
        }   
    };

 
    return (
        <>
            {cntRender &&
                <div className="createReply">
                    <form className={`createReply-container ${rCount}`} onSubmit={handleSubmit}>
                        <div className="createReplyTop">
                            {currentUser.unionName
                                ? <img className="createReplyProfilePic" src={currentUser.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                : <img className="createReplyProfilePic" src={currentUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                            }
                            {/*
                            <input
                                className='createReplyInput' 
                                placeholder={currentUser.unionName 
                                    ? `Do you have a reply, ${currentUser.firstName} of ${currentUser.profileName}?`
                                    : `Do you have a reply, ${currentUser.firstName}?`
                                }
                                ref={description}
                            />
                            */}
                            <div className="createReplyEditor">
                                {/*
                                <Editor
                                    toolbarHidden 
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    placeholder={currentUser.unionName 
                                        ? `Do you have a reply, ${currentUser.firstName} of ${currentUser.profileName}?`
                                        : `Do you have a reply, ${currentUser.firstName}?`
                                    }
                                    hashtag={{
                                        separator: ' ',
                                        trigger: '#',
                                    }}
                                    mention={{
                                        separator: ' ',
                                        trigger: '@',
                                        suggestions: [
                                          { text: 'APPLE', value: 'apple', url: 'apple' },
                                          { text: 'BANANA', value: 'banana', url: 'banana' },
                                          { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                                          { text: 'DURIAN', value: 'durian', url: 'durian' },
                                          { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                                          { text: 'FIG', value: 'fig', url: 'fig' },
                                          { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                                          { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                                        ],
                                    }}
                                />  
                                */}       
                            </div>
                            
                        </div>
                        {currentUser.unionName ?
                            (
                                <>
                                    {currentUser.spectrum === "diamond" ?
                                        (
                                            <>
                                                <img className="createReplyHrDiamond" src="/misc/diamond-sparkle.jpg" alt=""/>
                                            </>
                                        ) : (
                                            <>
                                                <hr className={`createReplyHr ${currentUser.spectrum}`} />
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <hr className={`createReplyHr ${currentUser.energy}`} />
                                </>
                            )
                        }
                        {file && (
                            <div className="createReplyImages-container">
                                <img className="createReplyImg" src={URL.createObjectURL(file)} alt="" />
                                <Cancel className='createReplyCancelImgBtn' onClick={() => setFile(null)} />
                            </div>
                        )}
                        <div className="createReplyBottom">
                            <div className="createReplyOptions">
                                <label htmlFor="file" className="createReplyOption">
                                    <PermMedia className="createReplyIcon" htmlColor="tomato" />
                                    <span className="createReplyOptionText">Photo or Video</span>
                                    <input 
                                        style={{display: "none"}} 
                                        type="file" 
                                        id="file" 
                                        accept=".png,.jpeg,.jpg" onChange={(event) => setFile(event.target.files[0])} 
                                    />
                                </label>
                                <div className="createReplyOption">
                                    <Label className="createReplyIcon" htmlColor="blue" />
                                    <span className="createReplyOptionText">Tag</span>
                                </div>
                                <div className="createReplyOption">
                                    <Room className="createReplyIcon" htmlColor="green" />
                                    <span className="createReplyOptionText">Location</span>
                                </div>
                                <div className="createReplyOption">
                                    <EmojiEmotions className="createReplyIcon" htmlColor="goldenrod" />
                                    <span className="createReplyOptionText">Feelings</span>
                                </div>
                            </div>
                            {currentUser.unionName ?
                                (
                                    <>
                                        {currentUser.spectrum === "diamond" ? 
                                            (
                                                <>
                                                    <button className="createReplyShareButton" style={{backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover"}} type="submit"><span className="crDiamondText">Reply</span></button>
                                                </>
                                            ) : (
                                                <>  
                                                    <button className={`createReplyShareButton ${currentUser.spectrum}`} type="submit">Reply</button>
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <button className={`createReplyShareButton ${currentUser.energy}`} type="submit">Reply</button>
                                    </>
                                )
                            }
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default CreateReply;