import React, { useEffect, useState} from 'react';
import axios from "axios";
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import "./ChatMessage.css";

function ChatMessage({message, index, mSender, own, currentUser, cb}) {

    const [user, setUser] = useState({});
   
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    useEffect(() => {
        const flameFriendId = message.flameSenderId;
        const unionFriendId = message.unionSenderId;
        const getUser = async () => {
            try {
                const res = flameFriendId
                    ? await axios.get(`/users?userId=${flameFriendId}`)
                    : await axios.get(`/unions?unionId=${unionFriendId}`)
                setUser(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, [message]);
    
    return (
        <div className={own ? `chatMessage own ` : `chatMessage them`}>
            <div className="chatMessageTop">
                {own ? (
                    <>
                        <div className={`chatMessageContainer own ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="chatMessageText"  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message.text)}} />
                            {message.photos.length > 0 &&
                                <div className="photoFullDisplay-container">
                                    <ul className="cbPhotoList">      
                                        {message.photos.map((photo, index) => (
                                            <li className="photos" key={index}>
                                                <img className="cbPostImg" src={PF + photo} alt="" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                        {user.unionName
                            ? <img className="chatMessageProfilePic" src={user.unionProfilePicture? user.unionProfilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                            : <img className="chatMessageProfilePic" src={user.isAnonymous ? "/picBlanks/no-avatar.jpg" : user.profilePicture? user.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                        }  
                    </>
                ) : (
                    <>
                        {user.unionName 
                            ? <img className="chatMessageProfilePic" src={user.unionProfilePicture? user.unionProfilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                            : <img className="chatMessageProfilePic" src={user.isAnonymous ? "/picBlanks/no-avatar.jpg" : user.profilePicture? user.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />    
                        }
                        <div className={`chatMessageContainer them ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="chatMessageText"  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message.text)}} />
                            {message.photos.length > 0 &&
                                <div className="photoFullDisplay-container">
                                    <ul className="cbPhotoList">      
                                        {message.photos.map((photo, index) => (
                                            <li className="photos" key={index}>
                                                <img className="cbPostImg" src={PF + photo} alt="" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="chatMessageBottom">{format(message.createdAt)}</div> 
        </div> 
    )
};

export default ChatMessage;