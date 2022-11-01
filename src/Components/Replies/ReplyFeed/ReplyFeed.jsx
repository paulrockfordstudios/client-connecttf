import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReplyDisplay from '../ReplyDisplay/ReplyDisplay';
import "./ReplyFeed.css";


function ReplyFeed({ prompt, promptId, rCntNum }) {
    
    const [ replies, setReplies ] = useState([]);

    const [ displayedReplies, setDisplayedReplies ] = useState([]);
    const [replyCnt, setReplyCnt] = useState(0);
    const [ displayedReplyCnt, setDisplayedReplyCnt ] = useState(0);
    const [ btnDisplay, setBtnDisplay ] = useState("Show More");
    const [ cntRender, setCntRender ] = useState(false);
    const [ rCntString, setRCntString ] = useState("");


    useEffect(() => {
        const fetchReplies = async () => {
            let res = undefined;
            if(prompt === "answer") {
                res = await axios.get(`/replies/answer/${promptId}`);
                setReplyCnt(res.data.length);
                setReplies(res.data.sort((p1, p2) => {
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                    }));
            } else if(prompt === "comment") {
                res = await axios.get(`/replies/comment/${promptId}`);
                setReplyCnt(res.data.length);
                setReplies(res.data.sort((p1, p2) => {
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                    }));
            } else {
                res = await axios.get(`/replies/reply/${promptId}`);
                setReplyCnt(res.data.length);
                setReplies(res.data.sort((p1, p2) => {
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                    }));
            }
        }
        fetchReplies();
    }, [prompt, promptId]);

    useEffect(() => {
        const rCountHandler = () => {
            if(rCntNum) {
                switch(rCntNum) {
                    case 2:
                        setRCntString("two");
                        setCntRender(true);
                        break;
                    case 3:
                        setRCntString("three");
                        setCntRender(true);
                        break;
                    case 4:
                        setRCntString("four");
                        setCntRender(true);
                        break;
                    default:
                        setRCntString("one");
                        setCntRender(true);
                } 
            }
        }
        rCountHandler();
    }, [rCntNum]);


    useEffect(() => {
        replyCnt > 2 ? setDisplayedReplyCnt(2) : setDisplayedReplyCnt(replyCnt);
        replyCnt > 2 
            ? setDisplayedReplies(replies.slice(replies.length - 2, replies.length))     
            : setDisplayedReplies(replies);
    }, [replies, replyCnt]);

    const displayHandler = () => {
        if (displayedReplyCnt !== replyCnt && replyCnt < 12) {
            setDisplayedReplyCnt(replyCnt);
            setDisplayedReplies(replies);
            setBtnDisplay("Show Less");
        }
        if (displayedReplyCnt !== replyCnt && replyCnt > 12 && replyCnt <= 22) {
            setDisplayedReplyCnt(12);
            setDisplayedReplies(replies.slice(replies.length - 12, replies.length));
            setBtnDisplay("Show All");
        }
        if (displayedReplyCnt === 12 && displayedReplyCnt !== replyCnt && replyCnt <= 22) {
            setDisplayedReplyCnt(replyCnt);
            setDisplayedReplies(replies);
            setBtnDisplay("Show Less");
        }
        if (displayedReplyCnt >= 12 && displayedReplyCnt !== replyCnt && replyCnt > (displayedReplyCnt + 10)) {
            setDisplayedReplyCnt(displayedReplyCnt + 10);
            setDisplayedReplies(replies.slice(replies.length - (displayedReplyCnt + 10), replies.length));
            setBtnDisplay(replyCnt <= (displayedReplyCnt + 10) ? "Show All" : "Show 10 More");
        }
        if (displayedReplyCnt === replyCnt) {
            setDisplayedReplyCnt(2);
            setDisplayedReplies(replies.slice(replies.length - 2, replies.length));
            setBtnDisplay("Show More");
        }
    };


    return (
        <div className="replyfeed">
            {replyCnt > 2 && 
                <div className={`replyFeedController ${rCntString}`}>
                    <div className="replyFeedControllerLeft">
                        <span className="replyFeedCount">Showing 
                            <span style={{fontSize: "13px"}}> {displayedReplyCnt} </span>
                            of 
                            <span style={{fontSize: "13px"}}> {replyCnt} </span>
                        </span>
                    </div>
                    <div className="replyFeedControllerRight">
                        {replyCnt >= 3 
                            ? <button className="replyFeedControllerBtn" onClick={displayHandler}>{btnDisplay}</button>
                            : <></>
                        }
                    </div>
                </div>
            }
        <div className="replyfeed-container">
            {displayedReplies.map((reply) => (
                <ReplyDisplay key={reply._id} reply={reply} />
            ))}
        </div>
    </div>
    )
};

export default ReplyFeed;