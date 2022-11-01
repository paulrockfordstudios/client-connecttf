import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { cQNOpen } from "../../../Redux/AuthSlice";
import { useParams } from "react-router";
import axios from "axios";
import CreateQuestion from '../CreateQuestion/CreateQuestion';
import QNShortDisplay from '../QuestionDisplay/QNShortDisplay/QNShortDisplay';
import "./QuestionFeed.css";
import { AuthContext } from "../../../Context/AuthContext";
import { AddAPhoto } from '@material-ui/icons';
import { CircularProgress } from "@material-ui/core";
import AdPrimary from '../../AdSpace/AdPrimary/AdPrimary';

function QuestionFeed({ dc, id }) {

    //const { user } = useContext(AuthContext);
    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const { userName } = useParams();
    const { unionName } = useParams();

    const dispatch = useDispatch();

    const observer = useRef();

    const [ questions, setQuestions ] = useState([]);
    const [ active, setActive ] = useState("journey");
    const [ pageNum, setPageNum ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ hasMore, setHasMore ] = useState(false);
    const [ adInsert, setAdInsert ] = useState([10]);

    const colorTheme = user.unionName ? user.spectrum : user.energy;
    

    useEffect(() => {
        setQuestions([]);
    }, [active])

    useEffect(() => {
        const fetchQuestions = () => {
            setLoading(true);
            setError(false);
            if (userName || unionName) {   
                axios
                    .get(`/questions/${userName ? "flame" : "union"}-profile/${id}/${active}/${pageNum}`)
                    .then(res => {
                        console.log(res.data)
                        setQuestions(prevQNS => {
                            return [...new Set([...prevQNS, ...res.data.qnArr])]
                        });
                        setHasMore(res.data.qnCnt > pageNum + 20);
                        setLoading(false);
                    })
                    .catch(err => {
                        setError(true);
                    })        
            } else {
                axios
                    .get(`/questions/feed/${active}/${pageNum}`)
                    .then(res => {
                        console.log(res.data)
                        setQuestions(prevQNS => { 
                            return [...new Set([...prevQNS, ...res.data.qnArr
                                .filter((f) => !user.flameBlockers.includes(f.userId))
                                .filter((f) => !user.unionBlockers.includes(f.unionId))
                            ])]
                        });
                        setHasMore(res.data.qnCnt > pageNum + 20);
                        setLoading(false);
                    })
                    .catch(err => {
                        setError(true);
                    })
            }
        }
        fetchQuestions();
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
        dispatch(cQNOpen());
    }

    return (
        <>
        <div className="qnFeed">
            <div className="qnFeed-container">
            {actAcc === "union" ? 
                    (
                        <>
                            {!unionName || unionName === user.unionName ? userName ? 
                                (
                                    <></> 
                                ) : (
                                    <div className={`qfCreateQnBtn-container ${colorTheme}`}>
                                        <div 
                                            className={`qfCreateQnBtnHigherSpectrumBackground ${colorTheme}`} 
                                            style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`,
                                                backgroundSize: "cover", 
                                                opacity: ".3"
                                                } 
                                            }
                                        />
                                        <div className="qfCreateQnBtnWhiteBackground" />
                                        <div className={`qfCreateQnBtn union INNER_BOX_SHADOW ${colorTheme}`} onClick={createClickHandler}>
                                            <div className="qfCreateQnBtnLeft">
                                                <img className="qfCreateQnBtnAvatar" src={user.unionProfilePicture ? user.unionProfilePicture : "/picBlanks/no-union-avatar.jpg"} alt="" />
                                                <label className="qfCreateQnBtnPlaceHolder">
                                                    <span className="qfCreateQnBtnText intangible">{`What questions do you have today, `}</span>
                                                    <Link to={`/flame-profile/userName/${flame.userName}`}>
                                                        <span className={`qfCreateQnBtnText tangible ${flame.energy}`}>
                                                            {`${flame.firstName} `}
                                                        </span>
                                                    </Link>
                                                    <span className="qfCreateQnBtnText intangible">{" of "}</span>
                                                    <Link to={`/union-profile/${user.unionName}`}>
                                                        <span className={`qfCreateQnBtnText tangible ${colorTheme}`}>
                                                            {`${user.profileName} `}
                                                        </span>
                                                    </Link>                            
                                                    <span className="qfCreateQnBtnText intangible">{"?"}</span>
                                                </label>
                                            </div>
                                            <div className="qfCreateQnBtnRight">
                                                {colorTheme === "diamond" ?
                                                    (
                                                        <div 
                                                            className="qfCreateQnAskBtn"
                                                            style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}}
                                                        >
                                                            <span className={`qfCreateQnAskBtnIcon ${colorTheme}`}>?</span>
                                                        </div>
                                                    ) : (
                                                        <div className={`qfCreateQnAskBtn ${colorTheme}`}>
                                                            <span className={`qfCreateQnAskBtnIcon ${colorTheme}`}>?</span>
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
                                    <div className={`qfCreateQnBtn INNER_BOX_SHADOW ${colorTheme}`} onClick={createClickHandler}>
                                        <div className="qfCreateQnBtnLeft">
                                            <img className="qfCreateQnBtnAvatar" src={user.isAnonymous ?  "/picBlanks/no-union-avatar.jpg" : user.profilePicture ? user.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                            <label className="qfCreateQnBtnPlaceHolder">
                                                    <span className="qfCreateQnBtnText intangible">{`What questions do you have today, `}</span>
                                                    <Link to={`/flame-profile/userName/${user.userName}`}>
                                                        <span className={`qfCreateQnBtnText tangible ${colorTheme}`}>
                                                            {`${user.firstName} `}
                                                        </span>
                                                    </Link>
                                                    <span className="qfCreateQnBtnText intangible">{"?"}</span>
                                                </label>
                                        </div>
                                        <div className="qfCreateQnBtnRight">
                                            <div className={`qfCreateQnAskBtn ${colorTheme}`}>
                                                <span className={`qfCreateQnAskBtnIcon ${colorTheme}`}>?</span>
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
                                        <div className="qnFeedContainerBtns">
                                            <div 
                                                style={active === "journey"
                                                    ? {backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover", opacity: "30%"}
                                                    : {backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover", opacity: "100%"} 
                                                }
                                                className={active === "journey"
                                                    ? `qnFeedContainerBtnBase-active journey ${colorTheme}`
                                                    : `qnFeedContainerBtnBase journey ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`qnFeedContainerBtnFont journey ${colorTheme}`}
                                                    onClick={journeyHandler}
                                                >
                                                    Journey Questions
                                                </button>
                                            </div>
                                            <div 
                                                style={active === "group"
                                                    ? {backgroundImage: "url(/misc/diamond-btn2.jpg)", backgroundSize: "cover", opacity: "30%"}
                                                    : {backgroundImage: "url(/misc/diamond-btn2.jpg)", backgroundSize: "cover", opacity: "100%"} 
                                                }
                                                className={active === "group"
                                                    ? `qnFeedContainerBtnBase-active group ${colorTheme}`
                                                    : `qnFeedContainerBtnBase group ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`qnFeedContainerBtnFont group ${colorTheme}`}
                                                    onClick={groupHandler}
                                                >
                                                    Group Questions
                                                </button>
                                            </div>
                                            <div 
                                                style={active === "coaching"
                                                    ? {backgroundImage: "url(/misc/diamond-btn3.jpg)", backgroundSize: "cover", opacity: "30%"}
                                                    : {backgroundImage: "url(/misc/diamond-btn3.jpg)", backgroundSize: "cover", opacity: "100%"} 
                                                }
                                                className={active === "coaching"
                                                    ? `qnFeedContainerBtnBase-active coaching ${colorTheme}`
                                                    : `qnFeedContainerBtnBase coaching ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`qnFeedContainerBtnFont coaching ${colorTheme}`}
                                                    onClick={coachingHandler}
                                                >
                                                    Coaching Questions
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {colorTheme === "rainbow" || colorTheme === "silver" || colorTheme === "gold" || colorTheme === "platinum" ?
                                            (
                                                <>
                                                    <div className="qnFeedContainerBtns">
                                                        <div 
                                                            className={active === "journey"
                                                                ? `qnFeedContainerBtnBase-active journey ${colorTheme}`
                                                                : `qnFeedContainerBtnBase journey ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "journey"
                                                                    ? `qnFeedContainerBtnFont-active journey ${colorTheme}`
                                                                    : `qnFeedContainerBtnFont journey ${colorTheme}`
                                                                }
                                                                onClick={journeyHandler}
                                                            >
                                                                Journey Questions
                                                            </button>
                                                        </div>
                                                        <div 
                                                            className={active === "group"
                                                                ? `qnFeedContainerBtnBase-active group ${colorTheme}`
                                                                : `qnFeedContainerBtnBase group ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "group"
                                                                    ? `qnFeedContainerBtnFont-active group ${colorTheme}`
                                                                    : `qnFeedContainerBtnFont group ${colorTheme}`
                                                                }
                                                                onClick={groupHandler}
                                                            >
                                                                Group Questions
                                                            </button>
                                                        </div>
                                                        <div 
                                                            className={active === "coaching"
                                                                ? `qnFeedContainerBtnBase-active coaching ${colorTheme}`
                                                                : `qnFeedContainerBtnBase coaching ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "coaching"
                                                                    ? `qnFeedContainerBtnFont-active coaching ${colorTheme}`
                                                                    : `qnFeedContainerBtnFont coaching ${colorTheme}`
                                                                }
                                                                onClick={coachingHandler}
                                                            >
                                                                Coaching Questions
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="qnFeedContainerBtns">
                                                        <button 
                                                            className={active === "journey"
                                                                ? `qnFeedContainerBtn-active journey ${colorTheme}`
                                                                : `qnFeedContainerBtn journey ${colorTheme}`
                                                            }
                                                            onClick={journeyHandler}
                                                        >
                                                            Journey Questions
                                                        </button>
                                                        <button 
                                                            className={active === "group"
                                                                ? `qnFeedContainerBtn-active group ${colorTheme}`
                                                                : `qnFeedContainerBtn group ${colorTheme}`
                                                            }
                                                            onClick={groupHandler}
                                                        >
                                                            Group Questions
                                                        </button>
                                                        <button 
                                                            className={active === "coaching"
                                                                ? `qnFeedContainerBtn-active coaching ${colorTheme}`
                                                                : `qnFeedContainerBtn coaching ${colorTheme}`
                                                            }
                                                            onClick={coachingHandler}
                                                        >
                                                            Coaching Questions
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
                            <div className="qnFeedContainerBtns">
                                <button 
                                    className={active === "journey"
                                        ? `qnFeedContainerBtn-active journey ${colorTheme}`
                                        : `qnFeedContainerBtn journey ${colorTheme}`
                                    }
                                    onClick={journeyHandler}
                                >
                                    Journey Questions
                                </button>
                                <button 
                                    className={active === "group"
                                        ? `qnFeedContainerBtn-active group ${colorTheme}`
                                        : `qnFeedContainerBtn group ${colorTheme}`
                                    }
                                    onClick={groupHandler}
                                >
                                    Group Questions
                                </button>
                                <button 
                                    className={active === "coaching"
                                        ? `qnFeedContainerBtn-active coaching ${colorTheme}`
                                        : `qnFeedContainerBtn coaching ${colorTheme}`
                                    }
                                    onClick={coachingHandler}
                                >
                                    Coaching Questions
                                </button>
                            </div>
                        </>
                    )
                }
                
                {questions.map((question, index) => {
                    if (questions.length === index + 1) {
                        return <div ref={lastDQElementRef}><QNShortDisplay key={question._id} question={question} /></div>
                    } else {
                        return (
                            <>
                                {adInsert.includes(index) && <AdPrimary feed/>}
                                <QNShortDisplay key={question._id} question={question} />
                            </>
                        )
                    }
                })}
                {loading 
                    ? <CircularProgress color="#aeb4b7" size="50px" />
                    : <img className="qnFeedConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                }
            </div>
        </div>

        </>
    )
};

export default QuestionFeed;