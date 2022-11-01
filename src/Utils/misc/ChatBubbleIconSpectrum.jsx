import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { ChatBubbleOutline, QuestionAnswer } from "@material-ui/icons";


// Changes the topbar icons according to higher spectrums
function ChatBubbleIconSpectrum({ spectrum, cn, question }) {

    const { user } = useContext(AuthContext);

    function getChatBubbleIconSpectrum(spectrum) {
        let chatBubbleIconSpectrum = null;
        switch (spectrum) {
            case "rainbow":
                chatBubbleIconSpectrum = (
                    <>    
                        <svg width="0em" height="0em">
                            <linearGradient id="cbRainbow-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#8a2be2" offset="0%" />
                                <stop stopColor="#30307e" offset="16.67%" />
                                <stop stopColor="#098de9" offset="33.36%" />
                                <stop stopColor="#50c878" offset="50.02%" />
                                <stop stopColor="#ffe700" offset="66.68%" />
                                <stop stopColor="#ff8303" offset="83.34%" />
                                <stop stopColor="#850014" offset="100%" />
                            </linearGradient>
                        </svg>
                        {question 
                            ? <QuestionAnswer className={cn} style={{ fill: "url(#cbRainbow-gradient)"}}/>
                            : <ChatBubbleOutline className={cn} style={{ fill: "url(#cbRainbow-gradient)"}}/>
                        }
                    </>
                );
                break;
            case "silver":
                chatBubbleIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="cbSilver-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#dadada" offset="0%"/>
                                <stop stopColor="#8e8e8e" offset="50%"/>
                                <stop stopColor="#dadada" offset="100%"/>
                            </linearGradient>
                        </svg>
                        {question 
                            ? <QuestionAnswer className={cn} style={{ fill: "url(#cbSilver-gradient)"}}/>
                            : <ChatBubbleOutline className={cn} style={{ fill: "url(#cbSilver-gradient)"}}/>
                        }
                    </>
                );
                break;
            case "gold":
                chatBubbleIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="cbGold-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#ab781d" offset="0%"/>
                                <stop stopColor="#eed264" offset="50%"/>
                                <stop stopColor="#ab781d" offset="100%"/>
                            </linearGradient>
                        </svg>
                        {question 
                            ? <QuestionAnswer className={cn} style={{ fill: "url(#cbGold-gradient)"}}/>
                            : <ChatBubbleOutline className={cn} style={{ fill: "url(#cbGold-gradient)"}}/>
                        }
                    </>
                );
                break;
            case "platinum":
                chatBubbleIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="cbPlatinum-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#d3e9f6" offset="0%" />
                                <stop stopColor="#6b8c95" offset="16.67%" />
                                <stop stopColor="#566167" offset="33.36%" />
                                <stop stopColor="#8e8e8e" offset="50.02%" />
                                <stop stopColor="#6d606a" offset="66.68%" />
                                <stop stopColor="#af9499" offset="83.34%" />
                                <stop stopColor="#dadada" offset="100%" />
                            </linearGradient>
                        </svg>
                        {question 
                            ? <QuestionAnswer className={cn} style={{ fill: "url(#cbPlatinum-gradient)"}}/>
                            : <ChatBubbleOutline className={cn} style={{ fill: "url(#cbPlatinum-gradient)"}}/>
                        }
                    </>
                );
                break;
            default:
                chatBubbleIconSpectrum = (
                    <>
                        {question 
                            ? <QuestionAnswer className={`${cn} ${spectrum}`}/>
                            : <ChatBubbleOutline className={`${cn} ${spectrum}`}/>
                        }
                    </>
                );
        }
        return chatBubbleIconSpectrum;
    }
    return (
        <> 
            {getChatBubbleIconSpectrum(spectrum)}
        </>
    )
};

export default ChatBubbleIconSpectrum;