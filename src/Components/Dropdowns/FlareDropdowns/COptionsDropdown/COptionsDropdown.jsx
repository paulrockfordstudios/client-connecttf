import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';

import "./COptionsDropdown.css";

function COptionsDropdown({ user }) {

    
    const { user: currentUser } = useSelector((state) => state.auth);



    const editHandler = () => {
        console.log("Comment has been editied.")
    };

    const deleteHandler = () => {
        console.log("Comment has been deleted.")
    };

    const flagHandler = () => {
        console.log("Comment has been flagged.")
    };

    const reportHandler = () => {
        console.log("Comment has been reported.")
    };


    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="cOptionsDropdownContainer">
                            {user.spectrum === "rainbow" && <div className={`cOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)"}} />}
                            {user.spectrum === "silver" && <div className={`cOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)"}} />}
                            {user.spectrum === "gold" && <div className={`cOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)"}} />}
                            {user.spectrum === "platinum" && <div className={`cOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)"}} />}
                            {user.spectrum === "diamond" && <div className={`cOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)"}} />}
                            <div className={`cOptionsDropdown-Container union BOX_SHADOW ${user.spectrum}`}>
                                {currentUser.unionName === user.unionName ?
                                    (
                                        <>
                                            <span className="cOptionsDropdownOption" onClick={editHandler}>
                                                Edit
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="cOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`cOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            } 
                                            <span className="cOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="cOptionsDropdownOption" onClick={flagHandler}>
                                                Flag
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="cOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`cOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            }
                                            <span className="cOptionsDropdownOption" onClick={reportHandler}>Report</span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`cOptionsDropdown-Container BOX_SHADOW ${user.energy}`}>
                            {currentUser.userName === user.userName ?
                                (
                                    <>
                                        <span className="cOptionsDropdownOption" onClick={editHandler}>Edit</span>
                                        <hr className={`cOptionsDropdownHr ${user.energy}`} />
                                        <span className="cOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="cOptionsDropdownOption" onClick={flagHandler} >Flag</span>
                                        <hr className={`cOptionsDropdownHr ${user.energy}`} />
                                        <span className="cOptionsDropdownOption" onClick={reportHandler}>Report</span>
                                    </>
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default COptionsDropdown;