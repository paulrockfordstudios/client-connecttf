import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { mentionList } from "../../Redux/AuthSlice";
import axios from "axios";
import ConversationBar from '../../Components/PageBars/ConversationBar/ConversationBar';
import Messagebar from '../../Components/PageBars/MessageBar/MessageBar';
import Middlebar from '../../Components/PageBars/Middlebar/Middlebar';
import Rightbar from '../../Components/PageBars/Rightbar/Rightbar';
import Sidebar from '../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../Components/PageBars/TopBar/TopBar';
import CreatePost from '../../Components/Posts/CreatePost/CreatePost';
import CreateQuestion from '../../Components/Questions/CreateQuestion/CreateQuestion';
import "./Home.css";
import { useScrollLock } from '../../Utils/crHooks/useScrollLock';

function Home() {

    const { user, cPost, cQN } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const { lockScroll, unlockScroll } = useScrollLock();

    const [ createPost, setCreatePost ] = useState(false);
    const [ createQN, setCreateQN ] = useState(false);
    const [flameFollowing, setFlameFollowing] = useState([]);
    const [unionFollowing, setUnionFollowing] = useState([]);
    const [ fValues, setFValues ] = useState([]);
    const [ uValues, setUValues ] = useState([]);
    const [ mentions, setMentions ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    
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
        return cPost || cQN ? lockScroll() : unlockScroll();
    }, [cPost, cQN]);

    useEffect(() => {
        setCreateQN(cQN)
    }, [cQN]);
    
    return (
        <>
        {isLoaded &&
        <>
            <div 
                className="home-container"
            >   
                <Middlebar />
                <Rightbar />        
            </div> 
            {cPost && <CreatePost/>}
            {cQN && <CreateQuestion />}
        </>
        }
        </>
    )
};

export default memo(Home);