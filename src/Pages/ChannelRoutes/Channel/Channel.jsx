import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import axios from "axios";
import "./Channel.css";
import ChannelFullDisplay from '../../../Components/Channels/ChannelFullDisplay/ChannelFullDisplay';


function Channel() {

    const [ channel, setChannel ] = useState();
    const [ height, setHeight ] = useState();
    const [ clicked, setclicked] = useState(0);

    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();


    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/Channels/${id}`);
            setChannel(res.data);
        }
        fetchChannel();
    }, [id]);


    return (
        <>
            <div className="channel">
                <div className="channel-container">
                    <div className="channelRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    {Channel && <div className="channelDisplayContainer" >
                                        {currentUser.spectrum === "rainbow" && <div className={`channelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "silver" && <div className={`channelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "gold" && <div className={`channelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "platinum" && <div className={`channelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "diamond" && <div className={`channelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        <div className={`channelDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} onClick={() => setclicked((click) => click + 1)}
                                        
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
                                            <ChannelFullDisplay channel={channel} />
                                        </div>
                                    </div>}
                                </>
                            ): (
                                <>
                                    {channel && <div className={`channelDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <ChannelFullDisplay channel={channel} />
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

export default Channel;