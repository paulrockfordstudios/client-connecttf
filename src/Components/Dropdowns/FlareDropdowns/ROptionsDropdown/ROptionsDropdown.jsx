import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import "./ROptionsDropdown.css";

function ROptionsDropdown({ user }) {

    const { user: currentUser } = useSelector((state) => state.auth);


    const editHandler = () => {
        console.log("Reply has been editied.")
    };

    const deleteHandler = () => {
        console.log("Reply has been deleted.")
    };

    const flagHandler = () => {
        console.log("Reply has been flagged.")
    };

    const reportHandler = () => {
        console.log("Reply has been reported.")
    };


    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="rOptionsDropdownContainer">
                            {user.spectrum === "rainbow" && <div className={`rOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)"}} />}
                            {user.spectrum === "silver" && <div className={`rOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)"}} />}
                            {user.spectrum === "gold" && <div className={`rOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)"}} />}
                            {user.spectrum === "platinum" && <div className={`rOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)"}} />}
                            {user.spectrum === "diamond" && <div className={`rOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)"}} />}
                            <div className={`rOptionsDropdown-Container union BOX_SHADOW ${user.spectrum}`}>
                                {currentUser.unionName === user.unionName ?
                                    (
                                        <>
                                            <span className="rOptionsDropdownOption" onClick={editHandler}>
                                                Edit
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="rOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`rOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            } 
                                            <span className="rOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="rOptionsDropdownOption" onClick={flagHandler}>
                                                Flag
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="rOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`rOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            }
                                            <span className="rOptionsDropdownOption" onClick={reportHandler}>Report</span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`rOptionsDropdown-Container BOX_SHADOW ${user.energy}`}>
                            {currentUser.userName === user.userName ?
                                (
                                    <>
                                        <span className="rOptionsDropdownOption" onClick={editHandler}>Edit</span>
                                        <hr className={`rOptionsDropdownHr ${user.energy}`} />
                                        <span className="rOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="rOptionsDropdownOption" onClick={flagHandler} >Flag</span>
                                        <hr className={`rOptionsDropdownHr ${user.energy}`} />
                                        <span className="rOptionsDropdownOption" onClick={reportHandler}>Report</span>
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

export default ROptionsDropdown;