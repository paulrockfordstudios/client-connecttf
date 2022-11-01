import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import "./ReplyDisplay.css";
import { MoreVert, Reply } from "@material-ui/icons";
import { AuthContext } from "../../../Context/AuthContext";
import { energyIcon, spectrumIcon } from "../../../Utils/icons/icons";
import ReplyIconSpectrum from '../../../Utils/misc/ReplyIconSpectrum';
import LikesBubble from '../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../InfoBubbles/LovesBubble/LovesBubble';
import RepliesBubble from '../../InfoBubbles/RepliesBubble/RepliesBubble';
import ROptionsDropdown from '../../Dropdowns/FlareDropdowns/ROptionsDropdown/ROptionsDropdown';
import ReplyFeed from '../ReplyFeed/ReplyFeed';
import CreateReply from '../CreateReply/CreateReply';

function ReplyDisplay({reply}) {

    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const replyCntRef = useRef();
    const rDisplayRef = useRef();
    const showRepliesRef = useRef();
    const discRef= useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ rODD, setRODD ] =useState(false);
    const [ rLikesDD, setRLikesDD ] = useState(false);
    const [ rLovesDD, setRLovesDD ] = useState(false);
    const [ rRepliesDD, setRRepliesDD ] = useState(false);
    const [ flameReplies, setFlameReplies ] = useState(reply.flameReplies.length);
    const [ unionReplies, setUnionReplies ] = useState(reply.unionReplies.length);
    const [ flameLikes, setFlameLikes ] = useState(reply.flameLikes.length);
    const [ isFlameLiked, setIsFlameLiked ] = useState(false)
    const [ unionLikes, setUnionLikes ] = useState(reply.unionLikes.length);
    const [ isUnionLiked, setIsUnionLiked ] = useState(false);
    const [ flameLoves, setFlameLoves ] = useState(reply.flameLoves.length);
    const [ isFlameLoved, setIsFlameLoved ] = useState(false)
    const [ unionLoves, setUnionLoves ] = useState(reply.unionLoves.length);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
    const [user, setUser] = useState({});
    const [ likesCntWidth, setLikesCntWidth ] = useState();
    const [ lovesCntWidth, setLovesCntWidth ] = useState();
    const [ repliesCntWidth, setRepliesCntWidth ] = useState();
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ replyCreate, setReplyCreate ] = useState(false);
    const [ rCntNum, setRCntNum ] = useState(reply.replyCnt);
    const [ rCntString, setRCntString ] = useState("");
    const [ cntRender, setCntRender ] = useState(false);
    const [ showReplies, setShowReplies ] = useState(false);
    const [ discHeight, setDiscHeight ] = useState();
    const [ hidden, setHidden ] = useState(false);

    useEffect(() => {
        var rect = rDisplayRef.current.getBoundingClientRect();
        setScrollPosition(rect.top)
    }, []);

    useEffect(() => {
        const getDiscHeight = () => {
            if (discRef.current.clientHeight > 60) {
                setHidden(true);
            }
            setDiscHeight(discRef.current.clientHeight)
        }
        getDiscHeight();
    }, []);

    useEffect(() => {
        setLikesCntWidth(`${likeCntRef.current.clientWidth + 48}px`);
        setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + 89}px`);
        flameReplies + unionReplies === 0 
            ? setRepliesCntWidth(reply.replyCnt < 4 
                ? `${
                    loveCntRef.current.clientWidth + 
                    likeCntRef.current.clientWidth + 
                    replyCntRef.current.clientWidth + 
                    133}px` 
                : null
            )
            : setRepliesCntWidth(reply.replyCnt < 4 
                ? `${
                    loveCntRef.current.clientWidth + 
                    likeCntRef.current.clientWidth + 
                    replyCntRef.current.clientWidth + 
                    showRepliesRef.current.clientWidth + 
                    133}px` 
                : null
            )
    }, []);

    useEffect(() => {
        const rCountHandler = () => {
            if(reply.replyCnt) {
                switch(reply.replyCnt) {
                    case 2:
                        setRCntString("two");
                        setCntRender(true);
                        break;
                    case 3:
                        setRCntString("three");
                        setCntRender(true);
                        break;
                    case 4:
                        setRCntString("four");
                        setCntRender(true);
                        break;
                    default:
                        setRCntString("one");
                        setCntRender(true);
                } 
            }
        }
        rCountHandler();
    }, [reply.replyCnt]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = reply.union 
            ? await axios.get(`/unions?unionId=${reply.unionId}`)
            : await axios.get(`/users?userId=${reply.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [reply]);

    

    // Like/unlike answer
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(reply.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(reply.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/replies/${reply._id}/unionLike`, { unionId: currentUser._id });
                setUnionLikes(isUnionLiked ? unionLikes - 1 : unionLikes + 1);
                setIsUnionLiked(!isUnionLiked);
            } else {
                axios.put(`/replies/${reply._id}/flameLike`, { userId: currentUser._id });
                setFlameLikes(isFlameLiked ? flameLikes - 1 : flameLikes + 1);
                setIsFlameLiked(!isFlameLiked);
            }
        } catch(err) {}         
    };

    // Love/unlove answer
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(reply.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(reply.flameLoves.includes(currentUser._id))
    }, [currentUser._id, ])

    const loveHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/replies/${reply._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axios.put(`/replies/${reply._id}/flameLove`, { userId: currentUser._id });
                setFlameLoves(isFlameLoved ? flameLoves - 1 : flameLoves + 1);
                setIsFlameLoved(!isFlameLoved);
            }
        } catch(err) {}
    };

    useEffect(() => {
        if (rLikesDD || rLovesDD || rRepliesDD) {
            var rect = rDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
      }, [rLikesDD, rLovesDD, rRepliesDD]);

    
    return (
        <div className="replyDisplay">
                <div className={`replyDisplay-container ${rCntString}`}>
                    <div className="replyDisplayTop">
                        <div className="replyDisplayTopLeft">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <Link 
                                                        className="replyDisplayProfileLink" 
                                                        style={{backgroundImage: "url(/misc/diamond-sparkle-light.jpg)"}} 
                                                        to={`/union-profile/${user.unionName}`}
                                                    >
                                                        <img 
                                                            className="replyDisplayProfilePic" 
                                                            src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg"} 
                                                            alt="" 
                                                        />
                                                        <img 
                                                            className="replyDisplayProfileEnergy" 
                                                            src={spectrumIcon(user.spectrum)} 
                                                            alt="" 
                                                        />
                                                        <span className="replyDisplayUserName">
                                                            {user.profileName}
                                                        </span>
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Link 
                                                        className={`replyDisplayProfileLink ${user.spectrum}`} 
                                                        to={`/union-profile/${user.unionName}`}
                                                    >
                                                        <img 
                                                            className="replyDisplayProfilePic" 
                                                            src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg"} 
                                                            alt="" 
                                                        />
                                                        <img 
                                                            className="replyDisplayProfileEnergy" 
                                                            src={spectrumIcon(user.spectrum)} 
                                                            alt="" 
                                                        />
                                                        <span className="replyDisplayUserName">
                                                            {user.profileName}
                                                        </span>
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            className={`replyDisplayProfileLink ${user.energy}`} 
                                            to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.userName}`}
                                        >
                                            <img 
                                                className="replyDisplayProfilePic" 
                                                src={user.isAnonymous ? "/picBlanks/no-avatar.jpg" : user.profilePicture ? user.profilePicture : "/picBlanks/no-avatar.jpg"} 
                                                alt="" 
                                            />
                                            <img 
                                                className="replyDisplayProfileEnergy" 
                                                src={energyIcon(user.energy)} 
                                                alt="" 
                                            />
                                            <span className="replyDisplayUserName">
                                                {user.isAnonymous ? "Anonymous User" : user.profileName}
                                            </span>
                                        </Link>
                                    </>
                                )
                            }
                            <span className="replyDisplayDateTime">{format(reply.createdAt)}</span>
                        </div>
                        <div className="replyDisplayTopRight">
                            <MoreVert className="replyDisplayOptions" onClick={() => setRODD(!rODD)} />
                            <div className="replyDisplayRODropdown" style={rODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}>
                                <ROptionsDropdown user={user} />
                            </div>
                        </div>
                    </div>
                    <div className="replyDisplayCenter">
                        <span className="replyDisplayText" ref={discRef}>{reply.description}</span>
                        <span className="replyDisplayhashtags">#Love</span>
                        <div className="photoDisplay-container">
                            <ul className="photoList">      
                                {reply.photos.map((photo, index) => (
                                    <li className="photos" key={index}>
                                        {console.log(PF + photo)}
                                        <img className="postImg" src={PF + photo} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="replyDisplayBottom" 
                        ref={rDisplayRef} 
                        style={reply.replyCnt < 4 
                            ? {marginTop: "0"} 
                            : {marginTop: "5px"}
                        }
                    >
                        <div className="replyDisplayBottomLeft">

                            <div className="replyDisplayCountItem">
                                <img 
                                    className="replyDisplayPNGIcon left" 
                                    src={`/icons/interactions/like${isFlameLiked || isUnionLiked ? "d" : ""}.png`}  
                                    alt="" 
                                    onClick={likeHandler} 
                                    onMouseOver={() => setRLikesDD(true)}
                                    onMouseLeave={() => setRLikesDD(false)} 
                                />
                                <span className="replyDisplayCounter left" ref={likeCntRef}>{flameLikes + unionLikes}</span>
                                <div 
                                    className="replyDisplayLikesDropdown" 
                                    style={rLikesDD 
                                        ? flameLikes + unionLikes === 0 
                                            ? {opacity: "0", right: "2000px"} 
                                            : {opacity: "100%", right: `${likesCntWidth}`, top: "0px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <LikesBubble
                                        flameLikes={reply.flameLikes} 
                                        unionLikes={reply.unionLikes} 
                                        isFlameLiked={isFlameLiked} 
                                        isUnionLiked={isUnionLiked}
                                        show={showReplies}
                                        list={"reply"}
                                        sp={scrollPosition}
                                    />
                                </div>
                            </div>

                            <div className="replyDisplayCountItem">
                                <img 
                                    className="replyDisplayPNGIcon left" 
                                    src={`/icons/interactions/love${isFlameLoved || isUnionLoved ? "d" : ""}.png`}  
                                    alt="" 
                                    onClick={loveHandler}
                                    onMouseOver={() => setRLovesDD(true)}
                                    onMouseLeave={() => setRLovesDD(false)}
                                />
                                <span className="replyDisplayCounter left" ref={loveCntRef}>{flameLoves + unionLoves}</span>
                                <div 
                                    className="replyDisplayLovesDropdown" 
                                    style={rLovesDD 
                                        ? flameLoves + unionLoves === 0 
                                            ? {opacity: "0", right: "2000px"} 
                                            : {opacity: "100%", right: `${lovesCntWidth}`, top: "0px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <LovesBubble
                                        flameLoves={reply.flameLoves} 
                                        unionLoves={reply.unionLoves} 
                                        isFlameLoved={isFlameLoved} 
                                        isUnionLoved={isUnionLoved}
                                        show={showReplies}
                                        list={"reply"}
                                        sp={scrollPosition}   
                                    />
                                </div> 
                            </div>

                            <div className="replyDisplayCountItem">
                                {reply.replyCnt < 4 ?
                                    (
                                        <>
                                            {user.unionName ?
                                                (
                                                    <>
                                                        {user.spectrum === "diamond" ?
                                                            (
                                                                <>
                                                                    <img 
                                                                        className="replyDisplayPNGIcon left" 
                                                                        src="/icons/middlebar/reply.png" 
                                                                        alt="" 
                                                                        onMouseOver={() => setRRepliesDD(true)}
                                                                        onMouseLeave={() => setRRepliesDD(false)}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div 
                                                                        className="replyDisplaySVGIconDiv"
                                                                        onMouseOver={() => setRRepliesDD(true)}
                                                                        onMouseLeave={() => setRRepliesDD(false)}
                                                                    >
                                                                        <ReplyIconSpectrum 
                                                                            spectrum={user.spectrum} 
                                                                            cn={"replyDisplaySVGIcon left"}
                                                                        />
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        <Reply 
                                                            className={`replyDisplaySVGIcon left ${user.energy}`}
                                                            onMouseOver={() => setRRepliesDD(true)}
                                                            onMouseLeave={() => setRRepliesDD(false)}
                                                        />
                                                    </>
                                                )
                                            }
                                            <span className="replyDisplayCounter left" ref={replyCntRef}>{flameReplies + unionReplies}</span>
                                            {flameReplies + unionReplies > 0 && <span className="rDShowReplies" ref={showRepliesRef} onClick={() => setShowReplies(!showReplies)}>{showReplies ? "Hide" : "Show"}</span>}
                                            <div 
                                                className="replyDisplayRepliesDropdown" 
                                                style={rRepliesDD 
                                                    ? flameReplies + unionReplies === 0 
                                                        ? {opacity: "0", right: "2000px"} 
                                                        : {opacity: "100%", right: `${repliesCntWidth}`, top: "0px"} 
                                                    : {opacity: "0", right: "2000px"}
                                                }
                                            >
                                                <RepliesBubble
                                                    flameReplies={reply.flameReplies} 
                                                    unionReplies={reply.unionReplies} 
                                                    show={showReplies}
                                                    list={"reply"}
                                                    sp={scrollPosition}
                                                    na={reply.replyCnt === 4 ? true : false}   
                                                />
                                            </div> 
                                        </>
                                    ) : ( <></> )
                                }
                            </div>
                        </div>
                        <div className="replyDisplayBottomRight">
                            {reply.replyCnt < 4 ?
                                (
                                    <>
                                        {user.unionName ?
                                            (
                                                <>
                                                    {user.spectrum === "diamond" ?
                                                        (
                                                            <>
                                                                <img 
                                                                    className="replyDisplayPNGIcon right" 
                                                                    src="/icons/middlebar/reply.png" alt="" 
                                                                    onClick={() => setReplyCreate(!replyCreate)} 
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ReplyIconSpectrum 
                                                                    spectrum={user.spectrum} 
                                                                    cn={"replyDisplaySVGIcon right"}
                                                                    onClick={() => setReplyCreate(!replyCreate)} 
                                                                />
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    <Reply 
                                                        className={`replyDisplaySVGIcon right ${user.energy}`}
                                                        onClick={() => setReplyCreate(!replyCreate)} 
                                                    />
                                                </>
                                            )
                                        }
                                    </>
                                ) : ( <></> )
                            }
                        </div>
                    </div>
                </div>
                <div className="replyDisplayResponseFeed">
                    {showReplies && 
                        <ReplyFeed 
                            prompt={"reply"} 
                            promptId={reply._id} 
                            rCntNum={rCntNum + 1}
                        />
                    }
                    {replyCreate && 
                        <CreateReply 
                            prompt={"reply"} 
                            promptId={reply._id} 
                            rCntNum={rCntNum + 1}
                        />
                    }
                </div>
        </div>
    )
};

export default ReplyDisplay;