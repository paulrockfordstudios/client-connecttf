import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from "react-router-dom";
import OnlineFriends from '../../OnlineFriends/OnlineFriends';
import axios from 'axios';
import "./Sidebar.css";
import { 
    RssFeed, 
    Chat, 
    PlayCircleFilled,
    YouTube, 
    People, 
    Bookmark, 
    HelpOutline, 
    WorkOutline, 
    Event, 
    School,
    Sports
} from "@material-ui/icons";

function Sidebar({ onlineFlameUsers, onlineUnionUsers }) {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const [flameFriends, setFlameFriends] = useState([]);
    const [unionFriends, setUnionFriends] = useState([]);
    const [onlineFlameFriends, setOnlineFlameFriends] = useState([]);
    const [onlineUnionFriends, setOnlineUnionFriends] = useState([]);
    const [ hover, setHover ] = useState(false);
    const [ splice, setSplice ] = useState(3);

    const colorTheme = user?.unionName ? user?.spectrum : user?.energy;

    
    useEffect(() => {
        if (user) {
            const getFriends = async () => {
                const flameRes = await axios.get(`/${user.unionName ? "unions" : "users"}/flame-following/${user._id}`);
                setFlameFriends(flameRes.data);
                const unionRes = await axios.get(`/${user.umionName ? "unions" : "users"}/union-following/${user._id}`);
                setUnionFriends(unionRes.data);
            }
            getFriends();
        }
    }, [user]);

    

    useEffect(() => {
        if(onlineFlameUsers === undefined || onlineFlameUsers === undefined) return;
        setOnlineFlameFriends(flameFriends.filter((fFriend) => onlineFlameUsers.includes(fFriend._id)));
        setOnlineUnionFriends(unionFriends.filter((uFriend) => onlineUnionUsers.includes(uFriend._id)));
    }, [flameFriends, unionFriends, onlineFlameUsers, onlineUnionUsers]);

    
    return (
        <>
        {user &&
        <div className="sidebar">
            <div className="sidebar-container">
                <div className={`sidebarMenuTitle ${colorTheme}`}>Menu</div>
                <ul className="sidebarList">
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme}`}>Stay Current</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/">
                                <img className="sidebarImgIcon" src={`/icons/home/home-${flame?.energy}${user.unionName ? `-${user.spectrum}` : ""}.png`} alt=""/>
                                    <span className="sidebarListItemText">Home</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/popular">
                                    <img className="sidebarImgIcon" src={`/icons/new/new-${colorTheme}.png`} alt=""/>
                                    <span className="sidebarListItemText">What's New</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/popular">
                                    <img className="sidebarImgIcon" src={`/icons/sidebar/popular-${colorTheme}.png`} alt=""/>
                                    <span className="sidebarListItemText">What's Popular</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme}`} >Make Connections</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                <Link className="sidebarListItemLink" to="/connect">
                                    <img className="sidebarImgIcon" src="/icons/sidebar/people-connect.png" alt=""/>
                                    <img className="sidebarImgText" src={`/misc/connect${hover ? "-drk" : ""}.png`} alt=""/>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/groups">
                                    <img className="sidebarImgIcon" src="/icons/sidebar/people-color.png" alt=""/>
                                    <span className="sidebarListItemText">Groups</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/events">
                                    <img className="sidebarImgIcon" src={`/icons/events/events-${colorTheme}.png`} alt=""/>
                                    <span className="sidebarListItemText">Events</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/messenger">
                                <img className="sidebarImgIcon" src={`/icons/interactions/chat-tf-message-${colorTheme}.png`} alt=""/>
                                    <span className="sidebarListItemText">Chat</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme}`}>Seek Guidance</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/coaches">
                                <img className="sidebarImgIcon" src={`/icons/coach/coach-${colorTheme}.png`} alt=""/>
                                    <span className="sidebarListItemText">Coaches</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/channels">
                                <img className="sidebarImgIcon" src="/icons/sidebar/youtube.png" alt=""/>
                                    <span className="sidebarListItemText">YouTube</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/mediums">
                                    <img className="sidebarImgIcon" src="/icons/sidebar/tarot.png" alt=""/>
                                    <span className="sidebarListItemText">Mediums</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme}`}>Gain Perspective</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/blogs">
                                    <img className="sidebarImgIcon" src={`/icons/blog/blog-${user.unionName ? `${flame.energy}-${user.spectrum}` : `${user.energy}`}.png`} alt=""/>
                                    <span className="sidebarListItemText">Blogs</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/posts">
                                    <img className="sidebarImgIcon" src={`/icons/airplane/airplane-${colorTheme}.png`} alt=""/>
                                    <span className="sidebarListItemText">Posts</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/questions">
                                <img className="sidebarImgIcon" src={`/icons/questionMark/qmark-${colorTheme}.png`} alt=""/>
                                    <span className="sidebarListItemText">Questions</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                </ul>
                <hr className={`sidebarHr ${colorTheme}`}/>
                <div className={`sidebarMenuTitle ${colorTheme}`}>Online Friends</div>
                <div className="sidebarOnline">
                    <div className="sidebarOnlineContainer union">
                        <span className={`sidebarTopicTitle ${colorTheme}`}>Unions</span>
                        {/*<hr className={`sidebarOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />*/}
                        {onlineUnionFriends.length > 0 ?
                            (
                                <>
                                    {onlineUnionFriends.map((ouf) => (
                                        <div className="chatOnlineFriend" key={ouf._id}>
                                            <div className="chatOnlineImg-container">
                                                <img className={`chatOnlineImg ${ouf.spectrum}`} src={ouf.unionProfilePicture? ouf.unionProfilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                                <div className="chatOnlineBadge"></div>
                                            </div>
                                            <span className="chatOnlineProfileName">{ouf.profileName}</span>
                                        </div>
                                    )).splice(0, splice)}
                                    {onlineUnionFriends.length > 3 ?
                                        (
                                            <>
                                                {onlineUnionFriends.length > 10 ?
                                                    (
                                                        <div className="" onClick={() => setSplice(10)}>Show More</div>
                                                    ) : (
                                                        <div className="" onClick={() => setSplice(onlineUnionFriends.length)}>Show All</div>
                                                    )
                                                }
                                            </>
                                        ) : ( <></> )
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="sidebarOnlineNoneText">None of your Union friends are online at the moment.</div>
                                </>
                            )
                        }
                </div>
                <div className="sidebarOnlineContainer flame">
                        <span className={`sidebarTopicTitle ${colorTheme}`}>Flames</span>
                        {/*<hr className={`sidebarOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />*/}
                        {onlineFlameFriends.length > 0 ?
                            (
                                <>
                                    {onlineFlameFriends.map((off) => (
                                        <div className="chatOnlineFriend" key={off._id}>
                                            <div className="chatOnlineImg-container">
                                                <img className={`chatOnlineImg ${off.energy}`} src={off.profilePicture? off.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                                <div className="chatOnlineBadge"></div>
                                            </div>
                                            <span className="chatOnlineProfileName">{off.profileName}</span>
                                        </div>
                                    )).splice(0, splice)}
                                    {onlineFlameFriends.length > 3 ?
                                        (
                                            <>
                                                {onlineFlameFriends.length > 10 ?
                                                    (
                                                        <div className="" onClick={() => setSplice(10)}>Show More</div>
                                                    ) : (
                                                        <div className="" onClick={() => setSplice(onlineFlameFriends.length)}>Show All</div>
                                                    )
                                                }
                                            </>
                                        ) : ( <></> )
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="sidebarOnlineNoneText">None of your Flame friends are online at the moment.</div>
                                </>
                            )
                        }
                    </div>
                </div> 

            </div>
        </div>
        }
        </>
    )
};

export default Sidebar;