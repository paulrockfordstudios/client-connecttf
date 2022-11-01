import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import AdSecondary from '../../Components/AdSpace/AdSecondary/AdSecondary';
import "./FriendRequests.css";
import AcceptedRequest from '../../Components/FriendRequests/AcceptedRequest/AcceptedRequest';
import FlameRequest from '../../Components/FriendRequests/FlameRequest/FlameRequest';
import UnionRequest from '../../Components/FriendRequests/UnionRequest/UnionRequest';


function FriendRequests() {

  
    const { user } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();

    const [ initialFriendRequests, setInitialFriendRequests ] = useState([]);
    const [ reqsInitialUnseen, setReqsInitialUnseen ] = useState([]);
    const [ reqsInitialUnseenCnt, setReqsInitialUnseenCnt ] = useState(0);

    const [ acceptedFriendRequests, setAcceptedFriendRequests ] = useState([]);
    const [ reqsAcceptedUnseen, setReqsAcceptedUnseen ] = useState([]);
    const [ reqsAcceptedUnseenCnt, setReqsAcceptedUnseenCnt ] = useState(0);

    const [ friendRequests, setFriendRequests ] = useState([]);
    const [ reqsUnseen, setReqsUnseen ] = useState([]);
    const [ reqsUnseenCnt, setReqsUnseenCnt ] = useState(0);

    useEffect(() => {
        const fetchInitialFriendRequests = async () => {
            const res = user.unionName
                ? await axios.get(`/friendRequests/union/${user._id}/befriend`)
                : await axios.get(`/friendRequests/flame/${user._id}/befriend`)
            setInitialFriendRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchInitialFriendRequests();
    }, [user]);

    useEffect(() => {
        const fetchAcceptedFriendRequests = async () => {
            const res = user.unionName
                ? await axios.get(`/friendRequests/union/${user._id}/accepted`)
                : await axios.get(`/friendRequests/flame/${user._id}/accepted`)
            setAcceptedFriendRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchAcceptedFriendRequests();
    }, [user]);

    useEffect(() => {
        if(initialFriendRequests) {
            const getReqsInitialUnseen = () => {
                const unseenArr = initialFriendRequests.filter((fr) => fr.initialSeen === false);
                setReqsInitialUnseen(unseenArr);
                setReqsInitialUnseenCnt(unseenArr.length);
            }
            getReqsInitialUnseen();
        }
    }, [initialFriendRequests]);

    useEffect(() => {
        if(acceptedFriendRequests) {
            const getReqsAcceptedUnseen = () => {
                const unseenArr = acceptedFriendRequests.filter((fr) => fr.acceptSeen === false);
                setReqsAcceptedUnseen(unseenArr);
                setReqsAcceptedUnseenCnt(unseenArr.length);
            }
            getReqsAcceptedUnseen();
        }
    }, [acceptedFriendRequests]);

    useEffect(() => {
        if (reqsInitialUnseen, reqsInitialUnseenCnt, reqsAcceptedUnseen, reqsAcceptedUnseenCnt) { 
            setFriendRequests(initialFriendRequests.concat(acceptedFriendRequests).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
            setReqsUnseen(reqsInitialUnseen.concat(reqsAcceptedUnseen).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
            setReqsUnseenCnt(reqsInitialUnseenCnt + reqsAcceptedUnseenCnt)
        }
    }, [reqsInitialUnseen, reqsInitialUnseenCnt, reqsAcceptedUnseen, reqsAcceptedUnseenCnt]);
    
    return (
        <div className="friendRequests">
            <div className="friendRequests-container">
                <div className="friendRequestsAd">
                    <AdSecondary />
                </div>
                <div className="friendRequestsRight">
                    {user.unionName ?
                        (
                            <>
                                <div className="friendRequestsDisplayContainer" >
                                    {user.spectrum === "rainbow" && <div className={`friendRequestsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "silver" && <div className={`friendRequestsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "gold" && <div className={`friendRequestsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "platinum" && <div className={`friendRequestsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {user.spectrum === "diamond" && <div className={`friendRequestsDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`friendRequestsDisplay-container union BOX_SHADOW ${user.spectrum}`} 
                                        
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
                                        {friendRequests.map((fr) => (
                                            fr.requestAccepted
                                                ? <AcceptedRequest key={fr._id} fr={fr} folMDD={true}/>
                                                : fr.flameRequesterId  
                                                    ? <FlameRequest key={fr._id} fr={fr} folMDD={true}/>
                                                    : <UnionRequest key={fr._id} fr={fr} folMDD={true}/>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`friendRequestsDisplay-container flame BOX_SHADOW ${user.energy}`}>
                                    {friendRequests.map((fr) => (
                                        fr.requestAccepted
                                            ? <AcceptedRequest key={fr._id} fr={fr} folMDD={true}/>
                                            : fr.flameRequesterId  
                                                ? <FlameRequest key={fr._id} fr={fr} folMDD={true}/>
                                                : <UnionRequest key={fr._id} fr={fr} folMDD={true}/>
                                    ))}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default  FriendRequests;