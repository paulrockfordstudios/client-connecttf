import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import PostFeed from '../../../Components/Posts/PostFeed/PostFeed';
import Sidebar from '../../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../../Components/PageBars/TopBar/TopBar';
import "./Posts.css";
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import CreatePost from '../../../Components/Posts/CreatePost/CreatePost';


function Posts() {

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser, cPost } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    const [ createPost, setCreatePost ] = useState(false);

    useEffect(() => {
        setCreatePost(cPost)
    }, [cPost]);

    
    return (
        <>
            <div className="posts">
                <div className="posts-container">
                    <div className="postsAd">
                        <AdSecondary />
                    </div>
                    <div className="postsRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    <div className="postsDisplayContainer" >
                                        {currentUser.spectrum === "rainbow" && <div className={`postsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "silver" && <div className={`postsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "gold" && <div className={`postsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "platinum" && <div className={`postsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "diamond" && <div className={`postsDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        <div className={`postsDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                            
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
                                            <PostFeed />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`postsDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <PostFeed />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {createPost &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.unionName 
                                ? currentUser.spectrum 
                                    ? currentUser.spectrum 
                                    : "gray" 
                                : currentUser.energy 
                                    ? currentUser.energy 
                                    : "gray"
                            }`
                        }
                    />
                    <div className="createPostQNScreenContainer">
                        <CreatePost />
                    </div>
                </div>
            }
        </>
    )
};

export default Posts;