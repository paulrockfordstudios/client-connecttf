import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import "./PostShortDisplay.css";
import { MoreVert, ChatBubbleOutline } from "@material-ui/icons";
import { energyIcon, spectrumIcon, shareIcon } from "../../../../Utils/icons/icons";
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ProfileLinkBubble from '../../../InfoBubbles/ProfileLinkBubble/ProfileLinkBubble';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import CommentsBubble from '../../../InfoBubbles/CommentsBubble/CommentsBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';

function PostShortDisplay({ post }) {

    const ref = useRef();
    const viewCntRef = useRef();
    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const shareCntRef = useRef();
    const commentCntRef = useRef();
    const postDisplayRef = useRef();

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user: currentUser } = useSelector((state) => state.auth);

    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    const [ postPLDD, setPostPLDD ] = useState(false);
    const [ postViewsDD, setPostViewsDD ] = useState(false);
    const [ postLikesDD, setPostLikesDD ] = useState(false);
    const [ postLovesDD, setPostLovesDD ] = useState(false);
    const [ postSharesDD, setPostSharesDD ] = useState(false);
    const [ postCommentsDD, setPostCommentsDD ] = useState(false);
    const [isFlameLiked, setIsFlameLiked] = useState(false);
    const [isUnionLiked, setIsUnionLiked] = useState(false);
    const [isFlameLoved, setIsFlameLoved] = useState(false);
    const [isUnionLoved, setIsUnionLoved] = useState(false);
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
    const [ accessible, setAccessible ] = useState();

    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray";

    useEffect(() => {
        var rect = postDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top)
    }, []);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = post.unionId 
            ? await axios.get(`/unions?unionId=${post.unionId}`)
            : await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId, post.unionId]);

    useEffect(() => {
        if (user.unionName) {
            const getDims = () => {
                const displayHeight = ref?.current?.clientHeight;
                setHeight(displayHeight);
            }
        getDims();
        }
    }, [user]);

    useEffect(() => {
        if (currentUser._id === user._id || accessible || accessible === "void") {
            setViewsCntWidth(`${viewCntRef.current.clientWidth + 56}px`);
            setLikesCntWidth(`${likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 100}px`);
            setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 146}px`);
            setSharesCntWidth(`${shareCntRef.current.clientWidth + 55}px`);
            setCommentsCntWidth(`${shareCntRef.current.clientWidth + commentCntRef.current.clientWidth + 105}px`);
        }
    }, [currentUser, user, accessible]);

    

    // Viewed counter
    const viewHandler = () => {
        try {
            currentUser.unionName
                ? axios.put(`/posts/${post._id}/unionView`, { unionId: currentUser._id })
                : axios.put(`/posts/${post._id}/flameView`, { userId: currentUser._id })
        } catch(err) {}
        currentUser.unionName
            ? setUnionViews(unionViews + 1)
            : setFlameViews(flameViews + 1)
    };

    // Like/unlike post
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(post.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(post.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
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

    const loveHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
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


    useEffect(() => {
        const accessHandler = (visible) => {
            switch (visible) {
                case "Public":
                    setAccessible("void");
                    break;
                case "Friends":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id) ||
                        user.flameFollowing?.includes(currentUser._id) ||
                        user.unionFollowers?.includes(currentUser._id) ||
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Befrienders":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id) ||
                        user.unionFollowers?.includes(currentUser._id)
                    );
                    break;
                case "Befriending":
                    setAccessible(
                        user.flameFollowing?.includes(currentUser._id) ||
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Unions":
                    setAccessible(currentUser.unionName);
                    break;
                case "Union Friends":
                    setAccessible(
                        user.unionFollowers?.includes(currentUser._id) ||
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Union Befrienders":
                    setAccessible(
                        user.unionFollowers?.includes(currentUser._id)
                    );
                    break;
                case "Unions Befriending":
                    setAccessible(
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Flames":
                    setAccessible(currentUser.userName);
                    break;
                case "Flame Friends":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id) ||
                        user.flameFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Flame Befrienders":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id)
                    );
                    break;
                case "Flames Befriending":
                    setAccessible(
                        user.flameFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Custom":
                    setAccessible("void");
                    break;
                case "Only You":
                    setAccessible(currentUser._id === user._id);
                    break;
                default:
                    setAccessible("void");
            }
        }
        accessHandler(post.access)
    }, []);
    
   
    return (
        <>
            {currentUser._id === user._id || accessible || accessible === "void" ?
                (      
                    <div className="postShortDisplayContainer" style={{height: `${height}px`}}>
                        {user.spectrum === "rainbow" ||
                         user.spectrum === "silver" ||
                         user.spectrum === "gold" ||
                         user.spectrum === "platinum" ||
                         user.spectrum === "diamond" 
                            ? <div 
                                className={`postShortDisplayBackgroundTheme ${colorTheme}`} 
                                style={{
                                backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                                backgroundSize: "cover", 
                                height: `${height}px`
                                }} 
                            />
                            : null
                        }
                        <div 
                            className={
                                `postShortDisplay 
                                ${user.unionName ? "union" : "flame"} 
                                BOX_SHADOW 
                                ${colorTheme}`
                            } 
                            ref={ref}
                        >
                            <Link to={`/post/${post._id}`} onClick={viewHandler}>
                                <div className="postShortDisplay-container">
                                    <div className="postShortDisplayTop">
                                        <div className="postShortDisplayTopLeft">
                                            <Link 
                                                className="postShortDisplayLink" 
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
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <img 
                                                    className="postShortDisplayProfilePic" 
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
                                                    className="postShortDisplayProfileEnergy" 
                                                    src={
                                                        user.unionName 
                                                            ? spectrumIcon(colorTheme)
                                                            : energyIcon(colorTheme)
                                                    } 
                                                    alt="" 
                                                />
                                                <span className="postShortDisplayUserName">
                                                    {
                                                        user.isAnonymous 
                                                            ? user.unionName 
                                                                ? "Anonymous Union" 
                                                                : "Anonymous User" 
                                                            : user.profileName
                                                    }
                                                </span>
                                            </Link>
                                            <span className="postShortDisplayDateTime">{format(post.createdAt)}</span>
                                            <span className="postShortDisplayVisibilityIcon">
                                                <VisibilityIcon 
                                                    visible={post.access} 
                                                    primary={{fontSize: "18px"}}
                                                    secondary={{fontSize: "12px"}}
                                                />
                                            </span>
                                            <div 
                                                className="postShortDisplayProfileinkDropdown" 
                                                style={postPLDD ? {opacity: "100%"} : {opacity: "0%"}}
                                            >
                                                {user.unionName && <ProfileLinkBubble union={user} short/>}
                                                {user.userName && <ProfileLinkBubble user={user} short/>}
                                            </div>
                                        </div>
                                        <div className="postShortDisplayTopRight">
                                            <MoreVert />
                                        </div>
                                    </div>
                                    <div className="postShortDisplayCenter">
                                        <span className="postShortDisplayTitle">{post.title}</span>
                                        <div 
                                            className="postShortDisplayDescriptionPreview"
                                            style={
                                                post.description.length > 0 || 
                                                post.photos.length > 0 
                                                    ? { height: "100%", maxHeight: "80px", marginTop: "20px"} 
                                                    : {height: "0px"}
                                                }
                                        >
                                            <span 
                                                className="postShortDisplayText" 
                                                style={
                                                    post.description 
                                                        ? post.photos 
                                                            ? {width: "calc(100% - 120px"} 
                                                            : {width: "100%"} 
                                                        : {width: "0px"}
                                                }
                                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.description)}}
                                                
                                            />
                                            {post.photos.length > 0 &&
                                                <div className="postShortDisplayPhotoContainer">
                                                    <img className="postShortDisplayPhoto" src={PF + post.photos[0]} alt="" />
                                                    {post.photos.length > 1 && <div className={`postShortDisplayPhotoCntBG POPUP_BACKGROUND ${colorTheme}`} />}
                                                    {post.photos.length > 1 && <div className="postShortDisplayPhotCnt">{`${post.photos.length} Images`}</div>}
                                                </div>
                                            }
                                        </div>
                                        {post.hashtags.length > 0 &&
                                            <div className="postShortDisplayHashtagList">
                                                {post.hashtags.map((hashtag, index) => (
                                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                                        <span 
                                                            key={index}
                                                            className={`postShortDisplayhashtags ${colorTheme}`}
                                                        >
                                                            {hashtag}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="postShortDisplayBottom" ref={postDisplayRef}>
                                        <div className="postShortDisplayBottomLeft left">
                                            <div className="postShortDisplayCountItem views">
                                                <img 
                                                    className="postShortDisplayPNGIcon left" 
                                                    src="/icons/interactions/seen.png" 
                                                    alt="" 
                                                    onMouseOver={() => setPostViewsDD(true)}
                                                    onMouseLeave={() => setPostViewsDD(false)}  
                                                />
                                                <span 
                                                    className="postShortDisplayCounter left" 
                                                    ref={viewCntRef}
                                                >
                                                    {flameViews + unionViews}
                                                </span>
                                                <div 
                                                    className="postShortDisplayViewsDropdown" 
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
                                            <div className="postShortDisplayCountItem likes">
                                                <img 
                                                    className="postShortDisplayPNGIcon left" 
                                                    src={`/icons/interactions/like${isFlameLiked || isUnionLiked ? "d" : ""}.png`} 
                                                    alt="" 
                                                    onClick={likeHandler} 
                                                    onMouseOver={() => setPostLikesDD(true)}
                                                    onMouseLeave={() => setPostLikesDD(false)} 
                                                />
                                                <span 
                                                    className="postShortDisplayCounter left" 
                                                    ref={likeCntRef}
                                                >
                                                    {flameLikes + unionLikes}
                                                </span>
                                                <div 
                                                    className="postShortDisplayLikesDropdown" 
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
                                            <div className="postShortDisplayCountItem loves">
                                                <img 
                                                    className="postShortDisplayPNGIcon left" 
                                                    src={`/icons/interactions/love${isFlameLoved || isUnionLoved ? "d" : ""}.png`}  
                                                    alt="" 
                                                    onClick={loveHandler}
                                                    onMouseOver={() => setPostLovesDD(true)}
                                                    onMouseLeave={() => setPostLovesDD(false)}
                                                />
                                                <span 
                                                    className="postShortDisplayCounter left" 
                                                    ref={loveCntRef}
                                                >
                                                    {flameLoves + unionLoves}
                                                </span>
                                                <div 
                                                    className="postShortDisplayLovesDropdown" 
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
                                        <div className="postShortDisplayBottomRight">
                                            <div className="postShortDisplayCountItem">
                                                {user.unionName ?
                                                    (
                                                        <>
                                                            {colorTheme === "diamond" ?
                                                                (
                                                                    <>
                                                                        <img 
                                                                            className="postShortDisplayPNGIcon right" 
                                                                            src="/icons/middlebar/Post-answer.png" 
                                                                            alt="" 
                                                                            onMouseOver={() => setPostCommentsDD(true)}
                                                                            onMouseLeave={() => setPostCommentsDD(false)}
                                                                        />
                                                                        <span className="postShortDisplayCounter right" ref={commentCntRef}>{flameComments + unionComments}</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div 
                                                                            className="postShortDisplaySVGIconDiv"
                                                                            onMouseOver={() => setPostCommentsDD(true)}
                                                                            onMouseLeave={() => setPostCommentsDD(false)}
                                                                        >
                                                                            <ChatBubbleIconSpectrum 
                                                                                spectrum={user.spectrum} 
                                                                                cn={"postShortDisplaySVGIcon right"}  
                                                                                post
                                                                            />
                                                                            <span className="postShortDisplayCounter right" ref={commentCntRef}>{flameComments + unionComments}</span>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChatBubbleOutline 
                                                                className={`postShortDisplaySVGIcon right ${colorTheme}`}
                                                                onMouseOver={() => setPostCommentsDD(true)}
                                                                onMouseLeave={() => setPostCommentsDD(false)}
                                                            />
                                                            <span className="postShortDisplayCounter right" ref={commentCntRef}>{flameComments + unionComments}</span>
                                                        </>
                                                    )
                                                }
                                                <div 
                                                    className="postShortDisplayCommentsDropdown" 
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
                                            <div className="postShortDisplayCountItem">
                                                <img 
                                                    className="postShortDisplayPNGIcon right" 
                                                    src={shareIcon(colorTheme)} 
                                                    alt="" 
                                                    onMouseOver={() => setPostSharesDD(true)}
                                                    onMouseLeave={() => setPostSharesDD(false)}   
                                                />
                                                <span className="postShortDisplayCounter right" ref={shareCntRef}>{flameShares + unionShares}</span>
                                                <div 
                                                    className="postShortDisplaySharesDropdown" 
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
                                </div> 
                            </Link> 
                        </div>
                    </div>
                ) : (null)
            }
        </>
    )
};

export default PostShortDisplay;