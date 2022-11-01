import { AddAPhoto } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./FlameProfilePics.css";


function FlameProfilePics() {

    const { user } = useSelector((state) => state.auth);

    
    
    return (
        <div className="flameProfilePics">
            <div className="flameProfilePics-container">
                <div className="flameProfilePicsRight">
                    <div className="flameProfilePicsDisplay-container BOX_SHADOW gray">
                        <div className="flameProfilePicsGreeting one">
                            {"Okay "} 
                            <span className="flameProfilePicsFirstName">{user.firstName}</span>
                            {","}
                        </div> 
                        <div className="flameProfilePicsFirstStep">
                            Let's set your avatar and backgound picture for your profile!  
                        </div>
                        <div className="flameProfilePicsFirstStepRequest">
                            {'(Both your avatar and background pictures will be hidden if your account is set to "Anonymous". '}
                            {'However, you still should set your photos as it will enhance your experience '}
                            {'as well as make you more personable to the users you befriend.)'} 
                        </div> 
                        <div className="flameProfilePicsAction One">
                            <div className="flameProfilePicsActionTitle">Choose your avatar picture.</div>
                            <div className="flameProfilePicsActionDesc">This will be displayed on your profile, posts, questions, blogs, as well as in searches.</div>
                            <div className="flameProfilePicsActionDisclaimer">(If your account is set to "Anonymous", this will show up as our default avatar picture and will not show up in searches.)</div>
                            <div className="flameProfilePicsAvatarContainer">
                                <img 
                                    className="flameProfilePicsProfileImg avatar" 
                                    src={user.profilePicture 
                                            ? user.profilePicture 
                                            : "/picBlanks/no-avatar.jpg"
                                        } 
                                        alt="" 
                                />
                                <button 
                                    className="flameProfilePicsEditorBtn Avatar"         
                                    //onClick={handleSubmit}
                                >
                                    Choose Your Avatar
                                </button>
                            </div>
                        </div>
                        <div className="flameProfilePicsAction Two">
                            <div className="flameProfilePicsActionTitle">Choose a Profile Background picture.</div>
                            <div className="flameProfilePicsActionDesc">This will be displayed on your profile as part of your introduction.</div>
                            <div className="flameProfilePicsActionDisclaimer">(If your account is set to "Anonymous", this will be just a blank area.)</div>
                            <div className="flameProfilePicsAvatarContainer">
                                <img 
                                    className="flameProfilePicsProfileImg background" 
                                    src={user.backgroundPicture 
                                        ?  user.backgroundPicture 
                                        : "/picBlanks/no-banner.jpg"
                                        } 
                                        alt="" 
                                />
                                <button 
                                    className="flameProfilePicsEditorBtn backhground"         
                                    //onClick={handleSubmit}
                                >
                                    Choose a background
                                </button>
                            </div>
                        </div>
                            <div className="flameProfilePicsBottom">
                                <div className="flameProfilePicsBtnContainer">
                                    <Link to="">
                                        <button 
                                            className="flameProfilePicsBackBtn" 
                                            
                                            //onClick={handleSubmit}
                                        >
                                            Back
                                        </button>
                                    </Link>
                                    <Link to="">
                                        <button 
                                            className="flameProfilePicsNextBtn" 
                                            type="button|submit|reset" 
                                            //onClick={handleSubmit}
                                        >
                                            Next
                                        </button>
                                    </Link>
                                </div>
                            </div>  
                    </div>
                </div>
            </div>
        </div> 
    )
};

export default  FlameProfilePics;