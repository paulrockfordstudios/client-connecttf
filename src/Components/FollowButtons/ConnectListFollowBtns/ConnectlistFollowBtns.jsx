import React, { useState, useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import "./ConnectListFollowBtns.css";
import { 
    flameFollowing,
    flameUnfollowing,
    unionFollowing,
    unionUnfollowing,
    flameRequestFollow,
    flameUnrequestFollow,
    unionRequestFollow,
    unionUnrequestFollow,
    flameBlock,
    flameUnblock,
    unionBlock,
    unionUnblock,
    flameSubscribing,
    flameUnsubscribing,
    unionSubscribing,
    unionUnsubscribing, 
    flameRequestSubscribe,
    flameUnrequestSubscribe,
    unionRequestSubscribe,
    unionUnrequestSubscribe, 
} from "../../../Redux/AuthSlice";
import { MoreHoriz, Person, Check, Mail, People } from "@material-ui/icons";


function ConnectListFollowBtns({ union, flame }) {

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
   

    
    const [ flameFollowed, setFlameFollowed ] = useState(currentUser.flameFollowing.includes(flame?._id));
    const [ unionFollowed, setUnionFollowed ] = useState(currentUser.unionFollowing.includes(union?._id));
    const [ flameFollowRequested, setFlameFollowRequested ] = useState(currentUser.flameFollowRequesting?.includes(flame?._id));
    const [ unionFollowRequested, setUnionFollowRequested ] = useState(currentUser.unionFollowRequesting?.includes(union?._id));
    const [ flameBlocked, setFlameBlocked ] = useState(currentUser.flameBlocking.includes(flame?._id));
    const [ unionBlocked, setUnionBlocked ] = useState(currentUser.unionBlocking.includes(union?._id));
    const [ flameSubscribed, setFlameSubscribed ] = useState(currentUser.flameSubscribing.includes(flame?._id));
    const [ unionSubscribed, setUnionSubscribed ] = useState(currentUser.unionSubscribing.includes(union?._id));
    const [ flameSubscribeRequested, setFlameSubscribeRequested ] = useState(currentUser.flameSubscribeRequesting?.includes(flame?._id));
    const [ unionSubscribeRequested, setUnionSubscribeRequested ] = useState(currentUser.unionSubscribeRequesting?.includes(union?._id));

    

  
    // Follow/unfollow flame user
    useEffect(() => {
        setFlameFollowed(currentUser.flameFollowing.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameFollowing]);

    useEffect(() => {
        setFlameFollowRequested(currentUser.flameFollowRequesting?.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameFollowRequesting]);

    const handleFlameFollowClick = async (event) => {
        if (flameFollowed) {
            try {
                currentUser.unionName
                    ? await axios.put(`/users/${flame._id}/union-flame/unfollow`, { unionId: currentUser._id })
                    : await axios.put(`/users/${flame._id}/flame-flame/unfollow`, { userId: currentUser._id })
                dispatch(flameUnfollowing(flame._id));
            } catch(err) {
                console.log(err);
            }
            setFlameFollowed(false);
        } else if (flame?.friendByReq) {
            if (flameFollowRequested) {
                try {
                    currentUser.unionName
                        ? await axios.put(`/users/${flame._id}/union-flame/unrequestFollow`, { unionId: currentUser._id })
                        : await axios.put(`/users/${flame._id}/flame-flame/unrequestFollow`, { userId: currentUser._id })
                    dispatch(flameUnrequestFollow(flame._id));
                } catch(err) {
                    console.log(err);
                }
            } else {
                try {
                    currentUser.unionName
                        ? await axios.put(`/users/${flame._id}/union-flame/requestFollow`, { unionId: currentUser._id })
                        : await axios.put(`/users/${flame._id}/flame-flame/requestFollow`, { userId: currentUser._id })
                    dispatch(flameRequestFollow(flame._id));
                } catch(err) {
                    console.log(err);
                }
                event.preventDefault();
                try {
                    const reqBefriend = currentUser.unionName
                        ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id, byRequest: true }
                    await axios.post("/friendRequests", reqBefriend);
                } catch(err) {
                    console.log(err);
                }
            } 
            setFlameFollowRequested(!flameFollowRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axios.put(`/users/${flame._id}/union-flame/follow`, { unionId: currentUser._id })
                    : await axios.put(`/users/${flame._id}/flame-flame/follow`, { userId: currentUser._id })
                dispatch(flameFollowing(flame._id));
            } catch(err) {
                console.log(err);
            }
            event.preventDefault();
            try {
                const reqBefriend = currentUser.unionName
                    ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id }
                    : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id }
                await axios.post("/friendRequests", reqBefriend);
            } catch(err) {
                console.log(err);
            }
            setFlameFollowed(true); 
        }
    };

    // Follow/unfollow union user
    useEffect(() => {
        setUnionFollowed(currentUser.unionFollowing.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionFollowing]);

    useEffect(() => {
        setUnionFollowRequested(currentUser.unionFollowRequesting?.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionFollowRequesting]);

    const handleUnionFollowClick = async (event) => {
        if(unionFollowed) {
            try {
                currentUser.unionName
                    ? await axios.put(`/unions/${union._id}/union-union/unfollow`, { unionId: currentUser._id })
                    : await axios.put(`/unions/${union._id}/flame-union/unfollow`, { userId: currentUser._id })
                dispatch(unionUnfollowing(union?._id));
            } catch(err) {
                console.log(err);
            }
            setUnionFollowed(false); 
        } else if (union?.friendByReq) {
            if (unionFollowRequested) {
                try {
                    currentUser.unionName
                        ? await axios.put(`/unions/${union._id}/union-union/unrequestFollow`, { unionId: currentUser._id })
                        : await axios.put(`/unions/${union._id}/flame-union/unrequestFollow`, { userId: currentUser._id })
                    dispatch(unionUnrequestFollow(union?._id));
                } catch(err) {
                    console.log(err);
                }
            } else {
                try {
                    currentUser.unionName
                        ? await axios.put(`/unions/${union._id}/union-union/requestFollow`, { unionId: currentUser._id })
                        : await axios.put(`/unions/${union._id}/flame-union/requestFollow`, { userId: currentUser._id })
                    dispatch(unionRequestFollow(union?._id));
                } catch(err) {
                    console.log(err);
                }
                event.preventDefault();
                try {
                    const reqBefriend = currentUser.unionName
                        ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                    await axios.post("/friendRequests", reqBefriend);
                } catch(err) {
                    console.log(err);
                }
            }
            setUnionFollowRequested(!unionFollowRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axios.put(`/unions/${union._id}/union-union/Follow`, { unionId: currentUser._id })
                    : await axios.put(`/unions/${union._id}/flame-union/Follow`, { userId: currentUser._id })
                dispatch(unionFollowing(union?._id));
            } catch(err) {
                console.log(err);
            }
            event.preventDefault();
            try {
                const reqBefriend = currentUser.unionName
                    ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id }
                    : { flameRequesterId: currentUser._id, unionRequesteeId: union._id }
                await axios.post("/friendRequests", reqBefriend);
            } catch(err) {
                console.log(err);
            }
            setUnionFollowed(true);
        }   
    };

    // Block/unblock flame user
    useEffect(() => {
        setFlameBlocked(currentUser.flameBlocking.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameBlocking]);

    const handleFlameBlockClick = async () => {
        try {
            if(flameBlocked) {
                currentUser.unionName
                    ? await axios.put(`/users/${flame._id}/union-flame/unblock`, { unionId: currentUser._id })
                    : await axios.put(`/users/${flame._id}/flame-flame/unblock`, { userId: currentUser._id })
                dispatch(flameUnblock(flame?._id));
            }else{
                currentUser.unionName
                    ? await axios.put(`/users/${flame._id}/union-flame/block`, { unionId: currentUser._id })
                    : await axios.put(`/users/${flame._id}/flame-flame/block`, { userId: currentUser._id })
                dispatch(flameBlock(flame?._id));
            }
        } catch(err) {
            console.log(err);
        }
        setFlameBlocked(!flameBlocked);
    };

    // Block/unblock union user
    useEffect(() => {
        setUnionBlocked(currentUser.unionBlocking.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionBlocking]);

    const handleUnionBlockClick = async () => {
        try {
            if(unionBlocked) {
                currentUser.unionName
                    ? await axios.put(`/unions/${union._id}/union-union/unblock`, { unionId: currentUser._id })
                    : await axios.put(`/unions/${union._id}/flame-union/unblock`, { userId: currentUser._id })
                dispatch(unionUnblock(union?._id));
            }else{
                currentUser.unionName
                    ? await axios.put(`/unions/${union._id}/union-union/block`, { unionId: currentUser._id })
                    : await axios.put(`/unions/${union._id}/flame-union/block`, { userId: currentUser._id })
                dispatch(unionBlock(union?._id));
            }
        } catch(err) {
            console.log(err);
        }
        setUnionBlocked(!unionBlocked);
    };

    // Subscribe/unsubscribe to flame user
    useEffect(() => {
        setFlameSubscribed(currentUser.flameSubscribing.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameSubscribing]);

    useEffect(() => {
        setFlameSubscribeRequested(currentUser.flameSubscribeRequesting.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameSubscribeRequesting]);

    const handleFlameSubscribeClick = async (event) => {
        if(flameSubscribed) {
            try {
                currentUser.unionName
                    ? await axios.put(`/users/${flame._id}/union-flame/unsubscribe`, { unionId: currentUser._id })
                    : await axios.put(`/users/${flame._id}/flame-flame/unsubscribe`, { userId: currentUser._id })
                dispatch(flameUnsubscribing(flame?._id));
            } catch(err) {
                console.log(err);
            }
            setFlameSubscribed(false);
        } else if (flame?.subscribeByReq) {
            if (flameSubscribeRequested) {
                try {
                    currentUser.unionName
                        ? await axios.put(`/users/${flame._id}/union-flame/unrequestSubscribe`, { unionId: currentUser._id })
                        : await axios.put(`/users/${flame._id}/flame-flame/unrequestSubscribe`, { userId: currentUser._id })
                    dispatch(flameUnrequestSubscribe(flame?._id));
                } catch(err) {
                    console.log(err);
                }
            } else {
                try {
                    currentUser.unionName
                        ? await axios.put(`/users/${flame._id}/union-flame/requestSubscribe`, { unionId: currentUser._id })
                        : await axios.put(`/users/${flame._id}/flame-flame/requestSubscribe`, { userId: currentUser._id })
                    dispatch(flameRequestSubscribe(flame?._id));
                } catch(err) {
                    console.log(err);
                }
                event.preventDefault();
                try {
                    const reqSubscribe = currentUser.unionName
                        ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id, byRequest: true }
                    await axios.post("/subscribeRequests", reqSubscribe);
                } catch(err) {
                    console.log(err);
                }
            }
            setFlameSubscribeRequested(!flameSubscribeRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axios.put(`/users/${flame._id}/union-flame/subscribe`, { unionId: currentUser._id })
                    : await axios.put(`/users/${flame._id}/flame-flame/subscribe`, { userId: currentUser._id })
                dispatch(flameSubscribing(flame?._id));
            } catch(err) {
                console.log(err);
            }
            event.preventDefault();
            try {
                const reqSubscribe = currentUser.unionName
                    ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id }
                    : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id }
                await axios.post("/subscribeRequests", reqSubscribe);
            } catch(err) {
                console.log(err);
            }
        }
        setFlameSubscribed(true);
    };

    // Subscribe/unsubscribe to union user
    useEffect(() => {
        setUnionSubscribed(currentUser.unionSubscribing.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionSubscribing]);

    useEffect(() => {
        setUnionSubscribeRequested(currentUser.unionSubscribeRequesting.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionSubscribeRequesting]);

    const handleUnionSubscribeClick = async (event) => {
        if(unionSubscribed) {
            try {
                currentUser.unionName
                    ? await axios.put(`/unions/${union._id}/union-union/unsubscribe`, { unionId: currentUser._id })
                    : await axios.put(`/unions/${union._id}/flame-union/unsubscribe`, { userId: currentUser._id })
                dispatch(unionUnsubscribing(union?._id));
            } catch(err) {
                console.log(err);
            }
            setUnionSubscribed(false);
        } else if (union?.friendByReq) {
            if (unionSubscribeRequested) {
                try {
                    currentUser.unionName
                        ? await axios.put(`/unions/${union._id}/union-union/unrequestSubscribe`, { unionId: currentUser._id })
                        : await axios.put(`/unions/${union._id}/flame-union/unrequestSubscribe`, { userId: currentUser._id })
                    dispatch(unionUnrequestSubscribe(union?._id));
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    currentUser.unionName
                        ? await axios.put(`/unions/${union._id}/union-union/requestSubscribe`, { unionId: currentUser._id })
                        : await axios.put(`/unions/${union._id}/flame-union/requestSubscribe`, { userId: currentUser._id })
                    dispatch(unionRequestSubscribe(union?._id));
                } catch (err) {
                    console.log(err);
                }
                event.preventDefault();
                try {
                    const reqSubscribe = currentUser.unionName
                        ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                    await axios.post("/subscribeRequests", reqSubscribe);
                } catch(err) {
                    console.log(err);
                }
            }
            setUnionSubscribeRequested(!unionSubscribeRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axios.put(`/unions/${union._id}/union-union/subscribe`, { unionId: currentUser._id })
                    : await axios.put(`/unions/${union._id}/flame-union/subscribe`, { userId: currentUser._id })
                dispatch(unionSubscribing(union?._id));
            } catch (err) {
                console.log(err);
            }
            event.preventDefault();
            try {
                const reqSubscribe = currentUser.unionName
                    ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id }
                    : { flameRequesterId: currentUser._id, unionRequesteeId: union._id }
                await axios.post("/subscribeRequests", reqSubscribe);
            } catch(err) {
                console.log(err);
            }
        }
        setUnionSubscribed(true);
    };



    return (
        <>
            {union ? 
                (
                    <>
                        {union.unionName !== currentUser.userName && (
                            <div className="connectListConnectBtns-container">
                                <div className="connectListConnectBtns">
                                    {union.spectrum === "rainbow" ?
                                        (
                                            <>
                                                <button className="connectListDisconnectBtnRainbow"><MoreHoriz /></button>
                                                <button className="connectListFollowBtnRainbow" onClick={handleUnionFollowClick}>
                                                    {// Follow button status
                                                        currentUser.unionFollowing.includes(union?._id) 
                                                            ? <><People className="connectListfollowIcon" /><Check className="connectListCheckIcon"/></> 
                                                            : currentUser.unionFollowRequesting.includes(union?._id)
                                                                ? "Requested" 
                                                                : "Befriend us!"
                                                    }
                                                </button>
                                                <button className="connectListMessageBtnRainbow">Message</button>
                                                <button className="connectListSubscribeBtnRainbow" onClick={handleUnionSubscribeClick}>
                                                    {// Subscribe button status
                                                        currentUser.unionSubscribing.includes(union?._id) 
                                                            ? <><Mail className="connectListSubscribeIcon" /><Check className="connectListCheckIcon"/></> 
                                                            : currentUser.unionSubscribeRequesting.includes(union?._id)
                                                                ? "Requested" 
                                                                : "Subscribe"
                                                    }
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {union.spectrum === "diamond" ?
                                                    (
                                                        <>
                                                            <button className="connectListDisconnectBtn" style={{backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"}}>
                                                                <svg width="0em" height="0em">
                                                                    <linearGradient id="gold1-gradient">
                                                                        <stop stopColor="#ab781d" offset="0%" />
                                                                        <stop stopColor="#eed264" offset="50%" />
                                                                        <stop stopColor="#ab781d" offset="100%" />
                                                                    </linearGradient>
                                                                </svg>
                                                                <MoreHoriz style={{ fill: "url(#gold1-gradient)"}}/>
                                                            </button>
                                                            <button className="connectListFollowBtn" style={{backgroundImage: "url(/misc/diamond-btn7.jpg)", backgroundSize: "cover"}} onClick={handleUnionFollowClick}>
                                                                {// Follow button status
                                                                    currentUser.unionFollowing.includes(union?._id) ? 
                                                                        (
                                                                            <>
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold2-gradient">
                                                                                        <stop stopColor="#ab781d" offset="0%" />
                                                                                        <stop stopColor="#eed264" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <People className="connectListFollowIcon" style={{ fill: "url(#gold2-gradient)"}} />
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold3-gradient">
                                                                                        <stop stopColor="#eed264" offset="0%" />
                                                                                        <stop stopColor="#ab781d" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <Check className="connectListCheckIcon" style={{ fill: "url(#gold3-gradient)"}}/>
                                                                            </> 
                                                                        ) : (
                                                                            <span className="clfbDiamondText">
                                                                                {
                                                                                    currentUser.unionFollowRequesting.includes(union?._id)
                                                                                        ? "Requested" 
                                                                                        : "Befriend us!"
                                                                                }
                                                                            </span>
                                                                        )
                                                                }
                                                            </button>
                                                            <button className="connectListMessageBtn" style={{backgroundImage: "url(/misc/diamond-btn2.jpg)", backgroundSize: "cover"}}><span className="clfbDiamondText">Message</span></button>
                                                            <button className="connectListSubscribeBtn" style={{backgroundImage: "url(/misc/diamond-btn4.jpg)", backgroundSize: "cover"}}onClick={handleUnionSubscribeClick}>
                                                                {// Subscribe button status
                                                                    currentUser.unionSubscribing.includes(union?._id) ? 
                                                                        (
                                                                            <>
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold2-gradient">
                                                                                        <stop stopColor="#ab781d" offset="0%" />
                                                                                        <stop stopColor="#eed264" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <Mail className="connectListSubscribeIcon" style={{ fill: "url(#gold2-gradient)"}}/>
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold3-gradient">
                                                                                        <stop stopColor="#eed264" offset="0%" />
                                                                                        <stop stopColor="#ab781d" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <Check className="connectListCheckIcon" style={{ fill: "url(#gold3-gradient)"}}/>
                                                                            </> 
                                                                        ) : (
                                                                            <span className="clfbDiamondText">
                                                                                {
                                                                                    currentUser.unionSubscribeRequesting.includes(union?._id)
                                                                                        ? "Requested" 
                                                                                        : "Subscribe"
                                                                                }
                                                                            </span>
                                                                        )
                                                                }
                                                            </button> 
                                                        </>
                                                    ) : (
                                                        <div className={`connectListBtns ${union.spectrum}`}>
                                                            <button className="connectListDisconnectBtn"><MoreHoriz /></button>
                                                            <button className="connectListFollowBtn" onClick={handleUnionFollowClick}>
                                                                {// Follow button status
                                                                        currentUser.unionFollowing.includes(union?._id) 
                                                                        ? <><People className="connectListfollowIcon" /><Check className="connectListCheckIcon"/></> 
                                                                        : currentUser.unionFollowRequesting.includes(union?._id)
                                                                            ? "Requested" 
                                                                            : "Befriend us!"
                                                                }
                                                            </button>
                                                            <button className="connectListMessageBtn">Message</button>
                                                            <button className="connectListSubscribeBtn" onClick={handleUnionSubscribeClick}>
                                                                {// Subscribe button status
                                                                        currentUser.unionSubscribing.includes(union?._id) 
                                                                        ? <><Mail className="connectListSubscribeIcon" /><Check className="connectListCheckIcon"/></> 
                                                                        : currentUser.unionSubscribeRequesting.includes(union?._id)
                                                                            ? "Requested" 
                                                                            : "Subscribe"
                                                                }
                                                            </button>    
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                   
                    <>
                        {flame.userName !== currentUser.userName && (
                            <div className="connectListConnectBtns-container">
                                <div className="connectListConnectBtns">
                                    <div className={`connectListBtns ${flame.isAnonymous ? "gray" : flame.energy}`}>
                                        <button className="connectListDisconnectBtn"><MoreHoriz /></button>
                                        <button className="connectListFollowBtn" onClick={handleFlameFollowClick}>
                                            {// Follow Button Status
                                                currentUser.flameFollowing.includes(flame?._id) 
                                                    ? <><Person className="connectListFollowIcon" /><Check className="connectListCheckIcon"/></> 
                                                    : currentUser.flameFollowRequesting.includes(flame?._id)
                                                        ? "Requested" 
                                                        : "Befriend me!"
                                            }
                                        </button>
                                        <button className="connectListMessageBtn">Message</button>
                                        <button className="connectListSubscribeBtn" onClick={handleFlameSubscribeClick}>
                                            {
                                                currentUser.flameSubscribing.includes(flame?._id) 
                                                    ? <><Mail className="connectListSubscribeIcon" /><Check className="connectListCheckIcon"/></> 
                                                    : currentUser.flameSubscribeRequesting.includes(flame?._id) 
                                                        ? "Requested" 
                                                        : "Subscribe"
                                            }
                                        </button>    
                                    </div>
                                </div>
                            </div>
                        )}                     
                    </>
                )
            }
        </>
    )
};

export default ConnectListFollowBtns;