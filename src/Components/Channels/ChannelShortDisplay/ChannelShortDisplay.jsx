import React, { useEffect, useState, useRef } from 'react';
import { MoreVert, YouTube } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { getStarRating } from "../../../Utils/misc/misc";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import axios from "axios";
import "./ChannelShortDisplay.css";




function ChannelShortDisplay({ channel, index }) {

    const ref = useRef()

    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = channel.union 
            ? await axios.get(`/unions?unionId=${channel.unionId}`)
            : await axios.get(`/users?userId=${channel.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [channel]);

    useEffect(() => {
        if (user.unionName) {
            const getHeight = () => {
                const channelHeight = ref.current.clientHeight;
                setHeight(channelHeight);
            }
        getHeight();
        }
    }, [user]);

    
    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="channelShortDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`channelShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`channelShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`channelShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`channelShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`channelShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`channelShortDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <Link to={`/channel/${channel._id}`}>
                                    <div className="channelShortDisplay-container">
                                        <div className="channelShortDisplayContainer">
                                            <div className="channelShortDisplayContainerTop">
                                                {index % 2 == 0 ? 
                                                    (
                                                        <>
                                                            <div className="channelShortDisplayContainerTopLeft indexEven">
                                                                <img className="channelShortDisplayContainerImg" src={channel.linkImg} alt="" />
                                                            </div>
                                                            <div className="channelShortDisplayContainerTopRight indexEven">
                                                                <div className="channelShortDisplayContainerHeader">
                                                                    <YouTube className="channelShortDisplayContainerHeaderYouTubeIcon"/> 
                                                                    <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                    {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                                </div>
                                                                {user &&
                                                                    (
                                                                        <>
                                                                            <Link to={`/union-profile/${user.unionName}`}>
                                                                                <div className="channelShortDisplayContainerProfile">
                                                                                    <img className="channelShortDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                    <img className="channelShortDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                    <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </>
                                                                    )
                                                                }
                                                                <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                                <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                                <div className="channelShortDisplayContainerStats">
                                                                    <div className="channelShortDisplayContainerRating">
                                                                        <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                        <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                    </div>
                                                                    <div className="channelShortDisplayContainerReviews">
                                                                        <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                        <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> 
                                                    ) : (
                                                        <>
                                                            <div className="channelShortDisplayContainerTopLeft indexOdd">
                                                                <div className="channelShortDisplayContainerHeader">
                                                                    <YouTube className="channelShortDisplayContainerHeaderYouTubeIcon"/>
                                                                    <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                    {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                                </div>
                                                                {user &&
                                                                    (
                                                                        <>
                                                                            <Link to={`/union-profile/${user.unionName}`}>
                                                                                <div className="channelShortDisplayContainerProfile">
                                                                                    <img className="channelShortDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                    <img className="channelShortDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                    <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </>
                                                                    )
                                                                }
                                                                <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                                <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                                <div className="channelShortDisplayContainerStats">
                                                                    <div className="channelShortDisplayContainerRating">
                                                                        <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                        <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                    </div>
                                                                    <div className="channelShortDisplayContainerReviews">
                                                                        <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                        <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="channelShortDisplayContainerTopRight indexOdd">
                                                                <img className="channelShortDisplayContainerImg" src={channel.linkImg} alt="" />    
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                </div>
                                            <div className="channelShortDisplayContainerBottom">
                                                <span className="channelShortDisplayContainerFriendRecommendations">
                                                    Recommended by <b>Someone</b> and <b>3 others</b>.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`channelShortDisplay BOX_SHADOW ${user.energy}`}>
                            <Link to={`/channel/${channel._id}`}>
                                <div className="channelShortDisplay-container">
                                    <div className="channelShortDisplayContainer">
                                        <div className="channelShortDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="channelShortDisplayContainerTopLeft indexEven">
                                                            <img className="channelShortDisplayContainerImg" src={channel.linkImg} alt="" />
                                                        </div>
                                                        <div className="channelShortDisplayContainerTopRight indexEven">
                                                            <div className="channelShortDisplayContainerHeader">
                                                                <YouTube className="channelShortDisplayContainerHeaderYouTubeIcon"/> 
                                                                <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/flame-profile/${user.userName}`}>
                                                                            <div className="channelShortDisplayContainerProfile">
                                                                                <img className="channelShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                                <img className="channelShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                                <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                            <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                            <div className="channelShortDisplayContainerStats">
                                                                <div className="channelShortDisplayContainerRating">
                                                                    <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                </div>
                                                                <div className="channelShortDisplayContainerReviews">
                                                                    <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                    <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="channelShortDisplayContainerTopLeft indexOdd">
                                                            <div className="channelShortDisplayContainerHeader">
                                                                <YouTube className="channelShortDisplayContainerHeaderYouTubeIcon"/>
                                                                <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/flame-profile/${user.userName}`}>
                                                                            <div className="channelShortDisplayContainerProfile">
                                                                                <img className="channelShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                                <img className="channelShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                                <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                            <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                            <div className="channelShortDisplayContainerStats">
                                                                <div className="channelShortDisplayContainerRating">
                                                                    <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                </div>
                                                                <div className="channelShortDisplayContainerReviews">
                                                                    <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                    <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="channelShortDisplayContainerTopRight indexOdd">
                                                            <img className="channelShortDisplayContainerImg" src={channel.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="channelShortDisplayContainerBottom">
                                            <span className="channelShortDisplayContainerFriendRecommendations">
                                                Recommended by <b>Someone</b> and <b>3 others</b>.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </>
                )
            }
        </>
    )
};

export default ChannelShortDisplay;