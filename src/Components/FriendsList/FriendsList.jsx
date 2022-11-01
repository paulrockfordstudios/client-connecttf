import React, { useEffect, useState, useContext} from 'react';
import { Link, useMatch } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import "./FriendsList.css";
import { energyIcon, spectrumIcon } from "../../Utils/icons/icons";
import FriendlistFollowBtns from '../FollowButtons/FriendlistFollowBtns/FriendlistFollowBtns';


function FriendsList() {

    const { userName } = useParams();
    const { unionName } = useParams();
    const { follow } = useParams();
    const { url } = useMatch();
    const { path } = useMatch();


    const { user: currentUser, dispatch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const [ user, setUser ] = useState({});
    const [flameFollowers, setFlameFollowers] = useState([]);
    const [unionFollowers, setUnionFollowers] = useState([]);
    const [flameFollowing, setFlameFollowing] = useState([]);
    const [unionFollowing, setUnionFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [connect, setConnect] = useState([]);
    const [friends, setFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [friendsFeed, setFriendsFeed] = useState(follow);
    const [ hover, setHover ] = useState(false);

   
    
        
    

 

   
    // Get user
    useEffect(() => {
        const fetchProfile = async () => {
            const res = unionName
            ? await axios.get(`/unions?unionName=${unionName}`)
            : await axios.get(`/users?userName=${userName}`)
            setUser(res.data);
        }
        fetchProfile();
    }, [unionName, userName]);


    // Get  user's flame followers
    useEffect(() => {
        const getFlameFollowers = async () => {
            try {
                const res = unionName 
                ? await axios.get(`/unions/flame-followers/${user._id}`)
                : await axios.get(`/users/flame-followers/${user._id}`)
                setFlameFollowers(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getFlameFollowers();
    }, [user]);

    // Get  user's union followers
    useEffect(() => {
        const getUnionFollowers = async () => {
            try {
                const res = unionName 
                ? await axios.get(`/unions/union-followers/${user._id}`)
                : await axios.get(`/users/union-followers/${user._id}`)
                setUnionFollowers(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUnionFollowers();
    }, [user]);

    
    // Get user's flame following
    useEffect(() => {
        const getFlameFollowing = async () => {
            try {
                const res = unionName 
                ? await axios.get(`/unions/flame-following/${user._id}`)
                : await axios.get(`/users/flame-following/${user._id}`)
                setFlameFollowing(res.data);
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
                const res = unionName 
                ? await axios.get(`/unions/union-following/${user._id}`)
                : await axios.get(`/users/union-following/${user._id}`)
                setUnionFollowing(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUnionFollowing();
    }, [user]);


    // Get Connect
    useEffect(() => {
        // After api calls populated.
        if (flameFollowers && unionFollowers && flameFollowing && unionFollowing) {
            // Current user views another user's friendlist.
            //if (currentUser._id !== user._id) {
                // Removes the current user from any of the follow arrays.
                let otherFlameFollowers = flameFollowers.filter((flameFollower) => flameFollower._id !== currentUser._id);
                let otherUnionFollowers = unionFollowers.filter((unionFollower) => unionFollower._id !== currentUser._id);
                let otherFlameFollowing = flameFollowing.filter((flameFollowing) => flameFollowing._id !== currentUser._id);
                let otherUnionFollowing = unionFollowing.filter((unionFollowing) => unionFollowing._id !== currentUser._id);
                // Filters out follows that are not in the current user's follow arrays.
                let uniqueFlameFollowers = otherFlameFollowers.filter((flameFollower) => !currentUser.flameFollowing.includes(flameFollower._id));               
                let uniqueUnionFollowers = otherUnionFollowers.filter((unionFollower) => !currentUser.unionFollowing.includes(unionFollower._id));               
                let uniqueFlameFollowing = otherFlameFollowing.filter((flameFollowing) => !currentUser.flameFollowing.includes(flameFollowing._id));                
                let uniqueUnionFollowing = otherUnionFollowing.filter((unionFollowing) => !currentUser.unionFollowing.includes(unionFollowing._id));
                // Joins flame follow arrays together with their respective union arrays 
                let allFollowers = uniqueFlameFollowers.concat(uniqueUnionFollowers);
                let allFollowing = uniqueFlameFollowing.concat(uniqueUnionFollowing);
                let allFollows = allFollowers.concat(allFollowing)
                let uniqueFollows = [...allFollows.reduce((map, obj) => map.set(obj._id, obj), new Map()).values()];
                setConnect(uniqueFollows);
           // } 
        }
    }, [flameFollowers, flameFollowing, unionFollowers, unionFollowing]);



    useEffect(() => {
        if(flameFollowers && unionFollowers && flameFollowing && unionFollowing) {
            setFollowers(flameFollowers.concat(unionFollowers));
            setFollowing(flameFollowing.concat(unionFollowing));
        }
    }, [flameFollowers, unionFollowers, flameFollowing, unionFollowing]);


    


    

    useEffect(() => {
        const friendsbyFeed = () => {
            if(friendsFeed === "followers") {
                setFriends(followers);
            } else if(friendsFeed === "following") {
                setFriends(following);
            } else {
               
            }
        };
        friendsbyFeed();
   }, [friendsFeed, followers, following]);




  

        const sortedFlames = friends.sort((a, b) => a.profileName > b.profileName ? 1:-1).map((friend) => {

            const diamondHover = {
                backgroundImage: "url(/misc/diamond-sparkle-light.jpg)",
                borderTopLeftRadius: "18px",
                borderBottomLeftRadius: "18px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                backgroundSize: "cover"
            }

            return (
                friend.unionName ?
                (
                    <>
                        {friend.spectrum === "diamond" ?
                            (
                                <>
                                    <li key={friend._id}>  
                                        <div className="friendDiamondHover" style={hover ? diamondHover : null}>
                                            <div className="friend" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>   
                                                <Link className="friendLink" to={"/union-profile/" + friend.unionName}  refresh="true">    
                                                    <div className="friendProfilePic-container">
                                                        <img className="friendProfilePic" src={friend.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                        <img className="friendEnergy" src={spectrumIcon(friend.spectrum)} alt="" />
                                                        <span className="friendName" type="name">{friend.profileName}</span>
                                                    </div>     
                                                </Link>
                                                <FriendlistFollowBtns className="flFollowBtns" user={user} friend={friend}/>
                                            </div>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className={`friend ${friend.spectrum}`} key={friend._id}>
                                        <Link className="friendLink" to={"/union-profile/" + friend.unionName}  refresh="true">    
                                            <div className="friendProfilePic-container">
                                                <img className="friendProfilePic" src={friend.unionProfilePicture} alt="" />
                                                <img className="friendEnergy" src={spectrumIcon(friend.spectrum)} alt="" />
                                                <span className="friendName" type="name">{friend.profileName}</span>
                                            </div>     
                                        </Link>
                                        <FriendlistFollowBtns className="flFollowBtns" user={user} friend={friend}/>
                                    </li>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <li className={`friend ${friend.energy}`} key={friend._id}>
                            <Link className="friendLink" to={user.isAnonymous ? `/flame-profile/id/${friend._id}` : `/flame-profile/userName/${friend.userName}`}  refresh="true">    
                                <div className="friendProfilePic-container">
                                    <img className="friendProfilePic" src={friend.isAnonymous ? "/picBlanks/no-avatar.jpg" : friend.profilePicture ? friend.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                    <img className="friendEnergy" src={energyIcon(friend.energy)} alt="" />
                                    <span className="friendName" type="name">{friend.isAnonymous ? "Anonymoues User" : friend.profileName}</span>
                                </div>     
                            </Link>
                            <FriendlistFollowBtns className="flFollowBtns" user={user} friend={friend}/>
                        </li>
                    </> 
                )
            )
        });

        
    return (
        <div className="friendsList">
            <div className={`friendsList-container ${unionName ? user.spectrum : user.energy}`}>
                {unionName && user.spectrum === "diamond" ?
                    (
                        <>
                            <div className="friendsStatusBtns">
                                <button 
                                    className="followersBtn"
                                    style={
                                        friends === followers 
                                            ? {background: "white"} 
                                            : {backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"}
                                        }  
                                    onClick={() => setFriends(followers)}
                                >
                                    <span className="flDiamondText">Followers</span>
                                </button>
                                <button 
                                    className="followingBtn"
                                    style={
                                        friends === following 
                                            ? {background: "white"} 
                                            : {backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"}
                                        }  
                                    onClick={() => setFriends(following)}
                                >
                                    <span className="flDiamondText">Following</span>
                                </button>
                                <button 
                                    className="connectBtn"
                                    style={
                                        friends === connect 
                                            ? {background: "white"} 
                                            : {backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"}
                                        }  
                                    onClick={() => setFriends(connect)}
                                >
                                    <span className="flDiamondText">Connect</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="friendsStatusBtns">
                                <button 
                                    className={
                                        friends === followers 
                                            ? `followersBtn-active ${unionName ? user.spectrum : user.energy}` 
                                            : `followersBtn ${unionName ? user.spectrum : user.energy}`
                                        }  
                                    onClick={() => setFriends(followers)}
                                >
                                    Followers
                                </button>
                                <button 
                                    className={
                                        friends === following 
                                            ? `followingBtn-active ${unionName ? user.spectrum : user.energy}` 
                                            : `followingBtn ${unionName ? user.spectrum : user.energy}`
                                        } 
                                    onClick={() => setFriends(following)}
                                >
                                    Following
                                </button>
                                <button 
                                    className={
                                        friends === connect 
                                            ? `connectBtn-active ${unionName ? user.spectrum : user.energy}` 
                                            : `connectBtn ${unionName ? user.spectrum : user.energy}`
                                        }
                                    onClick={() => setFriends(connect)}
                                >
                                    Connect
                                </button>
                            </div>
                        </>
                    )
                }
                <div className="friendListSortFilter-container">
                    <select className="friendsDropdown">
                        <option>Sort by</option>
                        <option>sex</option>
                        <option>energy</option>
                        <option>sign</option>
                        <option>orientation</option>
                        <option>most Popular</option>
                    </select>
                    <span className="friendListFilter">Advanced Filter</span>
                </div>
                <ul className="friends">
                   {sortedFlames}
                </ul>
            </div>
        </div>
    )
};

export default FriendsList;