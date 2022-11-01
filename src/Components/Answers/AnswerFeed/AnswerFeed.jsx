import React, { useEffect, useState, useContext, memo } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import AnswerDisplay from '../AnswerDisplay/AnswerDisplay';
import "./AnswerFeed.css";




function AnswerFeed() {

    const { user } = useSelector((state) => state.auth);

    const [answers, setAnswers] = useState([]);
    const [ displayedAnswers, setDisplayedAnswers ] = useState([]);
    const [answerCnt, setAnswerCnt] = useState(0);
    const [ displayedAnswerCnt, setDisplayedAnswerCnt ] = useState(0);
    const [ btnDisplay, setBtnDisplay ] = useState("Show More");



    const { id } = useParams();
   
    useEffect(() => {
        const fetchAnswers = async () => {
            const res = await axios.get(`/answers/question/${id}`);
            setAnswerCnt(res.data.length);
            setAnswers(res.data.sort((a1, a2) => {
                return new Date(a1.createdAt) - new Date(a2.createdAt);
                })
            );
        }
        fetchAnswers();
    }, [id]);

    console.log(answers)

    
    useEffect(() => {
        answerCnt > 3 ? setDisplayedAnswerCnt(2) : setDisplayedAnswerCnt(answerCnt);
        answerCnt > 3 
            ? setDisplayedAnswers(answers.slice(answers.length - 2, answers.length))     
            : setDisplayedAnswers(answers);
    }, [answers, answerCnt]);

    const displayHandler = () => {
        if (displayedAnswerCnt !== answerCnt && answerCnt < 12) {
            setDisplayedAnswerCnt(answerCnt);
            setDisplayedAnswers(answers);
            setBtnDisplay("Show Less");
        }
        if (displayedAnswerCnt !== answerCnt && answerCnt > 12 && answerCnt <= 22) {
            setDisplayedAnswerCnt(12);
            setDisplayedAnswers(answers.slice(answers.length - 12, answers.length));
            setBtnDisplay("Show All");
        }
        if (displayedAnswerCnt === 12 && displayedAnswerCnt !== answerCnt && answerCnt <= 22) {
            setDisplayedAnswerCnt(answerCnt);
            setDisplayedAnswers(answers);
            setBtnDisplay("Show Less");
        }
        if (displayedAnswerCnt >= 12 && displayedAnswerCnt !== answerCnt && answerCnt > (displayedAnswerCnt + 10)) {
            setDisplayedAnswerCnt(displayedAnswerCnt + 10);
            setDisplayedAnswers(answers.slice(answers.length - (displayedAnswerCnt + 10), answers.length));
            setBtnDisplay(answerCnt <= (displayedAnswerCnt + 10) ? "Show All" : "Show 10 More");
        }
        if (displayedAnswerCnt === answerCnt) {
            setDisplayedAnswerCnt(2);
            setDisplayedAnswers(answers.slice(answers.length - 2, answers.length));
            setBtnDisplay("Show More");
        }
    };


    

    return (
        <div className="answerFeed">
            <div className="answerFeedController">
                <div className="answerFeedControllerLeft">
                    <span className="answerFeedTitle">Answers</span>
                    <span className="answerFeedCount">Showing 
                        <span style={{fontSize: "15px"}}> {displayedAnswerCnt} </span>
                        of 
                        <span style={{fontSize: "15px"}}> {answerCnt} </span>
                    </span>
                </div>
                <div className="answerFeedControllerRight">
                    {answerCnt >= 3 
                        ? <button className="answerFeedControllerBtn" onClick={displayHandler}>{btnDisplay}</button>
                        : <></>
                    }
                </div>
            </div>
            <div className="answerFeed-container">
                {displayedAnswers.map((answer) => (
                    <AnswerDisplay key={answer._id} answer={answer} />
                ))}
            </div>
        </div>
    )
};

export default AnswerFeed;