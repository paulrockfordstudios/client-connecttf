import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { cPOpen } from "../../../Redux/AuthSlice";
import { useParams } from "react-router";
import axios from "axios";
import CreatePost from '../CreatePost/CreatePost';
import PostShortDisplay from '../PostDisplays/PostShortDisplay/PostShortDisplay';
import "./PostFeed.css";
import { AuthContext } from "../../../Context/AuthContext";
import { AddAPhoto } from '@material-ui/icons';
import { CircularProgress } from "@material-ui/core";
import AdPrimary from '../../AdSpace/AdPrimary/AdPrimary';

function PostFeed({ dc, id }) {

    //const { user } = useContext(AuthContext);
    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const { userName } = useParams();
    const { unionName } = useParams();

    const dispatch = useDispatch();

    const observer = useRef();

    const [ posts, setPosts ] = useState([]);
    const [ active, setActive ] = useState("journey");
    const [ pageNum, setPageNum ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ hasMore, setHasMore ] = useState(false);
    const [ adInsert, setAdInsert ] = useState([10]);

    const colorTheme = user.unionName ? user.spectrum : user.energy;
    

    useEffect(() => {
        setPosts([]);
    }, [active])

    useEffect(() => {
        const fetchPosts = () => {
            setLoading(true);
            setError(false);
            if (userName || unionName) {   
                axios
                    .get(`/posts/${userName ? "flame" : "union"}-profile/${id}/${active}/${pageNum}`)
                    .then(res => {
                        setPosts(prevPostS => {
                            return [...new Set([...prevPostS, ...res.data.postArr])]
                        });
                        setHasMore(res.data.postCnt > pageNum + 20);
                        setLoading(false);
                    })
                    .catch(err => {
                        setError(true);
                    })        
            } else {
                axios
                    .get(`/posts/feed/${active}/${pageNum}`)
                    .then(res => {
                        setPosts(prevPostS => { 
                            return [...new Set([...prevPostS, ...res.data.postArr
                                .filter((f) => !user.flameBlockers.includes(f.userId))
                                .filter((f) => !user.unionBlockers.includes(f.unionId))
                            ])]
                        });
                        setHasMore(res.data.postCnt > pageNum + 20);
                        setLoading(false);
                    })
                    .catch(err => {
                        setError(true);
                    })
            }
        }
        fetchPosts();
    }, [pageNum, active]);

    const lastDQElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect(); 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNum(prev => prev + 20); 
            }
        })
        if (node) observer.current.observe(node)
    })

    useEffect(() => {
        setAdInsert(prev => {return [...prev, pageNum + 10]});
    }, [pageNum])
    
    const journeyHandler = () => {
        setActive("journey");
        setPageNum(0);
    }

    const groupHandler = () => {
        setActive("group");
        setPageNum(0);
    }

    const coachingHandler = () => {
        setActive("coaching");
        setPageNum(0);
    }

    const createClickHandler = () => {
        dispatch(cPOpen());
    }

    return (
        <>
        <div className="postFeed">
            <div className="postFeed-container">
            {actAcc === "union" ? 
                    (
                        <>
                            {!unionName || unionName === user.unionName ? userName ? 
                                (
                                    <></> 
                                ) : (
                                    <div className={`pfCreatePostBtn-container ${colorTheme}`}>
                                        <div 
                                            className={`pfCreatePostBtnHigherSpectrumBackground ${colorTheme}`} 
                                            style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`,
                                                backgroundSize: "cover", 
                                                opacity: ".3"
                                                } 
                                            }
                                        />
                                        <div className="pfCreatePostBtnWhiteBackground" />
                                        <div className={`pfCreatePostBtn union INNER_BOX_SHADOW ${colorTheme}`} onClick={createClickHandler}>
                                            <div className="pfCreatePostBtnLeft">
                                                <img className="pfCreatePostBtnAvatar" src={user.unionProfilePicture ? user.unionProfilePicture : "/picBlanks/no-union-avatar.jpg"} alt="" />
                                                <label className="pfCreatePostBtnPlaceHolder">
                                                    <span className="pfCreatePostBtnText intangible">{`What do you want to share with us today, `}</span>
                                                    <Link to={`/flame-profile/userName/${flame.userName}`}>
                                                        <span className={`pfCreatePostBtnText tangible ${flame.energy}`}>
                                                            {`${flame.firstName} `}
                                                        </span>
                                                    </Link>
                                                    <span className="pfCreatePostBtnText intangible">{" of "}</span>
                                                    <Link to={`/union-profile/${user.unionName}`}>
                                                        <span className={`pfCreatePostBtnText tangible ${colorTheme}`}>
                                                            {`${user.profileName} `}
                                                        </span>
                                                    </Link>                            
                                                    <span className="pfCreatePostBtnText intangible">{"?"}</span>
                                                </label>
                                            </div>
                                            <div className="pfCreatePostBtnRight">
                                                {colorTheme === "diamond" ?
                                                    (
                                                        <div 
                                                            className="pfCreatePostAskBtn"
                                                            style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}}
                                                        >
                                                            <span className={`pfCreatePostAskBtnIcon ${colorTheme}`}>?</span>
                                                        </div>
                                                    ) : (
                                                        <div className={`pfCreatePostAskBtn ${colorTheme}`}>
                                                            <span className={`pfCreatePostAskBtnIcon ${colorTheme}`}>?</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div> 
                                ) : (
                                    <></>
                                )
                            }
                        </>
                    ) : (
                        <>
                            {!userName || userName === user.userName ?  unionName ? 
                                (
                                    <></> 
                                ) : (
                                    <div className={`pfCreatePostBtn INNER_BOX_SHADOW ${colorTheme}`} onClick={createClickHandler}>
                                        <div className="pfCreatePostBtnLeft">
                                            <img className="pfCreatePostBtnAvatar" src={user.isAnonymous ?  "/picBlanks/no-union-avatar.jpg" : user.profilePicture ? user.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                            <label className="pfCreatePostBtnPlaceHolder">
                                                    <span className="pfCreatePostBtnText intangible">{`What do you want to share with us today, `}</span>
                                                    <Link to={`/flame-profile/userName/${user.userName}`}>
                                                        <span className={`pfCreatePostBtnText tangible ${colorTheme}`}>
                                                            {`${user.firstName} `}
                                                        </span>
                                                    </Link>
                                                    <span className="pfCreatePostBtnText intangible">{"?"}</span>
                                                </label>
                                        </div>
                                        <div className="pfCreatePostBtnRight">
                                            <div className={`pfCreatePostAskBtn ${colorTheme}`}>
                                                <span className={`pfCreatePostAskBtnIcon ${colorTheme}`}>?</span>
                                            </div>
                                        </div>
                                    </div> 
                                ) : (
                                    <></>
                                )
                            }
                        </>
                    )
                }
                {unionName || actAcc === "union" ?
                    (
                        <>
                            {colorTheme === "diamond" ?
                                (
                                    <>
                                        <div className="postFeedContainerBtns">
                                            <div 
                                                style={active === "journey"
                                                    ? {backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover", opacity: "30%"}
                                                    : {backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover", opacity: "100%"} 
                                                }
                                                className={active === "journey"
                                                    ? `postFeedContainerBtnBase-active journey ${colorTheme}`
                                                    : `postFeedContainerBtnBase journey ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`postFeedContainerBtnFont journey ${colorTheme}`}
                                                    onClick={journeyHandler}
                                                >
                                                    Journey Posts
                                                </button>
                                            </div>
                                            <div 
                                                style={active === "group"
                                                    ? {backgroundImage: "url(/misc/diamond-btn2.jpg)", backgroundSize: "cover", opacity: "30%"}
                                                    : {backgroundImage: "url(/misc/diamond-btn2.jpg)", backgroundSize: "cover", opacity: "100%"} 
                                                }
                                                className={active === "group"
                                                    ? `postFeedContainerBtnBase-active group ${colorTheme}`
                                                    : `postFeedContainerBtnBase group ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`postFeedContainerBtnFont group ${colorTheme}`}
                                                    onClick={groupHandler}
                                                >
                                                    Group Posts
                                                </button>
                                            </div>
                                            <div 
                                                style={active === "coaching"
                                                    ? {backgroundImage: "url(/misc/diamond-btn3.jpg)", backgroundSize: "cover", opacity: "30%"}
                                                    : {backgroundImage: "url(/misc/diamond-btn3.jpg)", backgroundSize: "cover", opacity: "100%"} 
                                                }
                                                className={active === "coaching"
                                                    ? `postFeedContainerBtnBase-active coaching ${colorTheme}`
                                                    : `postFeedContainerBtnBase coaching ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`postFeedContainerBtnFont coaching ${colorTheme}`}
                                                    onClick={coachingHandler}
                                                >
                                                    Coaching Posts
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {colorTheme === "rainbow" || colorTheme === "silver" || colorTheme === "gold" || colorTheme === "platinum" ?
                                            (
                                                <>
                                                    <div className="postFeedContainerBtns">
                                                        <div 
                                                            className={active === "journey"
                                                                ? `postFeedContainerBtnBase-active journey ${colorTheme}`
                                                                : `postFeedContainerBtnBase journey ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "journey"
                                                                    ? `postFeedContainerBtnFont-active journey ${colorTheme}`
                                                                    : `postFeedContainerBtnFont journey ${colorTheme}`
                                                                }
                                                                onClick={journeyHandler}
                                                            >
                                                                Journey Posts
                                                            </button>
                                                        </div>
                                                        <div 
                                                            className={active === "group"
                                                                ? `postFeedContainerBtnBase-active group ${colorTheme}`
                                                                : `postFeedContainerBtnBase group ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "group"
                                                                    ? `postFeedContainerBtnFont-active group ${colorTheme}`
                                                                    : `postFeedContainerBtnFont group ${colorTheme}`
                                                                }
                                                                onClick={groupHandler}
                                                            >
                                                                Group Posts
                                                            </button>
                                                        </div>
                                                        <div 
                                                            className={active === "coaching"
                                                                ? `postFeedContainerBtnBase-active coaching ${colorTheme}`
                                                                : `postFeedContainerBtnBase coaching ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "coaching"
                                                                    ? `postFeedContainerBtnFont-active coaching ${colorTheme}`
                                                                    : `postFeedContainerBtnFont coaching ${colorTheme}`
                                                                }
                                                                onClick={coachingHandler}
                                                            >
                                                                Coaching Posts
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="postFeedContainerBtns">
                                                        <button 
                                                            className={active === "journey"
                                                                ? `postFeedContainerBtn-active journey ${colorTheme}`
                                                                : `postFeedContainerBtn journey ${colorTheme}`
                                                            }
                                                            onClick={journeyHandler}
                                                        >
                                                            Journey Posts
                                                        </button>
                                                        <button 
                                                            className={active === "group"
                                                                ? `postFeedContainerBtn-active group ${colorTheme}`
                                                                : `postFeedContainerBtn group ${colorTheme}`
                                                            }
                                                            onClick={groupHandler}
                                                        >
                                                            Group Posts
                                                        </button>
                                                        <button 
                                                            className={active === "coaching"
                                                                ? `postFeedContainerBtn-active coaching ${colorTheme}`
                                                                : `postFeedContainerBtn coaching ${colorTheme}`
                                                            }
                                                            onClick={coachingHandler}
                                                        >
                                                            Coaching Posts
                                                        </button>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <div className="postFeedContainerBtns">
                                <button 
                                    className={active === "journey"
                                        ? `postFeedContainerBtn-active journey ${colorTheme}`
                                        : `postFeedContainerBtn journey ${colorTheme}`
                                    }
                                    onClick={journeyHandler}
                                >
                                    Journey Posts
                                </button>
                                <button 
                                    className={active === "group"
                                        ? `postFeedContainerBtn-active group ${colorTheme}`
                                        : `postFeedContainerBtn group ${colorTheme}`
                                    }
                                    onClick={groupHandler}
                                >
                                    Group posts
                                </button>
                                <button 
                                    className={active === "coaching"
                                        ? `postFeedContainerBtn-active coaching ${colorTheme}`
                                        : `postFeedContainerBtn coaching ${colorTheme}`
                                    }
                                    onClick={coachingHandler}
                                >
                                    Coaching Posts
                                </button>
                            </div>
                        </>
                    )
                }
                
                {posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        return <div ref={lastDQElementRef}><PostShortDisplay key={post._id} post={post} /></div>
                    } else {
                        return (
                            <>
                                {adInsert.includes(index) && <AdPrimary feed/>}
                                <PostShortDisplay key={post._id} post={post} />
                            </>
                        )
                    }
                })}
                {loading 
                    ? <CircularProgress color="#aeb4b7" size="50px" />
                    : <img className="postFeedConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                }
            </div>
        </div>

        </>
    )
};

export default PostFeed;