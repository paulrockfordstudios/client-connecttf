import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { newFlameAvatar, newUnionAvatar, pAEOpen, cdpAvatarOpen } from '../../../../Redux/AuthSlice';
import "./AvatarEditorDropdown.css";

function AvatarEditorDropdown({ setEditPPActive }) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const editHandler = () => {
        dispatch(pAEOpen());
    };

    const cdpAvatarHandler = () => {
        dispatch(cdpAvatarOpen());
    };

    


    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="avatarEditorDropdownContainer">
                            {user.spectrum === "rainbow" && <div className={`avatarEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)"}} />}
                            {user.spectrum === "silver" && <div className={`avatarEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)"}} />}
                            {user.spectrum === "gold" && <div className={`avatarEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)"}} />}
                            {user.spectrum === "platinum" && <div className={`avatarEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)"}} />}
                            {user.spectrum === "diamond" && <div className={`avatarEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)"}} />}
                            <div className={`avatarEditorDropdown-Container union BOX_SHADOW ${user.spectrum}`}>
                                <span className="avatarEditorDropdownOption hov edit" onClick={editHandler}>
                                    Edit
                                </span>
                                {user.spectrum === "diamond" 
                                    ? <img className="avatarEditorDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                    : <hr className={`avatarEditorDropdownHr ${user.spectrum}`} />
                                } 
                                <span className={`avatarEditorDropdownOption ${user.unionProfilePicture ? "hov" : "disabled"} remove`} onClick={user.unionProfilePicture ? cdpAvatarHandler : null}>Remove</span>
                                {user.spectrum === "diamond" 
                                    ? <img className="avatarEditorDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                    : <hr className={`avatarEditorDropdownHr ${user.spectrum}`} />
                                } 
                                <span className="avatarEditorDropdownOption hov cancel" onClick={() => setEditPPActive(false)}>
                                    Cancel
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`avatarEditorDropdown-Container BOX_SHADOW ${user.energy}`}>
                            <span className="avatarEditorDropdownOption hov edit" onClick={editHandler}>Edit</span>
                            <hr className={`avatarEditorDropdownHr ${user.energy}`} />
                            <span className={`avatarEditorDropdownOption ${user.profilePicture ? "hov" : "disabled"} remove`} onClick={user.profilePicture ? cdpAvatarHandler : null}>Remove</span>
                            <hr className={`avatarEditorDropdownHr ${user.energy}`} />
                            <span className="avatarEditorDropdownOption hov edit" onClick={() => setEditPPActive(false)}>Cancel</span> 
                        </div>
                    </>
                )
            }
        </>
    )
}

export default AvatarEditorDropdown;