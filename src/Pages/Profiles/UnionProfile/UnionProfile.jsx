import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { pAEOpen, pBEOpen } from "../../../Redux/AuthSlice";
import { useParams } from "react-router";
import axios from "axios";
import PostFeed from '../../../Components/Posts/PostFeed/PostFeed';
import Sidebar from '../../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../../Components/PageBars/TopBar/TopBar';
import Story from '../../../Components/Story/Story';
import AboutUnion from '../../../Components/About/AboutUnion/AboutUnion';
import QuestionFeed from '../../../Components/Questions/QuestionFeed/QuestionFeed';
import ProfileFollowBtns from '../../../Components/FollowButtons/ProfileFollowBtns/ProfileFollowBtns';
import "./UnionProfile.css";
import { MoreHoriz, Person, Check, Mail, AccountBoxOutlined, WallpaperOutlined, AddAPhoto } from "@material-ui/icons";
import { stringHereFor, btnsColorByEnergy } from "../../../Utils/misc/misc";
import { 
    energyIcon,
    chargeIcon,
    zodiacIcon,
    sexIcon,
    compassIcon,
    orientationIcon
 } from "../../../Utils/icons/icons";
import CreatePost from '../../../Components/Posts/CreatePost/CreatePost';
import CreateQuestion from '../../../Components/Questions/CreateQuestion/CreateQuestion';
import BackgroundEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/BackgroundEditorDropdown/BackgroundEditorDropdown';
import AvatarEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/AvatarEditorDropdown/AvatarEditorDropdown';
import AvatarEditor from '../../../Components/Editors/AvatarEditor/AvatarEditor';
import CDPAvatar from '../../../Components/ConfirmDeletePopups/CDPAvatar/CDPAvatar';
import BackgroundPicEditor from '../../../Components/Editors/BackgroundPicEditor/BackgroundPicEditor';
import CDPBackground from '../../../Components/ConfirmDeletePopups/CDPBackground/CDPBackground';





