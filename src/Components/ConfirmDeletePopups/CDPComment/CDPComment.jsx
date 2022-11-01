import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import axios from 'axios';
import "./CDPComment.css";

function CDPComment({ comment }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const deleteHandler = async () => {
        if (comment.flameReplies || comment.unionReplies) {
            const replies1 = comment.flameReplies.concat(comment.unionReplies);
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
            await axios.delete(`/comments/${comment._id}`);
        } catch(err) {
            console.log(err);
        }
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return (
        <div className="cdpComment">
            <div className="cdpCommentContainer">
                <div className="cdpCommentTop">
                    <span className="cdpCommentComment">Are you sure you want to delete this Comment?</span>
                    {comment?.title && <span className="cdpCommentDataTitle">{comment?.title}</span>}
                </div>
                <div className="cdpCommentBottom">
                    <button 
                        className={
                            `cdpCommentButton 
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
                            `cdpCommentButton 
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

export default CDPComment;