import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import useWindowDims from '../../../Utils/crHooks/useWindowDims';
import axios from "axios";
import "./LovesBubble.css";

function LovesBubble( { flameLoves, unionLoves, isFlameLoved, isUnionLoved, list, sp }) {


    const ref = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { height: wHeight } = useWindowDims();

    const [ fLoves, setFLoves ] = useState();
    const [ uLoves, setULoves ] = useState();
    const [ flameNames, setFlameNames ] = useState([]);
    const [ unionNames, setUnionNames ] = useState([]);
    const [ nameList, setNameList ] = useState([]); 
    const [ personalFLove, setPersonalFLove ] = useState(false);
    const [ personalULove, setPersonalULove ] = useState(false);
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
        if (flameLoves.length + unionLoves.length === 0) { return }
        if (isFLoading === false && isULoading === false) {
            const getHeight = () => {
                const displayHeight = ref.current.clientHeight;
                setHeight(displayHeight - dHCnt);
            }
            getHeight();
        }
    }, [isFLoading, isULoading]);

    useEffect(() => {
        if(isFlameLoved === true || isUnionLoved === true) {
                const getHeight = () => {
                    const displayHeight = ref.current.clientHeight;
                    setHeight(displayHeight - dHCnt);
                }
                getHeight();
            }
    }, [isFlameLoved, isUnionLoved]);


    useEffect(() => {
        flameLoves.includes(currentUser._id) && setPersonalFLove(true);
        const uniqueFLoves = [...new Set(flameLoves)]
        const otherUniqueFLoves = uniqueFLoves.filter((uFLove) => uFLove !== currentUser._id)
        setFLoves(otherUniqueFLoves);
        unionLoves.includes(currentUser._id) && setPersonalULove(true);
        const uniqueULoves = [...new Set(unionLoves)]
        const otherUniqueULoves = uniqueULoves.filter((uULove) => uULove !== currentUser._id)
        setULoves(otherUniqueULoves);
    }, []);


    useEffect(() => {
        if (fLoves) {
            const getFlames = async () => {
                const responses = await Promise.all(
                    fLoves.map((fLove) => axios.get(`/users/flame-name/${fLove}`))
                );
                setFlameNames(responses.map((res) => res.data));
                setIsFLoading(false);
            }
            getFlames();
        }
    }, [fLoves]);

    useEffect(() => {
        if (uLoves) {
            const getUnions = async () => {
                const responses = await Promise.all(
                    uLoves.map((uLoves) => axios.get(`/unions/union-name/${uLoves}`))
                );
                setUnionNames(responses.map((res) => res.data));
                setIsULoading(false);
            }
            getUnions();
        }
    }, [uLoves]);


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
            <div className="lovesDropdown-Container" 
                ref={ref} 
                style={list === "reply" 
                    ? {marginTop: `-${height}px`} 
                    : scrollPosition > wHeight/2 
                        ? {marginTop: `-${height}px`} 
                        : {marginTop: "0px"}
                }
            >
                <span className="lovesDropdownTitle">Loves</span>
                <ul className="lovesDropdownList">        
                    {nameList.length > dNVar ?
                        (
                            <>
                                {personalFLove || isFlameLoved ?
                                    (
                                        <>
                                            <li className={`lovesDropdownListItem ${currentUser.energy}`}>
                                                You
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {personalULove || isUnionLoved ?
                                    (
                                        <>
                                            <li className={`lovesDropdownListItem ${currentUser.spectrum}`}>
                                                Your Union
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {nameList.map((name, index) => (
                                    <li className={`lovesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
                                        {name.profileName}
                                    </li>
                                )).slice(0, personalFLove || isFlameLoved || personalULove || isUnionLoved ? dNCnt : dNVar )}
                                <li className="lovesDropdownListItem gray">
                                    and {personalFLove || isFlameLoved || personalULove || isUnionLoved ? nameList.length - dNCnt : nameList.length - dNVar} more...
                                </li>
                            </>
                        ) : (
                            <>
                                {personalFLove || isFlameLoved ?
                                    (
                                        <>
                                            <li className={`lovesDropdownListItem ${currentUser.energy}`}>
                                                You
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {personalULove || isUnionLoved ?
                                    (
                                        <>
                                            <li className={`lovesDropdownListItem ${currentUser.spectrum}`}>
                                                Your Union
                                            </li>
                                        </>
                                    ) : ( <></> )
                                }
                                {nameList.map((name, index) => (
                                    <li className={`lovesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
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

export default LovesBubble;