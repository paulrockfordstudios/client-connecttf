import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import "./AOptionsDropdown.css";

function AOptionsDropdown({ user }) {

    const { user: currentUser } = useSelector((state) => state.auth);



    const editHandler = () => {
        console.log("Answer has been editied.")
    };

    const deleteHandler = () => {
        console.log("Answer has been deleted.")
    };

    const flagHandler = () => {
        console.log("Answer has been flagged.")
    };

    const reportHandler = () => {
        console.log("Answer has been reported.")
    };


    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="aOptionsDropdownContainer">
                            {user.spectrum === "rainbow" && <div className={`aOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)"}} />}
                            {user.spectrum === "silver" && <div className={`aOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)"}} />}
                            {user.spectrum === "gold" && <div className={`aOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)"}} />}
                            {user.spectrum === "platinum" && <div className={`aOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)"}} />}
                            {user.spectrum === "diamond" && <div className={`aOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)"}} />}
                            <div className={`aOptionsDropdown-Container union BOX_SHADOW ${user.spectrum}`}>
                                {currentUser.unionName === user.unionName ?
                                    (
                                        <>
                                            <span className="aOptionsDropdownOption" onClick={editHandler}>
                                                Edit
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="aOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`aOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            } 
                                            <span className="aOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="aOptionsDropdownOption" onClick={flagHandler}>
                                                Flag
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="aOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`aOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            }
                                            <span className="aOptionsDropdownOption" onClick={reportHandler}>Report</span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`aOptionsDropdown-Container BOX_SHADOW ${user.energy}`}>
                            {currentUser.userName === user.userName ?
                                (
                                    <>
                                        <span className="aOptionsDropdownOption" onClick={editHandler}>Edit</span>
                                        <hr className={`aOptionsDropdownHr ${user.energy}`} />
                                        <span className="aOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="aOptionsDropdownOption" onClick={flagHandler} >Flag</span>
                                        <hr className={`aOptionsDropdownHr ${user.energy}`} />
                                        <span className="aOptionsDropdownOption" onClick={reportHandler}>Report</span>
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

export default AOptionsDropdown;