import { MoreHoriz } from '@material-ui/icons';
import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import Conversation from '../../Conversation/Conversation';
import "./MessageBar.css";
import { 
    cvBxOpen, 
    cvBxClose, 
    setFCv1, 
    fCv1Up, 
    fCv1Open, 
    setFCv2, 
    fCv2Up,  
    fCv2Open, 
    setFCv3, 
    fCv3Up,  
    fCv3Open, 
    setUCv1, 
    uCv1Up, 
    uCv1Open, 
    setUCv2, 
    uCv2Up,  
    uCv2Open, 
    setUCv3, 
    uCv3Up,  
    uCv3Open, 
} from '../../../Redux/AuthSlice';


function Messagebar({
    arrivalFlameMessage,
    arrivalUnionMessage,
    newMessage
}) {

    const { 
        user, 
        convBox, 
        fC1Open, 
        fC2Open, 
        fC3Open, 
        uC1Open, 
        uC2Open, 
        uC3Open, 
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ cCOpen, setCCOpen ] = useState(convBox);
    const [ convs, setConvs ] = useState([]);
    const [ drkIcon, setDrkIcon ] = useState(false);
    const [ diamondHover, setDiamondHover ] = useState(false);
    const [ diamondActive, setDiamondActive ] = useState(false);
    const [ chatConvHover, setChatConvHover ] = useState(false);
    const [ chatConvActive, setChatConvActive ] = useState(false);
    const [ chatWriteHover, setChatWriteHover ] = useState(false);
    const [ chatWriteActive, setChatWriteActive ] = useState(false);
    const [ chatOptionsHover, setChatOptionsHover ] = useState(false);
    const [ chatOptionsActive, setChatOptionsActive ] = useState(false);


    useEffect(() => {
        if (convBox) {
        setCCOpen(convBox);
        }
    }, [convBox]);


    useEffect(() => {
        if (user) {
            const getConversations = async () => {
                try {
                    const res = user.unionName 
                        ? await axios.get(`/conversations/union/${user._id}`)
                        : await axios.get(`/conversations/flame/${user._id}`)
                    setConvs(res.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getConversations();
        }
    }, [user]);

    const convBoxOpen = () => {
        setCCOpen(true)
        dispatch(cvBxOpen());
        localStorage.setItem("convBox", JSON.stringify(true));
    };

    const convBoxClose = () => {
        setCCOpen(false);
        dispatch(cvBxClose());
        localStorage.removeItem("convBox");
    };

    const handleUnionClick = (conv) => {
        if (uC1Open && !uC2Open) {
            dispatch(setUCv2(conv));
            dispatch(uCv2Open());
            dispatch(uCv2Up());
            localStorage.setItem("uConv2", JSON.stringify(conv))
            localStorage.setItem("uC2Open", JSON.stringify(true))
            localStorage.setItem("uC2Up", JSON.stringify(false))
        } else if (uC1Open && uC2Open && !uC3Open) {
            dispatch(setUCv3(conv));
            dispatch(uCv3Open());
            dispatch(uCv3Up());
            localStorage.setItem("uConv3", JSON.stringify(conv))
            localStorage.setItem("uC3Open", JSON.stringify(true))
            localStorage.setItem("uC3Up", JSON.stringify(false))
        } else {
            dispatch(setUCv1(conv));
            dispatch(uCv1Open());
            dispatch(uCv1Up());
            localStorage.setItem("uConv1", JSON.stringify(conv))
            localStorage.setItem("uC1Open", JSON.stringify(true))
            localStorage.setItem("uC1Up", JSON.stringify(false))
        }
    };

    const handleFlameClick = (conv) => {
        if (fC1Open && !fC2Open) {
            dispatch(setFCv2(conv));
            dispatch(fCv2Open());
            dispatch(fCv2Up());
            localStorage.setItem("fConv2", JSON.stringify(conv))
            localStorage.setItem("fC2Open", JSON.stringify(true))
            localStorage.setItem("fC2Up", JSON.stringify(false))
        } else if (fC1Open && fC2Open && !fC3Open) {
            dispatch(setFCv3(conv));
            dispatch(fCv3Open());
            dispatch(fCv3Up());
            localStorage.setItem("fConv3", JSON.stringify(conv))
            localStorage.setItem("fC3Open", JSON.stringify(true))
            localStorage.setItem("fC3Up", JSON.stringify(false))
        } else {
            dispatch(setFCv1(conv));
            dispatch(fCv1Open());
            dispatch(fCv1Up());
            localStorage.setItem("fConv1", JSON.stringify(conv))
            localStorage.setItem("fC1Open", JSON.stringify(true))
            localStorage.setItem("fC1Up", JSON.stringify(false))
        }
    };

   

    return (
        <>
        {user &&
        <>
            {user.unionName ?
                (
                    <div className="messageBar">
                        {user.spectrum === "rainbow" && <div className={`chatConvBackgroundTheme ${user.spectrum} ${cCOpen ? "open" : "close"}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
                        {user.spectrum === "silver" && <div className={`chatConvBackgroundTheme ${user.spectrum} ${cCOpen ? "open" : "close"}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
                        {user.spectrum === "gold" && <div className={`chatConvBackgroundTheme ${user.spectrum} ${cCOpen ? "open" : "close"}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
                        {user.spectrum === "platinum" && <div className={`chatConvBackgroundTheme ${user.spectrum} ${cCOpen ? "open" : "close"}`} style={{backgroundImage: `url(/misc/platinum-background${cCOpen ? "" : "-horizontal"}.jpg)`, backgroundSize: "cover"}} />}
                        {user.spectrum === "diamond" && <div className={`chatConvBackgroundTheme ${user.spectrum} ${cCOpen ? "open" : "close"}`} style={{backgroundImage: `url(/misc/diamond-background.jpg)`, backgroundSize: "cover"}} />}
                        {user.spectrum === "diamond" ?
                            (
                                <div 
                                    className={`chatConv-container ${cCOpen ? "open" : "close"}`}
                                    style={!cCOpen && diamondHover ? {backgroundImage: `url(/misc/diamond-background${drkIcon ? "-drk" : ""}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                    onClick={cCOpen ? null : convBoxOpen}
                                    onMouseEnter={() => setDiamondHover(true)}
                                    onMouseLeave={() => setDiamondHover(false)}
                                    onMouseDown={() => setDrkIcon(true)}
                                    onMouseUp={() => setDrkIcon(false)}
                                >
                                    {cCOpen ?
                                        (
                                            <div className={`chatConvContainer ${user.spectrum ? user.spectrum : "gray"}`}>
                                                <div className={`chatConvContainerTop ${user.spectrum ? user.spectrum : "gray"}`}>
                                                    <div className="chatConvContainerTopLeft">
                                                        <div className={`chatConvAvatarContainer ${cCOpen ? "open" : "close"} ${user.spectrum ? user.spectrum : "gray"}`}>
                                                            <img 
                                                                className="chatConvAvatar" 
                                                                src={user.unionProfilePicture 
                                                                        ? user.unionProfilePicture 
                                                                        : "/picBlanks/no-union-avatar.jpg" 
                                                                } 
                                                                alt="" 
                                                            />
                                                        </div> 
                                                    </div>
                                                    <div className="chatConvContainerTopRight">
                                                        <div className="chatConvBtnContainer">
                                                            <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}} />  
                                                            <div 
                                                                className="chatConvContainerBtn"
                                                                style={chatWriteHover ? {backgroundImage: `url(/misc/diamond-background${chatWriteActive ? "-drk" : ""}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                                                onMouseEnter={() => setChatWriteHover(true)}
                                                                onMouseLeave={() => setChatWriteHover(false)}
                                                                onMouseDown={() => setChatWriteActive(true)}
                                                                onMouseUp={() => setChatWriteActive(false)}
                                                            >
                                                                <img className="chatConvWriteIcon" src={`/icons/interactions/write-message-${user.spectrum ? user.spectrum : "gray"}${chatWriteActive ? "-drk" : ""}.png`} alt="" />
                                                        </div>              
                                                        </div>
                                                        <div className="chatConvBtnContainer" style={{opacity: "0.3"}}>
                                                            <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}} /> 
                                                            <div 
                                                                className="chatConvContainerBtn"
                                                                style={chatOptionsHover ? {backgroundImage: `url(/misc/diamond-background${chatOptionsActive ? "-drk" : ""}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                                                onMouseEnter={() => setChatOptionsHover(true)}
                                                                onMouseLeave={() => setChatOptionsHover(false)}
                                                                onMouseDown={() => setChatOptionsActive(true)}
                                                                onMouseUp={() => setChatOptionsActive(false)}
                                                            >
                                                                <MoreHoriz className="chatConvOptionsIcon"/>
                                                            </div>                  
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr 
                                                    className="chatConvHr"
                                                    style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}}
                                                />
                                                <div className={`chatConvContainerCenter ${user.spectrum}`}>
                                                    <div className={`chatConvContainerCenterUnion ${user.spectrum}`}>
                                                        <span className={`chatConvContainerTitle ${user.spectrum}`}>Union Messages</span>
                                                        <hr 
                                                            className="chatConvTitleHr union"
                                                            style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}}
                                                        />                                                            
                                                        <div className="chatConvlist">
                                                            {convs &&
                                                                convs.map((conv) => user?.unionName ? 
                                                                    (
                                                                        conv.unionMembers.length === 2 &&
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                )
                                                            } 
                                                        </div>
                                                    </div>
                                                    <hr 
                                                        className="chatConvHr"
                                                        style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}}
                                                    /> 
                                                    <div className={`chatConvContainerCenterFlame ${user.spectrum}`}>
                                                        <span className={`chatConvContainerTitle ${user.spectrum}`}>Flame Messages</span>
                                                        <hr 
                                                            className="chatConvTitleHr flame"
                                                            style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}}
                                                        /> 
                                                        <div className="chatConvlist">
                                                            {convs &&
                                                                convs.map((conv) => user?.unionName ?
                                                                    (
                                                                        conv.flameMembers.length === 1 &&
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                )
                                                            } 
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr 
                                                    className="chatConvHr"
                                                    style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}}
                                                /> 
                                                <div className={`chatConvContainerBottom ${user?.unionName ? user.spectrum : user.energy}`}>
                                                    <div className="chatConvBottomBtnContainer">
                                                       <div className={`chatConvBottomBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}} />           
                                                        <div 
                                                            className="chatConvBtn"
                                                            style={chatConvHover ? {backgroundImage: `url(/misc/diamond-background${chatConvActive ? "-drk" : ""}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                                            onClick={convBoxClose}
                                                            onMouseEnter={() => setChatConvHover(true)}
                                                            onMouseLeave={() => setChatConvHover(false)}
                                                            onMouseDown={() => setChatConvActive(true)}
                                                            onMouseUp={() => setChatConvActive(false)}
                                                        >
                                                            <img 
                                                                className="chatConvBtnPNGIcon" 
                                                                src={`/icons/interactions/chat-tf-message-${user.spectrum}${chatConvActive ? "-drk" : ""}.png`} 
                                                                alt="" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <img className="chatConvIcon container" src={`/icons/interactions/chat-tf-message-${user.spectrum}${drkIcon ? "-drk" : ""}.png`} alt="" />
                                        )
                                    }
                                </div>
                            ) : (
                                <div 
                                    className={`chatConv-container BOX_SHADOW ${cCOpen? "open" : "close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onClick={cCOpen ? null : convBoxOpen}
                                    onMouseEnter={() => setDiamondHover(true)}
                                    onMouseLeave={() => setDiamondHover(false)}
                                    onMouseDown={() => setDrkIcon(true)}
                                    onMouseUp={() => setDrkIcon(false)}
                                >
                                    {cCOpen ?
                                        (
                                            <div className={`chatConvContainer ${user.spectrum ? user.spectrum : "gray"}`}>
                                                <div className={`chatConvContainerTop ${user.spectrum ? user.spectrum : "gray"}`}>
                                                    <div className="chatConvContainerTopLeft">
                                                        <div className={`chatConvAvatarContainer ${cCOpen ? "open" : "close"} ${user.spectrum ? user.spectrum : "gray"}`}>
                                                            <img 
                                                                className="chatConvAvatar" 
                                                                src={user.unionProfilePicture 
                                                                        ? user.unionProfilePicture 
                                                                        : "/picBlanks/no-union-avatar.jpg" 
                                                                } 
                                                                alt="" 
                                                            />
                                                        </div> 
                                                    </div>
                                                    <div className="chatConvContainerTopRight">
                                                        <div className="chatConvBtnContainer">
                                                            {user.spectrum === "rainbow" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
                                                            {user.spectrum === "silver" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
                                                            {user.spectrum === "gold" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
                                                            {user.spectrum === "platinum" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background-horizontal.jpg)", backgroundSize: "cover"}} />}
                                                            <div 
                                                                className={`chatConvContainerBtn BOX_SHADOW ${user.spectrum ? user.spectrum : "gray"}`}
                                                                onMouseEnter={() => setChatWriteHover(true)}
                                                                onMouseLeave={() => setChatWriteHover(false)}
                                                                onMouseDown={() => setChatWriteActive(true)}
                                                                onMouseUp={() => setChatWriteActive(false)}
                                                            >
                                                                <img className="chatConvWriteIcon" src={`/icons/interactions/write-message-${user.spectrum}${chatWriteActive ? "-drk" : ""}.png`} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="chatConvBtnContainer" style={{opacity: "0.3"}}>
                                                            {user.spectrum === "rainbow" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
                                                            {user.spectrum === "silver" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
                                                            {user.spectrum === "gold" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
                                                            {user.spectrum === "platinum" && <div className={`chatConvBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background-horizontal.jpg)", backgroundSize: "cover"}} />}
                                                            <div 
                                                                className={`chatConvContainerBtn BOX_SHADOW ${user.spectrum ? user.spectrum : "gray"}`}
                                                                
                                                                onMouseEnter={() => setChatOptionsHover(true)}
                                                                onMouseLeave={() => setChatOptionsHover(false)}
                                                                onMouseDown={() => setChatOptionsActive(true)}
                                                                onMouseUp={() => setChatOptionsActive(false)}
                                                            >
                                                                <MoreHoriz className="chatConvOptionsIcon" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className={`chatConvHr ${user.spectrum ? user.spectrum : "gray"}`}/> 
                                                <div className={`chatConvContainerCenter ${user.spectrum ? user.spectrum : "gray"}`}>
                                                    <div className={`chatConvContainerCenterUnion ${user.spectrum ? user.spectrum : "gray"}`}>
                                                        <span className={`chatConvContainerTitle ${user.spectrum ? user.spectrum : "gray"}`}>Union Messages</span>
                                                        <hr className={`chatConvTitleHr union ${user.spectrum ? user.spectrum : "gray"}`}/> 
                                                        <div className="chatConvlist">
                                                            {convs &&
                                                                convs.map((conv) => user?.unionName ? 
                                                                    (
                                                                        conv.unionMembers.length === 2 &&
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                )
                                                            } 
                                                        </div>
                                                    </div>
                                                    <hr className={`chatConvHr ${user.spectrum ? user.spectrum : "gray"}`}/> 
                                                    <div className={`chatConvContainerCenterFlame ${user.spectrum ? user.spectrum : "gray"}`}>
                                                        <span className={`chatConvContainerTitle ${user.spectrum ? user.spectrum : "gray"}`}>Flame Messages</span>
                                                        <hr className={`chatConvTitleHr flame ${user.spectrum ? user.spectrum : "gray"}`}/> 
                                                        <div className="chatConvlist">
                                                            {convs &&
                                                                convs.map((conv) => user?.unionName ?
                                                                    (
                                                                        conv.flameMembers.length === 1 &&
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                            <div key={conv._id} onClick={() => handleUnionClick(conv)}>
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
                                                                )
                                                            } 
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className={`chatConvHr ${user.spectrum ? user.spectrum : "gray"}`}/> 
                                                <div className={`chatConvContainerBottom ${user.spectrum ? user.spectrum : "gray"}`}>
                                                    <div className="chatConvBottomBtnContainer">
                                                        {user.spectrum === "rainbow" && <div className={`chatConvBottomBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
                                                        {user.spectrum === "silver" && <div className={`chatConvBottomBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
                                                        {user.spectrum === "gold" && <div className={`chatConvBottomBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
                                                        {user.spectrum === "platinum" && <div className={`chatConvBottomBtnContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background-horizontal.jpg)", backgroundSize: "cover"}} />}
                                                        <div 
                                                            className={`chatConvBtn BOX_SHADOW ${user.spectrum ? user.spectrum : "gray"}`} 
                                                            onClick={convBoxClose}
                                                            onMouseEnter={() => setChatConvHover(true)}
                                                            onMouseLeave={() => setChatConvHover(false)}
                                                            onMouseDown={() => setChatConvActive(true)}
                                                            onMouseUp={() => setChatConvActive(false)}
                                                        >
                                                            <img 
                                                                className="chatConvBtnPNGIcon" 
                                                                src={`/icons/interactions/chat-tf-message-${user.spectrum ? user.spectrum : "gray"}${chatConvActive ? "-drk" : ""}.png`} 
                                                                alt="" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <img className="chatConvIcon container" src={`/icons/interactions/chat-tf-message-${user.spectrum ? user.spectrum : "gray"}${drkIcon ? "-drk" : ""}.png`} alt="" />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div className="messageBar">
                        <div 
                            className={`chatConv-container BOX_SHADOW ${cCOpen ? "open" : "close"} ${user.energy ? user.energy : "gray"}`}
                            onClick={cCOpen ? null : convBoxOpen}
                            onMouseEnter={() => setDiamondHover(true)}
                            onMouseLeave={() => setDiamondHover(false)}
                            onMouseDown={() => setDrkIcon(true)}
                            onMouseUp={() => setDrkIcon(false)}
                        >
                            {cCOpen ?
                                (
                                    <div className={`chatConvContainer ${user.energy ? user.energy : "gray"}`}>
                                        <div className={`chatConvContainerTop ${user.energy ? user.energy : "gray"}`}>
                                            <div className="chatConvContainerTopLeft">
                                                <div className={`chatConvAvatarContainer ${cCOpen ? "open" : "close"} ${user.energy ? user.energy : "gray"}`}>
                                                    <img 
                                                        className="chatConvAvatar" 
                                                        src={user.profilePicture 
                                                                ? user.profilePicture 
                                                                : "/picBlanks/no-avatar.jpg"
                                                        } 
                                                        alt="" 
                                                    />
                                                </div> 
                                            </div>
                                            <div className="chatConvContainerTopRight">
                                                <div className="chatConvBtnContainer">
                                                    <div 
                                                        className={`chatConvContainerBtn BOX_SHADOW ${user?.energy ? user.energy : "gray"}`}
                                                        onMouseEnter={() => setChatWriteHover(true)}
                                                        onMouseLeave={() => setChatWriteHover(false)}
                                                        onMouseDown={() => setChatWriteActive(true)}
                                                        onMouseUp={() => setChatWriteActive(false)}
                                                    >
                                                        <img className="chatConvWriteIcon" src={`/icons/interactions/write-message-${user.energy ? user.energy : "gray"}${chatWriteActive ? "-drk" : ""}.png`} alt="" />
                                                    </div> 
                                                </div>
                                                <div className="chatConvBtnContainer">
                                                    <div 
                                                        className={`chatConvContainerBtn BOX_SHADOW ${user.energy ? user.energy : "gray"}`}
                                                        style={{opacity: "0.3"}}
                                                        onMouseEnter={() => setChatOptionsHover(true)}
                                                        onMouseLeave={() => setChatOptionsHover(false)}
                                                        onMouseDown={() => setChatOptionsActive(true)}
                                                        onMouseUp={() => setChatOptionsActive(false)}
                                                    >
                                                        <MoreHoriz className="chatConvOptionsIcon"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className={`chatConvHr ${user.energy ? user.energy : "gray"}`}/>
                                        <div className={`chatConvContainerCenter ${user.energy ? user.energy : "gray"}`}>
                                            <div className={`chatConvContainerCenterUnion ${user.energy ? user.energy : "gray"}`}>
                                                <span className={`chatConvContainerTitle ${user.energy ? user.energy : "gray"}`}>Union Messages</span>
                                                <hr className={`chatConvTitleHr union ${user.energy ? user.energy : "gray"}`}/>
                                                <div className="chatConvlist">
                                                    {convs &&
                                                        convs.map((conv) => user?.unionName ? 
                                                            (
                                                                conv.unionMembers.length === 2 &&
                                                                    <div key={conv._id} onClick={() => handleFlameClick(conv)}>
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
                                                                    <div key={conv._id} onClick={() => handleFlameClick(conv)}>
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
                                                        )
                                                    } 
                                                </div>
                                            </div>
                                            <hr className={`chatConvHr ${user.energy ? user.energy : "gray"}`}/>
                                            <div className={`chatConvContainerCenterFlame ${user.energy ? user.energy : "gray"}`}>
                                                <span className={`chatConvContainerTitle ${user.energy ? user.energy : "gray"}`}>Flame Messages</span>
                                                <hr className={`chatConvTitleHr flame ${user.energy ? user.energy : "gray"}`}/>
                                                <div className="chatConvlist">
                                                    {convs &&
                                                        convs.map((conv) => user?.unionName ?
                                                            (
                                                                conv.flameMembers.length === 1 &&
                                                                    <div key={conv._id} onClick={() => handleFlameClick(conv)}>
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
                                                                    <div key={conv._id} onClick={() => handleFlameClick(conv)}>
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
                                                        )
                                                    } 
                                                </div>
                                            </div>
                                        </div>
                                        <hr className={`chatConvHr ${user.energy ? user.energy : "gray"}`}/>
                                        <div className={`chatConvContainerBottom ${user?.unionName ? user.spectrum : user.energy}`}>
                                            <div className="chatConvBottomBtnContainer">
                                                <div 
                                                    className={`chatConvBtn BOX_SHADOW ${user.energy ? user.energy : "gray"}`} 
                                                    onClick={convBoxClose}
                                                    onMouseEnter={() => setChatConvHover(true)}
                                                    onMouseLeave={() => setChatConvHover(false)}
                                                    onMouseDown={() => setChatConvActive(true)}
                                                    onMouseUp={() => setChatConvActive(false)}
                                                >
                                                    <img 
                                                        className="chatConvBtnPNGIcon" 
                                                        src={`/icons/interactions/chat-tf-message-${user.energy ? user.energy : "gray"}${chatConvActive ? "-drk" : ""}.png`} 
                                                        alt="" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <img className="chatConvIcon container" src={`/icons/interactions/chat-tf-message-${user.energy ? user.energy : "gray"}${drkIcon ? "-drk" : ""}.png`} alt="" />
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
}
</>
    )
}

export default memo(Messagebar);