import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import useWindowDims from '../../../Utils/crHooks/useWindowDims';
import axios from "axios";
import "./AnswersBubble.css";

function AnswersBubble( { flameAnswers, unionAnswers, sp }) {

    const ref = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { height: wHeight } = useWindowDims();

    const [ fAnswers, setFAnswers ] = useState();
    const [ uAnswers, setUAnswers ] = useState();
    const [ flameNames, setFlameNames ] = useState([]);
    const [ unionNames, setUnionNames ] = useState([]);
    const [ nameList, setNameList ] = useState([]); 
    const [ scrollPosition, setScrollPosition ] = useState(sp);
    const [ height, setHeight ] = useState(0);
    const [ isFLoading, setIsFLoading ] = useState(true);
    const [ isULoading, setIsULoading ] = useState(true);


    useEffect(() => {
        if(flameAnswers.length + unionAnswers.length === 0) { return }
        if (isFLoading === false && isULoading === false) {
            const getHeight = () => {
                const displayHeight = ref.current.clientHeight;
                setHeight(displayHeight - 22);
            }
            getHeight();
        }
    }, [isFLoading, isULoading, flameAnswers, unionAnswers]);

    useEffect(() => {
        const uniqueFAnswers = [...new Set(flameAnswers)]
        const otherUniqueFAnswers = uniqueFAnswers.filter((uFAnswer) => uFAnswer !== currentUser._id)
        setFAnswers(otherUniqueFAnswers);
        const uniqueUAnswers = [...new Set(unionAnswers)]
        const otherUniqueUAnswers = uniqueUAnswers.filter((uUAnswer) => uUAnswer !== currentUser._id)
        setUAnswers(otherUniqueUAnswers);
    }, []);


    useEffect(() => {
        if (fAnswers) {
            const getFlames = async () => {
                const responses = await Promise.all(
                    fAnswers.map((fAnswer) => axios.get(`/users/flame-name/${fAnswer}`))
                );
                setFlameNames(responses.map((res) => res.data));
                setIsFLoading(false);
            }
            getFlames();
        }
    }, [fAnswers]);

    useEffect(() => {
        if (uAnswers) {
            const getUnions = async () => {
                const responses = await Promise.all(
                    uAnswers.map((uAnswer) => axios.get(`/unions/union-name/${uAnswer}`))
                );
                setUnionNames(responses.map((res) => res.data));
                setIsULoading(false);
            }
            getUnions();
        }
    }, [uAnswers]);


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
            <div className="answersDropdown-Container" ref={ref} style={scrollPosition > wHeight/2 ? {marginTop: `-${height}px`} : {marginTop: "0px"}}>
                <span className="answersDropdownTitle">Answers</span>
                <ul className="answersDropdownList">                    
                    {nameList.length > 18 ?
                        (
                            <>
                                {flameAnswers.includes(currentUser._id) &&
                                    <li className={`answersDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        You
                                    </li>
                                }
                                {unionAnswers.includes(currentUser._id) &&
                                    <li className={`answersDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        Your Union
                                    </li>
                                }
                                {nameList.map((name, index) => (
                                    <li className={`answersDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
                                        {name.profileName}
                                    </li>
                                )).slice(0,17)}
                                <li className="answersDropdownListItem gray">
                                    and {nameList.length - 18} more...
                                </li>
                            </>
                        ) : (
                            <>
                                {flameAnswers.includes(currentUser._id) &&
                                    <li className={`answersDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        You
                                    </li>
                                }
                                {unionAnswers.includes(currentUser._id) &&
                                    <li className={`answersDropdownListItem ${currentUser.unionName ? currentUser.spectrum : currentUser.energy}`}>
                                        Your Union
                                    </li>
                                }
                                {nameList.map((name, index) => (
                                    <li className={`answersDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
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

export default AnswersBubble;