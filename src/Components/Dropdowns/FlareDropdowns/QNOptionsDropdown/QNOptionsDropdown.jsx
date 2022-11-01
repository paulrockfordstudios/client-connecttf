import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dFOpen, eFOpen } from "../../../../Redux/AuthSlice";
import "./QNOptionsDropdown.css";

function QNOptionsDropdown({ user, question }) {

    const dispatch = useDispatch();

    
    const { user: currentUser } = useSelector((state) => state.auth);


    const editHandler = () => {
        dispatch(eFOpen());
    };

    const deleteHandler = () => {
        dispatch(dFOpen());
    };

    const flagHandler = () => {
        console.log("Question has been flagged.")
    };

    const reportHandler = () => {
        console.log("Question has been reported.")
    };


    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="qnOptionsDropdownContainer">
                            {user.spectrum === "rainbow" && <div className={`qnOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)"}} />}
                            {user.spectrum === "silver" && <div className={`qnOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)"}} />}
                            {user.spectrum === "gold" && <div className={`qnOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)"}} />}
                            {user.spectrum === "platinum" && <div className={`qnOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)"}} />}
                            {user.spectrum === "diamond" && <div className={`qnOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)"}} />}
                            <div className={`qnOptionsDropdown-Container union BOX_SHADOW ${user.spectrum}`}>
                                {currentUser.unionName === user.unionName ?
                                    (
                                        <>
                                            <span className="qnOptionsDropdownOption" onClick={editHandler}>
                                                Edit
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="qnOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`qnOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            } 
                                            <span className="qnOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="qnOptionsDropdownOption" onClick={flagHandler}>
                                                Flag
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="qnOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`qnOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            }
                                            <span className="qnOptionsDropdownOption" onClick={reportHandler}>Report</span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`qnOptionsDropdown-Container BOX_SHADOW ${user.energy}`}>
                            {currentUser.userName === user.userName ?
                                (
                                    <>
                                        <span className="qnOptionsDropdownOption" onClick={editHandler}>Edit</span>
                                        <hr className={`qnOptionsDropdownHr ${user.energy}`} />
                                        <span className="qnOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="qnOptionsDropdownOption" onClick={flagHandler} >Flag</span>
                                        <hr className={`qnOptionsDropdownHr ${user.energy}`} />
                                        <span className="qnOptionsDropdownOption" onClick={reportHandler}>Report</span>
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

export default QNOptionsDropdown;