function UnionProfile() {

    const { unionName } = useParams();
    const { pathName } = useLocation();

    const dispatch = useDispatch();
    
    const { user: currentUser, flame: currentFlame, cPost, cQN, pAEditor, pBEditor, cdpAvatar, cdpBackground } = useSelector((state) => state.auth);
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ union, setUnion ] = useState({});
    const [ masculineUser, setMasculineUser ] = useState({});
    const [ feminineUser, setFeminineUser ] = useState({});


    const [ twinFlame, setTwinFlame ] = useState();
    
    const [active, setActive] = useState("story");
    const [followers, setFollowers] =useState();
    const [following, setFollowing] =useState();
    const [subscribers, setSubscribers] =useState();
    const [subscribing, setSubscribing] =useState();
    const [ height, setHeight ] = useState();
    const [profileDisplay, setProfileDisplay] = useState(<Story />);
    const [ createPost, setCreatePost ] = useState(false);
    const [ createQN, setCreateQN ] = useState(false);
    //const [ editPPU, setEditPPU ] = useState(false);
    //const [ editPPM, setEditPPM ] = useState(false);
    //const [ editPPF, setEditPPF ] = useState(false);
    const [ editAvatar, setEditAvatar ] = useState(false);
    const [ avatarCDP, setAvatarCDP ] = useState(false);
    const [ backgroundCDP, setBackgroundCDP ] = useState(false);
    const [ editBackgroundPic, setEditBackgroundPic ] = useState(false);
    const [ editPPHover, setEditPPHover ] = useState(false);
    const [ editPPActive, setEditPPActive ] = useState(false);
    const [ editBPHover, setEditBPHover ] = useState(false);
    const [ editBPActive, setEditBPActive ] = useState(false);

    useEffect(() => {
        setCreatePost(cPost)
    }, [cPost]);

    useEffect(() => {
        setCreateQN(cQN)
    }, [cQN]);

    useEffect(() => {
        setEditAvatar(pAEditor)
    }, [pAEditor]);

    useEffect(() => {
        setAvatarCDP(cdpAvatar)
    }, [cdpAvatar]);

    useEffect(() => {
        setEditBackgroundPic(pBEditor)
    }, [pBEditor]);

    useEffect(() => {
        setBackgroundCDP(cdpBackground)
    }, [cdpBackground]);

   
    // Get union
    useEffect(() => {
        const fetchUnion = async () => {
            const res = await axios.get(`/unions?unionName=${unionName}`);
            console.log(res)
            setUnion(res.data);
            console.log(union)

        }
        fetchUnion();
    }, [unionName]);

    

    // Get masculine user
    useEffect(() => {
        if(union) {
            const getMasculineUser = async () => {
                try {
                    const res = await axios.get(`/users?userId=${union.masculineId}`);
                    setMasculineUser(res.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getMasculineUser();
        }
    }, [union.masculineId]);



    // Get feminine user
    useEffect(() => {
        if(union) {
            const getFeminineUser = async () => {
                try {
                    const res = await axios.get(`/users?userId=${union.feminineId}`);
                    setFeminineUser(res.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getFeminineUser();
        }
    }, [union.feminineId]);


    useEffect(() => {
        if(union) {
            const connectNumbers = async () => {
                try {
                    setFollowers(union.flameFollowers.length + union.unionFollowers.length);
                    setFollowing(union.flameFollowing.length + union.unionFollowing.length);
                    setSubscribers(union.flameSubscribers.length + union.unionSubscribers.length);
                    setSubscribing(union.flameSubscribing.length + union.unionSubscribing.length);
                } catch(err) {
                    console.log(err)
                }
            }
            connectNumbers();
        }
    }, [union]);



    

    useEffect(() => {
        switch (active) {
            case "story":
                setProfileDisplay(<Story />);
                break;
            case "about":
                setProfileDisplay(<AboutUnion />);
                break;
            case "posts":
                setProfileDisplay(<PostFeed dc={union.spectrum} id={union._id}/>);
                break;
            case "questions":
                setProfileDisplay(<QuestionFeed dc={union.spectrum} id={union._id}/>);
                break;
            case "answers":
                setProfileDisplay("");
                break;
            case "blogs":
                setProfileDisplay("");
                break;
            default:
                setProfileDisplay(<Story />);
        }
    }, [active]);

    const avatarEditorHandler = () => {
        dispatch(pAEOpen());
    }

    const backgroundPicEditorHandler = () => {
        dispatch(pBEOpen());
    }
   
    
    return (
        <>
        <div className="unionProfile">
            <div className="unionProfile-container">
                <div className="unionProfileRight">
                    <div className="unionProfileRightTop">
                        <div className="unionProfileContainer" >
                            {union.spectrum === "rainbow" && <div className={`unionProfileBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            {union.spectrum === "silver" && <div className={`unionProfileBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            {union.spectrum === "gold" && <div className={`unionProfileBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            {union.spectrum === "platinum" && <div className={`unionProfileBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            {union.spectrum === "diamond" && <div className={`unionProfileBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            <div className={`unionProfileDisplay-container union BOX_SHADOW ${union.spectrum}`} 
                                    
                                ref={el => {
                                    if (!el) return;
                                        /*console.log("initial height", el.getBoundingClientRect().height);*/
                                        let prevValue = JSON.stringify(el.getBoundingClientRect());
                                        const start = Date.now();
                                        const handle = setInterval(() => {
                                        let nextValue = JSON.stringify(el.getBoundingClientRect());
                                        if (nextValue === prevValue) {
                                            clearInterval(handle);
                                            /*console.log(
                                            `height stopped changing in ${Date.now() - start}ms. final height:`,
                                            el.getBoundingClientRect().height
                                            );*/
                                            setHeight(el.getBoundingClientRect().height)
                                        } else {
                                            prevValue = nextValue;
                                        }
                                        }, 1000);
                                    }} 
                                        
                            >
                                {union.unionName === currentUser.unionName ?
                                (
                                    <> 
                                        {editBPHover || editBPActive 
                                            ? <div 
                                                className={`profileBackgroundImgBackgroundLayer ${currentUser.spectrum}`}
                                                style={union.spectrum === "diamond" ? {backgroundImage: "url(/misc/diamond-background.jpg)", opacity: "30%"} : null}
                                            /> 
                                            : null
                                        }
                                        <img 
                                            className={
                                                `profileBackgroundImg
                                                ${editBPHover || editBPActive ? "edit" : ""}`
                                            } 
                                            src={union.isAnonymous 
                                                ? "/picBlanks/no-banner.jpg" 
                                                : union.backgroundPicture 
                                                    ?  union.backgroundPicture 
                                                    : "/picBlanks/no-banner.jpg"
                                            } 
                                            alt="" 
                                        />
                                        {editBPHover || editBPActive ? <WallpaperOutlined className={`profileFlameBackgroundImgEdit ${currentUser.spectrum}`} onClick={backgroundPicEditorHandler}/> : null }
                                        <div 
                                            className="profilePhotoEditorBtn background" 
                                            onMouseEnter={editPPActive ? null : () => setEditBPHover(true)} 
                                            onMouseLeave={() => setEditBPHover(false)}
                                            onClick={editPPActive ? null : () => setEditBPActive(!editBPActive)}
                                        >
                                            <AddAPhoto className="profilePhotoEditorIcon"/>                        
                                        </div>
                                        {editBPActive &&
                                            <div className="profileBackgroundEditorDropdown">
                                                <BackgroundEditorDropdown setEditBPActive={setEditBPActive}/>
                                            </div>
                                        }
                                        {editPPHover || editPPActive ?
                                            (
                                                <>
                                                    <div className={`profileImgBackgroundLayer primary ${union.spectrum}`}/>  
                                                    {union.spectrum === "diamond" && <div 
                                                        className={`profileImgBackgroundLayer primary ${union.spectrum}`}
                                                        style={{backgroundImage: "url(/misc/diamond-background.jpg)", opacity: "30%"}}
                                                    />}
                                                </>
                                            ) : null}
                                        <img 
                                            className={editPPHover || editPPActive ? "profileImg edit primary" : "profileImg primary"} 
                                            src={union.isAnonymous 
                                                ? "/picBlanks/no-union-avatar.jpg" 
                                                : union.unionProfilePicture 
                                                    ? union.unionProfilePicture 
                                                    : "/picBlanks/no-union-avatar.jpg"
                                            } 
                                            alt="" 
                                        />
                                        {editPPHover || editPPActive ? <AccountBoxOutlined className={`profileImgEdit ${currentUser.spectrum}`} /> : null}
                                        <div 
                                            className="profilePhotoEditorBtn avatar" 
                                            onMouseEnter={editBPActive ? null : () => setEditPPHover(true)} 
                                            onMouseLeave={() => setEditPPHover(false)}
                                            onClick={editBPActive ? null : () => setEditPPActive(!editPPActive)}
                                        >
                                            <AddAPhoto className="profilePhotoEditorIcon"/>            
                                        </div>
                                        
                                    </>
                                ) : (
                                    <>
                                        <img 
                                            className="profileBackgroundImg"
                                            src={union.isAnonymous 
                                                ? "/picBlanks/no-banner.jpg" 
                                                : union.backgroundPicture 
                                                    ?  union.backgroundPicture 
                                                    : "/picBlanks/no-banner.jpg"
                                            } 
                                            alt="" 
                                        />
                                        <img 
                                            className="profileImg primary" 
                                            src={union.isAnonymous
                                                ? "/picBlanks/no-union-avatar.jpg" 
                                                : union.unionProfilePicture 
                                                    ? union.unionProfilePicture 
                                                    : "/picBlanks/no-union-avatar.jpg"
                                            } 
                                            alt=""
                                        />
                                    </>
                                )
                            }
                                            <img 
                                                className="masculineProfileImg" 
                                                src={masculineUser.isAnonymous 
                                                    ? "/picBlanks/no-avatar.jpg" 
                                                    : masculineUser.profilePicture 
                                                        ? masculineUser.profilePicture 
                                                        : "/picBlanks/no-avatar.jpg"
                                                } 
                                                alt="" 
                                            />
                                            <img 
                                                className="feminineProfileImg" 
                                                src={feminineUser.isAnonymous 
                                                        ? "/picBlanks/no-avatar.jpg" 
                                                        : feminineUser.profilePicture 
                                                            ? feminineUser.profilePicture 
                                                            : "/picBlanks/no-avatar.jpg"
                                                } 
                                                alt="" 
                                            />
                                            {editPPActive &&
                                            <div className="profileAvatarEditorDropdown">
                                                <AvatarEditorDropdown setEditPPActive={setEditPPActive}/>
                                            </div>
                                        }
                                        {currentUser?.flameFollowing.includes(union?._id) || currentUser?.unionFollowing.includes(union?._id) ?
                                            (
                                                <div className="profileNavigation union">
                                                    <div className="profileNavLeft">
                                                        <button 
                                                            className={active === "story" 
                                                                ? `userProfileBtn-active story ${union.spectrum}` 
                                                                : `userProfileBtn story ${union.spectrum}`
                                                            } 
                                                            style={union.spectrum === "diamond" 
                                                                ? active === "story" 
                                                                    ? {background: "white"} 
                                                                    : {backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover"} 
                                                                : {}
                                                            }
                                                            onClick={() => setActive("story")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Story</span>
                                                                : "Story"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "about" 
                                                                ? `userProfileBtn-active about ${union.spectrum}` 
                                                                : `userProfileBtn about ${union.spectrum}`
                                                            } 
                                                            style={union.spectrum === "diamond" 
                                                                ? active === "about" 
                                                                    ? {background: "white"} 
                                                                    : {backgroundImage: "url(/misc/diamond-btn2.jpg)", backgroundSize: "cover"} 
                                                                : {}
                                                            }
                                                            onClick={() => setActive("about")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">About</span>
                                                                : "About"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "posts" 
                                                                ? `userProfileBtn-active posts ${union.spectrum}` 
                                                                : `userProfileBtn posts ${union.spectrum}`
                                                            } 
                                                            style={union.spectrum === "diamond" 
                                                                ? active === "posts" 
                                                                    ? {background: "white"} 
                                                                    : {backgroundImage: "url(/misc/diamond-btn3.jpg)", backgroundSize: "cover"} 
                                                                : {}
                                                            }
                                                            onClick={() => setActive("posts")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Posts</span>
                                                                : "Posts"
                                                            }
                                                        </button>
                                                    </div>
                                                    <div className="profileNavRight">
                                                        <button 
                                                            className={active === "questions" 
                                                                ? `userProfileBtn-active questions ${union.spectrum}` 
                                                                : `userProfileBtn questions ${union.spectrum}`
                                                            } 
                                                            style={union.spectrum === "diamond" 
                                                                ? active === "questions" 
                                                                    ? {background: "white"} 
                                                                    : {backgroundImage: "url(/misc/diamond-btn4.jpg)", backgroundSize: "cover"} 
                                                                : {}
                                                            }
                                                            onClick={() => setActive("questions")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Questions</span>
                                                                : "Questions"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "answers" 
                                                                ? `userProfileBtn-active answers ${union.spectrum}` 
                                                                : `userProfileBtn answers ${union.spectrum}`
                                                            } 
                                                            style={union.spectrum === "diamond" 
                                                                ? active === "answers" 
                                                                    ? {background: "white"} 
                                                                    : {backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"} 
                                                                : {}
                                                            }
                                                            onClick={() => setActive("answers")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Answers</span>
                                                                : "Answers"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "blogs" 
                                                                ? `userProfileBtn-active blogs ${union.spectrum}` 
                                                                : `userProfileBtn blogs ${union.spectrum}`
                                                            } 
                                                            style={union.spectrum === "diamond" 
                                                                ? active === "blogs" 
                                                                    ? {background: "white"} 
                                                                    : {backgroundImage: "url(/misc/diamond-btn6.jpg)", backgroundSize: "cover"} 
                                                                : {}
                                                            }
                                                            onClick={() => setActive("blogs")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Blogs</span>
                                                                : "Blogs"
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                            {union.isPrivate || editPPActive || editBPActive ?
                                                (
                                                    <>
                                                        <div className="profileNavigation union">
                                                            <div className="profileNavLeft">
                                                                <button 
                                                                    className={`userProfileBtn private story ${union.spectrum}`}
                                                                    style={union.spectrum === "diamond" 
                                                                        ? {backgroundImage: "url(/misc/diamond-btn1.jpg)", 
                                                                           backgroundSize: "cover",
                                                                           opacity: "30%"}
                                                                        : {}
                                                                    }
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Story</span>
                                                                        : "Story"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private about ${union.spectrum}`} 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? {backgroundImage: "url(/misc/diamond-btn2.jpg)", 
                                                                           backgroundSize: "cover",
                                                                           opacity: "30%"}
                                                                        : {}
                                                                    }
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">About</span>
                                                                        : "About"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private posts ${union.spectrum}`} 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? {backgroundImage: "url(/misc/diamond-btn3.jpg)", 
                                                                           backgroundSize: "cover",
                                                                           opacity: "30%"}
                                                                        : {}
                                                                    }
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Posts</span>
                                                                        : "Posts"
                                                                    }
                                                                </button>
                                                            </div>
                                                            <div className="profileNavRight">
                                                                <button 
                                                                    className={`userProfileBtn private questions ${union.spectrum}`} 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? {backgroundImage: "url(/misc/diamond-btn4.jpg)", 
                                                                           backgroundSize: "cover",
                                                                           opacity: "30%"}
                                                                        : {}
                                                                    }
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Questions</span>
                                                                        : "Questions"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private answers ${union.spectrum}`} 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? {backgroundImage: "url(/misc/diamond-btn5.jpg)", 
                                                                           backgroundSize: "cover",
                                                                           opacity: "30%"}
                                                                        : {}
                                                                    }
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Answers</span>
                                                                        : "Answers"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private blogs ${union.spectrum}`} 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? {backgroundImage: "url(/misc/diamond-btn6.jpg)", 
                                                                           backgroundSize: "cover",
                                                                           opacity: "30%"}
                                                                        : {}
                                                                    }
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">blogs</span>
                                                                        : "blogs"
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="profileNavigation union">
                                                            <div className="profileNavLeft">
                                                                <button 
                                                                    className={active === "story" 
                                                                        ? `userProfileBtn-active story ${union.spectrum}` 
                                                                        : `userProfileBtn story ${union.spectrum}`
                                                                    } 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? active === "story" 
                                                                            ? {background: "white"} 
                                                                            : {backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover"} 
                                                                        : {}
                                                                    }
                                                                    onClick={() => setActive("story")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Story</span>
                                                                        : "Story"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "about" 
                                                                        ? `userProfileBtn-active about ${union.spectrum}` 
                                                                        : `userProfileBtn about ${union.spectrum}`
                                                                    } 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? active === "about" 
                                                                            ? {background: "white"} 
                                                                            : {backgroundImage: "url(/misc/diamond-btn2.jpg)", backgroundSize: "cover"} 
                                                                        : {}
                                                                    }
                                                                    onClick={() => setActive("about")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">About</span>
                                                                        : "About"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "posts" 
                                                                    ? `userProfileBtn-active posts ${union.spectrum}` 
                                                                    : `userProfileBtn posts ${union.spectrum}`
                                                                } 
                                                                style={union.spectrum === "diamond" 
                                                                        ? active === "posts" 
                                                                            ? {background: "white"} 
                                                                            : {backgroundImage: "url(/misc/diamond-btn3.jpg)", backgroundSize: "cover"} 
                                                                        : {}
                                                                    }
                                                                onClick={() => setActive("posts")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Posts</span>
                                                                        : "Posts"
                                                                    }
                                                                </button>
                                                            </div>
                                                            <div className="profileNavRight">
                                                                <button 
                                                                    className={active === "questions" 
                                                                        ? `userProfileBtn-active questions ${union.spectrum}` 
                                                                        : `userProfileBtn questions ${union.spectrum}`
                                                                    } 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? active === "questions" 
                                                                            ? {background: "white"} 
                                                                            : {backgroundImage: "url(/misc/diamond-btn4.jpg)", backgroundSize: "cover"} 
                                                                        : {}
                                                                    }
                                                                    onClick={() => setActive("questions")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Questions</span>
                                                                        : "Questions"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "answers" 
                                                                        ? `userProfileBtn-active answers ${union.spectrum}` 
                                                                        : `userProfileBtn answers ${union.spectrum}`
                                                                    } 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? active === "answers" 
                                                                            ? {background: "white"} 
                                                                            : {backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"} 
                                                                        : {}
                                                                    }
                                                                    onClick={() => setActive("answers")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Answers</span>
                                                                        : "Answers"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "blogs" 
                                                                        ? `userProfileBtn-active blogs ${union.spectrum}` 
                                                                        : `userProfileBtn blogs ${union.spectrum}`
                                                                    } 
                                                                    style={union.spectrum === "diamond" 
                                                                        ? active === "blogs" 
                                                                            ? {background: "white"} 
                                                                            : {backgroundImage: "url(/misc/diamond-btn6.jpg)", backgroundSize: "cover"} 
                                                                        : {}
                                                                    }
                                                                    onClick={() => setActive("blogs")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Blogs</span>
                                                                        : "Blogs"
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                    
                                <div className={`profileInfo ${union.spectrum}`}>
                                    <h4 className="profileName">{union.profileName}</h4>
                                    <span className="profileAbout">{union.about}</span>
                                    <div className="unionProfileDP-container">
                                        <div className="unionProfileTF">
                                            <span 
                                                className={
                                                    `unionProfileTFKey 
                                                    ${currentFlame.energy 
                                                        ? currentFlame.energy === "masculine" 
                                                            ? "masculine" 
                                                            : "feminine" 
                                                        : "masculine"
                                                    }`
                                                }
                                            >
                                                {currentFlame.energy ? currentFlame.energy === "masculine" ? "DM:" : "DF:" : "DM:"}
                                            </span>
                                            <div className="unionProfileTFValue">
                                                <Link 
                                                    className="unionProfileTFLink" 
                                                    to={`/flame-profile/userName/${currentFlame.energy ? currentFlame.energy === "masculine" ? masculineUser.userName : feminineUser.userName : masculineUser.userName}`} 
                                                    onClick={() => setActive("story")}
                                                >   
                                                    {currentFlame.energy ? currentFlame.energy === "masculine"
                                                        ?
                                                            (
                                                                <>
                                                                    <img className="unionProfileTFPic" src={masculineUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                                    <img className="unionProfileTFEnergy" src={energyIcon(masculineUser.energy)} alt="" />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img className="unionProfileTFPic" src={feminineUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                                    <img className="unionProfileTFEnergy" src={energyIcon(feminineUser.energy)} alt="" /> 
                                                                </>
                                                            ) 
                                                        :
                                                            (
                                                                <>
                                                                    <img className="unionProfileTFPic" src={masculineUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                                    <img className="unionProfileTFEnergy" src={energyIcon(masculineUser.energy)} alt="" />
                                                                </>
                                                            )
                                                    }
                                                    <span className="unionProfileTFName">{currentFlame.energy ? currentFlame.energy === "masculine" ? masculineUser.profileName : feminineUser.profileName : masculineUser.profileName}</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="unionProfileTF">
                                        <span 
                                                className={
                                                    `unionProfileTFKey 
                                                    ${currentFlame.energy 
                                                        ? currentFlame.energy === "masculine" 
                                                            ? "feminine" 
                                                            : "masculine" 
                                                        : "feminine"
                                                    }`
                                                }
                                            >
                                                {currentFlame.energy ? currentFlame.energy === "masculine" ? "DF:" : "DM:" : "DF:"}
                                            </span>
                                            <div className="unionProfileTFValue">
                                                <Link 
                                                    className="unionProfileTFLink" 
                                                    to={`/flame-profile/userName/${currentFlame.energy ? currentFlame.energy === "masculine" ? feminineUser.userName : masculineUser.userName : feminineUser.userName}`} 
                                                    onClick={() => setActive("story")}
                                                >
                                                    {currentFlame.energy ? currentFlame.energy === "masculine"
                                                        ?
                                                            (
                                                                <>
                                                                    <img className="unionProfileTFPic" src={feminineUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                                    <img className="unionProfileTFEnergy" src={energyIcon(feminineUser.energy)} alt="" />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img className="unionProfileTFPic" src={masculineUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                                    <img className="unionProfileTFEnergy" src={energyIcon(masculineUser.energy)} alt="" /> 
                                                                </>
                                                            ) 
                                                        :
                                                            (
                                                                <>
                                                                    <img className="unionProfileTFPic" src={feminineUser.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                                    <img className="unionProfileTFEnergy" src={energyIcon(feminineUser.energy)} alt="" />
                                                                </>
                                                            )
                                                    }
                                                    <span className="unionProfileTFName">{currentFlame.energy ? currentFlame.energy === "masculine" ? feminineUser.profileName : masculineUser.profileName : feminineUser.profileName}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profileInfoHereFor">
                                        <span className="profileInfoHereForKey">Here For:</span>
                                        <span className="profileInfoHereForValue">{stringHereFor(union.hereFor)}</span>
                                    </div>
                                    <div className="profileFollowStats">
                                        <Link className="profileFollowStatLink" to={`${pathName}/followers`}>
                                            <span className="profileFollowStatCount">{followers}</span>
                                            <span className="profileFollowStatText">{`Befriender${followers === 1 ? "" : "s"}`}</span>
                                        </Link>
                                        <div className="profileFollowStat">
                                        <Link className="profileFollowStatLink" to={`${pathName}/following`}>
                                            <span className="profileFollowStatText">Befriending</span>
                                            <span className="profileFollowStatCount">{following}</span>
                                        </Link>
                                        </div>
                                    </div>
                                    <div className="profileSubscribeStats">
                                        <Link className="profileSubscribeStatLink" to={`${pathName}/subscribers`}>
                                            <span className="profileSubscribeStatCount">{subscribers}</span>
                                            <span className="profileSubscribeStatText">{`Subscriber${subscribers === 1 ? "" : "s"}`}</span>
                                        </Link>
                                        <div className="profileSubscribeStat">
                                        <Link className="profileSubscribeStatLink" to={`${pathName}/subscribing`}>
                                            <span className="profileSubscribeStatText">Subscribing</span>
                                            <span className="profileSubscribeStatCount">{subscribing}</span>
                                        </Link>
                                        </div>
                                    </div>
                                    
                                    {currentUser.unionId !== union._id && <ProfileFollowBtns union={union}/>}
                                    {union.spectrum === "diamond" ?
                                        (
                                            <>
                                                <img className="unionProfileHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                                            </>
                                        ) :(
                                            <>
                                                <hr className={`unionProfileHr ${union.spectrum}`}/>
                                            </>
                                        )
                                        }
                                    <div className="profileDisplay-container">
                                        {profileDisplay}
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>  
                </div> 
            </div>   
        </div>
        {createPost &&
                <div className="createPostQNScreen" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.unionName 
                                ? currentUser.spectrum 
                                    ? currentUser.spectrum 
                                    : "gray" 
                                : currentUser.energy 
                                    ? currentUser.energy 
                                    : "gray"
                            }`
                        }
                    />
                    <div className="createPostQNScreenContainer">
                        <CreatePost />
                    </div>
                </div>
            }
            {createQN &&
                <div className="createPostQNScreen" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.unionName 
                                ? currentUser.spectrum 
                                    ? currentUser.spectrum 
                                    : "gray" 
                                : currentUser.energy 
                                    ? currentUser.energy 
                                    : "gray"
                            }`
                        }
                    />
                    <div className="createPostQNScreenContainer">
                        <CreateQuestion />
                    </div>
                </div>
            }
            {editAvatar &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.spectrum 
                                ? currentUser.spectrum 
                                : "gray" 
                            }`
                        }
                    />
                    <div className="avatarEditorScreenContainer">
                        <AvatarEditor />
                    </div>
                </div>
            }
            {avatarCDP &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.spectrum 
                                ? currentUser.spectrum 
                                : "gray" 
                            }`
                        }
                    />
                    <div className="cdpAvatarScreenContainer">
                        <CDPAvatar />
                    </div>
                </div>
            }
            {editBackgroundPic &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.spectrum 
                                ? currentUser.spectrum 
                                : "gray" 
                            }`
                        }
                    />
                    <div className="avatarEditorScreenContainer">
                        <BackgroundPicEditor />
                    </div>
                </div>
            }
            {backgroundCDP &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.spectrum 
                                ? currentUser.spectrum 
                                : "gray" 
                            }`
                        }
                    />
                    <div className="cdpAvatarScreenContainer">
                        <CDPBackground />
                    </div>
                </div>
            }
        </>
    )
};

export default UnionProfile;