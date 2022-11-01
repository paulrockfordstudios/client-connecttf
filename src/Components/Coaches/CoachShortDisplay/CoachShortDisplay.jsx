import React, { useEffect, useState, useRef } from 'react';
import { getStarRating } from "../../../Utils/misc/misc";
import axios from "axios";
import "./CoachShortDisplay.css";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import { Link } from 'react-router-dom';




function CoachShortDisplay({ coach, index }) {

    const ref = useRef();
    
    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = coach.union 
            ? await axios.get(`/unions?unionId=${coach.unionId}`)
            : await axios.get(`/users?userId=${coach.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [coach]);

    useEffect(() => {
        if (user.unionName) {
            const getHeight = () => {
                const coachHeight = ref.current.clientHeight;
                setHeight(coachHeight);
            }
        getHeight();
        }
    }, [user]);

    
    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="coachShortDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`coachShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`coachShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`coachShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`coachShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`coachShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`coachShortDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <Link to={`/coach/${coach._id}`}>
                                    <div className="coachShortDisplay-container">
                                        <div className="coachShortDisplayContainer">
                                            <div className="coachShortDisplayContainerTop">
                                                {index % 2 == 0 ? 
                                                    (
                                                        <>
                                                            <div className="coachShortDisplayContainerTopLeft indexEven">
                                                                <img className="coachShortDisplayContainerImg" src={coach.linkImg} alt="" />
                                                            </div>
                                                            <div className="coachShortDisplayContainerTopRight indexEven">
                                                                <div className="coachShortDisplayContainerHeader">
                                                                    <span className="coachShortDisplayContainerName">{coach.title}</span>
                                                                    {/*<MoreVert className="coachShortDisplayContainerMoreVert" />*/}
                                                                </div>
                                                                {user &&
                                                                    (
                                                                        <>
                                                                            <Link to={`/union-profile/${user.unionName}`}>
                                                                                <div className="coachShortDisplayContainerProfile">
                                                                                    <img className="coachShortDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                    <img className="coachShortDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                    <span className="coachShortDisplayContainerProfileName">{user.profileName}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </>
                                                                    )
                                                                }
                                                                <span className="coachShortDisplayContainerDescription">{coach.description}</span>
                                                                <span className="coachShortDisplayContainerLink">{coach.link}</span>
                                                                <div className="coachShortDisplayContainerStats">
                                                                    <div className="coachShortDisplayContainerRating">
                                                                        <span className="coachShortDisplayContainerStatText">Rating:</span>
                                                                        <span className="coachShortDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                                    </div>
                                                                    <div className="coachShortDisplayContainerReviews">
                                                                        <span className="coachShortDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                        <span className="coachShortDisplayContainerStatText">Reviews</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> 
                                                    ) : (
                                                        <>
                                                            <div className="coachShortDisplayContainerTopLeft indexOdd">
                                                                <div className="coachShortDisplayContainerHeader">
                                                                    <span className="coachShortDisplayContainerName">{coach.title}</span>
                                                                    {/*<MoreVert className="coachShortDisplayContainerMoreVert" />*/}
                                                                </div>
                                                                {user &&
                                                                    (
                                                                        <>
                                                                            <Link to={`/union-profile/${user.unionName}`}>
                                                                                <div className="coachShortDisplayContainerProfile">
                                                                                    <img className="coachShortDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                    <img className="coachShortDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                    <span className="coachShortDisplayContainerProfileName">{user.profileName}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </>
                                                                    )
                                                                }
                                                                <span className="coachShortDisplayContainerDescription">{coach.description}</span>
                                                                <span className="coachShortDisplayContainerLink">{coach.link}</span>
                                                                <div className="coachShortDisplayContainerStats">
                                                                    <div className="coachShortDisplayContainerRating">
                                                                        <span className="coachShortDisplayContainerStatText">Rating:</span>
                                                                        <span className="coachShortDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                                    </div>
                                                                    <div className="coachShortDisplayContainerReviews">
                                                                        <span className="coachShortDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                        <span className="coachShortDisplayContainerStatText">Reviews</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="coachShortDisplayContainerTopRight indexOdd">
                                                                <img className="coachShortDisplayContainerImg" src={coach.linkImg} alt="" />    
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                </div>
                                            <div className="coachShortDisplayContainerBottom">
                                                <span className="coachShortDisplayContainerFriendRecommendations">
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
                        <div className={`coachShortDisplay BOX_SHADOW ${user.spectrum}`}>
                            <Link to={`/coach/${coach._id}`}>
                                <div className="coachShortDisplay-container">
                                    <div className="coachShortDisplayContainer">
                                        <div className="coachShortDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="coachShortDisplayContainerTopLeft indexEven">
                                                            <img className="coachShortDisplayContainerImg" src={coach.linkImg} alt="" />
                                                        </div>
                                                        <div className="coachShortDisplayContainerTopRight indexEven">
                                                            <div className="coachShortDisplayContainerHeader">
                                                                <span className="coachShortDisplayContainerName">{coach.title}</span>
                                                                {/*<MoreVert className="coachShortDisplayContainerMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/flame-profile/${user.userName}`}>
                                                                            <div className="coachShortDisplayContainerProfile">
                                                                                <img className="coachShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                                <img className="coachShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                                <span className="coachShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="coachShortDisplayContainerDescription">{coach.description}</span>
                                                            <span className="coachShortDisplayContainerLink">{coach.link}</span>
                                                            <div className="coachShortDisplayContainerStats">
                                                                <div className="coachShortDisplayContainerRating">
                                                                    <span className="coachShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="coachShortDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                                </div>
                                                                <div className="coachShortDisplayContainerReviews">
                                                                    <span className="coachShortDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                    <span className="coachShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="coachShortDisplayContainerTopLeft indexOdd">
                                                            <div className="coachShortDisplayContainerHeader">
                                                                <span className="coachShortDisplayContainerName">{coach.title}</span>
                                                                {/*<MoreVert className="coachShortDisplayContainerMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/flame-profile/${user.userName}`}>
                                                                            <div className="coachShortDisplayContainerProfile">
                                                                                <img className="coachShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                                <img className="coachShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                                <span className="coachShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="coachShortDisplayContainerDescription">{coach.description}</span>
                                                            <span className="coachShortDisplayContainerLink">{coach.link}</span>
                                                            <div className="coachShortDisplayContainerStats">
                                                                <div className="coachShortDisplayContainerRating">
                                                                    <span className="coachShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="coachShortDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                                </div>
                                                                <div className="coachShortDisplayContainerReviews">
                                                                    <span className="coachShortDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                    <span className="coachShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="coachShortDisplayContainerTopRight indexOdd">
                                                            <img className="coachShortDisplayContainerImg" src={coach.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="coachShortDisplayContainerBottom">
                                            <span className="coachShortDisplayContainerFriendRecommendations">
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

export default CoachShortDisplay;