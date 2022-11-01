import React, { useEffect, useState, useRef } from 'react';
import { MoreVert, YouTube } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { getStarRating } from "../../../Utils/misc/misc";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import axios from "axios";
import "./MedShortDisplay.css";




function MedShortDisplay({ medium, index }) {

    const ref = useRef()

    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = Med.union 
            ? await axios.get(`/unions?unionId=${Medium.unionId}`)
            : await axios.get(`/users?userId=${Medium.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [medium]);

    useEffect(() => {
        if (user.unionName) {
            const getHeight = () => {
                const MedHeight = ref.current.clientHeight;
                setHeight(MedHeight);
            }
        getHeight();
        }
    }, [user]);

    
    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="medShortDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`medShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`medShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`medShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`medShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`medShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`medShortDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <div className="medShortDisplay-container">
                                    <div className="medShortDisplayContainer">
                                        <div className="medShortDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="medShortDisplayContainerTopLeft indexEven">
                                                            <img className="medShortDisplayContainerImg" src={Med.linkImg} alt="" />
                                                        </div>
                                                        <div className="medShortDisplayContainerTopRight indexEven">
                                                            <div className="medShortDisplayContainerHeader">
                                                                <YouTube className="medShortDisplayContainerHeaderYouTubeIcon"/> 
                                                                <span className="medShortDisplayContainerName">{Med.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="medShortDisplayContainerProfile">
                                                                                <img className="medShortDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="medShortDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="medShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="medShortDisplayContainerDescription">{Med.description}</span>
                                                            <span className="medShortDisplayContainerLink">{Med.link}</span>
                                                            <div className="medShortDisplayContainerStats">
                                                                <div className="medShortDisplayContainerRating">
                                                                    <span className="medShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="medShortDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                                </div>
                                                                <div className="medShortDisplayContainerReviews">
                                                                    <span className="medShortDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                    <span className="medShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="medShortDisplayContainerTopLeft indexOdd">
                                                            <div className="medShortDisplayContainerHeader">
                                                                <YouTube className="medShortDisplayContainerHeaderYouTubeIcon"/>
                                                                <span className="medShortDisplayContainerName">{Med.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="medShortDisplayContainerProfile">
                                                                                <img className="medShortDisplayContainerProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="medShortDisplayContainerProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="medShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="medShortDisplayContainerDescription">{Med.description}</span>
                                                            <span className="medShortDisplayContainerLink">{Med.link}</span>
                                                            <div className="medShortDisplayContainerStats">
                                                                <div className="medShortDisplayContainerRating">
                                                                    <span className="medShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="medShortDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                                </div>
                                                                <div className="medShortDisplayContainerReviews">
                                                                    <span className="medShortDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                    <span className="medShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="medShortDisplayContainerTopRight indexOdd">
                                                            <img className="medShortDisplayContainerImg" src={Med.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="medShortDisplayContainerBottom">
                                            <span className="medShortDisplayContainerFriendRecommendations">
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
                        <div className={`medShortDisplay BOX_SHADOW ${user.energy}`}>
                            <div className="medShortDisplay-container">
                                <div className="medShortDisplayContainer">
                                    <div className="medShortDisplayContainerTop">
                                        {index % 2 == 0 ? 
                                            (
                                                <>
                                                    <div className="medShortDisplayContainerTopLeft indexEven">
                                                        <img className="medShortDisplayContainerImg" src={Med.linkImg} alt="" />
                                                    </div>
                                                    <div className="medShortDisplayContainerTopRight indexEven">
                                                        <div className="medShortDisplayContainerHeader">
                                                            <YouTube className="medShortDisplayContainerHeaderYouTubeIcon"/> 
                                                            <span className="medShortDisplayContainerName">{Med.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="medShortDisplayContainerProfile">
                                                                            <img className="medShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="medShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="medShortDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="medShortDisplayContainerDescription">{Med.description}</span>
                                                        <span className="medShortDisplayContainerLink">{Med.link}</span>
                                                        <div className="medShortDisplayContainerStats">
                                                            <div className="medShortDisplayContainerRating">
                                                                <span className="medShortDisplayContainerStatText">Rating:</span>
                                                                <span className="medShortDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                            </div>
                                                            <div className="medShortDisplayContainerReviews">
                                                                <span className="medShortDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                <span className="medShortDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> 
                                            ) : (
                                                <>
                                                    <div className="medShortDisplayContainerTopLeft indexOdd">
                                                        <div className="medShortDisplayContainerHeader">
                                                            <YouTube className="medShortDisplayContainerHeaderYouTubeIcon"/>
                                                            <span className="medShortDisplayContainerName">{Med.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="medShortDisplayContainerProfile">
                                                                            <img className="medShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="medShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="medShortDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="medShortDisplayContainerDescription">{Med.description}</span>
                                                        <span className="medShortDisplayContainerLink">{Med.link}</span>
                                                        <div className="medShortDisplayContainerStats">
                                                            <div className="medShortDisplayContainerRating">
                                                                <span className="medShortDisplayContainerStatText">Rating:</span>
                                                                <span className="medShortDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                            </div>
                                                            <div className="medShortDisplayContainerReviews">
                                                                <span className="medShortDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                <span className="medShortDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="medShortDisplayContainerTopRight indexOdd">
                                                        <img className="medShortDisplayContainerImg" src={Med.linkImg} alt="" />    
                                                    </div>
                                                </>
                                            )
                                        }
                                        </div>
                                    <div className="medShortDisplayContainerBottom">
                                        <span className="medShortDisplayContainerFriendRecommendations">
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

export default MedShortDisplay;