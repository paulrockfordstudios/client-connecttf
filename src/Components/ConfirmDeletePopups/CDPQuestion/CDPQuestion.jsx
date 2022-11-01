import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import axios from 'axios';
import "./CDPQuestion.css";
import { useMediaQuery } from '@material-ui/core';

function CDPQuestion({ question }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const [ active, setActive ] = useState(false);

    const deleteHandler = async () => {
        if (question.flameAnswers || question.UnionAnswers) {
            const answers = question.flameAnswers.concat(question.unionAnswers);
            if (answers.length > 0) {
                answers.forEach(async (answer) => {
                    if (answer.flameReplies || answer.UnionReplies) {
                        const replies1 = answer.flameReplies.concat(answer.unionReplies);
                        if (replies1.length > 0) {
                            replies1.forEach(async (reply1) => {
                                if (reply1.flameReplies || reply1.UnionReplies) {
                                    const replies2 = reply1.flameReplies.concat(reply1.unionReplies);
                                    if (replies2.length > 0) {
                                        replies2.forEach(async (reply2) => {
                                            if (reply2.flameReplies || reply2.UnionReplies) {
                                                const replies3 = reply2.flameReplies.concat(reply2.unionReplies);
                                                if (replies3.length > 0) {
                                                    replies3.forEach(async (reply3) => {
                                                        if (reply3.flameReplies || reply3.UnionReplies) {
                                                            const replies4 = reply3.flameReplies.concat(reply3.unionReplies);
                                                            if (replies4.length > 0) {
                                                                replies4.forEach(async (reply4) => {
                                                                    if (reply4.flameReplies || reply4.UnionReplies) {
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
                })
            }
        }
        try {
            await axios.delete(`/questions/${question._id}`)
        } catch(err) {
            console.log(err);
        }
        navigate("/");
        dispatch(dFClose())
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return (
        <div className="cdpQuestion">
            <div className="cdpQuestionContainer">
                <div className="cdpQuestionTop">
                    <span className="cdpQuestionQuestion">Are you sure you want to delete this question?</span>
                    {question?.title && <span className="cdpQuestionDataTitle">{question?.title}</span>}
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
                                    <div className="cdpQuestionBottom">
                                        <button 
                                            style={
                                                user.spectrum === "diamond" 
                                                    ? active 
                                                        ? {backgroundImage: "url(/misc/diamond-background-drk.jpg)"} 
                                                        : {backgroundImage: "url(/misc/diamond-background.jpg)"}
                                                    : {}
                                            }
                                            className={
                                                `cdpQuestionButton base left
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }
                                            onClick={cancelHandler}
                                            onMouseDown={() => setActive(true)}
                                            onMouseUp={() => setActive(false)}
                                        >
                                            <span className={
                                                `cdpQuestionButton font left
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }>
                                                Cancel
                                            </span>
                                        </button>
                                        <button 
                                            className={
                                                `cdpQuestionButton base right
                                                ${user.spectrum ? user.spectrum : "gray"}`
                                            }
                                            onClick={deleteHandler}
                                        >
                                            <span className={
                                                `cdpQuestionButton font right
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }>
                                                Delete
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="cdpQuestionBottom">
                                        <button 
                                            className={
                                                `cdpQuestionButton left
                                                ${user.spectrum ? user.spectrum : "gray" }`
                                            }
                                            onClick={cancelHandler}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            className={
                                                `cdpQuestionButton right
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
                        <div className="cdpQuestionBottom">
                            <button 
                                className={
                                    `cdpQuestionButton left
                                    ${user.energy ? user.energy : "gray"}`
                                }
                                onClick={cancelHandler}
                            >
                                Cancel
                            </button>
                            <button 
                                className={
                                    `cdpQuestionButton right
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

export default CDPQuestion;