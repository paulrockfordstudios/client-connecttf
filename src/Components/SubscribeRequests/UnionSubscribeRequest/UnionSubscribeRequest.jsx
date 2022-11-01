import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./UnionSubscribeRequest.css";
import { Check, Mail } from '@material-ui/icons';
import { spectrumIcon } from '../../../Utils/icons/icons';
import { 
    unionSubscribing, 
    unionSubscriber, 
    unionUnrequestSubscribe,
} from "../../../Redux/AuthSlice";


function UnionSubscribeRequest({sr, notMDD}) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [union, setUnion] = useState({});
    const [ srSeen, setSrSeen ] = useState(sr.initialSeen);
    const [ srAccepted, setSrAccepted ] = useState(sr.requestAccepted);
    const [ srRejected, setSrRejected ] = useState(sr.requestRejected);
    const [ retort, setRetort ] = useState("");
    const [ retortDisplay, setRetortDisplay ] = useState("");
    const [ unionSubscribed, setUnionSubscribed ] = useState(user.unionSubscribing.includes(union?._id));
    const [ fade, setFade ] = useState(100);
    const [ retortChange, setRetortChange ] = useState(false);
    

    useEffect(() => {
        const getUnion = async () => {
            try {
                const res = await axios.get(`/unions?unionId=${sr.unionRequesterId}`)
                setUnion(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUnion();
    }, []);

    useEffect(() => {
        if (union) {
            setUnionSubscribed(user.unionSubscribing.includes(union._id)) 
        }
    }, [union])


    useEffect(() => {
        if (notMDD && srSeen === false) {
            setSrSeen(true);
        }
    },[notMDD, srSeen]);

    // Subscribe/unsubscribe union user
    useEffect(() => {
        setUnionSubscribed(user.unionSubscribing.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(user));
        user.unionName
            ? localStorage.setItem("union", JSON.stringify(user))
            : localStorage.setItem("union", JSON.stringify(user))
    },[user.unionSubscribing]);

    const handleUnionSubscribeClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            user.unionName
                ? await axios.put(`/unions/${union._id}/union-union/subscribe`, { unionId: user._id })
                : await axios.put(`/unions/${union._id}/union-union/subscribe`, { userId: user._id })
            dispatch(unionSubscribing(union._id));
        } catch(err) {
            console.log(err);
        }
        try {
            const reqSubscribe = user.unionName
                ? { unionRequesterId: user._id, unionRequesteeId: union._id }
                : { unionRequesterId: user._id, unionRequesteeId: union._id }
            await axios.post("/subscribeRequests", reqSubscribe);
        } catch(err) {
            console.log(err);
        }
        setUnionSubscribed(true); 
        setRetortChange(true);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        user.unionName
            ? localStorage.setItem("union", JSON.stringify(user))
            : localStorage.setItem("union", JSON.stringify(user))
    },[user.unionSuscribers]);


    const handleAcceptRequestClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            user.unionName
                ? await axios.put(`/unions/${user._id}/union-union/subscribe`, { unionId: union._id })
                : await axios.put(`/unions/${user._id}/union-union/subscribe`, { unionId: union._id })
            dispatch(unionSubscriber(union._id));
        } catch(err) {
            console.log(err);
        }
        try {
            user.unionName
                ? await axios.put(`/unions/${user._id}/union-union/unrequestSubscribe`, { unionId: union._id })
                : await axios.put(`/unions/${user._id}/union-union/unrequestSubscribe`, { unionId: union._id })
            dispatch(unionUnrequestSubscribe(user._id));
        } catch(err) {
            console.log(err);
        }
        try {
            await axios.put(`/subscribeRequests/${sr._id}/requestAccepted`)
        } catch(err) {
            console.log(err);
        }
        setSrAccepted(true);
        setRetortChange(true);
    }

    useEffect(() => {
        if (union) {
            if (user.subscribeByReq) {
                if (!srAccepted && !srRejected) {
                    setRetort("request");
                } else if (srAccepted && !srRejected && user.unionSubscribing.includes(union._id)) {
                    setRetort("friendship");
                } else if (srAccepted && !srRejected && !user.unionSubscribing.includes(union._id)) {
                    setRetort("befriend");
                } else if (!srAccepted && srRejected) {
                    setRetort("rejected");
                }
            } else if (!user.subscribeByReq) {
                if (user.unionSubscribing.includes(union._id)) {
                setRetort("friendship");
                } else {
                setRetort("befriend")
                }
            }
        }
    }, [union]);

    useEffect(() => {
        var startCnt = 0;
        var endCnt = 100;
        const getRetort = () => {
            if (user.subscribeByReq && !srAccepted && !srRejected) {
                setRetort("request");
            } else if (user.subscribeByReq && srAccepted && !srRejected && unionSubscribed) {
                setRetort("friendship");
            } else if (user.subscribeByReq && srAccepted && !srRejected && !unionSubscribed) {
                setRetort("befriend");
            } else if (user.subscribeByReq && !srAccepted && srRejected) {
                setRetort("rejected");
            } else if (!user.subscribeByReq && unionSubscribed) {
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
                            <div className="unionSubRequestRetort request">
                                <button className={`unionSubRequestBtn accept ${union.spectrum}`} onClick={handleAcceptRequestClick}>
                                    Accept
                                </button>
                                <button className={`unionSubRequestBtn reject ${union.spectrum}`}>
                                    Not Now
                                </button>
                            </div>
                        </>
                    );
                    break;
                case "friendship":
                    setRetortDisplay(
                        <>
                            <div className="unionSubRequestRetort">
                               <div className="unionSubRequestRetortLeft friendship">
                                    <span>
                                        {`You are now subscribed to ${union.profileName}`}
                                    </span>
                               </div>
                               <div className={`unionSubRequestRetortRight friendship ${union.spectrum}`}>
                                    {/*<button className={`unionRequestBtn message ${union.energy}`} type="submit" onClick={handleMessageClick}>
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
                           <div className="unionSubRequestRetort">{`You did not accept ${union.profileName}'s subscribe request.`}</div> 
                        </>
                    );
                    
                    break;
                default:
                    setRetortDisplay(
                        <>
                            <div className="unionSubRequestRetort">
                                <div className="unionSubRequestRetortLeft befriend">
                                    <span>
                                        {`Subscribe to them as well!`}
                                    </span>   
                                </div>
                                <div className="unionSubRequestRetortRight befriend">
                                    <button className={`unionSubRequestBtn befriend ${union.spectrum}`} onClick={handleUnionSubscribeClick}>
                                        {user.unionSubscribing.includes(union?._id) ? <><Mail className="profileSubscribeIcon" /><Check /></> : "Subscribe"}
                                    </button>
                                </div>
                            </div>
                        </>
                    );   
            }
        }
    },[retort, union]);


    return (
        <>
        {union &&
        <Link className={`unionSubRequest`} to={union.isAnonymous ? `/union-profile/id/${union._id}` : `/union-profile/unionName/${union.unionName}`}>
            <div className={`unionSubRequestBackgroundTheme ${srSeen? "seen" : "unseen"} ${union?.spectrum}`} />
            <hr className={`unionSubRequestHr top ${union?.spectrum}`} />
            <div className={`unionSubRequestContainer`}>
                <div className="unionSubRequestLeft">
                    <img 
                        className={`unionSubRequestProfilePic`} 
                        src={union?.isAnonymous 
                            ? "/picBlanks/no-union-avatar.jpg" 
                            : union?.unionProfilePicture 
                                ? union?.unionProfilePicture 
                                : "/picBlanks/no-union-avatar.jpg"
                        }
                        alt="" 
                    />
                    <img className="unionSubRequestIcon" src={spectrumIcon(union?.spectrum)} alt="" />
                </div>
                <div className={`unionSubRequestRight ${union?.spectrum}`}>
                    <div className="unionSubRequestRightTop">
                        <div className="unionSubRequestTitle">
                            <div className="unionSubRequestTitleLeft">
                                <span className="unionSubRequestName">{union?.unionProfileName}</span> 
                                <span className="unionSubRequestAction">
                                    {`has ${retort === "request" ? "requested to subscribe" : "subscribed"} to you!`}
                                </span>
                            </div>
                            <div className={`unionSubRequestTitleRight ${union?.spectrum}`}>
                                {retort !== "request" &&
                                    <>
                                        <Mail className="unionSubRequestRetortIcon person"/>
                                        <Check className="unionSubRequestRetortIcon check"/>  
                                    </>
                                }
                            </div>
                        </div>
                    </div>                                                      
                    <div className="unionSubRequestRightBottom" style={{ opacity: `${fade}%`}}>
                            {retortDisplay}                  
                    </div>
                </div>
            </div>
            <hr className={`unionSubRequestHr bottom ${union?.spectrum}`} />
    </Link>
    }
    </>
    )
}

export default memo(UnionSubscribeRequest);