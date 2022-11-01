import React, { useEffect, useState, useRef } from 'react';
import { MoreVert } from "@material-ui/icons";
import { getStarRating } from "../../../Utils/misc/misc";
import axios from "axios";
import "./CoachFullDisplay.css";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import { Link } from 'react-router-dom';




function CoachFullDisplay({ coach, index }) {

    const ref = useRef();
    
    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    
    console.log(coach)
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
                        <div className="coachFullDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`coachFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`coachFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`coachFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`coachFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`coachFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`coachFullDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <div className="coachFullDisplay-container">
                                    <div className="coachFullDisplayContainer">
                                        <div className="coachFullDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="coachFullDisplayContainerTopLeft indexEven">
                                                            <img className="coachFullDisplayContainerImg" src={coach?.linkImg} alt="" />
                                                        </div>
                                                        <div className="coachFullDisplayContainerTopRight indexEven">
                                                            <div className="coachFullDisplayContainerHeader">
                                                                <span className="coachFullDisplayContainerName">{coach?.title}</span>
                                                                {/*<MoreVert className="coachFullDisplayContainerMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="coachFullDisplayContainerProfile">
                                                                                <img className="coachFullDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="coachFullDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="coachFullDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="coachFullDisplayContainerDescription">{coach.description}</span>
                                                            <span className="coachFullDisplayContainerLink">{coach.link}</span>
                                                            <div className="coachFullDisplayContainerStats">
                                                                <div className="coachFullDisplayContainerRating">
                                                                    <span className="coachFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="coachFullDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                                </div>
                                                                <div className="coachFullDisplayContainerReviews">
                                                                    <span className="coachFullDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                    <span className="coachFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="coachFullDisplayContainerTopLeft indexOdd">
                                                            <div className="coachFullDisplayContainerHeader">
                                                                <span className="coachFullDisplayContainerName">{coach.title}</span>
                                                                {/*<MoreVert className="coachFullDisplayContainerMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="coachFullDisplayContainerProfile">
                                                                                <img className="coachFullDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="coachFullDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="coachFullDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="coachFullDisplayContainerDescription">{coach.description}</span>
                                                            <span className="coachFullDisplayContainerLink">{coach.link}</span>
                                                            <div className="coachFullDisplayContainerStats">
                                                                <div className="coachFullDisplayContainerRating">
                                                                    <span className="coachFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="coachFullDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                                </div>
                                                                <div className="coachFullDisplayContainerReviews">
                                                                    <span className="coachFullDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                    <span className="coachFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="coachFullDisplayContainerTopRight indexOdd">
                                                            <img className="coachFullDisplayContainerImg" src={coach.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="coachFullDisplayContainerBottom">
                                            <span className="coachFullDisplayContainerFriendRecommendations">
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
                        <div className={`coachFullDisplay BOX_SHADOW ${user.spectrum}`}>
                            <div className="coachFullDisplay-container">
                                <div className="coachFullDisplayContainer">
                                    <div className="coachFullDisplayContainerTop">
                                        {index % 2 == 0 ? 
                                            (
                                                <>
                                                    <div className="coachFullDisplayContainerTopLeft indexEven">
                                                        <img className="coachFullDisplayContainerImg" src={coach.linkImg} alt="" />
                                                    </div>
                                                    <div className="coachFullDisplayContainerTopRight indexEven">
                                                        <div className="coachFullDisplayContainerHeader">
                                                            <span className="coachFullDisplayContainerName">{coach?.title}</span>
                                                            {/*<MoreVert className="coachFullDisplayContainerMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="coachFullDisplayContainerProfile">
                                                                            <img className="coachFullDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="coachFullDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="coachFullDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="coachFullDisplayContainerDescription">{coach.description}</span>
                                                        <span className="coachFullDisplayContainerLink">{coach.link}</span>
                                                        <div className="coachFullDisplayContainerStats">
                                                            <div className="coachFullDisplayContainerRating">
                                                                <span className="coachFullDisplayContainerStatText">Rating:</span>
                                                                <span className="coachFullDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                            </div>
                                                            <div className="coachFullDisplayContainerReviews">
                                                                <span className="coachFullDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                <span className="coachFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> 
                                            ) : (
                                                <>
                                                    <div className="coachFullDisplayContainerTopLeft indexOdd">
                                                        <div className="coachFullDisplayContainerHeader">
                                                            <span className="coachFullDisplayContainerName">{coach.title}</span>
                                                            {/*<MoreVert className="coachFullDisplayContainerMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="coachFullDisplayContainerProfile">
                                                                            <img className="coachFullDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="coachFullDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="coachFullDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="coachFullDisplayContainerDescription">{coach.description}</span>
                                                        <span className="coachFullDisplayContainerLink">{coach.link}</span>
                                                        <div className="coachFullDisplayContainerStats">
                                                            <div className="coachFullDisplayContainerRating">
                                                                <span className="coachFullDisplayContainerStatText">Rating:</span>
                                                                <span className="coachFullDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                            </div>
                                                            <div className="coachFullDisplayContainerReviews">
                                                                <span className="coachFullDisplayContainerStatCount">{coach.reviews.length}</span>
                                                                <span className="coachFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="coachFullDisplayContainerTopRight indexOdd">
                                                        <img className="coachFullDisplayContainerImg" src={coach.linkImg} alt="" />    
                                                    </div>
                                                </>
                                            )
                                        }
                                        </div>
                                    <div className="coachFullDisplayContainerBottom">
                                        <span className="coachFullDisplayContainerFriendRecommendations">
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

export default CoachFullDisplay;