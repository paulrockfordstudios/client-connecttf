import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import "./QNFullDisplay.css";
import { MoreVert, QuestionAnswer } from "@material-ui/icons";
import { spectrumIcon, shareIcon } from "../../../../Utils/icons/icons";
import AnswerFeed from '../../../Answers/AnswerFeed/AnswerFeed';
import CreateAnswer from '../../../Answers/CreateAnswer/CreateAnswer';
import DOMPurify from 'dompurify';
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ProfileLinkBubble from '../../../InfoBubbles/ProfileLinkBubble/ProfileLinkBubble';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import AnswersBubble from '../../../InfoBubbles/AnswersBubble/AnswersBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import QNOptionsDropdown from '../../../Dropdowns/FlareDropdowns/QNOptionsDropdown/QNOptionsDropdown';
import CDPQuestion from '../../../ConfirmDeletePopups/CDPQuestion/CDPQuestion'
import EditQuestion from '../../EditQuestion/EditQuestion';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';


function QNFullDisplay({ question }) {

    const viewCntRef = useRef();
    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const shareCntRef = useRef();
    const answerCntRef = useRef();
    const qnDisplayRef = useRef();

    const { user: currentUser, deleteFlare, editFlare } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
    const [user, setUser] = useState({});
    const [ height, setHeight ] = useState();
    const [ clicked, setClicked ] = useState(0);
    const [ qnODD, setQNODD] = useState(false);
    const [ qnPLDD, setQNPLDD ] = useState(false);
    const [ qnViewsDD, setQNViewsDD ] = useState(false);
    const [ qnLikesDD, setQNLikesDD ] = useState(false);
    const [ qnLovesDD, setQNLovesDD ] = useState(false);
    const [ qnSharesDD, setQNSharesDD ] = useState(false);
    const [ qnAnswersDD, setQNAnswersDD ] = useState(false);
    const [ isFlameLiked, setIsFlameLiked ] = useState(false);
    const [ isUnionLiked, setIsUnionLiked ] = useState(false);
    const [ isFlameLoved, setIsFlameLoved ] = useState(false);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
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
    const [ AnswersCntWidth, setAnswersCntWidth ] = useState();
    const [ sharesCntWidth, setSharesCntWidth ] = useState();
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ deleteQN, setDeleteQN ] = useState(false);

    const colorTheme = user.unionName 
        ? user.spectrum
            ? user.spectrum
            : "gray" 
        : user.energy
            ? user.energy
            : "gray"

    useEffect(() => {
        setDeleteQN(deleteFlare);
    }, [deleteFlare]);
    
    useEffect(() => {
        var rect = qnDisplayRef.current.getBoundingClientRect();
        setScrollPosition(rect.top)
    }, []);

    useEffect(() => {
        setViewsCntWidth(`${viewCntRef.current.clientWidth + 65}px`);
        setLikesCntWidth(`${likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 110}px`);
        setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 155}px`);
        setSharesCntWidth(`${shareCntRef.current.clientWidth + 65}px`);
        setAnswersCntWidth(`${shareCntRef.current.clientWidth + answerCntRef.current.clientWidth + 112}px`);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const res = question.unionId 
            ? await axios.get(`/unions?unionId=${question.unionId}`)
            : await axios.get(`/users?userId=${question.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [question.userId, question.likes]);


    // Like/unlike qn
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(question.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(question.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = () => {
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

    // Love/unlove qn
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(question.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(question.flameLoves.includes(currentUser._id))
    }, [currentUser._id, ])

    const loveHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/qns/${question._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axios.put(`/qns/${question._id}/flameLove`, { userId: currentUser._id });
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
    
    return (
        <>
            <div className="qnFullDisplayContainer" style={{height: `${height}px`}}>               
                {colorTheme === "rainbow" || 
                 colorTheme === "silver" ||
                 colorTheme === "gold" ||
                 colorTheme === "platinum" ||
                 colorTheme === "diamond" 
                    ? <div 
                        className={`qnFullDisplayBackgroundTheme ${colorTheme}`} 
                        style={{
                        backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                        backgroundSize: "100%", 
                        backgroundRepeat: "repeat", 
                        height: `${height}px`}} 
                    />
                    : null
                }
                <div 
                    className={`qnFullDisplay union BOX_SHADOW ${colorTheme}`} 
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
                    <div className="qnFullDisplay-container">
                        <div className="qnFullDisplayTop">
                            <div className="qnFullDisplayTopLeft">
                                <Link 
                                    className="qnFullDisplayProfileLink" 
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
                                >
                                    <img 
                                        className="qnFullDisplayProfilePic" 
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
                                    <img className="qnFullDisplayProfileEnergy" src={spectrumIcon(user.spectrum)} alt="" />
                                    <span className="qnFullDisplayUserName">
                                        {
                                            user.isAnonymous 
                                                ? user.unionName 
                                                    ? "Anonymous Union" 
                                                    : "Anonymous User" 
                                                : user.profileName
                                        }
                                    </span>
                                </Link>
                                <span className="qnFullDisplayInfo">{format(question.createdAt)}</span>
                                <span className="qnFullDisplayInfo">/</span>
                                <span className="qnFullDisplayInfo">{`${question.feed} Question`}</span>
                                <span className="qnFullDisplayInfo">/</span>
                                <span className="qnFullDisplayInfo">{question.access}</span>
                                <span className="qnFullDisplayVisibilityIcon">
                                    <VisibilityIcon 
                                        visible={question.access} 
                                        primary={{fontSize: "18px"}}
                                        secondary={{fontSize: "12px"}}
                                    />
                                </span>
                                <div 
                                    className="qnFullDisplayProfileinkDropdown" 
                                    style={qnPLDD ? {opacity: "100%"} : {opacity: "0%"}}
                                >
                                    <ProfileLinkBubble union={user} Full/>
                                </div>
                            </div>
                            <div className="qnFullDisplayTopRight">
                                <MoreVert onClick={() => setQNODD(!qnODD)}/>
                                <div 
                                    className="qnFullDisplayQNODropdown" 
                                    style={qnODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}
                                >
                                    <QNOptionsDropdown user={user}/>
                                </div>
                            </div>
                        </div>
                        <div className="qnFullDisplayCenter">
                            <span className="qnFullDisplayTitle">{question.title}</span>
                            <span 
                                className="qnFullDisplayText" 
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.description)}} 
                            />
                            <div className="photoFullDisplay-container">
                                <ul className="photoList">      
                                    {question.photos.map((photo, index) => (
                                        <li className="photos" key={index}>
                                            {console.log(PF + photo)}
                                            <img className="qnImg" src={PF + photo} alt="" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="qnFullDisplayHashtagList">
                                {question.hashtags.map((hashtag, index) => (
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
                        <div className="qnFullDisplayBottom" ref={qnDisplayRef}>
                            <div className="qnFullDisplayBottomLeft">
                                <div className="qnFullDisplayCountItem views">
                                    <img 
                                        className="qnFullDisplayPNGIcon left" 
                                        src="/icons/interactions/seen.png" alt="" 
                                        onMouseOver={() => setQNViewsDD(true)}
                                        onMouseLeave={() => setQNViewsDD(false)}  
                                    />
                                    <span 
                                        className="qnFullDisplayCounter left" 
                                        ref={viewCntRef}
                                    >
                                        {flameViews + unionViews}
                                    </span>
                                    <div 
                                        className="qnFullDisplayViewsDropdown" 
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
                                <div className="qnFullDisplayCountItem likes">
                                    <img 
                                        className="qnFullDisplayPNGIcon left" 
                                        src={`/icons/interactions/like${isFlameLiked || isUnionLiked ? "d" : ""}.png`}  
                                        alt="" 
                                        onClick={likeHandler} 
                                        onMouseOver={() => setQNLikesDD(true)}
                                        onMouseLeave={() => setQNLikesDD(false)} 
                                    />
                                    <span 
                                        className="qnFullDisplayCounter left" 
                                        ref={likeCntRef}
                                    >
                                        {flameLikes + unionLikes}
                                    </span>
                                    <div 
                                        className="qnFullDisplayLikesDropdown" 
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
                                <div className="qnFullDisplayCountItem loves">
                                    <img 
                                        className="qnFullDisplayPNGIcon left" 
                                        src={`/icons/interactions/love${isFlameLoved || isUnionLoved ? "d" : ""}.png`}  
                                        alt="" 
                                        onClick={loveHandler}
                                        onMouseOver={() => setQNLovesDD(true)}
                                        onMouseLeave={() => setQNLovesDD(false)}
                                    />
                                    <span 
                                        className="qnFullDisplayCounter left" 
                                        ref={loveCntRef}
                                    >
                                        {flameLoves + unionLoves}
                                    </span>
                                    <div 
                                        className="qnFullDisplayLovesDropdown" 
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
                            <div className="qnFullDisplayBottomRight">
                                <div className="qnFullDisplayCountItem answers">
                                    {user.unionName ?
                                        (
                                            <>
                                                {colorTheme === "diamond" ?
                                                    (
                                                        <>
                                                            <img 
                                                                className="qnFullDisplayPNGIcon right" 
                                                                src="/icons/middlebar/chat-bubble.png" 
                                                                alt="" 
                                                                onMouseOver={() => setQNAnswersDD(true)}
                                                                onMouseLeave={() => setQNAnswersDD(false)}
                                                            />
                                                            <span 
                                                                className="qnFullDisplayCounter right" 
                                                                ref={answerCntRef}
                                                            >
                                                                {flameAnswers + unionAnswers}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div 
                                                                className="qnFullDisplaySVGIconDiv"
                                                                onMouseOver={() => setQNAnswersDD(true)}
                                                                onMouseLeave={() => setQNAnswersDD(false)}
                                                            >
                                                                <ChatBubbleIconSpectrum 
                                                                    spectrum={colorTheme} 
                                                                    cn={"qnFullDisplaySVGIcon right"} 
                                                                    question 
                                                                />
                                                                <span 
                                                                    className="qnFullDisplayCounter right" 
                                                                    ref={answerCntRef}
                                                                >
                                                                    {flameAnswers + unionAnswers}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )
                                                } 
                                            </>
                                        ):(
                                            <>
                                               <QuestionAnswer
                                                    className={`qnFullDisplaySVGIcon right ${colorTheme}`}
                                                    onMouseOver={() => setQNAnswersDD(true)}
                                                    onMouseLeave={() => setQNAnswersDD(false)}
                                                />
                                                <span 
                                                    className="qnFullDisplayCounter right" 
                                                    ref={answerCntRef}
                                                >
                                                    {flameAnswers + unionAnswers}
                                                </span> 
                                            </>
                                        ) 
                                    } 
                                    <div 
                                        className="qnFullDisplayAnswersDropdown" 
                                        style={qnAnswersDD 
                                            ? flameAnswers + unionAnswers === 0 
                                                ? {opacity: "0", right: "4000px"} 
                                                : {opacity: "100%", left: `${AnswersCntWidth}`, top: "0px"} 
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
                                <div className="qnFullDisplayCountItem shares">
                                    <img 
                                        className="qnFullDisplayPNGIcon right" 
                                        src={shareIcon(colorTheme)} 
                                        alt="" 
                                        onMouseOver={() => setQNSharesDD(true)}
                                        onMouseLeave={() => setQNSharesDD(false)}   
                                    />
                                    <span 
                                        className="qnFullDisplayCounter right" 
                                        ref={shareCntRef}
                                    >
                                        {flameShares + unionShares}
                                    </span>
                                    <div 
                                        className="qnFullDisplaySharesDropdown" 
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
                        {colorTheme === "diamond" 
                            ? <img className="qnFullDisplayHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                            : <hr className={`qnFullDisplayHr ${colorTheme}`} />
                        }
                    </div> 
                    <div className="qnFullDisplayResponseFeed">
                        <CreateAnswer />
                        <AnswerFeed />
                    </div>
                </div>
            </div>            
            {editFlare && <EditQuestion qn={question} />}
            {deleteQN &&
                <div className="POPUP_SCREEN" >
                    <div 
                        style={
                            colorTheme === "diamond" 
                                ? {backgroundImage: "url(/misc/diamond-background.jpg)"} 
                                : {}
                        }
                        className={
                            `POPUP_BACKGROUND 
                            ${colorTheme}`
                        }
                    />
                    <div className="cdpQuestionScreenContainer">
                        <CDPQuestion qn={question}/>
                    </div>
                </div>
            }
        </>
    )
};

export default QNFullDisplay;