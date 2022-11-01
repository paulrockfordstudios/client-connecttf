import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import axios from 'axios';
import "./CDPReplies.css";
import { useMediaQuery } from '@material-ui/core';

function CDPReplies({ reply }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const [ active, setActive ] = useState(false);

    const deleteHandler = async () => {
        if (reply.flameReplies || reply.unionReplies) {
            const replies1 = reply.flameReplies.concat(reply.unionReplies);
                if (replies1.length > 0) {
                    replies1.forEach(async (reply1) => {
                        if (reply1.flameReplies || reply1.unionReplies) {
                            const replies2 = reply1.flameReplies.concat(reply1.unionReplies);
                            if (replies2.length > 0) {
                                replies2.forEach(async (reply2) => {
                                    if (reply2.flameReplies || reply2.unionReplies) {
                                        const replies3 = reply2.flameReplies.concat(reply2.unionReplies);
                                        if (replies3.length > 0) {
                                            replies3.forEach(async (reply3) => {
                                                if (reply3.flameReplies || reply3.unionReplies) {
                                                    const replies4 = reply3.flameReplies.concat(reply3.unionReplies);
                                                    if (replies4.length > 0) {
                                                        replies4.forEach(async (reply4) => {
                                                            if (reply4.flameReplies || reply4.unionReplies) {
                                                                const repliesLast = reply4.flameReplies.concat(reply4.unionReplies);
                                                                if (repliesLast.length > 0) {
                                                                    replies4.forEach(async (replyLast) => {
                                                                        try {
                                                                            await axios.delete(`/replies/${replyLast._id}`)
                                                                        } catch(err) {
                                                                            console.log(err);
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            try {
                                                                await axios.delete(`/replies/${reply4._id}`)
                                                            } catch(err) {
                                                                console.log(err);
                                                            }
                                                        })
                                                    }
                                                }
                                                try {
                                                    await axios.delete(`/replies/${reply3._id}`)
                                                } catch(err) {
                                                    console.log(err);
                                                }
                                            })
                                        }
                                    }
                                    try {
                                        await axios.delete(`/replies/${reply2._id}`)
                                    } catch(err) {
                                        console.log(err);
                                    }
                                })
                            }
                        }
                        try {
                            await axios.delete(`/replies/${reply1._id}`)
                        } catch(err) {
                            console.log(err);
                        }
                    })
                }
            try {
                await axios.delete(`/replies/${reply._id}`);
            } catch(err) {
                console.log(err);
            }
        }
        dispatch(dFClose())
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return (
        <div className="cdpReplies">
            <div className="cdpRepliesContainer">
                <div className="cdpRepliesTop">
                    <span className="cdpRepliesReplies">Are you sure you want to delete this reply?</span>
                    {reply?.title && <span className="cdpRepliesDataTitle">{reply?.title}</span>}
                </div>
                {user.spectrum ?
                    (
                        <>
                            {user.spectrum === "rainbow" ||
                             user.spectrum === "silver" ||
                             user.spectrum === "gold" ||
                             user.spectrum === "platinum" ||
                             user.spectrum === "diamond" ?
                                (
                                    <div className="cdpRepliesBottom">
                                        <button 
                                            style={
                                                user.spectrum === "diamond" 
                                                    ? active 
                                                        ? {backgroundImage: "url(/misc/diamond-background-drk.jpg)"} 
                                                        : {backgroundImage: "url(/misc/diamond-background.jpg)"}
                                                    : {}
                                            }
                                            className={
                                                `cdpRepliesButton base left
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }
                                            onClick={cancelHandler}
                                            onMouseDown={() => setActive(true)}
                                            onMouseUp={() => setActive(false)}
                                        >
                                            <span className={
                                                `cdpRepliesButton font left
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }>
                                                Cancel
                                            </span>
                                        </button>
                                        <button 
                                            className={
                                                `cdpRepliesButton base right
                                                ${user.spectrum ? user.spectrum : "gray"}`
                                            }
                                            onClick={deleteHandler}
                                        >
                                            <span className={
                                                `cdpRepliesButton font right
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }>
                                                Delete
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="cdpRepliesBottom">
                                        <button 
                                            className={
                                                `cdpRepliesButton left
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }
                                            onClick={cancelHandler}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            className={
                                                `cdpRepliesButton right
                                                ${user.spectrum ? user.spectrum : "gray"}`
                                            }
                                            onClick={deleteHandler}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <div className="cdpRepliesBottom">
                            <button 
                                className={
                                    `cdpRepliesButton left
                                    ${user.energy ? user.energy : "gray"}`
                                }
                                onClick={cancelHandler}
                            >
                                Cancel
                            </button>
                            <button 
                                className={
                                    `cdpRepliesButton right
                                    ${user.energy ? user.energy : "gray"}`
                                }
                                onClick={deleteHandler}
                            >
                                Delete
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )

}

export default CDPReplies;