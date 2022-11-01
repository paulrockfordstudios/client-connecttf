import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import axios from 'axios';
import "./AcceptedRequest.css";
import { Check, People, Person } from '@material-ui/icons';
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import { 
    acceptedFollowing, 
    acceptedFollower, 
    acceptedUnrequestFollow,
    
    setCv1, 
    cv1Up,   
    cv1Open, 
    setCv2, 
    cv2Up, 
    cv2Open, 
    setCv3, 
    cv3Up, 
    cv3Open, 
} from "../../../Redux/AuthSlice";



function AcceptedRequest({fr, folMDD}) {

    const dispatch = useDispatch();
    const { 
        user: currentUser,
        conv1,
        conv2,
        conv3,
     
        c1Open, 
        c1Up, 
        c2Open, 
        c2Up, 
        c3Open, 
        c3Up, 
    } = useSelector((state) => state.auth);

    const [user, setUser] = useState({});
    const [ frSeen, setFrSeen ] = useState(fr.initialSeen);
    const [ frAccepted, setFrAccepted ] = useState(fr.requestAccepted);
    const [ frRejected, setFrRejected ] = useState(fr.requestRejected);
    const [ retort, setRetort ] = useState("");
    const [ retortDisplay, setRetortDisplay ] = useState("");
    
    const [ fade, setFade ] = useState(100);
    const [ retortChange, setRetortChange ] = useState(false);
    const [ initialize, setInitialize ] = useState(false);
    const [ conv, setConv ] = useState({});
    const conversation = conv
    const [ loading, setLoading ] = useState(true);
   
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = fr.unionRequesteeId
                    ? await axios.get(`/unions?unionId=${fr.unionRequesteeId}`)
                    : await axios.get(`/users?userId=${fr.flameRequesteeId}`)
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
                                <Link className={`acceptedRequest`} to={user.isAnonymous ? `/union-profile/id/${user._id}` : `/union-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedRequestBackgroundTheme ${frSeen? "seen" : "unseen"} ${user?.spectrum}`} />
                                    <hr className={`acceptedRequestHr top ${user?.spectrum}`} />
                                    <div className={`acceptedRequestContainer`}>
                                        <div className="acceptedRequestLeft">
                                            <img 
                                                className={`acceptedRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? "/picBlanks/no-union-avatar.jpg" 
                                                    : user?.unionProfilePicture 
                                                        ? user?.unionProfilePicture 
                                                        : "/picBlanks/no-union-avatar.jpg"
                                                }
                                                alt="" 
                                            />
                                            <img className="acceptedRequestIcon" src={spectrumIcon(user?.spectrum)} alt="" />
                                        </div>
                                        <div className={`acceptedRequestRight ${user?.spectrum}`}>
                                            <div className="acceptedRequestRightTop">
                                                <div className="acceptedRequestTitle">
                                                    <div className="acceptedRequestTitleLeft">
                                                        <span className="acceptedRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedRequestAction">
                                                            have accepted your befriend request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestTitleRight ${user?.spectrum}`}>
                                                        <People className="acceptedRequestRetortIcon people"/>
                                                        <Check className="acceptedRequestRetortIcon check"/>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedRequestRightBottom">
                                                <div className="acceptedRequestRetort">
                                                    <div className="acceptedRequestRetortLeft friendship">
                                                        <span>
                                                            {`You and ${user.profileName} are now `}
                                                            <b style={{ color: "#4a76fd" }}>connected</b>
                                                            <b style={{ color: "#e639af" }}>!</b>
                                                            {/*` Send ${accepted?.sex ? accepted.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestRetortRight friendship ${user.spectrum}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedRequestHr bottom ${user?.spectrum}`} />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className={`acceptedRequest`} to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedRequestBackgroundTheme ${frSeen? "seen" : "unseen"} ${user?.energy}`} />
                                    <hr className={`acceptedRequestHr top ${user?.energy}`} />
                                    <div className={`acceptedRequestContainer`}>
                                        <div className="acceptedRequestLeft">
                                            <img 
                                                className={`acceptedRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? "/picBlanks/no-avatar.jpg" 
                                                    : user?.profilePicture 
                                                        ? user?.profilePicture 
                                                        : "/picBlanks/no-avatar.jpg"
                                                }
                                                alt="" 
                                            />
                                            <img className="acceptedRequestIcon" src={energyIcon(user?.energy)} alt="" />
                                        </div>
                                        <div className={`acceptedRequestRight ${user?.energy}`}>
                                            <div className="acceptedRequestRightTop">
                                                <div className="acceptedRequestTitle">
                                                    <div className="acceptedRequestTitleLeft">
                                                        <span className="acceptedRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedRequestAction">
                                                            has accepted your befriend request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestTitleRight ${user?.energy}`}>
                                                        <Person className="acceptedRequestRetortIcon people"/>
                                                        <Check className="acceptedRequestRetortIcon check"/>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedRequestRightBottom">
                                                <div className="acceptedRequestRetort">
                                                    <div className="acceptedRequestRetortLeft friendship">
                                                        <span>
                                                            {`You and ${user.profileName} are now `}
                                                            <b style={{ color: "#4a76fd" }}>connected</b>
                                                            <b style={{ color: "#e639af" }}>!</b>                                                                {/*` Send ${accepted?.sex ? accepted.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestRetortRight friendship ${user.energy}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedRequestHr bottom ${user?.energy}`} />
                                </Link>
                            </>
                        )
                    }
                </>
            }
        </>
    )
}

export default AcceptedRequest;