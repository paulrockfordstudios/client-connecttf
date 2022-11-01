import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../Context/AuthContext";
import "./FriendNews.css";

function FriendNews() {

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser, union, actAcc } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
 
    return (
        <>
            {actAcc === "union" ?
                (
                    <>
                        <div className="friendNewsContainer" style={{height: `${height}px`}}>
                            {union.spectrum === "rainbow" && <div className={`friendNewsBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {union.spectrum === "silver" && <div className={`friendNewsBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {union.spectrum === "gold" && <div className={`friendNewsBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {union.spectrum === "platinum" && <div className={`friendNewsBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {union.spectrum === "diamond" && <div className={`friendNewsBackgroundTheme ${union.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`friendNews union BOX_SHADOW ${union.spectrum}`}
                                
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
                            <div className="friendNews-container">
                                <ul className="friendNewsList">
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/birthday.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> have a birthday today.
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/relationship.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there relationship status to "".
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/journey.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there journey status to "".
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/profile.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there profile.
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/story.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there story.
                                        </span>
                                    </li>
                                </ul>
                            </div>     
                        </div>
                    </div>
                    </>
                ) : (
                    <>
                        <div className={`friendNews flame BOX_SHADOW ${currentUser.energy}`}>
                            <div className="friendNews-container">
                                <ul className="friendNewsList">
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/birthday.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> have a birthday today.
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/relationship.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there relationship status to "".
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/journey.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there journey status to "".
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/profile.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there profile.
                                        </span>
                                    </li>
                                    <li className="friendNewsUpdate">
                                        <img className="friendNewsIcon" src="/icons/friendNews/story.png" alt="" />
                                        <span className="friendNewsText">
                                            <b>Someone</b> and <b>3 others</b> updated there story.
                                        </span>
                                    </li>
                                </ul>
                            </div>     
                        </div> 
                    </>
                )
            }
        </>
    )
};

export default FriendNews;