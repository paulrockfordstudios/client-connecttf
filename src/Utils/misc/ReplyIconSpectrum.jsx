import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { Reply } from "@material-ui/icons";


// Changes the topbar icons according to higher spectrums
function ReplyIconSpectrum({ spectrum, cn, }) {

    const { user } = useContext(AuthContext);

    function getReplyIconSpectrum(spectrum) {
        let replyIconSpectrum = null;
        switch (spectrum) {
            case "rainbow":
                replyIconSpectrum = (
                    <>    
                        <svg width="0em" height="0em">
                            <linearGradient id="caRainbow-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#8a2be2" offset="0%" />
                                <stop stopColor="#30307e" offset="16.67%" />
                                <stop stopColor="#098de9" offset="33.36%" />
                                <stop stopColor="#50c878" offset="50.02%" />
                                <stop stopColor="#ffe700" offset="66.68%" />
                                <stop stopColor="#ff8303" offset="83.34%" />
                                <stop stopColor="#850014" offset="100%" />
                            </linearGradient>
                        </svg>
                        <Reply className={cn} style={{ fill: "url(#caRainbow-gradient)"}}/>
                    </>
                );
                break;
            case "silver":
                replyIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="caSilver-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#dadada" offset="0%"/>
                                <stop stopColor="#8e8e8e" offset="50%"/>
                                <stop stopColor="#dadada" offset="100%"/>
                            </linearGradient>
                        </svg>
                        <Reply className={cn} style={{ fill: "url(#caSilver-gradient)"}}/>
                    </>
                );
                break;
            case "gold":
                replyIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="caGold-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#ab781d" offset="0%"/>
                                <stop stopColor="#eed264" offset="50%"/>
                                <stop stopColor="#ab781d" offset="100%"/>
                            </linearGradient>
                        </svg>
                        <Reply className={cn} style={{ fill: "url(#caGold-gradient)"}}/>
                    </>
                );
                break;
            case "platinum":
                replyIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="caPlatinum-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#d3e9f6" offset="0%" />
                                <stop stopColor="#6b8c95" offset="16.67%" />
                                <stop stopColor="#566167" offset="33.36%" />
                                <stop stopColor="#8e8e8e" offset="50.02%" />
                                <stop stopColor="#6d606a" offset="66.68%" />
                                <stop stopColor="#af9499" offset="83.34%" />
                                <stop stopColor="#dadada" offset="100%" />
                            </linearGradient>
                        </svg>
                        <Reply className={cn} style={{ fill: "url(#caPlatinum-gradient)"}}/>
                    </>
                );
                break;
            default:
                replyIconSpectrum = (
                    <>
                        <Reply className={`${cn} ${spectrum}`}/>
                    </>
                );
        }
        return replyIconSpectrum;
    }
    return (
        <> 
            {getReplyIconSpectrum(spectrum)}
        </>
    )
};

export default ReplyIconSpectrum;