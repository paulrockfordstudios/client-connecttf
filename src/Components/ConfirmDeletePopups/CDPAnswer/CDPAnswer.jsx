import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import axios from 'axios';
import "./CDPAnswer.css";

function CDPAnswer({ answer }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const deleteHandler = async () => {
        if (answer.flameReplies || answer.unionReplies) {
            const replies1 = answer.flameReplies.concat(answer.unionReplies);
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
                                                                repliesLast.forEach(async (replyLast) => {
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
        }
        try {
            await axios.delete(`/answers/${answer._id}`);
        } catch(err) {
            console.log(err);
        }
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return (
        <div className="cdpAnswer">
            <div className="cdpAnswerContainer">
                <div className="cdpAnswerTop">
                    <span className="cdpAnswerAnswer">Are you sure you want to delete this Answer?</span>
                    {answer?.title && <span className="cdpAnswerDataTitle">{answer?.title}</span>}
                </div>
                <div className="cdpAnswerBottom">
                    <button 
                        className={
                            `cdpAnswerButton 
                            ${user.unionName 
                                ? user.spectrum 
                                    ? user.spectrum 
                                    : "gray" 
                                : user.energy 
                                    ? user.energy 
                                    : "gray"
                            }`
                        }
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button 
                        className={
                            `cdpAnswerButton 
                            ${user.unionName 
                                ? user.spectrum 
                                    ? user.spectrum 
                                    : "gray" 
                                : user.energy 
                                    ? user.energy 
                                    : "gray"
                            }`
                        }
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )

}

export default CDPAnswer;