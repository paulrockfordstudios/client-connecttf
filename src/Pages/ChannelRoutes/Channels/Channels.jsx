import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import "./Channels.css";
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import ChannelShortDisplay from '../../../Components/Channels/ChannelShortDisplay/ChannelShortDisplay';

function Channels() {

    const [channels, setChannels] = useState([]);
    const [ height, setHeight ] = useState();

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchChannelList = async () => {
            const res = await axios.get("/channels/list/all");
            setChannels(res.data);
        }
        fetchChannelList();
    }, []);

    

    return (
        <div className="channels">
            <div className="channels-container">
                <div className="channelsAd">
                    <AdSecondary />
                </div>
                <div className="channelsRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="channelsDisplayContainer" >
                                    {currentUser.spectrum === "rainbow" && <div className={`channelsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "silver" && <div className={`channelsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "gold" && <div className={`channelsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "platinum" && <div className={`channelsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "diamond" && <div className={`channelsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`channelsDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
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
                                        <ul className="channelsDisplayList">
                                            {channels.map((channel, index) => (
                                                <li className="channelsDisplayListItem" key={channel._id}>
                                                    <ChannelShortDisplay channel={channel} index={index} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`channelsDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                    <ul className="channelsDisplayList">
                                        {channels.map((channel, index) => (
                                            <li className="channelsDisplayListItem" key={channel._id}>
                                                <ChannelShortDisplay channel={channel} index={index} />
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
    )
};

export default Channels;