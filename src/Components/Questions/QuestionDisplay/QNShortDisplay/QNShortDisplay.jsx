import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import ShowMoreText from "react-show-more-text";
import "./QNShortDisplay.css";
import { MoreVert, QuestionAnswer, } from "@material-ui/icons";
import { energyIcon, spectrumIcon, shareIcon } from "../../../../Utils/icons/icons";
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ProfileLinkBubble from '../../../InfoBubbles/ProfileLinkBubble/ProfileLinkBubble';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import AnswersBubble from '../../../InfoBubbles/AnswersBubble/AnswersBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';

function QNShortDisplay({ question }) {

    const ref = useRef();
    const viewCntRef = useRef();
    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const shareCntRef = useRef();
    const answerCntRef = useRef();
    const qnDisplayRef = useRef();

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    const [ qnPLDD, setQNPLDD ] = useState(false);
    const [ qnViewsDD, setQNViewsDD ] = useState(false);
    const [ qnLikesDD, setQNLikesDD ] = useState(false);
    const [ qnLovesDD, setQNLovesDD ] = useState(false);
    const [ qnSharesDD, setQNSharesDD ] = useState(false);
    const [ qnAnswersDD, setQNAnswersDD ] = useState(false);
    const [isFlameLiked, setIsFlameLiked] = useState(false);
    const [isUnionLiked, setIsUnionLiked] = useState(false);
    const [isFlameLoved, setIsFlameLoved] = useState(false);
    const [isUnionLoved, setIsUnionLoved] = useState(false);
    const [ flameViews, setFlameViews ] = useState(question.flameViews.length);
    const [ unionViews, setUnionViews ] = useState(question.unionViews.length);
    const [ flameLikes, setFlameLikes ] = useState(question.flameLikes.length);
    const [ unionLikes, setUnionLikes ] = useState(question.unionLikes.length);
    const [ flameLoves, setFlameLoves ] = useState(question.flameLoves.length);
    const [ unionLoves, setUnionLoves ] = useState(question.unionLoves.length);
    const [ flameShares, setFlameShares ] = useState(question.flameShares.length);
    const [ unionShares, setUnionShares ] = useState(question.unionShares.length);
    const [ flameAnswers, setFlameAnswers ] = useState(question.flameAnswers.length);
    const [ unionAnswers, setUnionAnswers ] = useState(question.unionAnswers.length);
    const [ viewsCntWidth, setViewsCntWidth ] = useState();
    const [ likesCntWidth, setLikesCntWidth ] = useState();
    const [ lovesCntWidth, setLovesCntWidth ] = useState();
    const [ answersCntWidth, setAnswersCntWidth ] = useState();
    const [ sharesCntWidth, setSharesCntWidth ] = useState();
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ accessible, setAccessible ] = useState();
    const [ descHeight, setDescHeight ] = useState(0);
    const [ textHide, setTextHide ] = useState(false);
    const [ done, setDone ] = useState(false);


    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray";

    useEffect(() => {
        var rect = qnDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top)
    }, []);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = question.unionId 
            ? await axios.get(`/unions?unionId=${question.unionId}`)
            : await axios.get(`/users?userId=${question.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [question.userId, question.unionId]);

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
            setAnswersCntWidth(`${shareCntRef.current.clientWidth + answerCntRef.current.clientWidth + 105}px`);
        }
    }, [currentUser, user, accessible]);

    

    // Viewed counter
    const viewHandler = () => {
        try {
            currentUser.unionName
                ? axios.put(`/questions/${question._id}/unionView`, { unionId: currentUser._id })
                : axios.put(`/questions/${question._id}/flameView`, { userId: currentUser._id })
        } catch(err) {}
        currentUser.unionName
            ? setUnionViews(unionViews + 1)
            : setFlameViews(flameViews + 1)
    };

    // Like/unlike question
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(question.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(question.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if ( currentUser.unionName ) {
                axios.put(`/questions/${question._id}/unionLike`, { unionId: currentUser._id });
                setUnionLikes(isUnionLiked ? unionLikes - 1 : unionLikes + 1);
                setIsUnionLiked(!isUnionLiked);
            } else {
                axios.put(`/questions/${question._id}/flameLike`, { userId: currentUser._id });
                setFlameLikes(isFlameLiked ? flameLikes - 1 : flameLikes + 1);
                setIsFlameLiked(!isFlameLiked);
            }
        } catch(err) {}         
    };

    // Love/unlove question
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(question.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(question.flameLoves.includes(currentUser._id))
    }, [currentUser._id, ])

    const loveHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if ( currentUser.unionName ) {
                axios.put(`/questions/${question._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axios.put(`/questions/${question._id}/flameLove`, { userId: currentUser._id });
                setFlameLoves(isFlameLoved ? flameLoves - 1 : flameLoves + 1);
                setIsFlameLoved(!isFlameLoved);
            }
        } catch(err) {}
    };

    useEffect(() => {
        if (qnViewsDD || qnLikesDD || qnLovesDD || qnAnswersDD || qnSharesDD) {
            var rect = qnDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
      }, [qnViewsDD, qnLikesDD, qnLovesDD, qnAnswersDD, qnSharesDD]);


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
        accessHandler(question.access)
    }, []);
    
   
    return (
        <>
            {currentUser._id === user._id || accessible || accessible === "void" ?
                (      
                    <div className="qnShortDisplayContainer" style={{height: `${height}px`}}>
                        {user.spectrum === "rainbow" ||
                         user.spectrum === "silver" ||
                         user.spectrum === "gold" ||
                         user.spectrum === "platinum" ||
                         user.spectrum === "diamond" 
                            ? <div 
                                className={`qnShortDisplayBackgroundTheme ${colorTheme}`} 
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
                                `qnShortDisplay 
                                ${user.unionName ? "union" : "flame"} 
                                BOX_SHADOW 
                                ${colorTheme}`
                            } 
                            ref={ref}
                        >
                            <Link to={`/question/${question._id}`} onClick={viewHandler}>
                                <div className="qnShortDisplay-container">
                                    <div className="qnShortDisplayTop">
                                        <div className="qnShortDisplayTopLeft">
                                            <Link 
                                                className="qnShortDisplayLink" 
                                                to={user.unionName 
                                                    ? user.isAnonymous
                                                        ? `/union-profile/id/${user._id}`
                                                        : `/union-profile/unionName/${user.unionName}`
                                                    : user.isAnonymous
                                                        ? `/flame-profile/id/${user._id}`
                                                        : `/flame-profile/userName/${user.userName}`
                                                }
                                                onMouseOver={() => setQNPLDD(true)}
                                                onMouseLeave={() => setQNPLDD(false)}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <img 
                                                    className="qnShortDisplayProfilePic" 
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
                                                    className="qnShortDisplayProfileEnergy" 
                                                    src={
                                                        user.unionName 
                                                            ? spectrumIcon(colorTheme)
                                                            : energyIcon(colorTheme)
                                                    } 
                                                    alt="" 
                                                />
                                                <span className="qnShortDisplayUserName">
                                                    {
                                                        user.isAnonymous 
                                                            ? user.unionName 
                                                                ? "Anonymous Union" 
                                                                : "Anonymous User" 
                                                            : user.profileName
                                                    }
                                                </span>
                                            </Link>
                                            <span className="qnShortDisplayDateTime">{format(question.createdAt)}</span>
                                            <span className="qnShortDisplayVisibilityIcon">
                                                <VisibilityIcon 
                                                    visible={question.access} 
                                                    primary={{fontSize: "18px"}}
                                                    secondary={{fontSize: "12px"}}
                                                />
                                            </span>
                                            <div 
                                                className="qnShortDisplayProfileinkDropdown" 
                                                style={qnPLDD ? {opacity: "100%"} : {opacity: "0%"}}
                                            >
                                                {user.unionName && <ProfileLinkBubble union={user} short/>}
                                                {user.userName && <ProfileLinkBubble user={user} short/>}
                                            </div>
                                        </div>
                                        <div className="qnShortDisplayTopRight">
                                            <MoreVert />
                                        </div>
                                    </div>
                                    <div className="qnShortDisplayCenter">
                                        <span className="qnShortDisplayTitle">{question.title}</span>
                                        <div 
                                            className="qnShortDisplayDescriptionPreview"
                                            style={
                                                question.description.length > 0 || 
                                                question.photos.length > 0 
                                                    ? { height: "100%", maxHeight: "80px", marginTop: "20px"} 
                                                    : {height: "0px"}
                                                }
                                        >
                                            {/*}
                                            <ShowMoreText
                                                lines={3}
                                                more="Show More"
                                                less="Show Less"
                                                className="content-css"
                                                anchorClass="my-anchor-css-class"
                                                expanded={false}
                                            >
                                                <span 
                                                    className="qnShortDisplayText" 
                                                    style={
                                                        question.description 
                                                            ? question.photos 
                                                                ? {width: "calc(100% - 120px"} 
                                                                : {width: "100%"} 
                                                            : {width: "0px"}
                                                    }
                                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.description)}}
                                                />
                                            </ShowMoreText>
                                                */}
                                            <div 
                                                className="qnShortDisplayDescription"
                                                style={
                                                    question.description 
                                                        ? question.photos 
                                                            ? {width: "calc(100% - 120px"} 
                                                            : {width: "100%"} 
                                                        : {width: "0px"}
                                                }
                                            >
                                                <div 
                                                    className="qnShortDisplayTextContainer"
                                                    style={textHide ? {minHeight: "55px", maxHeight: "55px"} : {minHeight: "82px", maxHeight: "82px"}}
                                                >
                                                    <div
                                                        className="qnShortDisplayText"
                                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.description)}} 
                                                        ref={textEl => {
                                                            if (done === true) return;
                                                            if (!textEl) return;
                                                            const handle = setInterval(() => {
                                                                if (textEl.getBoundingClientRect().height > 82) {
                                                                    setDone(true)
                                                                    setDescHeight(textEl.getBoundingClientRect().height)
                                                                    setTextHide(true)
                                                                    clearInterval(handle);
                                                                }
                                                            }, 50);
                                                        }}  
                                                    />
                                                </div>
                                                {textHide && <div className="qnShortDisplayShowMore">...  Show More</div>}
                                            </div>
                                            {question.photos.length > 0 &&
                                                <div className="qnShortDisplayPhotoContainer">
                                                    <img className="qnShortDisplayPhoto" src={PF + question.photos[0]} alt="" />
                                                    {question.photos.length > 1 && <div className={`qnShortDisplayPhotoCntBG POPUP_BACKGROUND ${colorTheme}`} />}
                                                    {question.photos.length > 1 && <div className="qnShortDisplayPhotCnt">{`${question.photos.length} Images`}</div>}
                                                </div>
                                            }
                                        </div>
                                        {question.hashtags.length > 0 &&
                                            <div className="qnShortDisplayHashtagList">
                                                {question.hashtags.map((hashtag, index) => (
                                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                                        <span 
                                                            key={index}
                                                            className={`qnShortDisplayhashtags ${colorTheme}`}
                                                        >
                                                            {hashtag}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="qnShortDisplayBottom" ref={qnDisplayRef}>
                                        <div className="qnShortDisplayBottomLeft left">
                                            <div className="qnShortDisplayCountItem views">
                                                <img 
                                                    className="qnShortDisplayPNGIcon left" 
                                                    src="/icons/interactions/seen.png" 
                                                    alt="" 
                                                    onMouseOver={() => setQNViewsDD(true)}
                                                    onMouseLeave={() => setQNViewsDD(false)}  
                                                />
                                                <span 
                                                    className="qnShortDisplayCounter left" 
                                                    ref={viewCntRef}
                                                >
                                                    {flameViews + unionViews}
                                                </span>
                                                <div 
                                                    className="qnShortDisplayViewsDropdown" 
                                                    style={qnViewsDD 
                                                        ? flameViews + unionViews === 0
                                                            ? {opacity: "0", right: "2000px"} 
                                                            : {opacity: "100%", right: `${viewsCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "2000px"}
                                                    }
                                                >
                                                    <ViewsBubble 
                                                        flameViews={question.flameViews} 
                                                        unionViews={question.unionViews} 
                                                        sp={scrollPosition} 
                                                    />
                                                </div>  
                                            </div>
                                            <div className="qnShortDisplayCountItem likes">
                                                <img 
                                                    className="qnShortDisplayPNGIcon left" 
                                                    src={`/icons/interactions/like${isFlameLiked || isUnionLiked ? "d" : ""}.png`} 
                                                    alt="" 
                                                    onClick={likeHandler} 
                                                    onMouseOver={() => setQNLikesDD(true)}
                                                    onMouseLeave={() => setQNLikesDD(false)} 
                                                />
                                                <span 
                                                    className="qnShortDisplayCounter left" 
                                                    ref={likeCntRef}
                                                >
                                                    {flameLikes + unionLikes}
                                                </span>
                                                <div 
                                                    className="qnShortDisplayLikesDropdown" 
                                                    style={qnLikesDD 
                                                        ? flameLikes + unionLikes === 0
                                                            ? {opacity: "0", right: "2000px"} 
                                                            : {opacity: "100%", right: `${likesCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "2000px"}
                                                    }
                                                >
                                                    <LikesBubble 
                                                        flameLikes={question.flameLikes}    
                                                        unionLikes={question.unionLikes} 
                                                        isFlameLiked={isFlameLiked} 
                                                        isUnionLiked={isUnionLiked}
                                                        show={true}
                                                        list={"qn"}
                                                        sp={scrollPosition}
                                                    />
                                                </div>
                                            </div>
                                            <div className="qnShortDisplayCountItem loves">
                                                <img 
                                                    className="qnShortDisplayPNGIcon left" 
                                                    src={`/icons/interactions/love${isFlameLoved || isUnionLoved ? "d" : ""}.png`} 
                                                    alt="" 
                                                    onClick={loveHandler}
                                                    onMouseOver={() => setQNLovesDD(true)}
                                                    onMouseLeave={() => setQNLovesDD(false)}
                                                />
                                                <span 
                                                    className="qnShortDisplayCounter left" 
                                                    ref={loveCntRef}
                                                >
                                                    {flameLoves + unionLoves}
                                                </span>
                                                <div 
                                                    className="qnShortDisplayLovesDropdown" 
                                                    style={qnLovesDD
                                                        ? flameLoves + unionLoves === 0
                                                            ? {opacity: "0", right: "2000px"} 
                                                            : {opacity: "100%", right: `${lovesCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "2000px"}
                                                    }
                                                >
                                                    <LovesBubble 
                                                        flameLoves={question.flameLoves} 
                                                        unionLoves={question.unionLoves} 
                                                        isFlameLoved={isFlameLoved} 
                                                        isUnionLoved={isUnionLoved}
                                                        list={"qn"}
                                                        sp={scrollPosition}   
                                                    />
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="qnShortDisplayBottomRight">
                                            <div className="qnShortDisplayCountItem">
                                                {user.unionName ?
                                                    (
                                                        <>
                                                            {colorTheme === "diamond" ?
                                                                (
                                                                    <>
                                                                        <img 
                                                                            className="qnShortDisplayPNGIcon right" 
                                                                            src="/icons/middlebar/qn-answer.png" 
                                                                            alt="" 
                                                                            onMouseOver={() => setQNAnswersDD(true)}
                                                                            onMouseLeave={() => setQNAnswersDD(false)}
                                                                        />
                                                                        <span className="qnShortDisplayCounter right" ref={answerCntRef}>{flameAnswers + unionAnswers}</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div 
                                                                            className="qnShortDisplaySVGIconDiv"
                                                                            onMouseOver={() => setQNAnswersDD(true)}
                                                                            onMouseLeave={() => setQNAnswersDD(false)}
                                                                        >
                                                                            <ChatBubbleIconSpectrum 
                                                                                spectrum={user.spectrum} 
                                                                                cn={"qnShortDisplaySVGIcon right"}  
                                                                                question
                                                                            />
                                                                            <span className="qnShortDisplayCounter right" ref={answerCntRef}>{flameAnswers + unionAnswers}</span>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            <QuestionAnswer 
                                                                className={`qnShortDisplaySVGIcon right ${colorTheme}`}
                                                                onMouseOver={() => setQNAnswersDD(true)}
                                                                onMouseLeave={() => setQNAnswersDD(false)}
                                                            />
                                                            <span className="qnShortDisplayCounter right" ref={answerCntRef}>{flameAnswers + unionAnswers}</span>
                                                        </>
                                                    )
                                                }
                                                <div 
                                                    className="qnShortDisplayAnswersDropdown" 
                                                    style={qnAnswersDD 
                                                        ? flameAnswers + unionAnswers === 0 
                                                            ? {opacity: "0", right: "4000px"} 
                                                            : {opacity: "100%", left: `${answersCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "4000px"}
                                                    }
                                                >
                                                    <AnswersBubble 
                                                        flameAnswers={question.flameAnswers} 
                                                        unionAnswers={question.unionAnswers} 
                                                        sp={scrollPosition}
                                                    />
                                                </div> 
                                            </div>
                                            <div className="qnShortDisplayCountItem">
                                                <img 
                                                    className="qnShortDisplayPNGIcon right" 
                                                    src={shareIcon(colorTheme)} 
                                                    alt="" 
                                                    onMouseOver={() => setQNSharesDD(true)}
                                                    onMouseLeave={() => setQNSharesDD(false)}   
                                                />
                                                <span className="qnShortDisplayCounter right" ref={shareCntRef}>{flameShares + unionShares}</span>
                                                <div 
                                                    className="qnShortDisplaySharesDropdown" 
                                                    style={qnSharesDD 
                                                        ? flameShares + unionShares === 0
                                                            ? {opacity: "0", right: "4000px"}
                                                            : {opacity: "100%", left: `${sharesCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "4000px"}
                                                    }
                                                >
                                                    <SharesBubble 
                                                        flameShares={question.flameShares} 
                                                        unionShares={question.unionShares} 
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

export default QNShortDisplay;