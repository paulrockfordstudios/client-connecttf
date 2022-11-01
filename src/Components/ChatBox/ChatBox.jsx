import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { newSentMessage } from "../../Redux/AuthSlice";
import axios from "axios";
import "./ChatBox.css";
import ChatMessage from '../ChatMessage/ChatMessage';
import { CircularProgress } from '@material-ui/core';
import { AddAPhoto, Close, ExpandLess, ExpandMore, Fullscreen, MoreHoriz, Cancel } from '@material-ui/icons';
import MessageTextEditor from '../Editors/QuillTextEditors/MessageTextEditor/MessageTextEditor';


function ChatBox({
    cBox,
    conv,
    cUp, 
    newArrivalMessage,
    newMessage, 
    setNewMessage,
    handleUp,
    handleDown,
    handleClose,
    emojiBox,
    setEmojiBox,
}) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const scrollRef = useRef();
    const observer= useRef();
    const chatBoxFeedRef = useRef();
    const focusRef = useRef();

    const [ files, setFiles ] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ cbLogo, setCBLogo ] = useState(false);
    const [ messages, setMessages ] = useState([]);
    const [ pageNum, setPageNum ] = useState(0); 
    const [ hasMore, setHasMore ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ friend, setFriend ] = useState({});

    const chatBox = document.getElementById(`emojiIconBtn${cBox}`);

    const colorTheme = friend.unionName
    ? friend.spectrum
        ? friend.spectrum
        : "gray"
    : friend.energy 
        ? friend.energy
        : "gray"

   const emojiToggle = () => {
        if (emojiBox === true) {
            setEmojiBox(false)
        } else {
            setEmojiBox(true)
        }
   };

   const addEClickHandler = () => {
        const emojiChars = document.getElementsByClassName("ap");
        for (let i = 0; i < emojiChars.length; i++) {
            const emojiChar = emojiChars.item(i);
            emojiChar.setAttribute("onclick", "() = setEmojiBox(false)");
            emojiChar.onclick = () => setEmojiBox(false);
        }
   };
   
    useEffect(() => {
        let emojiControls = undefined;
        if (emojiBox) {
            emojiControls = document.getElementById("tab-toolbar");
            if (emojiControls) {
                console.log("true")
                const emojiTabs = document.getElementsByClassName("emoji-tab");
                for (let i = 0; i < emojiTabs.length; i++) {
                    const emojiTab = emojiTabs.item(i);
                    emojiTab.setAttribute("onclick", `addEClickHandler`);
                    emojiTab.onclick = addEClickHandler;
                }
                const emojiChars = document.getElementsByClassName("ap");
                for (let i = 0; i < emojiChars.length; i++) {
                    const emojiChar = emojiChars.item(i);
                    emojiChar.setAttribute("onclick", "() = setEmojiBox(false)");
                    emojiChar.onclick = () => setEmojiBox(false);
                }
            }
        }
   }, [emojiBox]);

    useEffect(() => {
        if (chatBox) {
            chatBox.addEventListener("click", emojiToggle)
            return () => {
                chatBox.removeEventListener("click", emojiToggle)
            }
        }
    });
    
    useEffect(() => {
        if (newArrivalMessage) {
            setMessages((prev) => [newArrivalMessage, ...prev])
        }
    }, [newArrivalMessage]);

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

    useEffect(() => {
        if (conv) {
            console.log(conv)
            const flameFriend = conv.flameMembers?.find((fMember) => fMember !== user._id)
            const unionFriend = conv.unionMembers?.find((uMember) => uMember !== user._id);
            const getFriend = async () => {
                const res = flameFriend
                ? await axios.get(`/users?userId=${flameFriend}`)
                : await axios.get(`/unions?unionId=${unionFriend}`) 
                setFriend(res.data);
            }
            getFriend();
        }
    }, [conv]);

    useEffect(() => {
        setCBLogo(false);
        const getMessages = async () => {
            try {
                await axios
                    .get(`/messages/${conv._id}/${pageNum}`)
                    .then(res => {
                        setMessages(prevMessages => {
                            return [...new Set([...prevMessages, ...res.data.messageArr])]
                        });
                        setHasMore(res.data.messageCnt > pageNum + 30)
                        setLoading(false);
                    })
            } catch(err) {
                console.log(err);
            } 
        }
        getMessages();
    }, [pageNum, conv._id]);

    const lastMessageRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect(); 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {  
                console.log("visible") 
                setPageNum(prev => prev + 30); 
            }
        })
        if (node) observer.current.observe(node)
    })
    
    useEffect(() => {
        if (pageNum === 0) {
            scrollRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            setCBLogo(true);
        }, 5000)    
    }, [pageNum]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = user.unionName 
            ? {
                unionSenderId: user._id,
                text: newMessage,
                photos: fileNames,
                conversationId: conv._id
            } : {
                flameSenderId: user._id,
                text: newMessage,
                photos: fileNames,
                conversationId: conv._id
            }
        const flameReceiverId = conv.flameMembers.find((fMember) => fMember !== user._id)
        const unionReceiverId = conv.unionMembers.find((uMember) => uMember !== user._id);
        user.unionName
            ? setNewMessage({
                conversationId: conv._id,
                unionSenderId: user._id,
                receiverId: flameReceiverId ? flameReceiverId : unionReceiverId,
                receiverType: flameReceiverId ? "flame" : "union",
                text: newMessage,
                photos: fileNames,
            })
            : setNewMessage({
                conversationId: conv._id,
                flameSenderId: user._id,
                receiverId: flameReceiverId ? flameReceiverId : unionReceiverId,
                receiverType: flameReceiverId ? "flame" : "union",
                text: newMessage,
                photos: fileNames,
            })
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
            const res = await axios.post("/messages", message);
            setMessages([res.data, ...messages]);
            dispatch(newSentMessage(message));
            var element = document.getElementsByClassName("ql-editor");
            for (let i = 0; i < element.length; i++) {
                element[i].innerHTML = "";
            }
            setFiles([]);
        } catch(err) {
                console.log(err);
        } 
    };

    useEffect(() => {
        if (pageNum === 0) {
            scrollRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    const imgBtnHandler = (event) => {
        setFiles(files.concat(Array.from(event.target.files)));
    };

    const removeFiles = (idx2Rmv) => {
        setFiles(files.filter((_, index) => index !== idx2Rmv));
    };
    console.log(cBox)
    
    return (
        <div 
            className={`convBarConvContainer-container ${cUp ? "up" : "down"}`} 
        >
            {colorTheme === "rainbow" ||
             colorTheme === "silver" ||
             colorTheme === "gold" ||
             colorTheme === "platinum" ||
             colorTheme === "diamond" 
                ? <div 
                    className={`convBarConvContainerBackgroundTheme ${cUp ? "up" : "down"}`} 
                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"}} 
                />
                : null
            }
            <div 
                className={
                    `convBarConvContainer 
                    ${cBox}
                    ${friend?.unionName? "union" : "flame"} 
                    ${cUp ? "up" : "down"} 
                    ${colorTheme}`
                }
            >
                <div className="convBarContainerTop">
                    <div className={`convControlPanel ${colorTheme}`}>
                        {cUp ?
                            (
                                <>
                                    <span className="convBarConvName">{friend.profileName}</span>
                                    <div className="convBarOptionBtns">
                                        <MoreHoriz style={{opacity: "0.3"}}/>
                                        <ExpandMore className="convExpandBtn" onClick={(event) => handleDown(event)} />
                                        <Link to="/messenger" state={conv}>
                                            <Fullscreen />
                                        </Link>
                                        <Close className="convCloseBtn" onClick={(event) => handleClose(event)} />
                                    </div>   
                                </>
                            ) : (
                                <>
                                    <span className="convBarConvName">{friend.profileName}</span>
                                    <div className="convBarOptionBtns">
                                        <ExpandLess className="convExpandBtn" onClick={() => handleUp()} />
                                        <Close className="convCloseBtn" onClick={(event) => handleClose(event)} />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <hr className={`convBarHr ${colorTheme}`} />
                <div className="convBarContainerCenter" >
                    {messages ?
                        (
                            <>
                                <div className="cbChatBoxTop" id={`cb${conv._id}`} ref={chatBoxFeedRef}>
                                    <div className="cbChatBoxFeed" >
                                        {messages.map((message, index) => {
                                            if (index === 0) {
                                                return (
                                                    <div key={message._id} ref={scrollRef}>
                                                        <ChatMessage 
                                                            message={message} 
                                                            own={
                                                            message.flameSenderId 
                                                                ? message.flameSenderId === user._id 
                                                                : message.unionSenderId === user._id
                                                            }
                                                            currentUser={user}
                                                        />
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={message._id} >
                                                        <ChatMessage
                                                            message={message} 
                                                            own={
                                                            message.flameSenderId 
                                                                ? message.flameSenderId === user._id 
                                                                : message.unionSenderId === user._id
                                                            }
                                                            currentUser={user}
                                                        />
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    {loading 
                                        ? <CircularProgress color="#aeb4b7" size="30px" />
                                        : <>{cbLogo && <img className="postFeedConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" ref={lastMessageRef} />}</>
                                    }
                                </div>
                                <hr className={`convBarHr ${colorTheme}`} />
                                <div className="convChatBoxBottom">
                                    <div className={`convChatTextEditor ${emojiBox ? "ebOpen" : "ebClose"}`} >
                                        <MessageTextEditor
                                            focusRef={focusRef}
                                            setValue={setNewMessage}
                                            ph="Write something..."
                                            cBox={cBox}
                                        />
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
                                    <div className="convChatControlPanel">
                                        <label htmlFor={`file${cBox}`} className="convChatOption" style={{maxHeight: "20px"}}>
                                            <AddAPhoto className="convChatIcon" />
                                            <input 
                                                style={{display: "none"}} 
                                                type="file" 
                                                id={`file${cBox}`} 
                                                multiple="multiple"
                                                accept="image/*" 
                                                onChange={(event) => imgBtnHandler(event)} 
                                            />
                                        </label>
                                        <button className={`convChatSubmitBtn ${colorTheme}`} onClick={(event) => handleSubmit(event)}>Send</button>
                                    </div>
                                </div> 
                            </>
                        ) : (
                            <span className="noConversationText">Open a coversation to start a chat</span>
                        )
                    }            
                </div>
                <hr className={`convBarHr ${colorTheme}`} />
                <div className="convBarContainerBottom">                
                </div>
            </div>
        </div>                
    )
}

export default ChatBox;