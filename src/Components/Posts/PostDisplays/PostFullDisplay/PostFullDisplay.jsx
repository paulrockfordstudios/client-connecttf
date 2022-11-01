import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import "./PostFullDisplay.css";
import { ChatBubbleOutline, MoreVert } from "@material-ui/icons";
import { spectrumIcon, shareIcon, energyIcon } from "../../../../Utils/icons/icons";
import CommentFeed from '../../../Comments/CommentFeed/CommentFeed';
import CreateComment from '../../../Comments/CreateComment/CreateComment';
import DOMPurify from 'dompurify';
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ProfileLinkBubble from '../../../InfoBubbles/ProfileLinkBubble/ProfileLinkBubble';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import CommentsBubble from '../../../InfoBubbles/CommentsBubble/CommentsBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import PostOptionsDropdown from '../../../Dropdowns/FlareDropdowns/PostOptionsDropdown/PostOptionsDropdown';
import CDPPost from '../../../ConfirmDeletePopups/CDPPost/CDPPost'
import EditPost from '../../EditPost/EditPost';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';

function PostFullDisplay({post}) {

    const viewCntRef = useRef();
    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const shareCntRef = useRef();
    const commentCntRef = useRef();
    const postDisplayRef = useRef();

    const { user: currentUser, deleteFlare, editFlare } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
    const [user, setUser] = useState({});
    const [ height, setHeight ] = useState();
    const [ clicked, setClicked ] = useState(0);
    const [ postODD, setPostODD] = useState(false);
    const [ postPLDD, setPostPLDD ] = useState(false);
    const [ postViewsDD, setPostViewsDD ] = useState(false);
    const [ postLikesDD, setPostLikesDD ] = useState(false);
    const [ postLovesDD, setPostLovesDD ] = useState(false);
    const [ postSharesDD, setPostSharesDD ] = useState(false);
    const [ postCommentsDD, setPostCommentsDD ] = useState(false);
    const [ isFlameLiked, setIsFlameLiked ] = useState(false);
    const [ isUnionLiked, setIsUnionLiked ] = useState(false);
    const [ isFlameLoved, setIsFlameLoved ] = useState(false);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
    const [ flameViews, setFlameViews ] = useState(post.flameViews.length);
    const [ unionViews, setUnionViews ] = useState(post.unionViews.length);
    const [ flameLikes, setFlameLikes ] = useState(post.flameLikes.length);
    const [ unionLikes, setUnionLikes ] = useState(post.unionLikes.length);
    const [ flameLoves, setFlameLoves ] = useState(post.flameLoves.length);
    const [ unionLoves, setUnionLoves ] = useState(post.unionLoves.length);
    const [ flameShares, setFlameShares ] = useState(post.flameShares.length);
    const [ unionShares, setUnionShares ] = useState(post.unionShares.length);
    const [ flameComments, setFlameComments ] = useState(post.flameComments.length);
    const [ unionComments, setUnionComments ] = useState(post.unionComments.length);
    const [ viewsCntWidth, setViewsCntWidth ] = useState();
    const [ likesCntWidth, setLikesCntWidth ] = useState();
    const [ lovesCntWidth, setLovesCntWidth ] = useState();
    const [ commentsCntWidth, setCommentsCntWidth ] = useState();
    const [ sharesCntWidth, setSharesCntWidth ] = useState();
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ deletePost, setDeletePost ] = useState(false);

    const colorTheme = user.unionName 
        ? user.spectrum
            ? user.spectrum
            : "gray" 
        : user.energy
            ? user.energy
            : "gray"

    useEffect(() => {
        setDeletePost(deleteFlare);
    }, [deleteFlare]);
    
    useEffect(() => {
        var rect = postDisplayRef.current.getBoundingClientRect();
        setScrollPosition(rect.top)
    }, []);

    useEffect(() => {
        setViewsCntWidth(`${viewCntRef.current.clientWidth + 65}px`);
        setLikesCntWidth(`${likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 110}px`);
        setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 155}px`);
        setSharesCntWidth(`${shareCntRef.current.clientWidth + 65}px`);
        setCommentsCntWidth(`${shareCntRef.current.clientWidth + commentCntRef.current.clientWidth + 112}px`);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const res = post.unionId 
            ? await axios.get(`/unions?unionId=${post.unionId}`)
            : await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId, post.likes]);


    // Like/unlike post
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(post.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(post.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/posts/${post._id}/unionLike`, { unionId: currentUser._id });
                setUnionLikes(isUnionLiked ? unionLikes - 1 : unionLikes + 1);
                setIsUnionLiked(!isUnionLiked);
            } else {
                axios.put(`/posts/${post._id}/flameLike`, { userId: currentUser._id });
                setFlameLikes(isFlameLiked ? flameLikes - 1 : flameLikes + 1);
                setIsFlameLiked(!isFlameLiked);
            }
        } catch(err) {}         
    };

    // Love/unlove post
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(post.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(post.flameLoves.includes(currentUser._id))
    }, [currentUser._id, ])

    const loveHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/posts/${post._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axios.put(`/posts/${post._id}/flameLove`, { userId: currentUser._id });
                setFlameLoves(isFlameLoved ? flameLoves - 1 : flameLoves + 1);
                setIsFlameLoved(!isFlameLoved);
            }
        } catch(err) {}
    };

    useEffect(() => {
        if (postViewsDD || postLikesDD || postLovesDD || postCommentsDD || postSharesDD) {
            var rect = postDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
      }, [postViewsDD, postLikesDD, postLovesDD, postCommentsDD, postSharesDD]);
    
    return (
        <>
            <div className="postFullDisplayContainer" style={{height: `${height}px`}}>               
                {colorTheme === "rainbow" || 
                 colorTheme === "silver" ||
                 colorTheme === "gold" ||
                 colorTheme === "platinum" ||
                 colorTheme === "diamond" 
                    ? <div 
                        className={`postFullDisplayBackgroundTheme ${colorTheme}`} 
                        style={{
                        backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                        backgroundSize: "100%", 
                        backgroundRepeat: "repeat", 
                        height: `${height}px`}} 
                    />
                    : null
                }
                <div 
                    className={`postFullDisplay union BOX_SHADOW ${colorTheme}`} 
                    onClick={() => setClicked((click) => click + 1)}        
                    ref={el => {
                        if (clicked >= 0 || clicked <= 9999) {
                            if (!el) return;
                            let prevValue = JSON.stringify(el.getBoundingClientRect());
                            const start = Date.now();
                            const handle = setInterval(() => {
                                let nextValue = JSON.stringify(el.getBoundingClientRect());
                                if (nextValue === prevValue) {
                                    clearInterval(handle);
                                    setHeight(el.getBoundingClientRect().height)
                                } else {
                                    prevValue = nextValue;
                                }
                            }, 1000);
                        }
                    }} 
                >
                    <div className="postFullDisplay-container">
                        <div className="postFullDisplayTop">
                            <div className="postFullDisplayTopLeft">
                                <Link 
                                    className="postFullDisplayProfileLink" 
                                    to={user.unionName 
                                        ? user.isAnonymous
                                            ? `/union-profile/id/${user._id}`
                                            : `/union-profile/unionName/${user.unionName}`
                                        : user.isAnonymous
                                            ? `/flame-profile/id/${user._id}`
                                            : `/flame-profile/userName/${user.userName}`
                                    }
                                    onMouseOver={() => setPostPLDD(true)}
                                    onMouseLeave={() => setPostPLDD(false)}
                                >
                                    <img 
                                        className="postFullDisplayProfilePic" 
                                        src={
                                            user.unionName 
                                                ? user.unionProfilePicture
                                                    ? user.unionProfilePicture
                                                    : "/picBlanks/no-union-avatar.jpg"
                                                : user.profilePicture
                                                    ? user.profilePicture
                                                    : "/picBlanks/no-avatar.jpg"
                                        }  
                                        alt="" 
                                    />
                                    <img 
                                        className="postFullDisplayProfileEnergy" 
                                        src={user.unionName 
                                            ? spectrumIcon(user.spectrum)
                                            : energyIcon(user.energy)
                                        } 
                                        alt="" 
                                    />
                                    <span className="postFullDisplayUserName">
                                        {
                                            user.isAnonymous 
                                                ? user.unionName 
                                                    ? "Anonymous Union" 
                                                    : "Anonymous User" 
                                                : user.profileName
                                        }
                                    </span>
                                </Link>
                                <span className="qnFullDisplayInfo">{format(post.createdAt)}</span>
                                <span className="qnFullDisplayInfo">/</span>
                                <span className="qnFullDisplayInfo">{`${post.feed} Question`}</span>
                                <span className="qnFullDisplayInfo">/</span>
                                <span className="qnFullDisplayInfo">{post.access}</span>
                                <span className="qnFullDisplayVisibilityIcon">
                                    <VisibilityIcon 
                                        visible={post.access} 
                                        primary={{fontSize: "18px"}}
                                        secondary={{fontSize: "12px"}}
                                    />
                                </span>
                                <div 
                                    className="postFullDisplayProfileinkDropdown" 
                                    style={postPLDD ? {opacity: "100%"} : {opacity: "0%"}}
                                >
                                    <ProfileLinkBubble union={user} Full/>
                                </div>
                            </div>
                            <div className="postFullDisplayTopRight">
                                <MoreVert onClick={() => setPostODD(!postODD)}/>
                                <div 
                                    className="postFullDisplayPostODropdown" 
                                    style={postODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}
                                >
                                    <PostOptionsDropdown user={user}/>
                                </div>
                            </div>
                        </div>
                        <div className="postFullDisplayCenter">
                            <span 
                                className="postFullDisplayText" 
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.description)}} 
                            />
                            <div className="photoFullDisplay-container">
                                <ul className="photoList">      
                                    {post.photos.map((photo, index) => (
                                        <li className="photos" key={index}>
                                            {console.log(PF + photo)}
                                            <img className="postImg" src={PF + photo} alt="" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="qnFullDisplayHashtagList">
                                {post.hashtags.map((hashtag, index) => (
                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                        <span 
                                            key={index}
                                            className={`qnFullDisplayhashtags ${colorTheme}`}
                                        >
                                            {hashtag}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="postFullDisplayBottom" ref={postDisplayRef}>
                            <div className="postFullDisplayBottomLeft">
                                <div className="postFullDisplayCountItem views">
                                    <img 
                                        className="postFullDisplayPNGIcon left" 
                                        src="/icons/interactions/seen.png" alt="" 
                                        onMouseOver={() => setPostViewsDD(true)}
                                        onMouseLeave={() => setPostViewsDD(false)}  
                                    />
                                    <span 
                                        className="postFullDisplayCounter left" 
                                        ref={viewCntRef}
                                    >
                                        {flameViews + unionViews}
                                    </span>
                                    <div 
                                        className="postFullDisplayViewsDropdown" 
                                        style={postViewsDD 
                                            ? flameViews + unionViews === 0
                                                ? {opacity: "0", right: "2000px"} 
                                                : {opacity: "100%", right: `${viewsCntWidth}`, top: "0px"} 
                                            : {opacity: "0", right: "2000px"}
                                        }
                                    >
                                        <ViewsBubble 
                                            flameViews={post.flameViews} 
                                            unionViews={post.unionViews} 
                                            sp={scrollPosition} 
                                        />
                                    </div>  
                                </div>
                                <div className="postFullDisplayCountItem likes">
                                    <img 
                                        className="postFullDisplayPNGIcon left" 
                                        src={`/icons/interactions/like${isFlameLiked || isUnionLiked ? "d" : ""}.png`}  
                                        alt="" 
                                        onClick={likeHandler} 
                                        onMouseOver={() => setPostLikesDD(true)}
                                        onMouseLeave={() => setPostLikesDD(false)} 
                                    />
                                    <span 
                                        className="postFullDisplayCounter left" 
                                        ref={likeCntRef}
                                    >
                                        {flameLikes + unionLikes}
                                    </span>
                                    <div 
                                        className="postFullDisplayLikesDropdown" 
                                        style={postLikesDD 
                                            ? flameLikes + unionLikes === 0
                                                ? {opacity: "0", right: "2000px"} 
                                                : {opacity: "100%", right: `${likesCntWidth}`, top: "0px"} 
                                            : {opacity: "0", right: "2000px"}
                                        }
                                    >
                                        <LikesBubble
                                            flameLikes={post.flameLikes}    
                                            unionLikes={post.unionLikes} 
                                            isFlameLiked={isFlameLiked} 
                                            isUnionLiked={isUnionLiked}
                                            show={true}
                                            list={"post"}
                                            sp={scrollPosition}
                                        />
                                    </div>
                                </div>
                                <div className="postFullDisplayCountItem loves">
                                    <img 
                                        className="postFullDisplayPNGIcon left" 
                                        src={`/icons/interactions/love${isFlameLoved || isUnionLoved ? "d" : ""}.png`}  
                                        alt="" 
                                        onClick={loveHandler}
                                        onMouseOver={() => setPostLovesDD(true)}
                                        onMouseLeave={() => setPostLovesDD(false)}
                                    />
                                    <span 
                                        className="postFullDisplayCounter left" 
                                        ref={loveCntRef}
                                    >
                                        {flameLoves + unionLoves}
                                    </span>
                                    <div 
                                        className="postFullDisplayLovesDropdown" 
                                        style={postLovesDD
                                            ? flameLoves + unionLoves === 0
                                                ? {opacity: "0", right: "2000px"} 
                                                : {opacity: "100%", right: `${lovesCntWidth}`, top: "0px"} 
                                            : {opacity: "0", right: "2000px"}
                                        }
                                    >
                                        <LovesBubble 
                                            flameLoves={post.flameLoves} 
                                            unionLoves={post.unionLoves} 
                                            isFlameLoved={isFlameLoved} 
                                            isUnionLoved={isUnionLoved}
                                            list={"post"}
                                            sp={scrollPosition}   
                                        />
                                    </div> 
                                </div>             
                            </div>
                            <div className="postFullDisplayBottomRight">
                                <div className="qnFullDisplayCountItem comments">
                                    {user.unionName ?
                                        (
                                            <>
                                                {colorTheme === "diamond" ?
                                                    (
                                                        <>
                                                            <img 
                                                                className="postFullDisplayPNGIcon right" 
                                                                src="/icons/middlebar/chat-bubble.png" 
                                                                alt="" 
                                                                onMouseOver={() => setPostCommentsDD(true)}
                                                                onMouseLeave={() => setPostCommentsDD(false)}
                                                            />
                                                            <span className="postFullDisplayCounter right" ref={commentCntRef}>{flameComments + unionComments}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div 
                                                                className="postFullDisplaySVGIconDiv"
                                                                onMouseOver={() => setPostCommentsDD(true)}
                                                                onMouseLeave={() => setPostCommentsDD(false)}
                                                            >
                                                                <ChatBubbleIconSpectrum 
                                                                    spectrum={user.spectrum} 
                                                                    cn={"postFullDisplaySVGIcon right"}  
                                                                />
                                                                <span 
                                                                    className="postFullDisplayCounter right" 
                                                                    ref={commentCntRef}
                                                                >
                                                                    {flameComments + unionComments}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )
                                                } 
                                            </>
                                        ):(
                                            <>
                                                <ChatBubbleOutline 
                                                    className={`qnFullDisplaySVGIcon right ${user.energy}`}
                                                    onMouseOver={() => setPostCommentsDD(true)}
                                                    onMouseLeave={() => setPostCommentsDD(false)}
                                                />
                                                <span 
                                                    className="postFullDisplayCounter right" 
                                                    ref={commentCntRef}
                                                >
                                                    {flameComments + unionComments}
                                                </span>
                                            </>
                                        )
                                    }  
                                    <div 
                                        className="postFullDisplayCommentsDropdown" 
                                        style={postCommentsDD 
                                            ? flameComments + unionComments === 0 
                                                ? {opacity: "0", right: "4000px"} 
                                                : {opacity: "100%", left: `${commentsCntWidth}`, top: "0px"} 
                                            : {opacity: "0", right: "4000px"}
                                        }
                                    >
                                        <CommentsBubble 
                                            flameComments={post.flameComments} 
                                            unionComments={post.unionComments} 
                                            sp={scrollPosition}
                                        />
                                    </div> 
                                </div>
                                <div className="postFullDisplayCountItem shares">
                                    <img 
                                        className="postFullDisplayPNGIcon right" 
                                        src={shareIcon(colorTheme)} 
                                        alt="" 
                                        onMouseOver={() => setPostSharesDD(true)}
                                        onMouseLeave={() => setPostSharesDD(false)}   
                                    />
                                    <span 
                                        className="postFullDisplayCounter right" 
                                        ref={shareCntRef}
                                    >
                                        {flameShares + unionShares}
                                    </span>
                                    <div 
                                        className="postFullDisplaySharesDropdown" 
                                        style={postSharesDD 
                                            ? flameShares + unionShares === 0
                                                ? {opacity: "0", right: "4000px"}
                                                : {opacity: "100%", left: `${sharesCntWidth}`, top: "0px"} 
                                            : {opacity: "0", right: "4000px"}
                                        }
                                    >
                                        <SharesBubble 
                                            flameShares={post.flameShares} 
                                            unionShares={post.unionShares} 
                                            sp={scrollPosition}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {colorTheme === "diamond" 
                            ? <img className="postFullDisplayHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                            : <hr className={`postFullDisplayHr ${colorTheme}`} />
                        }
                    </div> 
                    <div className="postFullDisplayResponseFeed">
                        <CreateComment />
                        <CommentFeed /> 
                    </div>
                </div>
            </div>            
            {editFlare && <EditPost post={post} />}
            {deletePost &&
                <div className="POPUP_SCREEN" >
                    <div 
                        style={
                            user.unionName && user.spectrum === "diamond" 
                                ? {backgroundImage: "url(/misc/diamond-background.jpg)"} 
                                : {}
                        }
                        className={
                            `POPUP_BACKGROUND 
                            ${user.unionName 
                                ? user.spectrum 
                                    ? user.spectrum 
                                    : "gray" 
                                : user.energy 
                                    ? user.energy 
                                    : "gray"
                            }`
                        }
                    />
                    <div className="cdpQuestionScreenContainer">
                        <CDPPost post={post}/>
                    </div>
                </div>
            }
        </>
    )
};

export default PostFullDisplay;