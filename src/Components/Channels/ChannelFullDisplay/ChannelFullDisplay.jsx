import React, { useEffect, useState, useRef } from 'react';
import { MoreVert, YouTube } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { getStarRating } from "../../../Utils/misc/misc";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import axios from "axios";
import "./ChannelFullDisplay.css";




function ChannelFullDisplay({ channel, index }) {

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
                        <div className="channelFullDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`channelFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`channelFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`channelFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`channelFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`channelFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`channelFullDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <div className="channelFullDisplay-container">
                                    <div className="channelFullDisplayContainer">
                                        <div className="channelFullDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="channelFullDisplayContainerTopLeft indexEven">
                                                            <img className="channelFullDisplayContainerImg" src={channel.linkImg} alt="" />
                                                        </div>
                                                        <div className="channelFullDisplayContainerTopRight indexEven">
                                                            <div className="channelFullDisplayContainerHeader">
                                                                <YouTube className="channelFullDisplayContainerHeaderYouTubeIcon"/> 
                                                                <span className="channelFullDisplayContainerName">{channel.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="channelFullDisplayContainerProfile">
                                                                                <img className="channelFullDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="channelFullDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="channelFullDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="channelFullDisplayContainerDescription">{channel.description}</span>
                                                            <span className="channelFullDisplayContainerLink">{channel.link}</span>
                                                            <div className="channelFullDisplayContainerStats">
                                                                <div className="channelFullDisplayContainerRating">
                                                                    <span className="channelFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="channelFullDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                </div>
                                                                <div className="channelFullDisplayContainerReviews">
                                                                    <span className="channelFullDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                    <span className="channelFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="channelFullDisplayContainerTopLeft indexOdd">
                                                            <div className="channelFullDisplayContainerHeader">
                                                                <YouTube className="channelFullDisplayContainerHeaderYouTubeIcon"/>
                                                                <span className="channelFullDisplayContainerName">{channel.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="channelFullDisplayContainerProfile">
                                                                                <img className="channelFullDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="channelFullDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="channelFullDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="channelFullDisplayContainerDescription">{channel.description}</span>
                                                            <span className="channelFullDisplayContainerLink">{channel.link}</span>
                                                            <div className="channelFullDisplayContainerStats">
                                                                <div className="channelFullDisplayContainerRating">
                                                                    <span className="channelFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="channelFullDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                </div>
                                                                <div className="channelFullDisplayContainerReviews">
                                                                    <span className="channelFullDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                    <span className="channelFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="channelFullDisplayContainerTopRight indexOdd">
                                                            <img className="channelFullDisplayContainerImg" src={channel.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="channelFullDisplayContainerBottom">
                                            <span className="channelFullDisplayContainerFriendRecommendations">
                                                Recommended by <b>Someone</b> and <b>3 others</b>.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`channelFullDisplay BOX_SHADOW ${user.energy}`}>
                            <div className="channelFullDisplay-container">
                                <div className="channelFullDisplayContainer">
                                    <div className="channelFullDisplayContainerTop">
                                        {index % 2 == 0 ? 
                                            (
                                                <>
                                                    <div className="channelFullDisplayContainerTopLeft indexEven">
                                                        <img className="channelFullDisplayContainerImg" src={channel.linkImg} alt="" />
                                                    </div>
                                                    <div className="channelFullDisplayContainerTopRight indexEven">
                                                        <div className="channelFullDisplayContainerHeader">
                                                            <YouTube className="channelFullDisplayContainerHeaderYouTubeIcon"/> 
                                                            <span className="channelFullDisplayContainerName">{channel.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="channelFullDisplayContainerProfile">
                                                                            <img className="channelFullDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="channelFullDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="channelFullDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="channelFullDisplayContainerDescription">{channel.description}</span>
                                                        <span className="channelFullDisplayContainerLink">{channel.link}</span>
                                                        <div className="channelFullDisplayContainerStats">
                                                            <div className="channelFullDisplayContainerRating">
                                                                <span className="channelFullDisplayContainerStatText">Rating:</span>
                                                                <span className="channelFullDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                            </div>
                                                            <div className="channelFullDisplayContainerReviews">
                                                                <span className="channelFullDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                <span className="channelFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> 
                                            ) : (
                                                <>
                                                    <div className="channelFullDisplayContainerTopLeft indexOdd">
                                                        <div className="channelFullDisplayContainerHeader">
                                                            <YouTube className="channelFullDisplayContainerHeaderYouTubeIcon"/>
                                                            <span className="channelFullDisplayContainerName">{channel.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="channelFullDisplayContainerProfile">
                                                                            <img className="channelFullDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="channelFullDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="channelFullDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="channelFullDisplayContainerDescription">{channel.description}</span>
                                                        <span className="channelFullDisplayContainerLink">{channel.link}</span>
                                                        <div className="channelFullDisplayContainerStats">
                                                            <div className="channelFullDisplayContainerRating">
                                                                <span className="channelFullDisplayContainerStatText">Rating:</span>
                                                                <span className="channelFullDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                            </div>
                                                            <div className="channelFullDisplayContainerReviews">
                                                                <span className="channelFullDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                <span className="channelFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="channelFullDisplayContainerTopRight indexOdd">
                                                        <img className="channelFullDisplayContainerImg" src={channel.linkImg} alt="" />    
                                                    </div>
                                                </>
                                            )
                                        }
                                        </div>
                                    <div className="channelFullDisplayContainerBottom">
                                        <span className="channelFullDisplayContainerFriendRecommendations">
                                            Recommended by <b>Someone</b> and <b>3 others</b>.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
};

export default ChannelFullDisplay;