import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, switch2UnionAcc, switch2FlameAcc } from "../../../../Redux/AuthSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FriendRequestsDropdown.css";
import FlameRequest from '../../../FriendRequests/FlameRequest/FlameRequest';
import  UnionRequest from '../../../FriendRequests/UnionRequest/UnionRequest';
import  AcceptedRequest from '../../../FriendRequests/AcceptedRequest/AcceptedRequest';

function FriendRequestsDropdown() {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const folMDomNode = useRef(null);
    const folMDDRef = useRef(null);
    const folCntRef = useRef(null);

    const [ folMDD, setFolMDD ] = useState(false);
    const [ folHover, setFolHover ] = useState(false);
    const [ folActive, setFolActive ] = useState(false);
    const [ folCntWidth, setFolCntWidth ] = useState();
    const [ initialFriendRequests, setInitialFriendRequests ] = useState([]);
    const [ reqsInitialUnseen, setReqsInitialUnseen ] = useState([]);
    const [ reqsInitialUnseenCnt, setReqsInitialUnseenCnt ] = useState(0);
    const [ acceptedFriendRequests, setAcceptedFriendRequests ] = useState([]);
    const [ reqsAcceptedUnseen, setReqsAcceptedUnseen ] = useState([]);
    const [ reqsAcceptedUnseenCnt, setReqsAcceptedUnseenCnt ] = useState(0);
    const [ friendRequests, setFriendRequests ] = useState([]);
    const [ reqsUnseen, setReqsUnseen ] = useState([]);
    const [ reqsUnseenCnt, setReqsUnseenCnt ] = useState(0);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        const fetchInitialFriendRequests = async () => {
            const res = user.unionName
                ? await axios.get(`/friendRequests/union/${user._id}/befriend`)
                : await axios.get(`/friendRequests/flame/${user._id}/befriend`)
            setInitialFriendRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchInitialFriendRequests();
    }, [user]);

    useEffect(() => {
        const fetchAcceptedFriendRequests = async () => {
            const res = user.unionName
                ? await axios.get(`/friendRequests/union/${user._id}/accepted`)
                : await axios.get(`/friendRequests/flame/${user._id}/accepted`)
            setAcceptedFriendRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchAcceptedFriendRequests();
    }, [user]);

    useEffect(() => {
        if(initialFriendRequests) {
            const getReqsInitialUnseen = () => {
                const unseenArr = initialFriendRequests.filter((fr) => fr.initialSeen === false);
                setReqsInitialUnseen(unseenArr);
                setReqsInitialUnseenCnt(unseenArr.length);
            }
            getReqsInitialUnseen();
        }
    }, [initialFriendRequests]);

    useEffect(() => {
        if(acceptedFriendRequests) {
            const getReqsAcceptedUnseen = () => {
                const unseenArr = acceptedFriendRequests.filter((fr) => fr.acceptSeen === false);
                setReqsAcceptedUnseen(unseenArr);
                setReqsAcceptedUnseenCnt(unseenArr.length);
            }
            getReqsAcceptedUnseen();
        }
    }, [acceptedFriendRequests]);

    useEffect(() => {
        if (initialFriendRequests || acceptedFriendRequests) { 
            setFriendRequests(initialFriendRequests.concat(acceptedFriendRequests).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                }).splice(0,5)
            );
        }
    }, [initialFriendRequests, acceptedFriendRequests]);

    useEffect(() => {
        if (reqsInitialUnseen || reqsAcceptedUnseen) { 
            setReqsUnseen(reqsInitialUnseen.concat(reqsAcceptedUnseen).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
            setReqsUnseenCnt(reqsInitialUnseenCnt + reqsAcceptedUnseenCnt)
        }
    }, [reqsInitialUnseen, reqsAcceptedUnseen]);

    useEffect(() => {
        if(folMDD) {
            const putInitialSeen = async () => {
                try {
                    await Promise.all(
                        friendRequests.forEach((fr) => {
                            if(!fr.initialSeen) {
                                axios.put(`/friendRequests/${fr._id}/initialSeen`)
                            } else if (fr.initialSeen && fr.requestAccepted && !fr.acceptSeen) {
                                axios.put(`/friendRequests/${fr._id}/acceptSeen`)
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

    }, [folMDD]);


    useEffect(() => {
        if (reqsUnseenCnt) {
            const getFCWidth = () => {
                const fCWidth = folCntRef.current.clientWidth;
                setFolCntWidth(fCWidth + 12);
            }
            getFCWidth();
        }
    }, [reqsUnseenCnt]);

    useEffect(() => {
        let folMDDHandler = (event) => {
            //if (event.path[0] !== folMDDRef || !folMDomNode.current.contains(event.target)) {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setFolMDD(false);
            }
        };
        if (folMDD) {
            document.body.addEventListener("click", folMDDHandler);
            return () => {
                document.body.removeEventListener("click", folMDDHandler);
            };
        }
      }, [folMDD]);
    


    return (

        <div className="topbarIconItemcontainer follow" ref={folMDDRef}>
            {user.unionName ?
                (
                    <>
                        {folMDD ?
                            (
                                <>
                                    <div 
                                        className={`friendRequestsDropdownHigherSpectrumBackground ${colorTheme}`} 
                                        style={{
                                            backgroundImage: `url(/misc/${colorTheme}-background.jpg)`,
                                            backgroundSize: "cover", 
                                            opacity: ".3"
                                        }}
                                    />
                                    <div className="friendRequestsDropdownWhiteBackground open" />
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
                                    className={`topbarIconItem ${folMDD ? "open" : "close"}`}
                                    style={folHover ? {backgroundImage: `url(/misc/diamond-background${folActive && "-drk"}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                    onMouseEnter={() => setFolHover(true)} 
                                    onMouseLeave={() => setFolHover(false)}
                                    onMouseDown={() => setFolActive(true)} 
                                    onMouseUp={() => setFolActive(false)}
                                    onClick={() => setFolMDD(!folMDD)}
                                >
                                    <img className="topbarPNGIcon" src={`/icons/interactions/friends-${flame.energy}-${user.spectrum}${folActive ? "-drk" : ""}.png`} alt="" />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={reqsUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={folCntRef}>{reqsUnseenCnt}</span>
                                    </span>
                                </div>
                            ) : (
                                <div 
                                    className={`topbarIconItem ${folMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onMouseEnter={() => setFolHover(true)} 
                                    onMouseLeave={() => setFolHover(false)}
                                    onMouseDown={() => setFolActive(true)} 
                                    onMouseUp={() => setFolActive(false)}
                                    onClick={() => setFolMDD(!folMDD)}
                                >
                                    <img className="topbarPNGIcon" src={`/icons/interactions/friends-${flame.energy}-${user.spectrum}${folActive ? "-drk" : ""}.png`} alt="" />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={reqsUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={folCntRef}>{reqsUnseenCnt}</span>
                                    </span>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${folMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => setFolHover(true)} 
                            onMouseLeave={() => setFolHover(false)}
                            onMouseDown={() => setFolActive(true)} 
                            onMouseUp={() => setFolActive(false)}
                            onClick={() => setFolMDD(!folMDD)}
                        >
                            <img className="topbarPNGIcon" src={`/icons/interactions/friends-${flame?.energy}${folActive ? "-drk" : ""}.png`} alt="" />
                            <span 
                                className={`topbarIconBadge ${flame?.energy}`}
                                style={reqsUnseen.length > 0 
                                    ? {
                                        opacity: "100%",
                                        width: `${folCntWidth}px`,
                                        right: `-${folCntWidth - 13}px`
                                    } : {
                                        opacity: "0%", 
                                        width: `${folCntWidth}px`,
                                        right: `-${folCntWidth - 13}px`,
                                        transitionDelay: "325ms", 
                                        transition: "opacity 4000ms ease-in-out"
                                    }
                                }
                            >
                                <span ref={folCntRef}>{reqsUnseenCnt}</span>
                            </span>
                        </div>
                    </>
                )
            }
            <div className={`tbFMDropDown chat flame ${folMDD ? "open" : ""}`} ref={folMDomNode}>  
                <div className="friendRequestsDropdown flame">
                    <div className="friendRequestsDropdownContainer">
                        {user.unionName && user.spectrum === "rainbow" && <div className={`friendRequestsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "silver" && <div className={`friendRequestsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "gold" && <div className={`friendRequestsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "platinum" && <div className={`friendRequestsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover"}} />}
                        {user.unionName && user.spectrum === "diamond" && <div className={`friendRequestsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}} />}
                        <div className={`friendRequestsDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="friendRequestDropdownList">
                                {friendRequests.map((fr) => (
                                    fr.requestAccepted
                                        ? <AcceptedRequest key={fr._id} fr={fr} folMDD={folMDD}/>
                                        : fr.flameRequesterId  
                                            ? <FlameRequest key={fr._id} fr={fr} folMDD={folMDD}/>
                                            : <UnionRequest key={fr._id} fr={fr} folMDD={folMDD}/>
                                ))}
                            </div>
                            <div className="friendRequestDropdownLinkContainer">
                                <hr 
                                    className={`friendRequestDropdownHr ${user.unionName ? user.spectrum : user.energy}`}
                                    style={user?.unionName && user?.spectrum === "diamond" ? {backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"} : {backgroundImg: "none"}}
                                />
                                <div className="friendRequestDropdownLinkContainerBottom">
                                    <Link className="friendRequestDropdownLink" to="/friendRequests">
                                        <span className={`friendRequestDropdownLinkText ${user.unionName ? user.spectrum : user.energy}`}>
                                            See All Friend Requests
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

export default FriendRequestsDropdown;