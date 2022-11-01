import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import useWindowDims from '../../../Utils/crHooks/useWindowDims';
import axios from "axios";
import "./LikesBubble.css";

function LikesBubble({ flameLikes, unionLikes, isFlameLiked, isUnionLiked, list, sp }) {

    const ref = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { height: wHeight } = useWindowDims();

    const [ fLikes, setFLikes ] = useState();
    const [ uLikes, setULikes ] = useState();
    const [ flameNames, setFlameNames ] = useState([]);
    const [ unionNames, setUnionNames ] = useState([]);
    const [ nameList, setNameList ] = useState([]);
    const [ personalFLike, setPersonalFLike ] = useState(false); 
    const [ personalULike, setPersonalULike ] = useState(false); 
    const [ scrollPosition, setScrollPosition ] = useState(sp);
    const [ height, setHeight ] = useState(0);
    const [ isFLoading, setIsFLoading ] = useState(true);
    const [ isULoading, setIsULoading ] = useState(true);
    const [ dNVar, setDNVar ] = useState();
    const [ dNCnt, setDNCnt ] = useState();
    const [ dHCnt, setDHCnt ] = useState();


    useEffect(() => {
        switch (list) {
            case "qn":
                setDNVar(18);
                setDNCnt(17);
                setDHCnt(22);
                break;
            case "post":
                setDNVar(18);
                setDNCnt(17);
                setDHCnt(22);
                break;
            case "answer":
                setDNVar(10);
                setDNCnt(9);
                setDHCnt(18);
                break;
            case "comment":
                setDNVar(10);
                setDNCnt(9);
                setDHCnt(18);
                break;
            default:
                setDNVar(3);
                setDNCnt(2);
                setDHCnt(16);
            }
    }, []);

    useEffect(() => {
        if(flameLikes.length + unionLikes.length === 0) { return }
            if (isFLoading === false && isULoading === false) {
                const getHeight = () => {
                    const displayHeight = ref.current.clientHeight;
                    setHeight(displayHeight - dHCnt);
                }
                getHeight();
            }
    }, [isFLoading, isULoading,]);

    useEffect(() => {
        if(isFlameLiked === true || isUnionLiked === true) {
                const getHeight = () => {
                    const displayHeight = ref.current.clientHeight;
                    setHeight(displayHeight - dHCnt);
                }
                getHeight();
            }
    }, [isFlameLiked, isUnionLiked]);

    useEffect(() => {
        flameLikes.includes(currentUser._id) && setPersonalFLike(true);
        const uniqueFLikes = [...new Set(flameLikes)]
        const otherUniqueFLikes = uniqueFLikes.filter((uFLike) => uFLike !== currentUser._id)
        setFLikes(otherUniqueFLikes);
        unionLikes.includes(currentUser._id) && setPersonalULike(true);
        const uniqueULikes = [...new Set(unionLikes)]
        const otherUniqueULikes = uniqueULikes.filter((uULikes) => uULikes !== currentUser._id)
        setULikes(otherUniqueULikes);
    }, [flameLikes, unionLikes ]);


    useEffect(() => {
        if (fLikes) {
            const getFlames = async () => {
                const responses = await Promise.all(
                    fLikes.map((fLike) => axios.get(`/users/flame-name/${fLike}`))
                )
                setFlameNames(responses.map((res) => res.data));
                setIsFLoading(false);
            }
            getFlames();
        }
    }, [fLikes]);

    useEffect(() => {
        if (uLikes) {
            const getUnions = async () => {
                const responses = await Promise.all(
                    uLikes.map((uLike) => axios.get(`/unions/union-name/${uLike}`))
                )
                setUnionNames(responses.map((res) => res.data));
                setIsULoading(false);
            }
            getUnions();
        }
    }, [uLikes]);


    useEffect(() => {
        if (flameNames && unionNames) {
            const fNames = flameNames.map((obj, index) => {return {...obj, index: index}});
            const uNames = unionNames.map((obj, index) => {return {...obj, index: index}});
            const allNames = fNames.concat(uNames);
            const sortedNames = allNames.sort((a, b) => a.index > b.index ? 1:-1);
            setNameList(sortedNames);
        }
    }, [flameNames, unionNames]);

    useEffect(() => {
        if (sp) {
            setScrollPosition(sp)
        }
      }, [sp]);
    

    
    return (
        <>
            <div 
                className="likesDropdown-Container" 
                ref={ref} 
                style={list === "reply" ? {marginTop: `-${height}px`} :
                    scrollPosition > wHeight/2 
                        ? {marginTop: `-${height}px`} 
                        : {marginTop: "0px"}
                }
            >
                <span className="likesDropdownTitle">Likes</span>
                <ul className="likesDropdownList">            
                    {nameList.length > dNVar ?
                        (
                            <>
                                {personalFLike || isFlameLiked ?
                                    (
                                        <>
                                            <li className={`likesDropdownListItem ${currentUser.energy}`}>
                                                You
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {personalULike || isUnionLiked ?
                                    (
                                        <>
                                            <li className={`likesDropdownListItem ${currentUser.spectrum}`}>
                                                Your Union
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {nameList.map((name, index) => (
                                    <li className={`likesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
                                        {name.profileName}
                                    </li>                              
                                )).slice( 0, personalFLike || isFlameLiked || personalULike || isUnionLiked ? dNCnt : dNVar )}
                                <li className="likesDropdownListItem gray">
                                    and {personalFLike || isFlameLiked || personalULike || isUnionLiked ? nameList.length - dNCnt : nameList.length - dNVar} more...
                                </li>
                            </>
                        ) : (
                            <>                
                                {personalFLike || isFlameLiked ?
                                    (
                                        <>
                                            <li className={`likesDropdownListItem ${currentUser.energy}`}>
                                                You
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {personalULike || isUnionLiked ?
                                    (
                                        <>
                                            <li className={`likesDropdownListItem ${currentUser.spectrum}`}>
                                                Your Union
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {nameList.map((name, index) => (
                                    <li className={`likesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
                                        {name.profileName}
                                    </li>
                                ))}                
                            </>
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default LikesBubble;