import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dFOpen, eFOpen } from "../../../../Redux/AuthSlice";
import "./PostOptionsDropdown.css";

function PostOptionsDropdown({ user }) {

    const dispatch = useDispatch();


    const { user: currentUser } = useSelector((state) => state.auth);



    const editHandler = () => {
        dispatch(eFOpen());
    };

    const deleteHandler = () => {
        dispatch(dFOpen());
    };

    const flagHandler = () => {
        console.log("Post has been flagged.")
    };

    const reportHandler = () => {
        console.log("Post has been reported.")
    };


    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="postOptionsDropdownContainer">
                            {user.spectrum === "rainbow" && <div className={`postOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)"}} />}
                            {user.spectrum === "silver" && <div className={`postOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)"}} />}
                            {user.spectrum === "gold" && <div className={`postOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)"}} />}
                            {user.spectrum === "platinum" && <div className={`postOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)"}} />}
                            {user.spectrum === "diamond" && <div className={`postOptionsDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)"}} />}
                            <div className={`postOptionsDropdown-Container union BOX_SHADOW ${user.spectrum}`}>
                                {currentUser.unionName === user.unionName ?
                                    (
                                        <>
                                            <span className="postOptionsDropdownOption" onClick={editHandler}>
                                                Edit
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="postOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`postOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            } 
                                            <span className="postOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="postOptionsDropdownOption" onClick={flagHandler}>
                                                Flag
                                            </span>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <img className="postOptionsDropdownHrDiamond" src="/misc/diamond-hr.png" alt=""/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr className={`qnOptionsDropdownHr ${user.spectrum}`} />
                                                    </>
                                                )
                                            }
                                            <span className="postOptionsDropdownOption" onClick={reportHandler}>Report</span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`postOptionsDropdown-Container BOX_SHADOW ${user.energy}`}>
                            {currentUser.userName === user.userName ?
                                (
                                    <>
                                        <span className="postOptionsDropdownOption" onClick={editHandler}>Edit</span>
                                        <hr className={`postOptionsDropdownHr ${user.energy}`} />
                                        <span className="postOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="postOptionsDropdownOption" onClick={flagHandler} >Flag</span>
                                        <hr className={`postOptionsDropdownHr ${user.energy}`} />
                                        <span className="postOptionsDropdownOption" onClick={reportHandler}>Report</span>
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

export default PostOptionsDropdown;