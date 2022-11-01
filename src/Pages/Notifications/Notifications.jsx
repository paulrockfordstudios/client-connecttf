import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import AdSecondary from '../../Components/AdSpace/AdSecondary/AdSecondary';
import "./Notifications.css";



function Notifications() {

    const { user } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();

    return (
        <div className="notifications">
            <div className="notifications-container">
                <div className="notificationsAd">
                    <AdSecondary />
                </div>
                <div className="notificationsRight">
                    {user.unionName ?
                        (
                            <>
                                <div className="notificationsDisplayContainer" >
                                    {user.spectrum === "rainbow" && <div className={`notificationsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "silver" && <div className={`notificationsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "gold" && <div className={`notificationsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "platinum" && <div className={`notificationsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "diamond" && <div className={`notificationsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`notificationsDisplay-container union BOX_SHADOW ${user.spectrum}`} 
                                        
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
                                        


                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`notificationsDisplay-container flame BOX_SHADOW ${user.energy}`}>
                                    


                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default  Notifications;