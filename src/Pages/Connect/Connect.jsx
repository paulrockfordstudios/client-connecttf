import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Sidebar from '../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../Components/PageBars/TopBar/TopBar';
import "./Connect.css";
import ConnectList from '../../Components/ConnectList/ConnectList';
import AdSecondary from '../../Components/AdSpace/AdSecondary/AdSecondary';

function Connect() {

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();

    return (
        <div className="connect">
            <div className="connect-container">
                <div className="connectAd">
                    <AdSecondary />
                </div>
                <div className="connectRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="connectDisplayContainer" >
                                    {currentUser.spectrum === "rainbow" && <div className={`connectDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "silver" && <div className={`connectDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "gold" && <div className={`connectDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "platinum" && <div className={`connectDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "diamond" && <div className={`connectDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`connectDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
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
                                        <ConnectList />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`connectDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                    <ConnectList />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default Connect;