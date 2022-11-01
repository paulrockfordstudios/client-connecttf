import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import "./CommentDisplay.css";
import { MoreVert, Reply } from "@material-ui/icons";
import { AuthContext } from "../../../Context/AuthContext";
import { energyIcon, spectrumIcon } from "../../../Utils/icons/icons";
import ReplyIconSpectrum from '../../../Utils/misc/ReplyIconSpectrum';
import ReplyFeed from '../../Replies/ReplyFeed/ReplyFeed';
import CreateReply from '../../Replies/CreateReply/CreateReply';
import COptionsDropdown from '../../Dropdowns/FlareDropdowns/COptionsDropdown/COptionsDropdown';
import LikesBubble from '../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../InfoBubbles/LovesBubble/LovesBubble';
import RepliesBubble from '../../InfoBubbles/RepliesBubble/RepliesBubble';

function CommentDisplay({comment}) {

    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const replyCntRef = useRef();
    const cDisplayRef = useRef();
    const discRef = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [user, setUser] = useState({});
    const [ cODD, setCODD ] = useState(false);
    const [ cLikesDD, setCLikesDD ] = useState(false);
    const [ cLovesDD, setCLovesDD ] = useState(false);
    const [ cRepliesDD, setCRepliesDD ] = useState(false);
    const [isFlameLiked, setIsFlameLiked] = useState(false);
    const [isUnionLiked, setIsUnionLiked] = useState(false);
    const [isFlameLoved, setIsFlameLoved] = useState(false);
    const [isUnionLoved, setIsUnionLoved] = useState(false);
    const [ flameLikes, setFlameLikes ] = useState(comment.flameLikes.length);
    const [ unionLikes, setUnionLikes ] = useState(comment.unionLikes.length);
    const [ flameLoves, setFlameLoves ] = useState(comment.flameLoves.length);
    const [ unionLoves, setUnionLoves ] = useState(comment.unionLoves.length);
    const [ flameReplies, setFlameReplies ] = useState(comment.flameReplies.length);
    const [ unionReplies, setUnionReplies ] = useState(comment.unionReplies.length);
    const [ likesCntWidth, setLikesCntWidth ] = useState();
    const [ lovesCntWidth, setLovesCntWidth ] = useState();
    const [ repliesCntWidth, setRepliesCntWidth ] = useState();
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ replyCreate, setReplyCreate ] = useState(false);
    const [ showReplies, setShowReplies ] = useState(false);
    const [ discHeight, setDiscHeight ] = useState();
    const [ hidden, setHidden ] = useState(false);

    useEffect(() => {
        var rect = cDisplayRef.current.getBoundingClientRect();
        setScrollPosition(rect.top)
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const res = comment.union 
            ? await axios.get(`/unions?unionId=${comment.unionId}`)
            : await axios.get(`/users?userId=${comment.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [comment.userId]);


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
        setLikesCntWidth(`${likeCntRef.current.clientWidth + 54}px`);
        setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + 97}px`);
        setRepliesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + replyCntRef.current.clientWidth + 145}px`);
    }, []);

    

    // Like/unlike answer
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(comment.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(comment.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/comments/${comment._id}/unionLike`, { unionId: currentUser._id });
                setUnionLikes(isUnionLiked ? unionLikes - 1 : unionLikes + 1);
                setIsUnionLiked(!isUnionLiked);
            } else {
                axios.put(`/comments/${comment._id}/flameLike`, { userId: currentUser._id });
                setFlameLikes(isFlameLiked ? flameLikes - 1 : flameLikes + 1);
                setIsFlameLiked(!isFlameLiked);
            }
        } catch(err) {}         
    };

    // Love/unlove answer
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(comment.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(comment.flameLoves.includes(currentUser._id))
    }, [currentUser._id, ])

    const loveHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/comments/${comment._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axios.put(`/comments/${comment._id}/flameLove`, { userId: currentUser._id });
                setFlameLoves(isFlameLoved ? flameLoves - 1 : flameLoves + 1);
                setIsFlameLoved(!isFlameLoved);
            }
        } catch(err) {}
    };

    useEffect(() => {
        if (cLikesDD || cLovesDD || cRepliesDD) {
            var rect = cDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
      }, [cLikesDD, cLovesDD, cRepliesDD]);
    
    return (
        <div className="commentDisplay">
            
                <div className="commentDisplay-container">
                    <div className="commentDisplayTop">
                        <div className="commentDisplayTopLeft">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <Link  className="commentDisplayProfileLink"  style={{backgroundImage: "url(/misc/diamond-sparkle-light.jpg)"}} to={`/union-profile/${user.unionName}`}>
                                                        <img className="commentDisplayProfilePic" src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                        <img className="commentDisplayProfileEnergy" src={spectrumIcon(user.spectrum)} alt="" />
                                                        <span className="commentDisplayUserName">{user.profileName}</span>
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Link className={`commentDisplayProfileLink ${user.spectrum}`} to={`/union-profile/${user.unionName}`}>
                                                        <img className="commentDisplayProfilePic" src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                        <img className="commentDisplayProfileEnergy" src={spectrumIcon(user.spectrum)} alt="" />
                                                        <span className="commentDisplayUserName">{user.profileName}</span>
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Link className={`commentDisplayProfileLink ${user.energy}`} to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.userName}`}>
                                            <img className="commentDisplayProfilePic" src={user.isAnonymous ? "/picBlanks/no-avatar.jpg" : user.profilePicture ? user.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                            <img className="commentDisplayProfileEnergy" src={energyIcon(user.energy)} alt="" />
                                            <span className="commentDisplayUserName">{user.isAnonymous ? "Anonymous User" : user.profileName}</span>
                                        </Link>
                                    </>
                                )
                            }
                            <span className="commentDisplayDateTime">{format(comment.createdAt)}</span>
                        </div>
                        <div className="commentDisplayTopRight">
                            <MoreVert className="commentDisplayOptions" onClick={() => setCODD(!cODD)}/>
                            <div className="commentDisplayAODropdown" style={cODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}>
                                <COptionsDropdown user={user} />
                            </div>
                        </div>
                    </div>
                    <div className="commentDisplayCenter">
                        <span className="commentDisplayText" ref={discRef}>{comment.description}</span>
                        <span className="commentDisplayhashtags">#Love</span>
                        <div className="photoDisplay-container">
                            <ul className="photoList">      
                                {comment.photos.map((photo, index) => (
                                    <li className="photos" key={index}>
                                        {console.log(PF + photo)}
                                        <img className="postImg" src={PF + photo} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="commentDisplayBottom">
                        <div className="commentDisplayBottomLeft" ref={cDisplayRef}>

                            <div className="commentDisplayCountItem">
                                <img 
                                    className="commentDisplayPNGIcon left" 
                                    src={`/icons/interactions/like${isFlameLiked || isUnionLiked ? "d" : ""}.png`} 
                                    alt="" 
                                    onClick={likeHandler} 
                                    onMouseOver={() => setCLikesDD(true)}
                                    onMouseLeave={() => setCLikesDD(false)} 
                                />
                                <span className="commentDisplayCounter left" ref={likeCntRef}>{flameLikes + unionLikes}</span>
                                <div 
                                    className="commentDisplayLikesDropdown" 
                                    style={cLikesDD 
                                        ? flameLikes + unionLikes === 0
                                            ? {opacity: "0", right: "2000px"}
                                            : {opacity: "100%", right: `${likesCntWidth}`, top: "0px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <LikesBubble
                                        flameLikes={comment.flameLikes} 
                                        unionLikes={comment.unionLikes} 
                                        isFlameLiked={isFlameLiked} 
                                        isUnionLiked={isUnionLiked}
                                        show={true}
                                        list={"comment"}
                                        sp={scrollPosition}
                                    />
                                </div>
                            </div>

                            <div className="commentDisplayCountItem">
                                <img 
                                    className="commentDisplayPNGIcon left" 
                                    src={`/icons/interactions/love${isFlameLoved || isUnionLoved ? "d" : ""}.png`}  
                                    alt="" 
                                    onClick={loveHandler}
                                    onMouseOver={() => setCLovesDD(true)}
                                    onMouseLeave={() => setCLovesDD(false)}
                                />
                                <span className="commentDisplayCounter left" ref={loveCntRef}>{flameLoves + unionLoves}</span>
                                <div 
                                    className="commentDisplayLovesDropdown" 
                                    style={cLovesDD 
                                        ? flameLoves + unionLoves === 0 
                                            ? {opacity: "0", right: "2000px"}
                                            : {opacity: "100%", right: `${lovesCntWidth}`, top: "0px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <LovesBubble
                                        flameLoves={comment.flameLoves} 
                                        unionLoves={comment.unionLoves} 
                                        isFlameLoved={isFlameLoved} 
                                        isUnionLoved={isUnionLoved}
                                        list={"comment"}
                                        sp={scrollPosition}   
                                    />
                                </div> 
                            </div>

                            <div className="commentDisplayCountItem">
                                {user.unionName ?
                                    (
                                        <>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img 
                                                            className="commentDisplayPNGIcon left" 
                                                            src="/icons/middlebar/reply.png" 
                                                            alt="" 
                                                            onMouseOver={() => setCRepliesDD(true)}
                                                            onMouseLeave={() => setCRepliesDD(false)}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div 
                                                            className="commentDisplaySVGIconDiv"
                                                            onMouseOver={() => setCRepliesDD(true)}
                                                            onMouseLeave={() => setCRepliesDD(false)}
                                                        >
                                                            <ReplyIconSpectrum spectrum={user.spectrum} cn={"commentDisplaySVGIcon left"}/>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <Reply 
                                                className={`commentDisplaySVGIcon left ${user.energy}`}
                                                onMouseOver={() => setCRepliesDD(true)}
                                                onMouseLeave={() => setCRepliesDD(false)}
                                            />
                                        </>
                                    )
                                }
                                <span className="commentDisplayCounter left" ref={replyCntRef}>{flameReplies + unionReplies}</span>
                                <div 
                                    className="commentDisplayRepliesDropdown" 
                                    style={cRepliesDD 
                                        ? flameReplies + unionReplies === 0 
                                            ? {opacity: "0", right: "2000px"} 
                                            : {opacity: "100%", right: `${repliesCntWidth}`, top: "2px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <RepliesBubble
                                        flameReplies={comment.flameReplies} 
                                        unionReplies={comment.unionReplies} 
                                        list={"comment"}
                                        sp={scrollPosition}   
                                    />
                                </div> 
                            </div>

                        </div>
                        <div className="commentDisplayBottomRight">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img 
                                                        className="commentDisplayPNGIcon right" 
                                                        src="/icons/middlebar/reply.png" 
                                                        alt=""
                                                        onClick={() => setReplyCreate(!replyCreate)} 
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <ReplyIconSpectrum 
                                                        spectrum={user.spectrum} 
                                                        cn={"commentDisplaySVGIcon right"}
                                                        onClick={() => setReplyCreate(!replyCreate)}  
                                                    />
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Reply 
                                            className={`commentDisplaySVGIcon right ${user.energy}`}
                                            onClick={() => setReplyCreate(!replyCreate)}   
                                        />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="commentDisplayResponseFeed">
                    <ReplyFeed prompt={"comment"} promptId={comment._id} rCntNum={1}/>
                    {replyCreate && <CreateReply prompt={"comment"} promptId={comment._id} rCntNum={1}/>}
                </div>
        </div>
    )
};

export default CommentDisplay;