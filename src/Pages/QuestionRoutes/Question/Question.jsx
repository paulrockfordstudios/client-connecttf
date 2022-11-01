import React, { useEffect, useState, memo, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Sidebar from '../../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../../Components/PageBars/TopBar/TopBar';
import QNFullDisplay from '../../../Components/Questions/QuestionDisplay/QNFullDisplay/QNFullDisplay';
import "./Question.css";
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';

function Question() {

    const [ question, setQuestion ] = useState();
    const [ height, setHeight ] = useState();
    const [ clicked, setclicked] = useState(0);

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();



    useEffect(() => {
        const fetchQuestion = async () => {
            const res = await axios.get(`/questions/${id}`);
            setQuestion(res.data);
        }
        fetchQuestion();
    }, [id]);
    

    

    return (
        <>
            <div className="question">
                <div className="question-container">
                    <div className="questionAd">
                        <AdSecondary />
                    </div>
                    <div className="questionRight">
                        {currentUser.unionName ?
                            (
                                <>

                                    {question && <div className="questionDisplayContainer" >
                                        {currentUser.spectrum === "rainbow" && <div className={`questionDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "silver" && <div className={`questionDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "gold" && <div className={`questionDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "platinum" && <div className={`questionDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "diamond" && <div className={`questionDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        <div className={`questionDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} onClick={() => setclicked((click) => click + 1)}
                                        
                                        ref={el => {
                                            if (clicked >= 0 || clicked <= 9999) {
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
                                            }
                                        }} 
                                        
                                        >
                                            <QNFullDisplay question={question} />
                                        </div>
                                    </div>}
                                </>
                            ) : (
                                <>
                                    {question && <div className={`questionDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <QNFullDisplay question={question} />
                                    </div>}
                                </>
                            )
                        }
                    </div>
                </div>
            </div> 
        </>
    )
};

export default memo(Question);