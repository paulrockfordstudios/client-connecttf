import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./AcceptedSubscribeRequest.css";
import { Check, People, Person } from '@material-ui/icons';
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';



function AcceptedSubscribeRequest({ sr }) {

    const [user, setUser] = useState({});
    const [ srSeen, setSrSeen ] = useState(sr.initialSeen);
    
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = sr.unionRequesteeId
                    ? await axios.get(`/unions?unionId=${sr.unionRequesteeId}`)
                    : await axios.get(`/users?userId=${sr.flameRequesteeId}`)
                setUser(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, []);


    return (
        <>
            {user &&
                <>
                    {user.unionName ?
                        (
                            <>
                                <Link className={`acceptedSubRequest`} to={user.isAnonymous ? `/union-profile/id/${user._id}` : `/union-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedSubRequestBackgroundTheme ${srSeen? "seen" : "unseen"} ${user?.spectrum}`} />
                                    <hr className={`acceptedSubRequestHr top ${user?.spectrum}`} />
                                    <div className={`acceptedSubRequestContainer`}>
                                        <div className="acceptedSubRequestLeft">
                                            <img 
                                                className={`acceptedSubRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? "/picBlanks/no-union-avatar.jpg" 
                                                    : user?.unionProfilePicture 
                                                        ? user?.unionProfilePicture 
                                                        : "/picBlanks/no-union-avatar.jpg"
                                                }
                                                alt="" 
                                            />
                                            <img className="acceptedSubRequestIcon" src={spectrumIcon(user?.spectrum)} alt="" />
                                        </div>
                                        <div className={`acceptedSubRequestRight ${user?.spectrum}`}>
                                            <div className="acceptedSubRequestRightTop">
                                                <div className="acceptedSubRequestTitle">
                                                    <div className="acceptedSubRequestTitleLeft">
                                                        <span className="acceptedSubRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedSubRequestAction">
                                                            have accepted your subscribe request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestTitleRight ${user?.spectrum}`}>
                                                        <People className="acceptedSubRequestRetortIcon people"/>
                                                        <Check className="acceptedSubRequestRetortIcon check"/>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedSubRequestRightBottom">
                                                <div className="acceptedSubRequestRetort">
                                                    <div className="acceptedSubRequestRetortLeft friendship">
                                                        <span>
                                                            {`You are now subscribed to ${user?.profileName}. `}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestRetortRight friendship ${user.spectrum}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedSubRequestHr bottom ${user?.spectrum}`} />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className={`acceptedSubRequest`} to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedSubRequestBackgroundTheme ${srSeen? "seen" : "unseen"} ${user?.energy}`} />
                                    <hr className={`acceptedSubRequestHr top ${user?.energy}`} />
                                    <div className={`acceptedSubRequestContainer`}>
                                        <div className="acceptedSubRequestLeft">
                                            <img 
                                                className={`acceptedSubRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? "/picBlanks/no-avatar.jpg" 
                                                    : user?.profilePicture 
                                                        ? user?.profilePicture 
                                                        : "/picBlanks/no-avatar.jpg"
                                                }
                                                alt="" 
                                            />
                                            <img className="acceptedSubRequestIcon" src={energyIcon(user?.energy)} alt="" />
                                        </div>
                                        <div className={`acceptedSubRequestRight ${user?.energy}`}>
                                            <div className="acceptedSubRequestRightTop">
                                                <div className="acceptedSubRequestTitle">
                                                    <div className="acceptedSubRequestTitleLeft">
                                                        <span className="acceptedSubRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedSubRequestAction">
                                                            has accepted your subscribe request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestTitleRight ${user?.energy}`}>
                                                        <Person className="acceptedSubRequestRetortIcon people"/>
                                                        <Check className="acceptedSubRequestRetortIcon check"/>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedSubRequestRightBottom">
                                                <div className="acceptedSubRequestRetort">
                                                    <div className="acceptedSubRequestRetortLeft friendship">
                                                        <span>
                                                            {`You are now subscribed to ${user?.profileName}. `}                                                             {/*` Send ${accepted?.sex ? accepted.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestRetortRight friendship ${user.energy}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedSubRequestHr bottom ${user?.energy}`} />
                                </Link>
                            </>
                        )
                    }
                </>
            }
        </>
    )
}

export default AcceptedSubscribeRequest;