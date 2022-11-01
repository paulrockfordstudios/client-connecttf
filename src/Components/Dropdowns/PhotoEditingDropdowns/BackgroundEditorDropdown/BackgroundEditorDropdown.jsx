import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { pBEOpen, cdpBackgroundOpen } from '../../../../Redux/AuthSlice';
import "./BackgroundEditorDropdown.css";

function BackgroundEditorDropdown({ setEditBPActive }) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const editHandler = () => {
        dispatch(pBEOpen());
    };

    const cdpBackgroundHandler = () => {
        dispatch(cdpBackgroundOpen());
    };

    


    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="backgroundEditorDropdownContainer">
                            {user.spectrum === "rainbow" && <div className={`backgroundEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)"}} />}
                            {user.spectrum === "silver" && <div className={`backgroundEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)"}} />}
                            {user.spectrum === "gold" && <div className={`backgroundEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)"}} />}
                            {user.spectrum === "platinum" && <div className={`backgroundEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)"}} />}
                            {user.spectrum === "diamond" && <div className={`backgroundEditorDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)"}} />}
                            <div className={`backgroundEditorDropdown-Container union BOX_SHADOW ${user.spectrum}`}>
                                <span className="backgroundEditorDropdownOption hov edit" onClick={editHandler}>
                                    Edit
                                </span>
                                {user.spectrum === "diamond" 
                                    ? <img className="backgroundEditorDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                    : <hr className={`backgroundEditorDropdownHr ${user.spectrum}`} />
                                } 
                                <span className={`backgroundEditorDropdownOption ${user.backgroundPicture ? "hov" : "disabled"} remove`} onClick={user.backgroundPicture ? cdpBackgroundHandler : null}>Remove</span>
                                {user.spectrum === "diamond" 
                                    ? <img className="backgroundEditorDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                    : <hr className={`backgroundEditorDropdownHr ${user.spectrum}`} />
                                } 
                                <span className="backgroundEditorDropdownOption hov cancel" onClick={() => setEditBPActive(false)}>
                                    Cancel
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`backgroundEditorDropdown-Container BOX_SHADOW ${user.energy}`}>
                            <span className="backgroundEditorDropdownOption hov edit" onClick={editHandler}>Edit</span>
                            <hr className={`backgroundEditorDropdownHr ${user.energy}`} />
                            <span className={`backgroundEditorDropdownOption ${user.backgroundPicture ? "hov" : "disabled"} remove`} onClick={user.backgroundPicture ? cdpBackgroundHandler : null}>Remove</span>
                            <hr className={`backgroundEditorDropdownHr ${user.energy}`} />
                            <span className="backgroundEditorDropdownOption hov edit" onClick={() => setEditBPActive(false)}>Cancel</span> 
                        </div>
                    </>
                )
            }
        </>
    )
}

export default BackgroundEditorDropdown;