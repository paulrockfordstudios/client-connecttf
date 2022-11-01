import React, { useEffect, useLayoutEffect, useCallback, useState, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../Context/AuthContext";
import PostFeed from '../Posts/PostFeed/PostFeed';
import QuestionFeed from '../Questions/QuestionFeed/QuestionFeed';
import axios from "axios";

import "./FeedContainer.css";
import { ExposurePlus2Outlined } from '@material-ui/icons';

function FeedContainer({ setCreatePost }) {

    //const {user} = useContext(AuthContext);
    const { user, union, actAcc } = useSelector((state) => state.auth);

    const el = useRef();
    const el2 = useRef();
    const postsRef = useRef();

    const posts = <PostFeed setCreatePost={setCreatePost}/>;
    const questions = <QuestionFeed />;

    const [feed, setFeed] = useState(posts);
    const [active, setActive] = useState("posts");
    const [ height, setHeight ] = useState(0);
    const [ clicked, setBoxshadow] = useState(false);

   /*
    useEffect(() => {
            const getHeight = async () => {
                try {
                    const feedContainerHeight =  await ref.current?.clientHeight;
                   
                    console.log(feedContainerHeight)
                    setHeight(feedContainerHeight);  
                } catch(err) {
                    console.log(err);
                }  
            }
        getHeight();
    }, []);
*/


    useEffect(() => {
        if(active === "posts") {
            setFeed(posts);
        } else if(active === "questions") {
            setFeed(questions);
        }
    }, [active]);

    /*
    useEffect(() => {
        if (!el) return;
        let prevValue = JSON.stringify(el.current.getBoundingClientRect());
        const handle = setInterval(() => {
            let nextValue = JSON.stringify(el.current.getBoundingClientRect());
            if (nextValue === prevValue) {
                clearInterval(handle);
                setHeight(el.current.getBoundingClientRect().height)
                setBoxshadow(true)
            } else {
                prevValue = nextValue;
            }
        }, 1000);
    }, [el?.current?.clientHeight]);
    */
    
    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="feedContainerContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" ? <div className={`feedContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} /> : <></>}
                            {user.spectrum === "silver" && <div className={`feedContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`feedContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`feedContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`feedContainerBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                            <div className="feedContainer union" 
                                ref={el => {
                                    if (!el) return;
                                    let prevValue = JSON.stringify(el.getBoundingClientRect());
                                    const handle = setInterval(() => {
                                        let nextValue = JSON.stringify(el.getBoundingClientRect());
                                        if (nextValue === prevValue) {
                                            clearInterval(handle);
                                            setHeight(el.getBoundingClientRect().height)
                                            setBoxshadow(true)
                                        } else {
                                            prevValue = nextValue;
                                        }
                                    }, 1000);
                                }} 
                                
                            >
                                <div className={`feedContainer-container BOX_SHADOW ${user.spectrum}`} ref={el2}>
                                    <div className="feedContainerBtns">
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <button 
                                                        className="postFeedBtn"
                                                        style={
                                                            active === "posts" 
                                                                ? {background: "white"} 
                                                                : {backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"}
                                                            }  
                                                        onClick={() => setActive("posts")}
                                                    >
                                                        <span className="fcDiamondText">Posts</span>
                                                    </button>
                                                    <button 
                                                        className="questionFeedBtn"
                                                        style={
                                                            active === "questions" 
                                                                ? {background: "white"} 
                                                                : {backgroundImage: "url(/misc/diamond-btn5.jpg)", backgroundSize: "cover"}
                                                            }  
                                                        onClick={() => setActive("questions")}
                                                    >
                                                        <span className="fcDiamondText">Questions</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        className={
                                                            active === "posts" 
                                                                ? `postFeedBtn-active ${user.spectrum}` 
                                                                : `postFeedBtn ${user.spectrum}`
                                                            } 
                                                        onClick={() => setActive("posts")}
                                                    >
                                                        Posts
                                                    </button> 
                                                    <button 
                                                        className={
                                                            active === "questions" 
                                                                ? `questionFeedBtn-active ${user.spectrum}` 
                                                                : `questionFeedBtn ${user.spectrum}`
                                                            } 
                                                        onClick={() => setActive("questions")}
                                                    >
                                                        Questions
                                                    </button>
                                                </>
                                            )
                                        }    
                                    </div>
                                    <div>  
                                        {feed}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="feedContainer">
                            <div className={`feedContainer-container BOX_SHADOW ${user.energy}`}>
                                <div className="feedContainerBtns">
                                    <button 
                                        className={
                                            active === "posts" 
                                                ? `postFeedBtn-active ${user.energy}` 
                                                : `postFeedBtn ${user.energy}`
                                            } 
                                        onClick={() => setActive("posts")}
                                    >
                                        Posts
                                    </button> 
                                    <button 
                                        className={
                                            active === "questions" 
                                                ? `questionFeedBtn-active ${user.energy}` 
                                                : `questionFeedBtn ${user.energy}`
                                            } 
                                        onClick={() => setActive("questions")}
                                    >
                                        Questions
                                    </button>
                                </div>
                                {feed}
                            </div>
                        </div> 
                    </>
                )
            }
        </>
    )
};

export default FeedContainer;