import React, { useContext, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import "./PopQuestions.css";

function PopQuestions() {

    const [ questions, setQuestions ] = useState([]);
    const [ popQuestions, setPopQuestions ] = useState([]);
    const [ height, setHeight ] = useState();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser, union, actAcc } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const res = await axios.get("/questions/feed/all");
            setQuestions(res.data);
        }
        fetchAllQuestions();
    }, []);

    

    useEffect(() => {
        const getMostPopularQuestions = () => {
            let qnsWithPopCnt = [];
            for (let i = 0; i < questions.length; i++) {
            let qn = questions[i];
            const qnPopCnt = 
                qn.flameViews.length + 
                qn.unionViews.length +
                qn.flameLikes.length + 
                qn.unionLikes.length +
                qn.flameLoves.length + 
                qn.unionLoves.length +
                qn.flameShares.length +
                qn.unionShares.length +
                qn.flameAnswers.length +
                qn.unionAnswers.length;
            qn = Object.assign({ popCnt: qnPopCnt }, qn);
            qnsWithPopCnt.push(qn);
            const top5QnPopCnt = qnsWithPopCnt.sort((q1, q2) => q2.popCnt - q1.popCnt).slice(0,5);
            setPopQuestions(top5QnPopCnt);
            }
        }
        getMostPopularQuestions();
    }, [questions]);

    return (
        <>
            {currentUser.unionName ?
                (
                    <>
                        {questions && <div className="popQuestionsContainer" style={{height: `${height}px`}}>
                            {currentUser.spectrum === "rainbow" && <div className={`popQuestionsBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "silver" && <div className={`popQuestionsBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "gold" && <div className={`popQuestionsBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "platinum" && <div className={`popQuestionsBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "diamond" && <div className={`popQuestionsBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`popQuestions union BOX_SHADOW ${currentUser.spectrum}`}
                            
                            ref={el => {
                                if (!el) return;
                                /*console.log("initial height", el.getBoundingClientRect().height);*/
                                let prevValue = JSON.stringify(el.getBoundingClientRect());
                                const start = Date.now();
                                const handle = setInterval(() => {
                                  let nextValue = JSON.stringify(el.getBoundingClientRect());
                                  if (nextValue === prevValue) {
                                    clearInterval(handle);
                                    /*console.log(
                                      `height stopped changing in ${Date.now() - start}ms. final height:`,
                                      el.getBoundingClientRect().height
                                    );*/
                                    setHeight(el.getBoundingClientRect().height)
                                  } else {
                                    prevValue = nextValue;
                                  }
                                }, 1000);
                              }} 

                            
                            >
                                <div className="popQuestions-container">
                                    <h4 className="popQuestionsTitle">Most Popular Questions</h4>
                                    <ul className="popQuestionsList">
                                        {popQuestions 
                                            ? (
                                                popQuestions.map((pq) => (
                                                    <li className="popQuestion" key={pq._id}>
                                                        <Link to={`/question/${pq._id}`}>
                                                            <span>{pq.title}</span>
                                                            <span className="popQuestionAnswerlength">
                                                                {` - ${pq.flameAnswers.length + pq.unionAnswers.length} answers`}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                ))
                                            ) : <></>
                                        }
                                    </ul>
                                </div>     
                            </div> 
                        </div>}
                    </>
                ) : (
                    <>
                        <div className={`popQuestions flame BOX_SHADOW ${currentUser.energy}`}>
                            <div className="popQuestions-container">
                                <h4 className="popQuestionsTitle">Most Popular Questions</h4>
                                <ul className="popQuestionsList">
                                    {popQuestions 
                                        ? (
                                            popQuestions.map((pq) => (
                                                <li className="popQuestion" key={pq._id}>
                                                    <Link to={`/question/${pq._id}`}>
                                                        <span>{pq.title}</span>
                                                        <span className="popQuestionAnswerlength">
                                                            {` - ${pq.flameAnswers.length + pq.unionAnswers.length} answers`}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))
                                        ) : <></>
                                    }
                                </ul>
                            </div>     
                        </div> 
                    </>
                )
            }
        </>
    )
};

export default PopQuestions;