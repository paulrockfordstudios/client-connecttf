import React, { useEffect, useState, useRef } from 'react';
import { MoreVert, YouTube } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { getStarRating } from "../../../Utils/misc/misc";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import axios from "axios";
import "./MedFullDisplay.css";




function MedFullDisplay({ medium, index }) {

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
                        <div className="medFullDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`medFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`medFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`medFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`medFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`medFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`medFullDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <div className="medFullDisplay-container">
                                    <div className="medFullDisplayContainer">
                                        <div className="medFullDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="medFullDisplayContainerTopLeft indexEven">
                                                            <img className="medFullDisplayContainerImg" src={Med.linkImg} alt="" />
                                                        </div>
                                                        <div className="medFullDisplayContainerTopRight indexEven">
                                                            <div className="medFullDisplayContainerHeader">
                                                                <YouTube className="medFullDisplayContainerHeaderYouTubeIcon"/> 
                                                                <span className="medFullDisplayContainerName">{Med.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="coachDisplayProfile">
                                                                                <img className="coachDisplayProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="coachDisplayProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="coachDisplayProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="medFullDisplayContainerDescription">{Med.description}</span>
                                                            <span className="medFullDisplayContainerLink">{Med.link}</span>
                                                            <div className="medFullDisplayContainerStats">
                                                                <div className="medFullDisplayContainerRating">
                                                                    <span className="medFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="medFullDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                                </div>
                                                                <div className="medFullDisplayContainerReviews">
                                                                    <span className="medFullDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                    <span className="medFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="medFullDisplayContainerTopLeft indexOdd">
                                                            <div className="medFullDisplayContainerHeader">
                                                                <YouTube className="medFullDisplayContainerHeaderYouTubeIcon"/>
                                                                <span className="medFullDisplayContainerName">{Med.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="coachDisplayProfile">
                                                                                <img className="coachDisplayProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="coachDisplayProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="coachDisplayProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="medFullDisplayContainerDescription">{Med.description}</span>
                                                            <span className="medFullDisplayContainerLink">{Med.link}</span>
                                                            <div className="medFullDisplayContainerStats">
                                                                <div className="medFullDisplayContainerRating">
                                                                    <span className="medFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="medFullDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                                </div>
                                                                <div className="medFullDisplayContainerReviews">
                                                                    <span className="medFullDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                    <span className="medFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="medFullDisplayContainerTopRight indexOdd">
                                                            <img className="medFullDisplayContainerImg" src={Med.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="medFullDisplayContainerBottom">
                                            <span className="medFullDisplayContainerFriendRecommendations">
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
                        <div className={`medFullDisplay BOX_SHADOW ${user.energy}`}>
                            <div className="medFullDisplay-container">
                                <div className="medFullDisplayContainer">
                                    <div className="medFullDisplayContainerTop">
                                        {index % 2 == 0 ? 
                                            (
                                                <>
                                                    <div className="medFullDisplayContainerTopLeft indexEven">
                                                        <img className="medFullDisplayContainerImg" src={Med.linkImg} alt="" />
                                                    </div>
                                                    <div className="medFullDisplayContainerTopRight indexEven">
                                                        <div className="medFullDisplayContainerHeader">
                                                            <YouTube className="medFullDisplayContainerHeaderYouTubeIcon"/> 
                                                            <span className="medFullDisplayContainerName">{Med.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="coachDisplayProfile">
                                                                            <img className="coachDisplayProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="coachDisplayProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="coachDisplayProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="medFullDisplayContainerDescription">{Med.description}</span>
                                                        <span className="medFullDisplayContainerLink">{Med.link}</span>
                                                        <div className="medFullDisplayContainerStats">
                                                            <div className="medFullDisplayContainerRating">
                                                                <span className="medFullDisplayContainerStatText">Rating:</span>
                                                                <span className="medFullDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                            </div>
                                                            <div className="medFullDisplayContainerReviews">
                                                                <span className="medFullDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                <span className="medFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> 
                                            ) : (
                                                <>
                                                    <div className="medFullDisplayContainerTopLeft indexOdd">
                                                        <div className="medFullDisplayContainerHeader">
                                                            <YouTube className="medFullDisplayContainerHeaderYouTubeIcon"/>
                                                            <span className="medFullDisplayContainerName">{Med.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="medFullDisplayContainerProfile">
                                                                            <img className="medFullDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="medFullDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="medFullDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="medFullDisplayContainerDescription">{Med.description}</span>
                                                        <span className="medFullDisplayContainerLink">{Med.link}</span>
                                                        <div className="medFullDisplayContainerStats">
                                                            <div className="medFullDisplayContainerRating">
                                                                <span className="medFullDisplayContainerStatText">Rating:</span>
                                                                <span className="medFullDisplayContainerStarField">{getStarRating(Med.rating)}</span>
                                                            </div>
                                                            <div className="medFullDisplayContainerReviews">
                                                                <span className="medFullDisplayContainerStatCount">{Med.reviews.length}</span>
                                                                <span className="medFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="medFullDisplayContainerTopRight indexOdd">
                                                        <img className="medFullDisplayContainerImg" src={Med.linkImg} alt="" />    
                                                    </div>
                                                </>
                                            )
                                        }
                                        </div>
                                    <div className="medFullDisplayContainerBottom">
                                        <span className="medFullDisplayContainerFriendRecommendations">
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

export default MedFullDisplay;