import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from 'dompurify';
import ShowMoreText from "react-show-more-text";
import { format } from "timeago.js";
import "./AnswerDisplay.css";
import { MoreVert, Reply } from "@material-ui/icons";
import { energyIcon, spectrumIcon } from "../../../Utils/icons/icons";
import ReplyIconSpectrum from '../../../Utils/misc/ReplyIconSpectrum';
import LikesBubble from '../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../InfoBubbles/LovesBubble/LovesBubble';
import RepliesBubble from '../../InfoBubbles/RepliesBubble/RepliesBubble';
import ReplyFeed from '../../Replies/ReplyFeed/ReplyFeed';
import CreateReply from '../../Replies/CreateReply/CreateReply';
import AOptionsDropdown from '../../Dropdowns/FlareDropdowns/AOptionsDropdown/AOptionsDropdown';




function AnswerDisplay({answer}) {

    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const replyCntRef = useRef();
    const aDisplayRef = useRef();
    const discRef = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ aODD, setAODD ] = useState(false);
    const [ aLikesDD, setALikesDD ] = useState(false);
    const [ aLovesDD, setALovesDD ] = useState(false);
    const [ aRepliesDD, setARepliesDD ] = useState(false);
    const [ flameReplies, setFlameReplies ] = useState(answer.flameReplies.length);
    const [ unionReplies, setUnionReplies ] = useState(answer.unionReplies.length);
    const [ flameLikes, setFlameLikes ] = useState(answer.flameLikes.length);
    const [ isFlameLiked, setIsFlameLiked ] = useState(false)
    const [ unionLikes, setUnionLikes ] = useState(answer.unionLikes.length);
    const [ isUnionLiked, setIsUnionLiked ] = useState(false);
    const [ flameLoves, setFlameLoves ] = useState(answer.flameLoves.length);
    const [ isFlameLoved, setIsFlameLoved ] = useState(false)
    const [ unionLoves, setUnionLoves ] = useState(answer.unionLoves.length);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
    const [user, setUser] = useState({});
    const [ likesCntWidth, setLikesCntWidth ] = useState();
    const [ lovesCntWidth, setLovesCntWidth ] = useState();
    const [ repliesCntWidth, setRepliesCntWidth ] = useState();
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ replyCreate, setReplyCreate ] = useState(false);
    const [ showReplies, setShowReplies ] = useState(false);
    const [ discHeight, setDiscHeight ] = useState(0);
    const [ hidden, setHidden ] = useState(false);
    const [ newDesc, setNewDesc ] = useState();
    const [ done, setDone ] = useState(false);

    /*
    useEffect(() => {
        var rect = aDisplayRef.current.getBoundingClientRect();
        setScrollPosition(rect.top)
    }, []);
    */

    useEffect(() => {
        const fetchUser = async () => {
            const res = answer.union 
            ? await axios.get(`/unions?unionId=${answer.unionId}`)
            : await axios.get(`/users?userId=${answer.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [answer.userId]);

    useEffect(() => {
        const descString = JSON.stringify(answer.description);
        const descFix = descString.replace("<p><br></p>", "");
        const descParse = JSON.parse(descFix);
        setNewDesc(descParse);
    }, [])

    /*
    useEffect(() => {
        const getDiscHeight = () => {
            
                if (discRef.current.clientHeight > 60) {
                    setHidden(true);
                }
                setDiscHeight(discRef.current.clientHeight)
            }
        
        getDiscHeight();
    }, [discRef]);
    */
    
    
    console.log(discHeight)
    
    useEffect(() => {
        setLikesCntWidth(`${likeCntRef.current.clientWidth + 74}px`);
        setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + 117}px`);
        setRepliesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + replyCntRef.current.clientWidth + 165}px`);
    }, []);
    

    // Like/unlike answer
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(answer.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(answer.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/answers/${answer._id}/unionLike`, { unionId: currentUser._id });
                setUnionLikes(isUnionLiked ? unionLikes - 1 : unionLikes + 1);
                setIsUnionLiked(!isUnionLiked);
            } else {
                axios.put(`/answers/${answer._id}/flameLike`, { userId: currentUser._id });
                setFlameLikes(isFlameLiked ? flameLikes - 1 : flameLikes + 1);
                setIsFlameLiked(!isFlameLiked);
            }
        } catch(err) {}         
    };

    // Love/unlove answer
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(answer.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(answer.flameLoves.includes(currentUser._id))
    }, [currentUser._id, ])

    const loveHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axios.put(`/answers/${answer._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axios.put(`/answers/${answer._id}/flameLove`, { userId: currentUser._id });
                setFlameLoves(isFlameLoved ? flameLoves - 1 : flameLoves + 1);
                setIsFlameLoved(!isFlameLoved);
            }
        } catch(err) {}
    };

    console.log(answer.description)

    useEffect(() => {
        if (aLikesDD || aLovesDD || aRepliesDD) {
            var rect = aDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
      }, [aLikesDD, aLovesDD, aRepliesDD]);

    
    return (
        <div className="answerDisplay">
                <div className="answerDisplay-container">
                    <div className="answerDisplayTop">
                        <div className="answerDisplayTopLeft">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <Link  className="answerDisplayProfileLink"  style={{backgroundImage: "url(/misc/diamond-sparkle-light.jpg)"}} to={`/union-profile/${user.unionName}`}>
                                                        <img className="answerDisplayProfilePic" src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                        <img className="answerDisplayProfileEnergy" src={spectrumIcon(user.spectrum)} alt="" />
                                                        <span className="answerDisplayUserName">{user.profileName}</span>
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Link className={`answerDisplayProfileLink ${user.spectrum}`} to={`/union-profile/${user.unionName}`}>
                                                        <img className="answerDisplayProfilePic" src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                        <img className="answerDisplayProfileEnergy" src={spectrumIcon(user.spectrum)} alt="" />
                                                        <span className="answerDisplayUserName">{user.profileName}</span>
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Link className={`answerDisplayProfileLink ${user.energy}`} to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.userName}`}>
                                            <img className="answerDisplayProfilePic" src={user.isAnonymous ? "/picBlanks/no-avatar.jpg" : user.profilePicture ? user.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                            <img className="answerDisplayProfileEnergy" src={energyIcon(user.energy)} alt="" />
                                            <span className="answerDisplayUserName">{user.isAnonymous ? "Anonymous User" : user.profileName}</span>
                                        </Link>
                                    </>
                                )
                            }
                            <span className="answerDisplayDateTime">{format(answer.createdAt)}</span>
                        </div>
                        <div className="answerDisplayTopRight">
                            <MoreVert className="answerDisplayOptions" onClick={() => setAODD(!aODD)}/>
                            <div className="answerDisplayAODropdown" style={aODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}>
                                <AOptionsDropdown user={user} />
                            </div>
                        </div>
                    </div>
                    <div className="answerDisplayCenter">
                        {/*<TextEditor value={answer.description} onChange={null} focusRef={null} readOnly={true} />*/}
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
                                id="descText" 
                                className={hidden ? "answerDisplayText hidden" : "answerDisplayText"} 
                                ref={discRef} 
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(newDesc)}} 
                            />
                        </ShowMoreText>
                        */}
                        
                        <span 
                                id="descText" 
                                className={hidden ? "answerDisplayText hidden" : "answerDisplayText"} 
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(newDesc)}}
                                ref={el => {
                                    if (done === true) return;
                                    if (!el) return;
                                    let prevValue = JSON.stringify(el.getBoundingClientRect());
                                    const handle = setInterval(() => {
                                        let nextValue = JSON.stringify(el.getBoundingClientRect());
                                        if (el.getBoundingClientRect().height > 60) {
                                            setDone(true)
                                            setDiscHeight(el.getBoundingClientRect().height)
                                            setHidden(true)
                                            clearInterval(handle);
                                        }
                                    }, 50);
                                }} 
                            />
                        {discHeight > 60 && done && <span className="answerDisplyTextBtn" onClick={() => setHidden(!hidden)}>{hidden ? "... Read More" : "... Show Less"}</span>}
                        
                        <ul className={`answerDisplayHashtags ${user.unionName ? user.spectrum : user.energy}`}>
                            {answer.hashtags.map((hashtag, index) => (
                                <li key={index} className="answerDisplayHashtag">
                                    {hashtag}
                                </li>
                            ))}
                        </ul>
                        <div className="photoDisplay-container">
                            <ul className="photoList">      
                                {answer.photos.map((photo, index) => (
                                    <li className="photos" key={index}>
                                        {console.log(PF + photo)}
                                        <img className="postImg" src={PF + photo} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="answerDisplayBottom" >
                        <div className="answerDisplayBottomLeft" ref={aDisplayRef}>

                            <div className="answerDisplayCountItem">
                                <img 
                                    className="answerDisplayPNGIcon left" 
                                    src={`/icons/interactions/like${isFlameLiked || isUnionLiked ? "d" : ""}.png`}  
                                    alt="" 
                                    onClick={likeHandler} 
                                    onMouseOver={() => setALikesDD(true)}
                                    onMouseLeave={() => setALikesDD(false)} 
                                />
                                <span className="answerDisplayCounter left" ref={likeCntRef}>{flameLikes + unionLikes}</span>
                                <div 
                                    className="answerDisplayLikesDropdown" 
                                    style={aLikesDD 
                                        ? flameLikes + unionLikes === 0
                                            ? {opacity: "0", right: "2000px"}
                                            : {opacity: "100%", right: `${likesCntWidth}`, top: "0px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <LikesBubble
                                        flameLikes={answer.flameLikes} 
                                        unionLikes={answer.unionLikes} 
                                        isFlameLiked={isFlameLiked} 
                                        isUnionLiked={isUnionLiked}
                                        show={true}
                                        list={"answer"}
                                        sp={scrollPosition}
                                    />
                                </div>
                            </div>

                            <div className="answerDisplayCountItem">
                                <img 
                                    className="answerDisplayPNGIcon left" 
                                    src={`/icons/interactions/love${isFlameLoved || isUnionLoved ? "d" : ""}.png`}  
                                    alt="" 
                                    onClick={loveHandler}
                                    onMouseOver={() => setALovesDD(true)}
                                    onMouseLeave={() => setALovesDD(false)}
                                />
                                <span className="answerDisplayCounter left" ref={loveCntRef}>{flameLoves + unionLoves}</span>
                                <div 
                                    className="answerDisplayLovesDropdown" 
                                    style={aLovesDD 
                                        ? flameLoves + unionLoves === 0 
                                            ? {opacity: "0", right: "2000px"}
                                            : {opacity: "100%", right: `${lovesCntWidth}`, top: "0px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <LovesBubble
                                        flameLoves={answer.flameLoves} 
                                        unionLoves={answer.unionLoves} 
                                        isFlameLoved={isFlameLoved} 
                                        isUnionLoved={isUnionLoved}
                                        list={"answer"}
                                        sp={scrollPosition}   
                                    />
                                </div> 
                            </div>

                            <div className="answerDisplayCountItem">
                                {user.unionName ?
                                    (
                                        <>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img 
                                                            className="answerDisplayPNGIcon left" 
                                                            src="/icons/middlebar/reply.png" 
                                                            alt="" 
                                                            onMouseOver={() => setARepliesDD(true)}
                                                            onMouseLeave={() => setARepliesDD(false)}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div 
                                                            className="answerDisplaySVGIconDiv"
                                                            onMouseOver={() => setARepliesDD(true)}
                                                            onMouseLeave={() => setARepliesDD(false)}
                                                        >
                                                            <ReplyIconSpectrum spectrum={user.spectrum} cn={"answerDisplaySVGIcon left"}/>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <Reply 
                                                className={`answerDisplaySVGIcon left ${user.energy}`}
                                                onMouseOver={() => setARepliesDD(true)}
                                                onMouseLeave={() => setARepliesDD(false)}
                                            />
                                        </>
                                    )
                                }
                                <span className="answerDisplayCounter left" ref={replyCntRef}>{flameReplies + unionReplies}</span>
                                <div 
                                    className="answerDisplayRepliesDropdown" 
                                    style={aRepliesDD 
                                        ? flameReplies + unionReplies === 0 
                                            ? {opacity: "0", right: "2000px"} 
                                            : {opacity: "100%", right: `${repliesCntWidth}`, top: "2px"} 
                                        : {opacity: "0", right: "2000px"}
                                    }
                                >
                                    <RepliesBubble
                                        flameReplies={answer.flameReplies} 
                                        unionReplies={answer.unionReplies} 
                                        list={"answer"}
                                        sp={scrollPosition}   
                                    />
                                </div> 
                            </div>

                        </div>
                        <div className="answerDisplayBottomRight">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img 
                                                        className="answerDisplayPNGIcon right" 
                                                        src="/icons/middlebar/reply.png" 
                                                        alt=""
                                                        onClick={() => setReplyCreate(!replyCreate)} 
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <ReplyIconSpectrum 
                                                        spectrum={user.spectrum} 
                                                        cn={"answerDisplaySVGIcon right"}
                                                        onClick={() => setReplyCreate(!replyCreate)}  
                                                    />
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Reply 
                                            className={`answerDisplaySVGIcon right ${user.energy}`}
                                            onClick={() => setReplyCreate(!replyCreate)}   
                                        />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="answerDisplayResponseFeed">
                    <ReplyFeed prompt={"answer"} promptId={answer._id} rCntNum={1}/>
                    {replyCreate && <CreateReply prompt={"answer"} promptId={answer._id} rCntNum={1}/>}
                </div>
        </div>
    )
};

export default AnswerDisplay;