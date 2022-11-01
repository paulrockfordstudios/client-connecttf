import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
//import CoachFullDisplay from '../../../Components/Coaches/CoachFullDisplay/CoachFullDisplay';
import "./Coach.css";
import CoachFullDisplay from '../../../Components/Coaches/CoachFullDisplay/CoachFullDisplay';


function Coach() {

    const [ coach, setCoach ] = useState();
    const [ height, setHeight ] = useState();
    const [ clicked, setclicked] = useState(0);

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();


    useEffect(() => {
        const fetchCoach = async () => {
            const res = await axios.get(`/Coaches/${id}`);
            setCoach(res.data);
        }
        fetchCoach();
    }, [id]);


    return (
        <>
            <div className="coach">
                <div className="coach-container">
                    <div className="coachRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    {coach && <div className="coachDisplayContainer" >
                                        {currentUser.spectrum === "rainbow" && <div className={`coachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "silver" && <div className={`coachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "gold" && <div className={`coachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "platinum" && <div className={`coachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "diamond" && <div className={`coachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        <div className={`coachDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} onClick={() => setclicked((click) => click + 1)}
                                        
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
                                            <CoachFullDisplay coach={coach} />
                                        </div>
                                    </div>}
                                </>
                            ): (
                                <>
                                    {coach && <div className={`coachDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <CoachFullDisplay coach={coach}/>
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

export default Coach;