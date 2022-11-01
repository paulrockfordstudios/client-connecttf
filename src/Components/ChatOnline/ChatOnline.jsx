import React, { useEffect, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import "./ChatOnline.css";

function ChatOnline({ onlineFlameUsers, onlineUnionUsers, setCurrentChat }) {

    //const { user } = useContext(AuthContext);
    const { user, actAcc } = useSelector((state) => state.auth);

    const [flameFriends, setFlameFriends] = useState([]);
    const [unionFriends, setUnionFriends] = useState([]);
    const [onlineFlameFriends, setOnlineFlameFriends] = useState([]);
    const [onlineUnionFriends, setOnlineUnionFriends] = useState([]);

    
    useEffect(() => {
        const getFriends = async () => {
            const flameRes = await axios.get(`/${user.unionName ? "unions" : "users"}/flame-following/${user._id}`);
            setFlameFriends(flameRes.data);
            const unionRes = await axios.get(`/${user.umionName ? "unions" : "users"}/union-following/${user._id}`);
            setUnionFriends(unionRes.data);
        }
        getFriends();
    }, [user]);

    

    useEffect(() => {
        setOnlineFlameFriends(flameFriends.filter((fFriend) => onlineFlameUsers.includes(fFriend._id)));
        setOnlineUnionFriends(unionFriends.filter((uFriend) => onlineUnionUsers.includes(uFriend._id)));
    }, [flameFriends, unionFriends, onlineFlameUsers, onlineUnionUsers]);

    const handleClick = async (friend) => {
        try {
            let res = {};
            if (actAcc === "flame" && !friend.unionName) {
                res = await axios.get(`/conversations/find/flame-flame/${user._id}/${friend._id}`);
                setCurrentChat(res.data);
            } else if (actAcc === "flame" && friend.unionName) {
                res = await axios.get(`/conversations/find/flame-union/${user._id}/${friend._id}`);
                setCurrentChat(res.data);
            } else if (actAcc === "union" && !friend.unionName) {
                res = await axios.get(`/conversations/find/flame-union/${friend._id}/${user._id}`);
                setCurrentChat(res.data);
            } else if (actAcc === "union" && friend.unionName) {
                res = await axios.get(`/conversations/find/union-union/${user._id}/${friend._id}`);
                setCurrentChat(res.data);
            }
        } catch(err) {
            console.log(err);
        }
    };

    

    return (
        <div className="chatOnline">
            <div className="chatOnlineContainer union">
                <span className={`chatOnlineContainerText ${user.unionName ? user.spectrum : user.energy}`}>Union Friends Online</span>
                <hr className={`chatOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />
                {onlineUnionFriends.map((ouf) => (
                    <div className="chatOnlineFriend" key={ouf._id} onClick={() => handleClick(ouf)}>
                        <div className="chatOnlineImg-container">
                            <img className={`chatOnlineImg ${ouf.spectrum}`} src={ouf.unionProfilePicture? ouf.unionProfilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineProfileName">{ouf.profileName}</span>
                    </div>
                ))}
           </div>
           <div className="chatOnlineContainer flame">
                <span className={`chatOnlineContainerText ${user.unionName ? user.spectrum : user.energy}`}>Flame Friends Online</span>
                <hr className={`chatOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />
                {onlineFlameFriends.map((off) => (
                    <div className="chatOnlineFriend" key={off._id} onClick={() => handleClick(off)}>
                        <div className="chatOnlineImg-container">
                            <img className={`chatOnlineImg ${off.energy}`} src={off.profilePicture? off.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineProfileName">{off.profileName}</span>
                    </div>
            ))}
           </div>
        </div> 
    )
};

export default ChatOnline;