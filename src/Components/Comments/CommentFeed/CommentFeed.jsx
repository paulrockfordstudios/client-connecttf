import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import CommentDisplay from '../CommentDisplay/CommentDisplay';
import "./CommentFeed.css";



function CommentFeed() {

    const [comments, setComments] = useState([]);
    const [ displayedComments, setDisplayedComments ] = useState([]);
    const [commentCnt, setCommentCnt] = useState(0);
    const [ displayedCommentCnt, setDisplayedCommentCnt ] = useState(0);
    const [ btnDisplay, setBtnDisplay ] = useState("Show More");

    const { user } = useContext(AuthContext);
    const { id } = useParams();
   
    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.get(`/comments/post/${id}`);
            setCommentCnt(res.data.length);
            setComments(res.data.sort((c1, c2) => {
                return new Date(c1.createdAt) - new Date(c2.createdAt);
                })
            );
        }
        fetchComments();
    }, [id]);

    useEffect(() => {
        commentCnt > 3 ? setDisplayedCommentCnt(2) : setDisplayedCommentCnt(commentCnt);
        commentCnt > 3 
            ? setDisplayedComments(comments.slice(comments.length - 2, comments.length))     
            : setDisplayedComments(comments);
    }, [comments, commentCnt]);

    const displayHandler = () => {
        if (displayedCommentCnt !== commentCnt && commentCnt < 12) {
            setDisplayedCommentCnt(commentCnt);
            setDisplayedComments(comments);
            setBtnDisplay("Show Less");
        }
        if (displayedCommentCnt !== commentCnt && commentCnt > 12 && commentCnt <= 22) {
            setDisplayedCommentCnt(12);
            setDisplayedComments(comments.slice(comments.length - 12, comments.length));
            setBtnDisplay("Show All");
        }
        if (displayedCommentCnt === 12 && displayedCommentCnt !== commentCnt && commentCnt <= 22) {
            setDisplayedCommentCnt(commentCnt);
            setDisplayedComments(comments);
            setBtnDisplay("Show Less");
        }
        if (displayedCommentCnt >= 12 && displayedCommentCnt !== commentCnt && commentCnt > (displayedCommentCnt + 10)) {
            setDisplayedCommentCnt(displayedCommentCnt + 10);
            setDisplayedComments(comments.slice(comments.length - (displayedCommentCnt + 10), comments.length));
            setBtnDisplay(commentCnt <= (displayedCommentCnt + 10) ? "Show All" : "Show 10 More");
        }
        if (displayedCommentCnt === commentCnt) {
            setDisplayedCommentCnt(2);
            setDisplayedComments(comments.slice(comments.length - 2, comments.length));
            setBtnDisplay("Show More");
        }
    };


    return (
        <div className="commentFeed">
            <div className="commentFeedController">
                <div className="commentFeedControllerLeft">
                    <span className="commentFeedTitle">Comments</span>
                    <span className="commentFeedCount">Showing 
                        <span style={{fontSize: "15px"}}> {displayedCommentCnt} </span>
                        of 
                        <span style={{fontSize: "15px"}}> {commentCnt} </span>
                    </span>
                </div>
                <div className="commentFeedControllerRight">
                    {commentCnt >= 3 
                        ? <button className="commentFeedControllerBtn" onClick={displayHandler}>{btnDisplay}</button>
                        : <></>
                    }
                </div>
            </div>
            <div className="commentFeed-container">
                {displayedComments.map((comment) => (
                    <CommentDisplay key={comment._id} comment={comment} />
                ))}

            </div>
        </div>
    )
};

export default CommentFeed;