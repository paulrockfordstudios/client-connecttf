import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./ConversationBar.css";
import {  
    setFCv1, 
    fCv1Close, 
    fCv1Down, 
    fCv1Up,
    setFCv2, 
    fCv2Close, 
    fCv2Down, 
    fCv2Up, 
    setFCv3, 
    fCv3Close, 
    fCv3Down, 
    fCv3Up, 
    setUCv1, 
    uCv1Close, 
    uCv1Down, 
    uCv1Up,
    setUCv2, 
    uCv2Close, 
    uCv2Down, 
    uCv2Up, 
    setUCv3, 
    uCv3Close, 
    uCv3Down, 
    uCv3Up, 
} from "../../../Redux/AuthSlice";
import ChatBox from '../../ChatBox/ChatBox';


function ConversationBar({
    newMessage, 
    setNewMessage,
    arrivalFlameMessage,
    arrivalUnionMessage
}) {

    const { 
        user, 
        convBox,
        fConv1, 
        fC1Open, 
        fC1Up, 
        fConv2,
        fC2Open, 
        fC2Up, 
        fConv3,
        fC3Open, 
        fC3Up, 
        uConv1, 
        uC1Open, 
        uC1Up, 
        uConv2,
        uC2Open, 
        uC2Up, 
        uConv3,
        uC3Open, 
        uC3Up, 
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ messageF1, setMessageF1 ] = useState("");
    const [ messageF2, setMessageF2 ] = useState("");
    const [ messageF3, setMessageF3 ] = useState("");
    const [ messageU1, setMessageU1 ] = useState("");
    const [ messageU2, setMessageU2 ] = useState("");
    const [ messageU3, setMessageU3 ] = useState("");
    const [ eBoxF1, setEBoxF1 ] = useState(false);
    const [ eBoxF2, setEBoxF2 ] = useState(false);
    const [ eBoxF3, setEBoxF3 ] = useState(false);
    const [ eBoxU1, setEBoxU1 ] = useState(false);
    const [ eBoxU2, setEBoxU2 ] = useState(false);
    const [ eBoxU3, setEBoxU3 ] = useState(false); 
   
    useEffect(() => {
        if (arrivalFlameMessage) {
            if (user.unionName) {
                if (uConv1.flameMembers.includes(arrivalFlameMessage.flameSenderId)) {
                    setMessageU1(arrivalFlameMessage);
                } else if (uConv2.flameMembers.includes(arrivalFlameMessage.flameSenderId)) {
                    setMessageU2(arrivalFlameMessage);
                } else if (uConv3.flameMembers.includes(arrivalFlameMessage.flameSenderId)) {
                    setMessageU3(arrivalFlameMessage);
                } else {
                    return;
                }
            } else {
                if (fConv1.flameMembers.includes(arrivalFlameMessage.flameSenderId)) {
                    setMessageF1(arrivalFlameMessage);
                } else if (fConv2.flameMembers.includes(arrivalFlameMessage.flameSenderId)) {
                    setMessageF2(arrivalFlameMessage);
                } else if (fConv3.flameMembers.includes(arrivalFlameMessage.flameSenderId)) {
                    setMessageF3(arrivalFlameMessage);
                } else {
                    return;
                }
            }
        }
    }, [arrivalFlameMessage]);

    useEffect(() => {
        if (arrivalUnionMessage) {
            if (user.unionName) {
                if (uConv1.unionMembers.includes(arrivalUnionMessage.unionSenderId)) {
                    setMessageU1(arrivalUnionMessage);
                } else if (uConv2.unionMembers.includes(arrivalUnionMessage.unionSenderId)) {
                    setMessageU2(arrivalUnionMessage);
                } else if (uConv3.unionMembers.includes(arrivalUnionMessage.unionSenderId)) {
                    setMessageU3(arrivalUnionMessage);
                } else {
                    return;
                }
            } else {
                if (fConv1.conv.unionMembers.includes(arrivalUnionMessage.unionSenderId)) {
                    setMessageF1(arrivalUnionMessage);
                } else if (fConv2.conv.unionMembers.includes(arrivalUnionMessage.unionSenderId)) {
                    setMessageF2(arrivalUnionMessage);
                } else if (fConv3.conv.unionMembers.includes(arrivalUnionMessage.unionSenderId)) {
                    setMessageF3(arrivalUnionMessage);
                } else {
                    return;
                }
            }
        }
    }, [arrivalUnionMessage]);

    const handle1Up = () => {
        if (user.unionName) { 
            dispatch(uCv1Up());
            localStorage.setItem("uC1Up", JSON.stringify(true));
        } else {
            dispatch(fCv1Up());
            localStorage.setItem("fC1Up", JSON.stringify(true));
        }
    };

    const handle1Down = () => {
        if (user.unionName) { 
            dispatch(uCv1Down());
            localStorage.setItem("uC1Up", JSON.stringify(false));
        } else {
            dispatch(fCv1Down());
            localStorage.setItem("fC1Up", JSON.stringify(false));
        }
    };

    const handle1Close = () => {
        if (user.unionName) {
            if (uC2Open) {
                dispatch(setUCv1(uConv2));
                localStorage.setItem("uConv1", JSON.stringify(uConv2));
                if (!uC3Open) {
                    dispatch(uCv2Close());
                    localStorage.removeItem("uConv2");
                    localStorage.removeItem("uC2Open");
                    localStorage.removeItem("uC2Up");
                } else if (uC3Open) {
                    dispatch(setUCv2(uConv3));
                    dispatch(uCv3Close());
                    localStorage.setItem("uConv2", JSON.stringify(uConv3));
                    localStorage.removeItem("uConv3");
                    localStorage.removeItem("uC3Open");
                    localStorage.removeItem("uC3Up");
                }
            } else {
                dispatch(setUCv1(null));
                dispatch(uCv1Close());
                dispatch(uCv1Down());
                localStorage.removeItem("uConv1");
                localStorage.removeItem("uC1Open");
                localStorage.removeItem("uC1Up"); 
            }
        } else {
            if (fC2Open) {
                dispatch(setFCv1(fConv2));
                localStorage.setItem("fConv1", JSON.stringify(fConv2));
                if (!fC3Open) {
                    dispatch(fCv2Close());
                    localStorage.removeItem("fConv2");
                    localStorage.removeItem("fC2Open");
                    localStorage.removeItem("fC2Up");
                } else if (fC3Open) {
                    dispatch(setFCv2(fConv3));
                    dispatch(fCv3Close());
                    localStorage.setItem("fConv2", JSON.stringify(fConv3));
                    localStorage.removeItem("fConv3");
                    localStorage.removeItem("fC3Open");
                    localStorage.removeItem("fC3Up");
                }
            } else {
                dispatch(setFCv1(null));
                dispatch(fCv1Close());
                dispatch(fCv1Down());
                localStorage.removeItem("fConv1");
                localStorage.removeItem("fC1Open");
                localStorage.removeItem("fC1Up"); 
            }
        }
    };  
   
    const handle2Up = () => {
        if (user.unionName) { 
            dispatch(uCv2Up());
            localStorage.setItem("uC2Up", JSON.stringify(true));
        } else {
            dispatch(fCv2Up());
            localStorage.setItem("fC2Up", JSON.stringify(true));
        }
    };

    const handle2Down = () => {
        if (user.unionName) { 
            dispatch(uCv2Down());
            localStorage.setItem("uC2Up", JSON.stringify(false));
        } else {
            dispatch(fCv2Down());
            localStorage.setItem("fC2Up", JSON.stringify(false));
        }
    };

    const handle2Close = () => {
        if (user.unionName) {
            if (uC3Open) {
                dispatch(setUCv2(uConv3));
                dispatch(uCv3Close());
                localStorage.setItem("uConv2", JSON.stringify(uConv3));
                localStorage.removeItem("uConv3");
                localStorage.removeItem("uC3Open");
                localStorage.removeItem("uC3Up");
            } else {
                dispatch(setUCv2(null));
                dispatch(uCv2Close());
                dispatch(uCv2Down());
                localStorage.removeItem("uConv2");
                localStorage.removeItem("uC2Open");
                localStorage.removeItem("uC2Up"); 
            } 
        } else {
            if (fC3Open) {
                dispatch(setFCv2(fConv3));
                dispatch(fCv3Close());
                localStorage.setItem("fConv2", JSON.stringify(fConv3));
                localStorage.removeItem("fConv3");
                localStorage.removeItem("fC3Open");
                localStorage.removeItem("fC3Up");
            } else {
                dispatch(setFCv2(null));
                dispatch(fCv2Close());
                dispatch(fCv2Down());
                localStorage.removeItem("fConv2");
                localStorage.removeItem("fC2Open");
                localStorage.removeItem("fC2Up");
            } 
        }  
    }

    const handle3Up = () => {
        if (user.unionName) { 
            dispatch(uCv3Up());
            localStorage.setItem("uC3Up", JSON.stringify(true));
        } else {
            dispatch(fCv3Up());
            localStorage.setItem("fC3Up", JSON.stringify(true));
        }
    };

    const handle3Down = () => {
        if (user.unionName) { 
            dispatch(uCv1Down());
            localStorage.setItem("uC3Up", JSON.stringify(false));
        } else {
            dispatch(fCv3Down());
            localStorage.setItem("fC3Up", JSON.stringify(false));
        }
    };

    const handle3Close = () => {
        if (user.unionName) {
            dispatch(setUCv3(null));
            dispatch(uCv3Close());
            dispatch(uCv3Down());
            localStorage.removeItem("uConv3");
            localStorage.removeItem("uC3Open");
            localStorage.removeItem("uC3Up"); 
        } else {
            dispatch(setFCv3(null));
            dispatch(fCv3Close());
            dispatch(fCv3Down());
            localStorage.removeItem("fConv3");
            localStorage.removeItem("fC3Open");
            localStorage.removeItem("fC3Up"); 
        }  
    };


    return (
        <>
            {user && 
                <div className="conversationBar">
                    <div className={`convBarRight ${convBox ? "open" : "close"}`}></div>
                    <div className="convBarConvContainers">
                        {user.unionName ?
                            (
                                <>
                                    {uC1Open &&
                                        <ChatBox 
                                            cBox={"u1"}
                                            conv={uConv1}
                                            cOpen={uC1Open}
                                            cUp={uC1Up}
                                            newArrivalMessage={messageU1}
                                            newMessage={newMessage}
                                            setNewMessage={setNewMessage}
                                            handleUp={handle1Up}
                                            handleDown={handle1Down}
                                            handleClose={handle1Close}
                                            emojiBox={eBoxU1}
                                            setEmojiBox={setEBoxU1}
                                        />
                                    }
                                    {uC2Open &&
                                        <ChatBox 
                                            cBox={"u2"}
                                            conv={uConv2}
                                            cOpen={uC2Open}
                                            cUp={uC2Up}
                                            newArrivalMessage={messageU2}
                                            newMessage={newMessage}
                                            setNewMessage={setNewMessage}
                                            handleUp={handle2Up}
                                            handleDown={handle2Down}
                                            handleClose={handle2Close}
                                            emojiBox={eBoxU2}
                                            setEmojiBox={setEBoxU2}
                                        />
                                    }
                                    {uC3Open &&
                                        <ChatBox
                                            cBox={"u3"}
                                            conv={uConv3}
                                            cOpen={uC3Open}
                                            cUp={uC3Up}
                                            newArrivalMessage={messageU3}
                                            newMessage={newMessage}
                                            setNewMessage={setNewMessage}
                                            handleUp={handle3Up}
                                            handleDown={handle3Down}
                                            handleClose={handle3Close}
                                            emojiBox={eBoxU3}
                                            setEmojiBox={setEBoxU3}
                                        />
                                    }
                                </>
                            ) : (
                                <>
                                    {fC1Open &&
                                        <ChatBox 
                                            cBox={"f1"}
                                            conv={fConv1}
                                            cOpen={fC1Open}
                                            cUp={fC1Up}
                                            newArrivalMessage={messageF1}
                                            newMessage={newMessage}
                                            setNewMessage={setNewMessage}
                                            handleUp={handle1Up}
                                            handleDown={handle1Down}
                                            handleClose={handle1Close} 
                                            emojiBox={eBoxF1}
                                            setEmojiBox={setEBoxF1}
                                        />
                                    }
                                    {fC2Open &&
                                        <ChatBox 
                                            cBox={"f2"}
                                            conv={fConv2}
                                            cOpen={fC2Open}
                                            cUp={fC2Up}
                                            newArrivalMessage={messageF2}
                                            newMessage={newMessage}
                                            setNewMessage={setNewMessage}
                                            handleUp={handle2Up}
                                            handleDown={handle2Down}
                                            handleClose={handle2Close}
                                            emojiBox={eBoxF2}
                                            setEmojiBox={setEBoxF2}
                                        />
                                    }
                                    {fC3Open &&
                                        <ChatBox 
                                            cBox={"f3"}
                                            conv={fConv3}
                                            cOpen={fC3Open}
                                            cUp={fC3Up}
                                            newArrivalMessage={messageF3}
                                            newMessage={newMessage}
                                            setNewMessage={setNewMessage}
                                            handleUp={handle3Up}
                                            handleDown={handle3Down}
                                            handleClose={handle3Close}
                                            emojiBox={eBoxF3}
                                            setEmojiBox={setEBoxF3}
                                        />
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ConversationBar;