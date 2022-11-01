import React, { useState, useEffect, memo, useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import axios from 'axios';
import "./FlameRequest.css";
import { Check, People, Person } from '@material-ui/icons';
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import { 
    flameFollowing, 
    flameFollower, 
    flameUnrequestFollow,
    
    setCv1, 
    cv1Up,   
    cv1Open, 
    setCv2, 
    cv2Up, 
    cv2Open, 
    setCv3, 
    cv3Up, 
    cv3Open, 
} from "../../../Redux/AuthSlice";


function FlameRequest({fr, folMDD}) {

    const dispatch = useDispatch();
    const { 
        user,
        conv1,
        conv2,
        conv3,
     
        c1Open, 
        c1Up, 
        c2Open, 
        c2Up, 
        c3Open, 
        c3Up, 
    } = useSelector((state) => state.auth);

    const [flame, setFlame] = useState({});
    const [ frSeen, setFrSeen ] = useState(fr.initialSeen);
    const [ frAccepted, setFrAccepted ] = useState(fr.requestAccepted);
    const [ frRejected, setFrRejected ] = useState(fr.requestRejected);
    const [ retort, setRetort ] = useState("");
    const [ retortDisplay, setRetortDisplay ] = useState("");
    const [ flameFollowed, setFlameFollowed ] = useState(user.flameFollowing.includes(flame?._id));
    const [ fade, setFade ] = useState(100);
    const [ retortChange, setRetortChange ] = useState(false);
    const [ initialize, setInitialize ] = useState(false);
    const [ conv, setConv ] = useState({});
    const conversation = conv
    const [ loading, setLoading ] = useState(true);
   

    
    useEffect(() => {
        const getFlame = async () => {
            try {
                const res = await axios.get(`/users?userId=${fr.flameRequesterId}`)
                setFlame(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getFlame();
    }, []);

    
    

    useEffect(() => {
        if (flame) {   
            const getConv = async () => {
                try {
                    const res = user.unionName 
                        ? await axios.get(`/conversations/find/flame-union/${flame._id}/${user._id}`)
                        : await axios.get(`/conversations/find/flame-flame/${flame._id}/${user._id}`)
                    
                        setConv(res.data);
                
                } catch(err) {
                    console.log(err);
                }
            }
            getConv();
        }
    }, [ flame ]);


    useEffect(() => {
        if (flame) {
            setFlameFollowed(user.flameFollowing.includes(flame._id)) 
        }
    }, [flame])


    useEffect(() => {
        if (folMDD && frSeen === false) {
            setFrSeen(true);
        }
    },[folMDD, frSeen]);

    // Follow/unfollow flame user
    useEffect(() => {
        setFlameFollowed(user.flameFollowing.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(user));
        user.unionName
            ? localStorage.setItem("union", JSON.stringify(user))
            : localStorage.setItem("flame", JSON.stringify(user))
    },[user.flameFollowing]);

    const handleFlameFollowClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            user.unionName
                ? await axios.put(`/users/${flame._id}/union-flame/follow`, { unionId: user._id })
                : await axios.put(`/users/${flame._id}/flame-flame/follow`, { userId: user._id })
            dispatch(flameFollowing(flame._id));
        } catch(err) {
            console.log(err);
        }
        try {
            const reqBefriend = user.unionName
                ? { flameRequesteeId: flame._id, unionRequesterId: user._id }
                : { flameRequesterId: user._id, flameRequesteeId: flame._id }
            await axios.post("/friendRequests", reqBefriend);
        } catch(err) {
            console.log(err);
        }
        setFlameFollowed(true); 
        setRetortChange(true);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        user.unionName
            ? localStorage.setItem("union", JSON.stringify(user))
            : localStorage.setItem("flame", JSON.stringify(user))
    },[user.flameFollowers]);


    const handleAcceptRequestClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            user.unionName
                ? await axios.put(`/unions/${user._id}/flame-union/follow`, { userId: flame._id })
                : await axios.put(`/users/${user._id}/flame-flame/follow`, { userId: flame._id })
            dispatch(flameFollower(flame._id));
        } catch(err) {
            console.log(err);
        }
        try {
            user.unionName
                ? await axios.put(`/unions/${user._id}/flame-union/unrequestFollow`, { userId: flame._id })
                : await axios.put(`/users/${user._id}/flame-flame/unrequestFollow`, { userId: flame._id })
            dispatch(flameUnrequestFollow(user._id));
        } catch(err) {
            console.log(err);
        }
        try {
            await axios.put(`/friendRequests/${fr._id}/requestAccepted`)
        } catch(err) {
            console.log(err);
        }
        setFrAccepted(true);
        setRetortChange(true);
    }

    
    
    /*
    useEffect(() => {
        if (conv === null) {
            setConv(user.unionName
                ? { flameMembers: [flame._id], unionMembers: [user._id] }
                : { flameMembers: [flame._id, user._id] } 
            );
        }
    }, [conv])
    */

    
    /*
    const handleMessageClick = (event) => {
        event.preventDefault();
            if (c1Open && !c2Open) {
                dispatch(setCv2(conv));
                dispatch(cv2Open());
                dispatch(cv2Up());
                localStorage.setItem("conv2", JSON.stringify(conv))
                localStorage.setItem("c2Open", JSON.stringify(true))
                localStorage.setItem("c2Up", JSON.stringify(true))
            } else if (c1Open && c2Open && !c3Open) {
                dispatch(setCv3(conv));
                dispatch(cv3Open());
                dispatch(cv3Up());
                localStorage.setItem("conv3", JSON.stringify(conv))
                localStorage.setItem("c3Open", JSON.stringify(true))
                localStorage.setItem("c3Up", JSON.stringify(true))
            } else {
                dispatch(setCv1(conv));
                dispatch(cv1Open());
                dispatch(cv1Up());
                localStorage.setItem("conv1", JSON.stringify(conv))
                localStorage.setItem("c1Open", JSON.stringify(true))
                localStorage.setItem("c1Up", JSON.stringify(true))
            }
        
    };
    */

    useEffect(() => {
        if (flame) {
            if (user.friendByReq) {
                if (!frAccepted && !frRejected) {
                    setRetort("request");
                } else if (frAccepted && !frRejected && user.flameFollowing.includes(flame._id)) {
                    setRetort("friendship");
                } else if (frAccepted && !frRejected && !user.flameFollowing.includes(flame._id)) {
                    setRetort("befriend");
                } else if (!frAccepted && frRejected) {
                    setRetort("rejected");
                }
            } else if (!user.friendByReq) {
                if (user.flameFollowing.includes(flame._id)) {
                setRetort("friendship");
                } else {
                setRetort("befriend")
                }
            }
        }
    }, [flame]);

    useEffect(() => {
        var startCnt = 0;
        var endCnt = 100;
        const getRetort = () => {
            if (user.friendByReq && !frAccepted && !frRejected) {
                setRetort("request");
            } else if (user.friendByReq && frAccepted && !frRejected && flameFollowed) {
                setRetort("friendship");
            } else if (user.friendByReq && frAccepted && !frRejected && !flameFollowed) {
                setRetort("befriend");
            } else if (user.friendByReq && !frAccepted && frRejected) {
                setRetort("rejected");
            } else if (!user.friendByReq && flameFollowed) {
                setRetort("friendship");
            } else {
                setRetort("befriend")
            }
        }
        if (retortChange) {
            const fadeOut = setInterval(() => {
                if (endCnt === 1) {
                    clearInterval(fadeOut);
                }
                setFade(endCnt -= 1);
            }, 20);
            setTimeout(() => {
                getRetort();
                setRetortChange(false);
                const fadeIn = setInterval(() => {
                    if (startCnt === 100) {
                        clearInterval(fadeIn);
                    }
                    setFade(startCnt++);
                }, 25);
            }, 2320)
        }
    }, [retortChange]);


    useEffect(() => {
        if(retort.length > 0) {
            switch (retort) {
                case "request":
                    setRetortDisplay(
                        <>
                            <div className="flameRequestRetort request">
                                <button className={`flameRequestBtn accept ${flame.energy}`} onClick={handleAcceptRequestClick}>
                                    Accept
                                </button>
                                <button className={`flameRequestBtn reject ${flame.energy}`}>
                                    Not Now
                                </button>
                            </div>
                        </>
                    );
                    break;
                case "friendship":
                    setRetortDisplay(
                        <>
                            <div className="flameRequestRetort">
                               <div className="flameRequestRetortLeft friendship">
                                    <span>
                                        {`You and ${flame.profileName} are now `}
                                        <b style={{ color: "#4a76fd" }}>connected</b>
                                        <b style={{ color: "#e639af" }}>!</b>
                                        {/*` Send ${flame?.sex ? flame.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                    </span>
                               </div>
                               <div className={`flameRequestRetortRight friendship ${flame.energy}`}>
                                    {/*<button className={`flameRequestBtn message ${flame.energy}`} type="submit" onClick={handleMessageClick}>
                                        Message
                                    </button>*/}
                               </div>
                            </div> 
                        </>
                    );
                    
                    break;
                case "reject":
                    setRetortDisplay(
                        <>
                           <div className="flameRequestRetort">{`You did not accept ${flame.profileName}'s request.`}</div> 
                        </>
                    );
                    
                    break;
                default:
                    setRetortDisplay(
                        <>
                            <div className="flameRequestRetort">
                                <div className="flameRequestRetortLeft befriend">
                                    <span>
                                        {`Befriend ${flame.sex ? flame.sex === "male" ? "him" : "her" : "them"} as well!`}
                                    </span>   
                                </div>
                                <div className="flameRequestRetortRight befriend">
                                    <button className={`flameRequestBtn befriend ${flame.energy}`} onClick={handleFlameFollowClick}>
                                        {user.flameFollowing.includes(flame?._id) ? <><Person className="profileFollowIcon" /><Check /></> : "Befriend me!"}
                                    </button>
                                </div>
                            </div>
                        </>
                    );   
            }
        }
    },[retort, flame]);


    return (
        <>
        {flame &&
        <Link className={`flameRequest`} to={flame.isAnonymous ? `/flame-profile/id/${flame._id}` : `/flame-profile/userName/${flame.userName}`}>
            <div className={`flameRequestBackgroundTheme ${frSeen? "seen" : "unseen"} ${flame?.energy}`} />
            <hr className={`flameRequestHr top ${flame?.energy}`} />
            <div className={`flameRequestContainer`}>
                <div className="flameRequestLeft">
                    <img 
                        className={`flameRequestProfilePic`} 
                        src={flame?.isAnonymous 
                            ? "/picBlanks/no-avatar.jpg" 
                            : flame?.profilePicture 
                                ? flame?.profilePicture 
                                : "/picBlanks/no-avatar.jpg"
                        }
                        alt="" 
                    />
                    <img className="flameRequestIcon" src={energyIcon(flame?.energy)} alt="" />
                </div>
                <div className={`flameRequestRight ${flame?.energy}`}>
                    <div className="flameRequestRightTop">
                        <div className="flameRequestTitle">
                            <div className="flameRequestTitleLeft">
                                <span className="flameRequestName">{flame?.profileName}</span> 
                                <span className="flameRequestAction">
                                    {`has ${retort === "request" ? "requested to befriend" : "befriended"} you!`}
                                </span>
                            </div>
                            <div className={`flameRequestTitleRight ${flame?.energy}`}>
                                {retort !== "request" &&
                                    <>
                                        <Person className="flameRequestRetortIcon person"/>
                                        <Check className="flameRequestRetortIcon check"/>  
                                    </>
                                }
                            </div>
                        </div>
                    </div>                                                      
                    <div className="flameRequestRightBottom" style={{ opacity: `${fade}%`}}>
                            {retortDisplay}                  
                    </div>
                </div>
            </div>
            <hr className={`flameRequestHr bottom ${flame?.energy}`} />
    </Link>
    }
    </>
    )
}

export default memo(FlameRequest);