import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import axios from 'axios';
import "./LikeNots.css";
import { Check, People, Person } from '@material-ui/icons';
import { spectrumIcon } from '../../../Utils/icons/icons';
import UnionFriendshipIconSpectrum from '../../../Utils/misc/UnionFriendshipIconSpectrum';
import { 
    unionFollowing, 
    unionFollower, 
    unionUnrequestFollow,
    
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

function LikeNots({fr, folMDD}) {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [union, setUnion] = useState({});
    const [ frSeen, setFrSeen ] = useState(fr.initialSeen);
    const [ frAccepted, setFrAccepted ] = useState(fr.requestAccepted);
    const [ frRejected, setFrRejected ] = useState(fr.requestRejected);
    const [ retort, setRetort ] = useState("");
    const [ retortDisplay, setRetortDisplay ] = useState("");
    const [ unionFollowed, setUnionFollowed ] = useState(user.unionFollowing.includes(union?._id));
    const [ fade, setFade ] = useState(100);
    const [ retortChange, setRetortChange ] = useState(false);
    const [ initialize, setInitialize ] = useState(false);
    const [ conv, setConv ] = useState({});
    const conversation = conv
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const getUnion = async () => {
            try {
                const res = await axios.get(`/unions?unionId=${fr.LikeNotserId}`)
                setUnion(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUnion();
    }, [fr]);

    useEffect(() => {
        if (folMDD && frSeen === false) {
            setFrSeen(true);
        }
    },[folMDD, frSeen]);

    // Follow/unfollow flame user
    useEffect(() => {
        setUnionFollowed(user.unionFollowing.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(user));
        user.unionName
            ? localStorage.setItem("union", JSON.stringify(user))
            : localStorage.setItem("flame", JSON.stringify(user))
    },[user.unionFollowing]);

    const handleunionFollowClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            user.unionName
                ? await axios.put(`/unions/${union._id}/union-union/follow`, { unionId: user._id })
                : await axios.put(`/unions/${union._id}/flame-union/follow`, { userId: user._id })
            dispatch(unionFollowing(union._id));
        } catch(err) {
            console.log(err);
        }
        try {
            const reqBefriend = user.unionName
                ? { LikeNotserId: user._id, LikeNotseeId: union._id }
                : { flameRequesterId: user._id, LikeNotseeId: union._id }
            await axios.post("/friendRequests", reqBefriend);
        } catch(err) {
            console.log(err);
        }
        setUnionFollowed(true); 
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
                ? await axios.put(`/unions/${user._id}/union-union/follow`, { unionId: union._id })
                : await axios.put(`/unions/${user._id}/union-flame/follow`, { unionId: union._id })
            dispatch(unionFollower(union._id));
        } catch(err) {
            console.log(err);
        }
        try {
            user.unionName
                ? await axios.put(`/unions/${user._id}/union-union/unrequestFollow`, { unionId: union._id })
                : await axios.put(`/unions/${user._id}/flame-flame/unrequestFollow`, { unionId: union._id })
            dispatch(unionUnrequestFollow(user._id));
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

    useEffect(() => {
        if (union._id) {
            if (user.friendByReq) {
                if (!frAccepted && !frRejected) {
                    setRetort("request");
                } else if (frAccepted && !frRejected && user.unionFollowing.includes(union._id)) {
                    setRetort("friendship");
                } else if (frAccepted && !frRejected && !user.unionFollowing.includes(union._id)) {
                    setRetort("befriend");
                } else if (!frAccepted && frRejected) {
                    setRetort("rejected");
                }
            } else if (!user.friendByReq) {
                if (user.unionFollowing.includes(union._id)) {
                setRetort("friendship");
                } else {
                setRetort("befriend")
                }
            }
        }
    }, [union._id]);

    useEffect(() => {
        var startCnt = 0;
        var endCnt = 100;
        const getRetort = () => {
            if (user.friendByReq && !frAccepted && !frRejected) {
                setRetort("request");
            } else if (user.friendByReq && frAccepted && !frRejected && unionFollowed) {
                setRetort("friendship");
            } else if (user.friendByReq && frAccepted && !frRejected && !unionFollowed) {
                setRetort("befriend");
            } else if (user.friendByReq && !frAccepted && frRejected) {
                setRetort("rejected");
            } else if (!user.friendByReq && unionFollowed) {
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
                            <div className="likeNotsRetort request">
                                <button className={`likeNotsBtn accept ${union.spectrum}`} onClick={handleAcceptRequestClick}>
                                    Accept
                                </button>
                                <button className={`likeNotsBtn reject ${union.spectrum}`}>
                                    Not Now
                                </button>
                            </div>
                        </>
                    );
                    break;
                case "friendship":
                    setRetortDisplay(
                        <>
                            <div className="likeNotsRetort">
                               <div className="likeNotsRetortLeft friendship">
                                    <span>
                                        {`You and ${union.profileName} are now `}
                                        <b style={{ color: "#4a76fd" }}>connected</b>
                                        <b style={{ color: "#e639af" }}>!</b>
                                        {/*` Send ${flame?.sex ? flame.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                    </span>
                               </div>
                               <div className={`likeNotsRetortRight friendship ${union.spectrum}`}>
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
                           <div className="likeNotsRetort">{`You did not accept ${union.profileName}'s request.`}</div>
                        </>
                    );
                    break;
                default:
                    setRetortDisplay(
                        <>
                            <div className="likeNotsRetort">
                                <div className="likeNotsRetortLeft befriend">
                                    <span>
                                        {`Befriend them as well!`}
                                    </span>   
                                </div>
                                <div className="likeNotsRetortRight befriend">
                                    <button className={`likeNotsBtn befriend ${union.spectrum}`} onClick={handleunionFollowClick}>
                                        {user.unionFollowing.includes(union?._id) ? <><People className="profileFollowIcon" /><Check /></> : "Befriend us!"}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) 
            }
        }
    },[retort, union]);


    return (
        <Link className={`likeNots`} to={`/union-profile/${union.unionName}`}>
            <div className={`likeNotsBackgroundTheme ${frSeen? "seen" : "unseen"} ${union?.spectrum}`} />
            <hr className={`likeNotsHr top ${union?.spectrum}`} />
            <div className={`likeNotsContainer`}>
                <div className="likeNotsLeft">
                    <img 
                        className={`likeNotsProfilePic`} 
                        src={union?.isAnonymous 
                            ? "/picBlanks/no-union-avatar.jpg" 
                            : union?.unionProfilePicture 
                                ? union?.unionProfilePicture 
                                : "/picBlanks/no-union-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img className="likeNotsIcon" src={spectrumIcon(union?.spectrum)} alt="" />
                </div>
                <div className={`likeNotsRight ${union?.spectrum}`}>
                    <div className="likeNotsRightTop"> 
                        <div className="likeNotsTitle">
                            <div className="likeNotsTitleLeft">
                                <span className="likeNotsName">{union?.profileName}</span> 
                                <span className="likeNotsAction">
                                    {`liked your post!`}
                                </span>
                            </div>
                            <div className="likeNotsTitleRight">
                                {<UnionFriendshipIconSpectrum spectrum={union?.spectrum}/>}
                            </div>
                        </div>
                    </div>                                                      
                    <div className="likeNotsRightBottom"  style={{ opacity: `${fade}%`}}>
                            {retortDisplay}                  
                    </div>
                </div>
            </div>
            <hr className={`likeNotsHr bottom ${union?.spectrum}`} />
        </Link>
    )
}

export default LikeNots;