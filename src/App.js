import React, { useCallback, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { Routes, Route, Navigate } from "react-router-dom";
//import { Routes, Route, na } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { mentionList } from "./Redux/AuthSlice";
import { io } from "socket.io-client";
import axios from "axios";
import Home from "./Pages/Home/Home";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import FlameProfile from "./Pages/Profiles/FlameProfile/FlameProfile";
import UnionProfile from "./Pages/Profiles/UnionProfile/UnionProfile";
import TFCAbout from "./Pages/TFCAbout/TFCAbout";
import AdSpaceInfo from "./Pages/AdSpaceInfo/AdSpaceInfo";
import FriendList from "./Pages/FriendList/FriendList";
import Messenger from "./Pages/Messenger/Messenger";
import Coaches from "./Pages/CoachRoutes/Coaches/Coaches";
import Coach from "./Pages/CoachRoutes/Coach/Coach";
import Channels from "./Pages/ChannelRoutes/Channels/Channels";
import Channel from "./Pages/ChannelRoutes/Channel/Channel";
import Questions from "./Pages/QuestionRoutes/Questions/Questions";
import Question from "./Pages/QuestionRoutes/Question/Question";
import Posts from "./Pages/PostRoutes/Posts/Posts";
import Post from "./Pages/PostRoutes/Post/Post";
import Connect from "./Pages/Connect/Connect";
import TopBar from "./Components/PageBars/TopBar/TopBar";
import Sidebar from "./Components/PageBars/Sidebar/Sidebar";
import Blogs from "./Pages/BlogRoutes/Blogs/Blogs";
import Events from "./Pages/EventRoutes/Events/Events";
import Event from "./Pages/EventRoutes/Event/Event";
import Popular from "./Pages/Popular/Popular";
import Groups from "./Pages/Groups/Groups";
import Mediums from "./Pages/MediumRoutes/Mediums/Mediums";
import Medium from "./Pages/MediumRoutes/Medium/Medium";
import NoMatch from "./Pages/NoMatch/NoMatch";
import Messagebar from "./Components/PageBars/MessageBar/MessageBar";
import ConversationBar from "./Components/PageBars/ConversationBar/ConversationBar";
import FriendRequests from "./Pages/FriendRequests/FriendRequests";
import Notifications from "./Pages/Notifications/Notifications";
import Hashtags from "./Pages/HashtagRoutes/Hashtags/Hashtags";
import Hashtag from "./Pages/HashtagRoutes/Hashtag/Hashtag";
import IntroInfo from "./Pages/IntroInfo/IntroInfo";
import PageAmenitiesOne from "./PageAmenities/PageAmenitiesOne";
import PageAmenitiesTwo from "./PageAmenities/PageAmenitiesTwo";


function App() {

    const { user } = useSelector((state) => state.auth);

    const socket = useRef();
    const observer = useRef();

    const dispatch = useDispatch();

    const [flameFollowing, setFlameFollowing] = useState([]);
    const [unionFollowing, setUnionFollowing] = useState([]);
    const [ fValues, setFValues ] = useState([]);
    const [ uValues, setUValues ] = useState([]);
    const [ mentions, setMentions ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalFlameMessage, setArrivalFlameMessage] = useState(null);
    const [arrivalUnionMessage, setArrivalUnionMessage] = useState(null);
    const [onlineFlameUsers, setOnlineFlameUsers] = useState([]);
    const [onlineUnionUsers, setOnlineUnionUsers] = useState([]);
    const [ blockingFlames, setBlockingFlames ] = useState([]);
    const [ blockingUnions, setBlockingUnions ] = useState([]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    // Get user's flame following
    useEffect(() => {
        const getFlameFollowing = async () => {
            try {
                const res = user.unionName
                ? await axios.get(`/unions/flame-following/${user._id}`)
                : await axios.get(`/users/flame-following/${user._id}`)
                setFValues(res.data.map((f) => {
            return {
                id: "mention_" + f._id,
                value: f.profileName,
                profileName: f.profileName,
                color: f.energy,
                avatar: `<img class="mentionAvatar" src=${f.profilePicture} alt="" />`,
                link: `/flame-profile/userName/${f.userName}`,
                icon: `<img class="mentionIcon" src="/icons/flameEnergy/${f.energy}-flame.png" alt="" />`
            }
        }))
            } catch(err) {
                console.log(err);
            }
        }
        getFlameFollowing();
    }, [user]);
    
    // Get user's union following
    useEffect(() => {
        const getUnionFollowing = async () => {
            try {
                const res = user.unionName
                ? await axios.get(`/unions/union-following/${user._id}`)
                : await axios.get(`/users/union-following/${user._id}`)
                setUValues(res.data.map((u) => {
                    return {
                        id: "mention_" + u._id,
                        value: u.profileName,
                        profileName: u.profileName,
                        color: u.spectrum,
                        avatar: `<img class="mentionAvatar" src=${u.unionProfilePicture} alt="" />`,
                        link: `/union-profile/${u.unionName}`,
                        icon: `<img class="mentionIcon" src="/icons/spectrum/${u.spectrum}.png" alt="" />`
                    }
                }));
            } catch(err) {
                console.log(err);
            }
        }
        getUnionFollowing();
    }, [user]);

    useEffect(() => {
        if (fValues && uValues) {
            setMentions(fValues.concat(uValues));
        }
    }, [fValues, uValues]);

    useEffect(() => {
        if (mentions) {
            dispatch(mentionList(mentions))
            localStorage.setItem("mentions", JSON.stringify(mentions));
            setIsLoaded(true) 
        }
    }, [mentions]);

    
    useEffect(() => {
        socket.current = io("ws://localhost:9800");
        socket.current.on("getFlameMessage", data => {
            setArrivalFlameMessage({
                conversationId: data.conversationId,
                flameSenderId: data.flameSenderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
        socket.current.on("getUnionMessage", data => {
            setArrivalUnionMessage({
                conversationId: data.conversationId,
                unionSenderId: data.unionSenderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, []);

    useEffect(() => {
        if (user) {
            if (user.unionName) {
                socket?.current.emit("addUnionUser", user._id)
                socket?.current.on("getFlameUsers", flameUsers => {
                    setOnlineFlameUsers(user.flameFollowing.filter((fFollowing) => flameUsers.some((fUser) => fUser.userId === fFollowing)));
                })
                socket?.current.on("getUnionUsers", unionUsers => {
                    setOnlineUnionUsers(user.unionFollowing.filter((uFollowing) => unionUsers.some((uUser) => uUser.userId === uFollowing)));
                })
            } else if (!user.unionName) {
                socket?.current.emit("addFlameUser", user._id)
                socket?.current.on("getFlameUsers", flameUsers => {
                    setOnlineFlameUsers(user.flameFollowing.filter((fFollowing) => flameUsers.some((fUser) => fUser.userId === fFollowing)));
                })
                socket?.current.on("getUnionUsers", unionUsers => {
                    setOnlineUnionUsers(user.unionFollowing.filter((uFollowing) => unionUsers.some((uUser) => uUser.userId === uFollowing)));
                })
            }
        }  
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = user.unionName 
                    ? await axios.get(`/conversations/union/${user._id}`)
                    : await axios.get(`/conversations/flame/${user._id}`)
                setConversations(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getConversations();
    }, [user?._id]);

    useEffect(() => {
        if (newMessage) {
            user.unionName
                ? socket.current.emit("sendUnionMessage", newMessage)
                : socket.current.emit("sendFlameMessage", newMessage)
        }
    }, [newMessage]);


    return (
        <Routes> 
            {!user && <Route path="/" element={<Login />}/>}
            <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />  
            <Route path="/registration" element={user ? <Navigate to="/"/> : <Registration />} />
            <Route path="/registration/:id/introInfo" element={user ? <IntroInfo /> : <Navigate to="/"/>} />
            <Route 
                element={
                    <PageAmenitiesOne 
                        onlineFlameUsers={onlineFlameUsers} 
                        onlineUnionUsers={onlineUnionUsers} 
                    />
                }
            >
                <Route 
                    path="/messenger" 
                    element={user 
                        ? <Messenger
                            onlineFlameUsers={onlineFlameUsers}
                            onlineUnionUsers={onlineUnionUsers} 
                            conversations={conversations} 
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            arrivalFlameMessage={arrivalFlameMessage}
                            arrivalUnionMessage={arrivalUnionMessage}
                        /> 
                        : <Navigate to="/login" />
                    } 
                />
                <Route 
                    element={
                        <PageAmenitiesTwo 
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            arrivalFlameMessage={arrivalFlameMessage}
                            arrivalUnionMessage={arrivalUnionMessage}
                        />
                    }
                >
                    {user && <Route path="/" element={<Home />}/>}
                    <Route path="/coaches" element={user ? <Coaches /> : <Navigate to="/login" />} />
                    <Route path="/coach/:id" element={user ? <Coach /> : <Navigate to="/login" />} />
                    <Route path="/mediums" element={user ? <Mediums /> : <Navigate to="/login" />} />
                    <Route path="/medium/:id" element={user ? <Medium /> : <Navigate to="/login" />} />
                    <Route path="/connect" element={user ? <Connect /> : <Navigate to="/login" />} />    
                    <Route path="/groups" element={user ? <Groups /> : <Navigate to="/login" />} />
                    <Route path="/channels" element={user ? <Channels /> : <Navigate to="/login" />} />
                    <Route path="/channel/:id" element={user ? <Channel /> : <Navigate to="/login" />} />
                    <Route path="/blogs" element={user ? <Blogs /> : <Navigate to="/login" />} />
                    <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
                    <Route path="/posts" element={user ? <Posts /> : <Navigate to="/login" />} />
                    <Route path="/post/:id" element={user ? <Post /> : <Navigate to="/login" />} />
                    <Route path="/questions" element={user ? <Questions /> : <Navigate to="/login" />} />
                    <Route path="/popular" element={user ? <Popular /> : <Navigate to="/login" />} /> 
                    <Route path="/question/:id" element={user ? <Question /> : <Navigate to="/login" />} />
                    <Route path="/events" element={user ? <Events /> : <Navigate to="/login" />} />
                    <Route path="/event/:id" element={user ? <Event /> : <Navigate to="/login" />} />
                    <Route path="/hashtags" element={user ? <Hashtags /> : <Navigate to="/login" />} />   
                    <Route path="/hashtag/:hashtag" element={user ? <Hashtag /> : <Navigate to="/login" />} />
                    <Route path="/about" element={user ? <TFCAbout /> : <Navigate to="/login" />} />
                    <Route path="/adspaceinformation" element={user ? <AdSpaceInfo /> : <Navigate to="/login" />} />
                    <Route path="/friendRequests" element={user ? <FriendRequests /> : <Navigate to="/login" />} />                            
                    <Route path="*" element={user ? <NoMatch /> : <Navigate to="/login" />} />
                    <Route 
                        path="/flame-profile/userName/:userName"
                        element={user ? <FlameProfile /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/union-profile/unionName/:unionName" 
                        element={user ? <UnionProfile /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/flame-profile/id/:id" 
                        element={user ? <FlameProfile /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/union-profile/id/:id" 
                        element={user ? <UnionProfile /> : <Navigate to="/login" />} 
                    />
                    {/*["/flame-profile/userName/:userName/:follow", "/flame-profile/id/:id/:follow", "/union-profile/unionName/:unionName/:follow", "/union-profile/id/:id/:follow"].map((path, index) => (
                        <Route path={path} key={index} element={user ? <FriendList /> : <Navigate to="/login" />} />
                    ))*/}
                </Route>
            </Route>
        </Routes>             
    );
};

export default App;
