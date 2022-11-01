import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import axios from 'axios';
import "./CDPPost.css";

function CDPPost({ post }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const deleteHandler = async () => {
        if (post.flameComments || post.unionComments) {
            const comments = post.flameComments.concat(post.unionComments);
            if (comments.length > 0) {
                comments.forEach(async (comment) => {
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
                })
            }
        }
        try {
            await axios.delete(`/posts/${post._id}`)
        } catch(err) {
            console.log(err);
        }
        navigate("/")
        dispatch(dFClose())
    };

    const cancelHandler = () => {
        dispatch(dFClose())
    };

    return (
        <div className="cdpPost">
            <div className="cdpPostContainer">
                <div className="cdpPostTop">
                    <span className="cdpPostpost">Are you sure you want to delete this post?</span>
                    {post?.title && <span className="cdpPostDataTitle">{post?.title}</span>}
                </div>
                <div className="cdpPostBottom">
                    <button 
                        className={
                            `cdpPostButton 
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
                            `cdpPostButton 
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

export default CDPPost;