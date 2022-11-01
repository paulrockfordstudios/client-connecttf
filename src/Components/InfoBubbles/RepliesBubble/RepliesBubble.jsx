import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import useWindowDims from '../../../Utils/crHooks/useWindowDims';
import axios from "axios";
import "./RepliesBubble.css";

function RepliesBubble( { flameReplies, unionReplies, list, sp, na }) {

    const ref = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { height: wHeight } = useWindowDims();

    const [ fReplies, setFReplies ] = useState();
    const [ uReplies, setUReplies ] = useState();
    const [ flameNames, setFlameNames ] = useState([]);
    const [ unionNames, setUnionNames ] = useState([]);
    const [ nameList, setNameList ] = useState([]); 
    const [ scrollPosition, setScrollPosition ] = useState(sp);
    const [ height, setHeight ] = useState(0);
    const [ isFLoading, setIsFLoading ] = useState(true);
    const [ isULoading, setIsULoading ] = useState(true);
    const [ dNVar, setDNVar ] = useState();
    const [ dNCnt, setDNCnt ] = useState();
    const [ dHCnt, setDHCnt ] = useState();
    const [ count, setCount ] = useState();

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
                setDHCnt(22);
                break;
            case "comment":
                setDNVar(10);
                setDNCnt(9);
                setDHCnt(22);
                break;
            default:
                setDNVar(3);
                setDNCnt(2);
                setDHCnt(19);

            }
    }, []);
    

    useEffect(() => {
        if(na) { return }
        if (isFLoading === false && isULoading === false) {
            const getHeight = () => {
                const displayHeight = ref.current.clientHeight;
                setHeight(displayHeight - dHCnt);
            }
            getHeight();
        }
    }, [isFLoading, isULoading, na]);

    useEffect(() => {
        const uniqueFReplies = [...new Set(flameReplies)]
        const otherUniqueFReplies = uniqueFReplies.filter((uFReply) => uFReply !== currentUser._id)
        setFReplies(otherUniqueFReplies);
        const uniqueUReplies = [...new Set(unionReplies)]
        const otherUniqueUReplies = uniqueUReplies.filter((uUReply) => uUReply !== currentUser._id)
        setUReplies(otherUniqueUReplies);
    }, []);


    useEffect(() => {
        if (fReplies) {
            const getFlames = async () => {
                const responses = await Promise.all(
                    fReplies.map((fReply) => axios.get(`/users/flame-name/${fReplies}`))
                );
                setFlameNames(responses.map((res) => res.data));
                setIsFLoading(false);
            }
            getFlames();
        }
    }, [fReplies]);

    useEffect(() => {
        if (uReplies) {
            const getUnions = async () => {
                const responses = await Promise.all(
                    uReplies.map((uReply) => axios.get(`/unions/union-name/${uReply}`))
                );
                setUnionNames(responses.map((res) => res.data));
                setIsULoading(false);
            }
            getUnions();
        }
    }, [uReplies]);


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

    useEffect(() => {
        const getCount = () => {
            let cnt = 0;
            flameReplies.includes(currentUser._id) || unionReplies.includes(currentUser._id) 
                ? cnt = dNCnt 
                : cnt = dNVar
            setCount(cnt);
        }
        getCount();
    }, [flameReplies, unionReplies, currentUser]);


    return (
        <>
            {na ?
                ( <></> ) : (
                    <>
                        <div 
                            className="repliesDropdown-Container" 
                            ref={ref} 
                            style={list === "reply" 
                                ? {marginTop: `-${height}px`} 
                                : scrollPosition > wHeight/2 
                                    ? {marginTop: `-${height}px`} 
                                    : {marginTop: "0px"}
                            }
                        >
                            <span className="repliesDropdownTitle">Replies</span>
                            <ul className="repliesDropdownList">
                                
                                {nameList.length > count ?
                                    (
                                        <>
                                            {flameReplies.includes(currentUser._id) &&
                                                <li className={`repliesDropdownListItem ${currentUser.energy}`}>
                                                    You
                                                </li>
                                            }
                                            {unionReplies.includes(currentUser._id) &&
                                                <li className={`repliesDropdownListItem ${currentUser.spectrum}`}>
                                                    Your Union
                                                </li>
                                            }
                                            {nameList.map((name, index) => (
                                                <li className={`repliesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
                                                    {name.profileName}
                                                </li>
                                            )).slice( 0, flameReplies.includes(currentUser._id) || unionReplies.includes(currentUser._id) ? dNCnt - 1 : dNCnt )}
                                            <li className="repliesDropdownListItem gray">
                                                and {flameReplies.includes(currentUser._id) || unionReplies.includes(currentUser._id) ? nameList.length - dNCnt : nameList.length - dNVar} more...
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            {flameReplies.includes(currentUser._id) &&
                                                <li className={`repliesDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                                    You
                                                </li>
                                            }
                                            {unionReplies.includes(currentUser._id) &&
                                                <li className={`repliesDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                                    Your Union
                                                </li>
                                            }
                                            {nameList.map((name, index) => (
                                                <li className={`repliesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
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
        </>
    )
}

export default RepliesBubble;