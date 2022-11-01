import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, switch2UnionAcc, switch2FlameAcc } from "../../../../Redux/AuthSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ChatDropdown.css";

function ChatDropdown() {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const chatMDomNode = useRef(null);
    const chatMDDRef = useRef(null);
    const chatCntRef = useRef(null);

    const [ chatMDD, setChatMDD ] = useState(false);
    const [ chatHover, setChatHover ] = useState(false);
    const [ chatActive, setChatActive ] = useState(false);
    const [ chatCntWidth, setChatCntWidth ] = useState();
    const [ chatsUnseen, setChatsUnseen ] = useState(0);
    const [ chatsUnseenCnt, setChatsUnseenCnt ] = useState(0);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        let chatMDDHandler = (event) => {
            //if (event.path[0] !== chatMDDRef || !chatMDomNode.current.contains(event.target)) {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setChatMDD(false);
            }
        };
        if (chatMDD) {
            document.body.addEventListener("click", chatMDDHandler);
            return () => {
                document.body.removeEventListener("click", chatMDDHandler);
            };
        }
      }, [chatMDD]);

    
    return (

        <div className="topbarIconItemcontainer chat" ref={chatMDDRef}>
            {user.unionName ?
                (
                    <>
                        {chatMDD ?
                            (
                                <>
                                    <div 
                                        className={`chatDropdownHigherSpectrumBackground ${colorTheme}`} 
                                        style={{
                                            backgroundImage: `url(/misc/${colorTheme}-background.jpg)`,
                                            backgroundSize: "cover", 
                                            opacity: ".3"
                                        }}
                                    />
                                    <div className="chatDropdownWhiteBackground open" />
                                </>
                            ) : (
                                <>
                                    {user.spectrum === "rainbow" || 
                                    user.spectrum === "silver" || 
                                    user.spectrum === "gold" || 
                                    user.spectrum === "platinum" || 
                                    user.spectrum === "diamond" ? 
                                        (
                                            <div 
                                                className={`topbarIconItemBackgroundTheme ${user.spectrum}`} 
                                                style={{
                                                    backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                                                    backgroundSize: "cover"
                                                }} 
                                            />
                                        ) : (null)
                                    }
                                </>
                            )
                        }                      
                        {user.spectrum === "diamond" ?
                            (
                                <div 
                                    className={`topbarIconItem ${chatMDD ? "open" : "close"}`}
                                    style={chatHover ? {backgroundImage: `url(/misc/diamond-background${chatActive ? "-drk" : ""}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                    onMouseEnter={() => setChatHover(true)} 
                                    onMouseLeave={() => setChatHover(false)}
                                    onMouseDown={() => setChatActive(true)} 
                                    onMouseUp={() => setChatActive(false)}
                                    onClick={() => setChatMDD(!chatMDD)}
                                >
                                    <img className="topbarPNGIcon" src={`/icons/interactions/chat-tf-message-${user.spectrum}${chatActive ? "-drk" : ""}.png`} alt="" />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={chatsUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${chatCntWidth}px`,
                                                right: `-${chatCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${chatCntWidth}px`,
                                                right: `-${chatCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={chatCntRef}>5</span>
                                    </span>
                                </div>
                            ) : (
                                <div 
                                    className={`topbarIconItem ${chatMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onMouseEnter={() => setChatHover(true)} 
                                    onMouseLeave={() => setChatHover(false)}
                                    onMouseDown={() => setChatActive(true)} 
                                    onMouseUp={() => setChatActive(false)}
                                    onClick={() => setChatMDD(!chatMDD)}
                                >
                                    <img className="topbarPNGIcon" src={`/icons/interactions/chat-tf-message-${user.spectrum}${chatActive ? "-drk" : ""}.png`} alt="" />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={chatsUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${chatCntWidth}px`,
                                                right: `-${chatCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${chatCntWidth}px`,
                                                right: `-${chatCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={chatCntRef}>5</span>
                                    </span>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${chatMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => setChatHover(true)} 
                            onMouseLeave={() => setChatHover(false)}
                            onMouseDown={() => setChatActive(true)} 
                            onMouseUp={() => setChatActive(false)}
                            onClick={() => setChatMDD(!chatMDD)}
                        >
                            <img className="topbarPNGIcon" src={`/icons/interactions/chat-tf-message-${user.energy}${chatActive ? "-drk" : ""}.png`} alt="" />
                            <span 
                                className={`topbarIconBadge ${flame?.energy}`}
                                style={chatsUnseen.length > 0 
                                    ? {
                                        opacity: "100%",
                                        width: `${chatCntWidth}px`,
                                        right: `-${chatCntWidth - 13}px`
                                    } : {
                                        opacity: "0%", 
                                        width: `${chatCntWidth}px`,
                                        right: `-${chatCntWidth - 13}px`,
                                        transitionDelay: "325ms", 
                                        transition: "opacity 4000ms ease-in-out"
                                    }
                                }
                            >
                                <span ref={chatCntRef}>{chatsUnseenCnt}</span>
                            </span>
                        </div>
                    </>
                )
            }
            <div className={`tbCMDropDown chat flame ${chatMDD ? "open" : ""}`} ref={chatMDomNode}>  
                <div className="chatDropdown flame">
                    <div className="chatDropdownContainer">
                        {user.unionName && user.spectrum === "rainbow" && <div className={`chatDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "silver" && <div className={`chatDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "gold" && <div className={`chatDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "platinum" && <div className={`chatDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "diamond" && <div className={`chatDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}} />}
                        <div className={`chatDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="chatDropdownList">
                                
                            </div>
                            <div className="chatDropdownLinkContainer">
                                <hr 
                                    className={`chatDropdownHr ${user.unionName ? user.spectrum : user.energy}`}
                                    style={user?.unionName && user?.spectrum === "diamond" ? {backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"} : {backgroundImg: "none"}}
                                />
                                <div className="chatDropdownLinkContainerBottom">
                                    <Link className="chatDropdownLink" to="/messenger">
                                        <span className={`chatDropdownLinkText ${user.unionName ? user.spectrum : user.energy}`}>
                                            See All Conversations
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatDropdown;