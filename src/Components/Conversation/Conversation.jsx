import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dateFormat, { masks } from "dateformat";
import axios from 'axios';
import DOMPurify from 'dompurify';
import "./Conversation.css";

function Conversation({
    conversation, 
    currentUser, 
    cn, 
    arrivalFlameMessage, 
    arrivalUnionMessage, 
    newMessage
}) {

    const { sentMessage } = useSelector((state) => state.auth);

    const [user, setUser] = useState({});
    const [ messages, setMessages ] = useState([]);
    const [ latestMessage, setLatestMessage ] = useState({});
    const [ mDisplay1, setMDisplay1 ] = useState(true);
    const [ mDisplay2, setMDisplay2 ] = useState(true);
    
    useEffect(() => {
        const flameFriendId = conversation.flameMembers.find((fMember) => fMember !== currentUser._id);
        const unionFriendId = conversation.unionMembers.find((uMember) => uMember !== currentUser._id);
        const getUser = async () => {
            try {
                const res = flameFriendId
                    ? await axios.get(`/users?userId=${flameFriendId}`)
                    : await axios.get(`/unions?unionId=${unionFriendId}`)
                setUser(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation]);
   

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/messages/${conversation._id}`); 
                setMessages(res.data);
            } catch(err) {
                console.log(err);
            } 
        }
        getMessages();
    }, [conversation]);

    useEffect(() => {
        if (messages.length > 0) {
            setLatestMessage(messages[messages.length - 1]);
        }
    }, [messages]);

    useEffect(() => {
        if (arrivalFlameMessage?.conversationId === conversation._id) {
            messages[messages.length - 1]?.flameSenderId === arrivalFlameMessage.flameSenderId 
                ? setMDisplay2(false)
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(arrivalFlameMessage);
                messages[messages.length - 1]?.flameSenderId === arrivalFlameMessage.flameSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, arrivalFlameMessage]);
            }, 3000);
        }
    }, [arrivalFlameMessage]);

    useEffect(() => {
        if (arrivalUnionMessage?.conversationId === conversation._id) {
            messages[messages.length - 1]?.unionSenderId === arrivalUnionMessage.unionSenderId 
                ? setMDisplay2(false)
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(arrivalUnionMessage);
                messages[messages.length - 1]?.unionSenderId === arrivalUnionMessage.unionSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, arrivalUnionMessage]);
            }, 3000);
        }
    }, [arrivalUnionMessage]);

    useEffect(() => {
        if (sentMessage?.conversationId === conversation._id) {
            if (messages[messages.length - 1]?.flameSenderId === sentMessage.flameSenderId) { 
                setMDisplay2(false)
                    setTimeout(() => {
                        setLatestMessage(newMessage);
                        setMDisplay2(true);
                        setMessages((prev) => [...prev, sentMessage]);
                }, 3000);
            } else if (messages[messages.length - 1]?.flameSenderId === sentMessage.flameSenderId) { 
                setMDisplay2(false)
                    setTimeout(() => {
                        setLatestMessage(newMessage);
                        setMDisplay2(true);
                        setMessages((prev) => [...prev, sentMessage]);
                }, 3000);
            } else {
                setMDisplay1(false)
                    setTimeout(() => {
                        setLatestMessage(newMessage);
                        setMDisplay1(true);
                        setMessages((prev) => [...prev, sentMessage]);
                }, 3000);
            }
        }
    }, [sentMessage]);

    return (
        <>
            {user?.unionName ?
                (
                    <>
                        {user?.spectrum === "diamond" ?
                            (
                                <>
                                    <div className={`conversation ${cn}`} style={{backgroundImage: "url(/misc/diamond-sparkle-light.jpg)"}}>
                                        <img className={`conversationProfilePic ${cn}`} src={user?.unionProfilePicture ? user?.unionProfilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                        <span className="conversationUserEnergy"></span>
                                        <span className="conversationUserName">{user?.profileName}</span>
                                        <span className="conversationLatestMessage"dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(latestMessage.text)}} />
                                    </div> 
                                </>
                            ) : (
                                <>
                                    <div className={`conversation ${cn} ${user?.spectrum}`}>
                                        <div className={`conversationLeft ${cn}`}>
                                            <img 
                                                className={`conversationProfilePic ${cn}`} 
                                                src={user?.unionProfilePicture 
                                                    ? user?.unionProfilePicture 
                                                    : "/picBlanks/no-avatar.jpg"
                                                } 
                                                alt="" 
                                            />
                                        </div>
                                        <div className={`conversationRight ${cn} ${user?.energy}`}>
                                            <div className="convRightTop">
                                                <span className="conversationUserName">{user?.profileName}</span>
                                                <span className="convLatestDateTime">{dateFormat(latestMessage.createdAt, "mmmm dS")}</span>
                                            </div>
                                            <div 
                                                className="convRightBottom" 
                                                style={mDisplay1 ? {opacity: "1"} : {opacity: "0"}}
                                            >
                                                <span className ="convSenderName">{`${latestMessage.flameSenderId === currentUser._id ? "you" : user?.profileName }:`}</span>
                                               
                                                {latestMessage.text?.length > 0 &&
                                                    <span 
                                                        className="conversationLatestMessage" 
                                                        style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(latestMessage.text)}} 
                                                    /> 
                                                }
                                                {latestMessage.photos?.length > 0 &&
                                                    <span 
                                                        className="conversationLatestMessage" 
                                                        style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                                    >
                                                        {`photo${latestMessage.photos?.length > 1 ? "s" : ""}`}
                                                    </span>
                                                }       
                                            </div>
                                            <hr className={`conversationHr ${user?.spectrum}`} />
                                        </div>
                                    </div> 
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div className={`conversation ${cn} ${user?.energy}`}>
                            <div className={`conversationLeft ${cn}`}>
                                <img 
                                    className={`conversationProfilePic ${cn}`} 
                                    src={user?.isAnonymous 
                                        ? "/picBlanks/no-avatar.jpg" 
                                        : user?.profilePicture 
                                            ? user?.profilePicture 
                                            : "/picBlanks/no-avatar.jpg"
                                    } 
                                    alt="" 
                                />
                            </div>
                            <div className={`conversationRight ${cn} ${user?.energy}`}>
                                <div className="convRightTop">
                                    <span className="conversationUserName">{user?.isAnonymous ? "Anonymous User" : user?.profileName}</span>
                                    <span className="convLatestDateTime">{dateFormat(latestMessage.createdAt, "mmmm dS")}</span>
                                </div>
                                <div 
                                    className="convRightBottom" 
                                    style={mDisplay1 ? {opacity: "1"} : {opacity: "0"}}
                                >
                                    <span className ="convSenderName">{`${latestMessage.flameSenderId === currentUser._id ? "you" : user?.profileName }:`}</span>
                                    {latestMessage.text?.length > 0 &&
                                        <span 
                                            className="conversationLatestMessage" 
                                            style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(latestMessage.text)}} 
                                        /> 
                                    }
                                    {latestMessage.photos?.length > 0 &&
                                        <span 
                                            className="conversationLatestMessage" 
                                            style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                        >
                                            {`photo${latestMessage.photos?.length > 1 ? "s" : ""}`}
                                        </span>
                                    }
                                </div>
                                <hr className={`conversationHr ${user?.energy}`} />
                            </div>    
                            
                        </div> 
                    </>
                )
            }    
        </>   
    )
};

export default Conversation;