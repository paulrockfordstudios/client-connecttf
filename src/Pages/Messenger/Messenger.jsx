import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { newSentMessage } from '../../Redux/AuthSlice';
import axios from "axios";
import ChatMessage from '../../Components/ChatMessage/ChatMessage';
import ChatOnline from '../../Components/ChatOnline/ChatOnline';
import Conversation from '../../Components/Conversation/Conversation';
import "./Messenger.css";
import { CircularProgress } from '@material-ui/core';
import MessageTextEditor from '../../Components/Editors/QuillTextEditors/MessageTextEditor/MessageTextEditor';


function Messenger({ 
    onlineFlameUsers, 
    onlineUnionUsers, 
    conversations,
    newMessage, 
    setNewMessage,
    arrivalFlameMessage,
    arrivalUnionMessage
}) {

    const { user } = useSelector((state) => state.auth);

    const location = useLocation();
    let { conv } = {}
    if (location) {
    conv = location.state;
    }

    const dispatch = useDispatch();

    const scrollRef = useRef();
    const observer= useRef();
    const chatBoxFeedRef = useRef();

    const [ cbLogo, setCBLogo ] = useState(false);
    const [ messages, setMessages ] = useState([]);
    const [ pageNum, setPageNum ] = useState(0); 
    const [ hasMore, setHasMore ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ currentChat, setCurrentChat ] = useState(conv ? conv : null);

    useEffect(() => {
        setCBLogo(false);
        const getMessages = async () => {
            try {
                await axios
                    .get(`/messages/${currentChat._id}/${pageNum}`)
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
    }, [currentChat, pageNum]);
   
    useEffect(() => {
        arrivalFlameMessage && currentChat?.flameMembers.includes(arrivalFlameMessage.flameSenderId) &&
        setMessages((prev) => [arrivalFlameMessage, ...prev]);
        arrivalUnionMessage && currentChat?.unionMembers.includes(arrivalUnionMessage.unionSenderId) &&
        setMessages((prev) => [arrivalUnionMessage, ...prev]);
    }, [arrivalFlameMessage, arrivalUnionMessage, currentChat]);

    const lastMessageRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect(); 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
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
    }, [pageNum])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = user.unionName 
            ? {
                unionSenderId: user._id,
                text: newMessage,
                conversationId: currentChat._id
            } : {
                flameSenderId: user._id,
                text: newMessage,
                conversationId: currentChat._id
            }
        const flameReceiverId = currentChat.flameMembers.find((fMember) => fMember !== user._id)
        const unionReceiverId = currentChat.unionMembers.find((uMember) => uMember !== user._id);
        user.unionName
            ? setNewMessage({
                conversationId: conv._id,
                unionSenderId: user._id,
                receiverId: flameReceiverId ? flameReceiverId : unionReceiverId,
                receiverType: flameReceiverId ? "flame" : "union",
                text: newMessage,
            })
            : setNewMessage({
                conversationId: conv._id,
                flameSenderId: user._id,
                receiverId: flameReceiverId ? flameReceiverId : unionReceiverId,
                receiverType: flameReceiverId ? "flame" : "union",
                text: newMessage,
            })
        try {
            const res = await axios.post("/messages", message);
            setMessages([res.data, ...messages]);
            dispatch(newSentMessage(message));
            var element = document.getElementsByClassName("ql-editor");
            element[0].innerHTML = "";
        } catch(err) {
                console.log(err);
        } 
    };

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenu-container">
                        <input className="chatMenuInput" placeHolder="Search for friends" />
                        <div className="chatMenuContainer union">
                            <span className={`chatMenuContainerText ${user.unionName ? user.spectrum : user.energy}`}>Union Conversations</span>
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img className="chatMenuHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`chatMenuHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <hr className={`chatMenuHr ${user.energy}`} />
                                    </>
                                )
                            }
                            {conversations.map((conv) => user.unionName ?
                                (
                                    conv.unionMembers.length === 2 &&
                                        <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                                arrivalFlameMessage={arrivalFlameMessage}
                                                arrivalUnionMessage={arrivalUnionMessage}
                                                newMessage={newMessage}
                                            />
                                        </div>
                                ) : (
                                    conv.unionMembers.length === 1 &&
                                        <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                                arrivalFlameMessage={arrivalFlameMessage}
                                                arrivalUnionMessage={arrivalUnionMessage}
                                                newMessage={newMessage}
                                            />
                                        </div>
                                )
                            )} 
                        </div>
                        <div className="chatMenuContainer flame">
                            <span className={`chatMenuContainerText ${user.unionName ? user.spectrum : user.energy}`}>Flame Conversations</span>
                            <hr className={`chatMenuHr ${user.unionName? user.spectrum : user.energy}`} />
                            {conversations.map((conv) => user.unionName ?
                                (
                                    conv.flameMembers.length === 1 &&
                                        <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                                arrivalFlameMessage={arrivalFlameMessage}
                                                arrivalUnionMessage={arrivalUnionMessage}
                                                newMessage={newMessage}
                                            />
                                        </div>
                                ) : (
                                    conv.flameMembers.length === 2 &&
                                        <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                                arrivalFlameMessage={arrivalFlameMessage}
                                                arrivalUnionMessage={arrivalUnionMessage}
                                                newMessage={newMessage}
                                            />
                                        </div>
                                )
                            )} 
                        </div>
                    </div>
                </div> 
                <div className="chatBox">
                    <div className="chatBox-container">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                
                                    <div className="chatBoxFeed" ref={chatBoxFeedRef}>
                                    {messages.map((message, index) => {
                                        if (index === 0) {
                                            return (
                                                <div key={message._id} ref={scrollRef}>
                                                    <ChatMessage 
                                                        message={message}
                                                        index={index} 
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
                                                        index={index}
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
                                <div className="chatBoxBottom">
                                    <div className="chatMessageInput">
                                        <MessageTextEditor
                                            setValue={setNewMessage}
                                            ph="Write something..."
                                        />
                                    </div>
                                    <button className="chatSubmitBtn" onClick={(event) => handleSubmit(event)}>Send</button>
                                </div> 
                            </>
                        ) : (
                             <span className="noConversationText">Open a coversation to start a chat</span>
                        )}
                    </div>  
                </div> 
                <div className="chatOnline">
                    <div className="chatOnline-container">
                        <ChatOnline 
                            onlineFlameUsers={onlineFlameUsers} 
                            onlineUnionUsers={onlineUnionUsers} 
                            currentUser={user} 
                            setCurrentChat={setCurrentChat} 
                        />
                    </div>
                </div>                    
            </div>
        </>
    )
};

export default Messenger;