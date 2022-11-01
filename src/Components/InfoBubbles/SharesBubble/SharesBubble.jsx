import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import useWindowDims from '../../../Utils/crHooks/useWindowDims';
import axios from "axios";
import "./SharesBubble.css";

function SharesBubble( { flameShares, unionShares, sp }) {

    const ref = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { height: wHeight } = useWindowDims();

    const [ fShares, setFShares ] = useState();
    const [ uShares, setUShares ] = useState();
    const [ flameNames, setFlameNames ] = useState([]);
    const [ unionNames, setUnionNames ] = useState([]);
    const [ nameList, setNameList ] = useState([]); 
    const [ height, setHeight ] = useState(0);
    const [ scrollPosition, setScrollPosition ] = useState(sp);
    const [ isFLoading, setIsFLoading ] = useState(true);
    const [ isULoading, setIsULoading ] = useState(true);
    
    useEffect(() => {
        if(flameShares.length + unionShares.length === 0) { return }
        if (isFLoading === false && isULoading === false) {
            const getHeight = () => {
                const displayHeight = ref.current.clientHeight;
                setHeight(displayHeight - 22);
            }
            getHeight();
        }
    }, [isFLoading, isULoading]);

    useEffect(() => {
        const uniqueFShares = [...new Set(flameShares)]
        const otherUniqueFShares = uniqueFShares.filter((uFShare) => uFShare !== currentUser._id)
        setFShares(otherUniqueFShares);
        const uniqueUShares = [...new Set(unionShares)]
        const otherUniqueUShares = uniqueUShares.filter((uUShare) => uUShare !== currentUser._id)
        setUShares(otherUniqueUShares);
    }, []);


    useEffect(() => {
        if (fShares) {
            const getFlames = async () => {
                const responses = await Promise.all(
                    fShares.map((fShare) => axios.get(`/users/flame-name/${fShare}`))
                );
                setFlameNames(responses.map((res) => res.data));
                setIsFLoading(false);
            }
            getFlames();
        }
    }, [fShares]);

    useEffect(() => {
        if (uShares) {
            const getUnions = async () => {
                const responses = await Promise.all(
                    uShares.map((uShare) => axios.get(`/unions/union-name/${uShare}`))
                );
                setUnionNames(responses.map((res) => res.data));
                setIsULoading(false);
            }
            getUnions();
        }
    }, [uShares]);


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
            <div className="sharesDropdown-Container" ref={ref} style={scrollPosition > wHeight/2 ? {marginTop: `-${height}px`} : {marginTop: "0px"}}>
                <span className="sharesDropdownTitle">Shares</span>
                <ul className="sharesDropdownList">                    
                    {nameList.length > 18 ?
                        (
                            <>
                                {flameShares.includes(currentUser._id) &&
                                    <li className={`sharesDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        You
                                    </li>
                                }
                                {unionShares.includes(currentUser._id) &&
                                    <li className={`sharesDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        Your Union
                                    </li>
                                }
                                {nameList.map((name, index) => (
                                    <li className={`sharesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
                                        {name.profileName}
                                    </li>
                                )).slice(0,17)}
                                <li className="sharesDropdownListItem gray">
                                    and {nameList.length - 18} more...
                                </li>
                            </>
                        ) : (
                            <>
                                {flameShares.includes(currentUser._id) &&
                                    <li className={`sharesDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        You
                                    </li>
                                }
                                {unionShares.includes(currentUser._id) &&
                                    <li className={`sharesDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        Your Union
                                    </li>
                                }
                                {nameList.map((name, index) => (
                                    <li className={`sharesDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
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

export default SharesBubble;