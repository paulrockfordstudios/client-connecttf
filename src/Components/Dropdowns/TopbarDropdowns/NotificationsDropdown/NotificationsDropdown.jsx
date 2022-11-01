import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NotificationsDropdown.css";
import AcceptedSubscribeRequest from '../../../SubscribeRequests/AcceptedSubscribeRequest/AcceptedSubscribeRequest';
import FlameSubscribeRequest from '../../../SubscribeRequests/FlameSubscribeRequest/FlameSubscribeRequest';
import UnionSubscribeRequest from '../../../SubscribeRequests/UnionSubscribeRequest/UnionSubscribeRequest';

function NotificationsDropdown() {

    const { user, flame } = useSelector((state) => state.auth);

    const notMDomNode = useRef(null);
    const notMDDRef = useRef(null);
    const notCntRef = useRef(null);

    const [ notMDD, setNotMDD ] = useState(false);
    const [ notHover, setNotHover ] = useState(false);
    const [ notActive, setNotActive ] = useState(false);
    const [ notCntWidth, setNotCntWidth ] = useState();
    const [ notUnseen, setNotUnseen ] = useState([]);
    const [ notUnseenCnt, setNotUnseenCnt ] = useState(0);

    const [ initialSubscribeRequests, setInitialSubscribeRequests ] = useState([]);
    const [ reqsInitialUnseen, setReqsInitialUnseen ] = useState([]);
    const [ reqsInitialUnseenCnt, setReqsInitialUnseenCnt ] = useState(0);
    const [ acceptedSubscribeRequests, setAcceptedSubscribeRequests ] = useState([]);
    const [ reqsAcceptedUnseen, setReqsAcceptedUnseen ] = useState([]);
    const [ reqsAcceptedUnseenCnt, setReqsAcceptedUnseenCnt ] = useState(0);
    const [ subscribeRequests, setSubscribeRequests ] = useState([]);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        const fetchInitialSubscribeRequests = async () => {
            const res = user.unionName
                ? await axios.get(`/subscribeRequests/union/${user._id}/subscribe`)
                : await axios.get(`/subscribeRequests/flame/${user._id}/subscribe`)
            setInitialSubscribeRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchInitialSubscribeRequests();
    }, [user]);


    useEffect(() => {
        const fetchAcceptedSubscribeRequests = async () => {
            const res = user.unionName
                ? await axios.get(`/subscribeRequests/union/${user._id}/accepted`)
                : await axios.get(`/subscribeRequests/flame/${user._id}/accepted`)
            setAcceptedSubscribeRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchAcceptedSubscribeRequests();
    }, [user]);

    useEffect(() => {
        if(initialSubscribeRequests) {
            const getReqsInitialUnseen = () => {
                const unseenArr = initialSubscribeRequests.filter((sr) => sr.initialSeen === false);
                setReqsInitialUnseen(unseenArr);
                setReqsInitialUnseenCnt(unseenArr.length);
            }
            getReqsInitialUnseen();
        }
    }, [initialSubscribeRequests]);

    useEffect(() => {
        if(acceptedSubscribeRequests) {
            const getReqsAcceptedUnseen = () => {
                const unseenArr = acceptedSubscribeRequests.filter((sr) => sr.acceptSeen === false);
                setReqsAcceptedUnseen(unseenArr);
                setReqsAcceptedUnseenCnt(unseenArr.length);
            }
            getReqsAcceptedUnseen();
        }
    }, [acceptedSubscribeRequests]);

    useEffect(() => {
        if (initialSubscribeRequests || acceptedSubscribeRequests) { 
            setSubscribeRequests(initialSubscribeRequests.concat(acceptedSubscribeRequests).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                }).splice(0,5)
            );
        }
    }, [initialSubscribeRequests, acceptedSubscribeRequests]);

    useEffect(() => {
        if (reqsInitialUnseen || reqsAcceptedUnseen) { 
            setNotUnseen(reqsInitialUnseen.concat(reqsAcceptedUnseen).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
            setNotUnseenCnt(reqsInitialUnseenCnt + reqsAcceptedUnseenCnt)
        }
    }, [reqsInitialUnseen, reqsAcceptedUnseen]);

    useEffect(() => {
        if(notMDD) {
            const putInitialSeen = async () => {
                try {
                    await Promise.all(
                        subscribeRequests.forEach((sr) => {
                            if(!sr.initialSeen) {
                                axios.put(`/subscribeRequests/${sr._id}/initialSeen`)
                            } else if (sr.initialSeen && sr.requestAccepted && !sr.acceptSeen) {
                                axios.put(`/subscribeRequests/${sr._id}/acceptSeen`)
                            }
                        })
                    )
                } catch(err) {
                    console.log(err)
                }
            }
            putInitialSeen();
            setReqsInitialUnseen([]);
        }
    }, [notMDD]);

    useEffect(() => {
        if (notUnseenCnt) {
            const getNCWidth = () => {
                const nCWidth = notCntRef.current.clientWidth;
                setNotCntWidth(nCWidth + 12);
            }
            getNCWidth();
        }
    }, [notUnseenCnt]);

    useEffect(() => {
        let notMDDHandler = (event) => {
            //if (event.path[0] !== notMDDRef || !notMDomNode.current.contains(event.target)) {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setNotMDD(false);
            }
        };
        if (notMDD) {
            document.body.addEventListener("click", notMDDHandler);
            return () => {
                document.body.removeEventListener("click", notMDDHandler);
            };
        }
      }, [notMDD]);

    
    return (

        <div className="topbarIconItemcontainer not" ref={notMDDRef}>
            {user.unionName ?
                (
                    <>
                        {notMDD ?
                            (
                                <>
                                    <div 
                                        className={`notificationsDropdownHigherSpectrumBackground ${colorTheme}`} 
                                        style={{
                                            backgroundImage: `url(/misc/${colorTheme}-background.jpg)`,
                                            backgroundSize: "cover", 
                                            opacity: ".3"
                                        }}
                                    />
                                    <div className="notificationsDropdownWhiteBackground open" />
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
                                    className={`topbarIconItem ${notMDD ? "open" : "close"}`}
                                    style={notHover ? {backgroundImage: `url(/misc/diamond-background${notActive ? "-drk" : ""}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                    onMouseEnter={() => setNotHover(true)} 
                                    onMouseLeave={() => setNotHover(false)}
                                    onMouseDown={() => setNotActive(true)} 
                                    onMouseUp={() => setNotActive(false)}
                                    onClick={() => setNotMDD(!notMDD)}
                                >
                                    <img className="topbarIconPNG bell" src={`/icons/lotusBell/lotusBell-${user.spectrum}${notActive ? "-drk" : notHover || notMDD ? "-wht" : ""}.png`} alt="" />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={notUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={notCntRef}>{notUnseenCnt}</span>
                                    </span>
                                </div>
                            ) : (
                                <div 
                                    className={`topbarIconItem ${notMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onMouseEnter={() => setNotHover(true)} 
                                    onMouseLeave={() => setNotHover(false)}
                                    onMouseDown={() => setNotActive(true)} 
                                    onMouseUp={() => setNotActive(false)}
                                    onClick={() => setNotMDD(!notMDD)}
                                >
                                    <img className="topbarIconPNG bell" src={`/icons/lotusBell/lotusBell-${user.spectrum}${notActive ? "-drk" : notHover || notMDD ? "-wht" : ""}.png`} alt="" />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={notUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={notCntRef}>{notUnseenCnt}</span>
                                    </span>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${notMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => setNotHover(true)} 
                            onMouseLeave={() => setNotHover(false)}
                            onMouseDown={() => setNotActive(true)} 
                            onMouseUp={() => setNotActive(false)}
                            onClick={() => setNotMDD(!notMDD)}
                        >
                            <img className="topbarIconPNG bell" src={`/icons/lotusBell/lotusBell-${user.energy}${notActive ? "-drk" : notHover || notMDD ? "-wht" : ""}.png`} alt="" />
                            <span 
                                className={`topbarIconBadge ${flame?.energy}`}
                                style={notUnseen.length > 0  
                                    ? {
                                        opacity: "100%",
                                        width: `${notCntWidth}px`,
                                        right: `-${notCntWidth - 13}px`
                                    } : {
                                        opacity: "0%", 
                                        width: `${notCntWidth}px`,
                                        right: `-${notCntWidth - 13}px`,
                                        transitionDelay: "325ms", 
                                        transition: "opacity 4000ms ease-in-out"
                                    }
                                }
                            >
                                <span ref={notCntRef}>{notUnseenCnt}</span>
                            </span>
                        </div>
                    </>
                )
            }
            <div className={`tbNMDropDown not flame ${notMDD ? "open" : ""}`} ref={notMDomNode}>  
                <div className="notDropdown flame">
                    <div className="notDropdownContainer">
                        {user.unionName && user.spectrum === "rainbow" && <div className={`notDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "silver" && <div className={`notDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "gold" && <div className={`notDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "platinum" && <div className={`notDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "diamond" && <div className={`notDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}} />}
                        <div className={`notDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="notDropdownList">
                                {subscribeRequests.map((sr) => (
                                    sr.requestAccepted
                                        ? <AcceptedSubscribeRequest key={sr._id} sr={sr} notMDD={notMDD}/>
                                        : sr.flameRequesterId  
                                            ? <FlameSubscribeRequest key={sr._id} sr={sr} notMDD={notMDD}/>
                                            : <UnionSubscribeRequest key={sr._id} sr={sr} notMDD={notMDD}/>
                                ))}
                            </div>
                            <div className="notDropdownLinkContainer">
                                <hr 
                                    className={`notDropdownHr ${user.unionName ? user.spectrum : user.energy}`}
                                    style={user?.unionName && user?.spectrum === "diamond" ? {backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"} : {backgroundImg: "none"}}
                                />
                                <div className="notDropdownLinkContainerBottom">
                                    <Link className="notDropdownLink" to="/notifications">
                                        <span className={`notDropdownLinkText ${user.unionName ? user.spectrum : user.energy}`}>
                                            See All Notifications
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

export default NotificationsDropdown;