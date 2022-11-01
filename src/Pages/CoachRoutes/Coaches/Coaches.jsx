import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import "./Coaches.css";
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import CoachShortDisplay from '../../../Components/Coaches/CoachShortDisplay/CoachShortDisplay';

function Coaches() {

    const [coaches, setCoaches] = useState([]);
    const [ height, setHeight ] = useState();

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCoachList = async () => {
            const res = await axios.get("/coaches/list/all");
            setCoaches(res.data);
        }
        fetchCoachList();
    }, []);

    

    return (
        <>
        
        <div className="coaches">
            <div className="coaches-container">
                <div className="coachesAd">
                    <AdSecondary />
                </div>
                <div className="coachesRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="coachesDisplayContainer" >
                                    {currentUser.spectrum === "rainbow" && <div className={`coachesDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "silver" && <div className={`coachesDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "gold" && <div className={`coachesDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "platinum" && <div className={`coachesDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "diamond" && <div className={`coachesDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`coachesDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
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
                                        <ul className="coachesDisplayList">
                                            {coaches.map((coach, index) => (
                                                <li className="coachesDisplayListItem" key={coach._id}>
                                                    <CoachShortDisplay coach={coach} index={index} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`coachesDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                    <ul className="coachesDisplayList">
                                        {coaches.map((coach, index) => (
                                            <li className="coachesDisplayListItem" key={coach._id}>
                                                <CoachShortDisplay coach={coach} index={index} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
        </>
    )
};

export default Coaches;