import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { pAEOpen, pBEOpen, cdpAvatarOpen, cdpBackgroundOpen } from "../../../Redux/AuthSlice";
//import { Link, useRouteMatch } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import PostFeed from '../../../Components/Posts/PostFeed/PostFeed';
import Sidebar from '../../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../../Components/PageBars/TopBar/TopBar';
import Story from '../../../Components/Story/Story';
import AboutFlame from '../../../Components/About/AboutFlame/AboutFlame';
import QuestionFeed from '../../../Components/Questions/QuestionFeed/QuestionFeed';
import ProfileFollowBtns from '../../../Components/FollowButtons/ProfileFollowBtns/ProfileFollowBtns';
import "./FlameProfile.css";
import { MoreHoriz, Person, Check, Mail, EditOutlined, WallpaperOutlined, AccountBoxOutlined, AddAPhoto } from "@material-ui/icons";
import { stringHereFor, btnsColorByEnergy } from "../../../Utils/misc/misc";
import { 
    energyIcon,
    spectrumIcon,
    chargeIcon,
    zodiacIcon,
    sexIcon,
    compassIcon,
    orientationIcon
 } from "../../../Utils/icons/icons";
import NoMatch from '../../NoMatch/NoMatch';
import CreateQuestion from '../../../Components/Questions/CreateQuestion/CreateQuestion';
import CreatePost from '../../../Components/Posts/CreatePost/CreatePost';
import AvatarEditor from '../../../Components/Editors/AvatarEditor/AvatarEditor';
import BackgroundPicEditor from '../../../Components/Editors/BackgroundPicEditor/BackgroundPicEditor';
import AvatarEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/AvatarEditorDropdown/AvatarEditorDropdown';
import CDPAvatar from '../../../Components/ConfirmDeletePopups/CDPAvatar/CDPAvatar';
import BackgroundEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/BackgroundEditorDropdown/BackgroundEditorDropdown';
import CDPBackground from '../../../Components/ConfirmDeletePopups/CDPBackground/CDPBackground';





