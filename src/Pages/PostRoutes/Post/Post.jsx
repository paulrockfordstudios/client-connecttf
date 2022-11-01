import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Sidebar from '../../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../../Components/PageBars/TopBar/TopBar';
import PostFullDisplay from '../../../Components/Posts/PostDisplays/PostFullDisplay/PostFullDisplay';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import "./Post.css";


function Post() {

    const [ post, setPost ] = useState();
    const [ height, setHeight ] = useState();
    const [ clicked, setclicked] = useState(0);
    

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();


    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`/posts/${id}`);
            setPost(res.data);
        }
        fetchPost();
    }, [id]);


    return (
        <>
            <div className="post">
                <div className="post-container">
                    <div className="postAd">
                        <AdSecondary />
                    </div>
                    <div className="postRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    {post && <div className="postDisplayContainer" >
                                        {currentUser.spectrum === "rainbow" && <div className={`postDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "silver" && <div className={`postDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "gold" && <div className={`postDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "platinum" && <div className={`postDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        {currentUser.spectrum === "diamond" && <div className={`postDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                        <div className={`postDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} onClick={() => setclicked((click) => click + 1)}
                                        
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
                                            <PostFullDisplay post={post} />
                                        </div>
                                    </div>}
                                </>
                            ): (
                                <>
                                    {post && <div className={`postDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <PostFullDisplay post={post} />
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

export default Post;