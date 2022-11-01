import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./QuoteOfTheDay.css";

function QuoteOfTheDay() {

    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();

    return (
        <>
            {currentUser.unionName ?
                (
                    <>
                        <div className="quoteOfTheDayContainer" style={{height: `${height}px`}}>
                            {currentUser.spectrum === "rainbow" && <div className={`quoteOfTheDayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "silver" && <div className={`quoteOfTheDayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "gold" && <div className={`quoteOfTheDayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "platinum" && <div className={`quoteOfTheDayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {currentUser.spectrum === "diamond" && <div className={`quoteOfTheDayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`quoteOfTheDay union BOX_SHADOW ${currentUser.spectrum}`}
                                
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
                                <div className="quoteOfTheDay-container"> 
                                    <img className="quoteOfTheDayPNGIcon" src={`/icons/fol/fol-${currentUser.spectrum}.png`} alt="" />
                                    <div className="quoteOfTheDayQuoteContainer">
                                        <h5 className="quoteOfTheDayQuote">“Never let the fear of striking out keep you from playing the game.”</h5>
                                        <h5 className="quoteOfTheDayAuthor">~ Babe Ruth ~</h5>
                                    </div> 
                                </div>     
                            </div> 
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`quoteOfTheDay flame BOX_SHADOW ${currentUser.energy}`}>
                            <div className="quoteOfTheDay-container">
                                {/*<h4 className="popQuestionsTitle">Quote of the Day</h4>*/}
                                <img className="quoteOfTheDayPNGIcon" src={`/icons/fol/fol-${currentUser.energy}.png`} alt="" />
                                <div className="quoteOfTheDayQuoteContainer">
                                    <h5 className="quoteOfTheDayQuote">“Never let the fear of striking out keep you from playing the game.”</h5>
                                    <h5 className="quoteOfTheDayAuthor">~ Babe Ruth ~</h5>
                                </div>
                            </div>     
                        </div> 
                    </>
                )
            }
        </>
    )
}


export default QuoteOfTheDay;