function FlameProfile() {

    const { userName } = useParams();
    const { id } = useParams();
    const location = useLocation();
    //const { url } = useMatch();
    const { pathName } = useLocation();
    
    console.log(location)
    //const { user: currentUser, dispatch } = useContext(AuthContext);
    const { user: currentUser, flame: currentFlame, cPost, cQN, pAEditor, pBEditor, cdpAvatar, cdpBackground } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const [ user, setUser ] = useState({});
    const [ twinFlame, setTwinFlame ] = useState();
    const [ union, setUnion ] = useState({});
    const [active, setActive] = useState("story");
    const [followers, setFollowers] =useState();
    const [following, setFollowing] =useState();
    const [subscribers, setSubscribers] =useState();
    const [subscribing, setSubscribing] =useState();
    const [profileDisplay, setProfileDisplay] = useState(<Story userName={userName} />);
    const [ blockingFlames, setBlockingFlames ] = useState([]);
    const [ blockingUnions, setBlockingUnions ] = useState([]);
    const [ blocked, setBlocked ] = useState(false);
    const [ createPost, setCreatePost ] = useState(false);
    const [ createQN, setCreateQN ] = useState(false);
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

    useEffect(() => {
        const getBlockingFlames = async () => {
            let results = []; 
            for (let i = 0; i < currentUser.flameBlockers.length; i++) {
                const flameId = currentUser.flameBlockers[i];
                const flameUser = await axios.get(`/users?userId=${flameId}`)
                const { _id, userName } = flameUser.data;
                results.push({ _id, userName });
            }
            setBlockingFlames(results)
        }
        getBlockingFlames();
    }, [currentUser]);


    useEffect(() => {
        blockingFlames.forEach((fb) => {
            if (fb.userName === userName || fb._id === id) {
                setBlocked(true)
            } else {
                setBlocked(false)
            }
        })
    }, [currentUser]);

   
    // Get user
    useEffect(() => {
        const fetchUser = async () => {
            const res = userName
                ? await axios.get(`/users?userName=${userName}`)
                : await axios.get(`/users?userId=${id}`)
            setUser(res.data);
        }
        fetchUser();
    }, [userName]);

    
   

    // Get twin flame
    useEffect(() => {
        if(user.inUnion === true) {
            const getTwinFlame = async () => {
                try {
                    const TF = await axios.get("/users/twin-flame/" + user._id);
                    setTwinFlame(TF.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getTwinFlame();
        }
    }, [user._id]);


    useEffect(() => {
        if(user) {
            const connectNumbers = async () => {
                try {
                    setFollowers(user.flameFollowers.length + user.unionFollowers.length);
                    setFollowing(user.flameFollowing.length + user.unionFollowing.length);
                    setSubscribers(user.flameSubscribers.length + user.unionSubscribers.length);
                    setSubscribing(user.flameSubscribing.length + user.unionSubscribing.length);
                } catch(err) {
                    console.log(err)
                }
            }
            connectNumbers();
        }
    }, [user]);

    
    useEffect(() => {
        switch (active) {
            case "story":
                setProfileDisplay(<Story />);
                break;
            case "about":
                setProfileDisplay(<AboutFlame />);
                break;
            case "posts":
                setProfileDisplay(<PostFeed dc={user.energy}/>);
                break;
            case "questions":
                setProfileDisplay(<QuestionFeed dc={user.energy}/>);
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

    console.log(userName)

    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className={`profileUserDisplay-container BOX_SHADOW ${user.energy ? user.energy : "gray"}`}>
                            {user.userName === currentUser.userName ?
                                (
                                    <> 
                                        {editBPHover || editBPActive ? <div className={`profileBackgroundImgBackgroundLayer ${user.energy}`}></div> : null}
                                        <img 
                                            className={
                                                `profileBackgroundImg
                                                ${editBPHover || editBPActive ? "edit" : ""}`
                                            } 
                                            src={user.isAnonymous 
                                                ? "/picBlanks/no-banner.jpg" 
                                                : user.backgroundPicture 
                                                    ?  user.backgroundPicture 
                                                    : "/picBlanks/no-banner.jpg"
                                            } 
                                            alt="" 
                                        />
                                        {editBPHover || editBPActive ? <WallpaperOutlined className={`profileFlameBackgroundImgEdit ${user.energy}`} onClick={backgroundPicEditorHandler}/> : null }
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
                                        {editPPHover || editPPActive ? <div className={`profileImgBackgroundLayer primary ${user.energy}`}></div> : null}
                                        <img 
                                            className={editPPHover || editPPActive ? "profileImg edit primary" : "profileImg primary"} 
                                            src={user.isAnonymous 
                                                ? "/picBlanks/no-avatar.jpg" 
                                                : user.profilePicture 
                                                    ? user.profilePicture 
                                                    : "/picBlanks/no-avatar.jpg"
                                            } 
                                            alt="" 
                                        />
                                        {editPPHover || editPPActive ? <AccountBoxOutlined className={`profileImgEdit ${user.energy}`} /> : null}
                                        <div 
                                            className="profilePhotoEditorBtn avatar" 
                                            onMouseEnter={editBPActive ? null : () => setEditPPHover(true)} 
                                            onMouseLeave={() => setEditPPHover(false)}
                                            onClick={editBPActive ? null : () => setEditPPActive(!editPPActive)}
                                        >
                                            <AddAPhoto className="profilePhotoEditorIcon"/>            
                                        </div>
                                        {editPPActive &&
                                            <div className="profileAvatarEditorDropdown">
                                                <AvatarEditorDropdown setEditPPActive={setEditPPActive}/>
                                            </div>
                                        }
                                    </>
                                ) : (
                                    <>
                                        <img 
                                            className="profileBackgroundImg"
                                            src={user.isAnonymous 
                                                ? "/picBlanks/no-banner.jpg" 
                                                : user.backgroundPicture 
                                                    ?  user.backgroundPicture 
                                                    : "/picBlanks/no-banner.jpg"
                                            } 
                                            alt="" 
                                        />
                                        <img 
                                            className="profileImg primary" 
                                            src={user.isAnonymous
                                                ? "/picBlanks/no-avatar.jpg" 
                                                : user.profilePicture 
                                                    ? user.profilePicture 
                                                    : "/picBlanks/no-avatar.jpg"
                                            } 
                                            alt=""
                                        />
                                    </>
                                )
                            }
                        
                                        {currentUser?.flameFollowing.includes(user?._id) || currentUser?.unionFollowing.includes(user?._id)?
                                            (
                                                <div className="profileNavigation flame">
                                                    <div className="profileNavLeft">
                                                        <button className={active === "story" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("story")}>Story</button>
                                                        <button className={active === "about" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("about")}>About</button>
                                                        <button className={active === "posts" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("posts")}>Posts</button>
                                                    </div>
                                                    <div className="profileNavRight">
                                                        <button className={active === "questions" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("questions")}>Questions</button>
                                                        <button className={active === "answers" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("answers")}>Answers</button>
                                                        <button className={active === "blogs" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("blogs")}>Blogs</button>
                                                    </div>
                                                </div>  
                                            ) : (
                                                <>
                                                    {user.isPrivate ?
                                                        (
                                                            <div className="profileNavigation">
                                                                <div className="profileNavLeft">
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Story</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >About</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Posts</button>
                                                                </div>
                                                                <div className="profileNavRight">
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Questions</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Answers</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Blogs</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {editPPActive || editBPActive ?
                                                                    (
                                                                        <div className="profileNavigation">
                                                                            <div className="profileNavLeft">
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Story</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >About</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Posts</button>
                                                                            </div>
                                                                            <div className="profileNavRight">
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Questions</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Answers</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Blogs</button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="profileNavigation">
                                                                            <div className="profileNavLeft">
                                                                                <button className={active === "story" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("story")}>Story</button>
                                                                                <button className={active === "about" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("about")}>About</button>
                                                                                <button className={active === "posts" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("posts")}>Posts</button>
                                                                            </div>
                                                                            <div className="profileNavRight">
                                                                                <button className={active === "questions" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("questions")}>Questions</button>
                                                                                <button className={active === "answers" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("answers")}>Answers</button>
                                                                                <button className={active === "blogs" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("blogs")}>Blogs</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                  
                            <div className={`profileInfo ${user.energy}`}>
                            {user.userName === currentUser.userName && (
                            <EditOutlined className={`profileInfoEdit ${user.energy}`}/>
                            )}
                                <h4 className="profileName">{user.isAnonymous? "Anonymous User" : user.profileName}</h4>
                                <span className="profileAbout">{user.about}</span>
                                {!user.isPrivate &&
                                    <>
                                        {user.energy || user.spectrum || user.charge || user.sex || user.orientation || user.sunSign || user.compass ?
                                            (
                                                <div className="flameProfileSpiritIcons">
                                                    {user.energy && <img className="flameProfileSpiritIcon" src={energyIcon(user.energy)} alt=""/>}
                                                    {user.spectrum && <img className="flameProfileSpiritIcon" src={spectrumIcon(user.spectrum)} alt=""/>}
                                                    {user.charge && <img className="flameProfileSpiritIcon" src={chargeIcon(user.charge)} alt=""/>}
                                                    {user.sex && <img className="flameProfileSpiritIcon" src={sexIcon(user.sex)} alt=""/>}
                                                    {user.orientation && user.sex && <img className="flameProfileSpiritIcon" src={orientationIcon(user.orientation, user.sex)} alt=""/>}
                                                    {user.sunSign && <img className="flameProfileSpiritIcon" src={zodiacIcon(user.sunSign)} alt=""/>}
                                                    {user.compass && <img className="flameProfileSpiritIcon" src={compassIcon(user.compass)} alt=""/>}
                                                </div>
                                            ) : ( <></> )
                                        }
                                    </>
                                }
                                <div className="profileInfoHereFor">
                                    <span className="profileInfoHereForKey">Here For:</span>
                                    <span className="profileInfoHereForValue">{stringHereFor(user.hereFor)}</span>
                                </div>
                                {twinFlame ?
                                    (
                                        <>
                                        <div className="profileUserTF">
                                            <span className={`profileUserTFKey ${user.energy}`}>TF:</span>
                                            <div className="profileUserTFValue">
                                                <Link 
                                                    className="profileUserTFLink" 
                                                    to={`/flame-profile/${twinFlame.userName}`} 
                                                    onClick={() => setActive("story")}
                                                >
                                                    <img className="profileUserTFPic" src={twinFlame.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                    <img className="profileUserTFEnergy" src={energyIcon(twinFlame.energy)} alt="" />
                                                    <span className="profileUserTFName">{twinFlame.profileName}</span>
                                                </Link>
                                            </div>
                                        </div>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }
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
                                {currentFlame._id !== user._id && <ProfileFollowBtns user={user}/>}
                                <hr className={`flameProfileHr ${user.energy? user.energy : "gray"}`}/>
                                <div className="profileDisplay-container">
                                    {currentUser.flameFollowing.includes(user?._id) ?
                                        ( 
                                            <>{profileDisplay}</> 
                                        ) : (
                                            <>
                                                {user.isPrivate 
                                                    ? ( <div className="privateAccText">This Account is Private.</div> )
                                                    : ( <>{profileDisplay}</> ) 
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>  
            </div>    
        </div>
        {createPost &&
                <div className="POPUP_SCREEN" >
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
                <div className="POPUP_SCREEN" >
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
                    <div className="cdpAvatarScreenContainer">
                        <CDPBackground />
                    </div>
                </div>
            }
        </>
    )
};

export default FlameProfile;