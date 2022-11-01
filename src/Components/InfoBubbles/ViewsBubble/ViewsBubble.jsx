import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import useWindowDims from '../../../Utils/crHooks/useWindowDims';
import axios from "axios";
import "./ViewsBubble.css";

function ViewsBubble( { flameViews, unionViews, sp }) {

    const ref = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { height: wHeight } = useWindowDims();

    const [ fViews, setFViews ] = useState([]);
    const [ uViews, setUViews ] = useState([]);
    const [ fUserView, setFUserView ] = useState();
    const [ uUserView, setUUserView ] = useState();
    const [ flameNames, setFlameNames ] = useState([]);
    const [ unionNames, setUnionNames ] = useState([]);
    const [ nameList, setNameList ] = useState([]); 
    const [ height, setHeight ] = useState(0);
    const [ scrollPosition, setScrollPosition ] = useState(sp);
    const [ isFLoading, setIsFLoading ] = useState(true);
    const [ isULoading, setIsULoading ] = useState(true);
    const [ isSeenLoading, setIsSeenLoading ] = useState(true);
    const [ userSeen, setUserSeen ] = useState(false);
    const [ userType, setUserType ] = useState("");

    useEffect(() => {
        if (ref && ref.current && ref.current.clientHeight) {
            setHeight(ref.current.clientHeight - 22);
        }
    });

    useEffect(() => {
        if (flameViews) {
            const uFViews = [...new Set(flameViews)];
            const otherUniqueFViews = uFViews.filter((uFView) => uFView !== currentUser._id);
            setFViews(otherUniqueFViews);
        }
        if (unionViews) {
            const uUViews = [...new Set(unionViews)];
            const otherUniqueUViews = uUViews.filter((uUView) => uUView !== currentUser._id)
            setUViews(otherUniqueUViews);
        }
    }, [flameViews, unionViews]);


    useEffect(() => {
        if (fViews) {
            const getFlames = async () => {
                const responses = await Promise.all(
                    fViews.map((fView) => axios.get(`/users/flame-name/${fView}`))
                )
                if (flameViews.includes(currentUser._id)) {setUserSeen(true)};
                setFlameNames(responses.map((res) => res.data))
                setIsFLoading(false);
            }
            getFlames();
        }
    }, [fViews]);

    useEffect(() => {
        if (uViews) {
            const getUnions = async () => {
                const responses = await Promise.all(
                    uViews.map((uView) => axios.get(`/unions/union-name/${uView}`))
                )
                if (unionViews.includes(currentUser._id)) {setUserSeen(true)};
                setUnionNames(responses.map((res) => res.data))
                setIsULoading(false);
            }
            getUnions();
        }
    }, [uViews]);

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
            <div className="viewsDropdown-Container" ref={ref} style={scrollPosition > wHeight/2 ? {marginTop: `-${height}px`} : {marginTop: "0px"}}>
                <span className="viewsDropdownTitle">Views</span>
                <ul className="viewsDropdownList">
                    {userSeen && 
                        <li 
                            className={
                                `viewsDropdownListItem 
                                ${
                                    currentUser.unionName 
                                        ? currentUser.spectrum 
                                            ? currentUser.spectrum
                                            : "gray"
                                        : currentUser.energy
                                            ? currentUser.energy
                                            : "gray" 
                                }
                                ${
                                    currentUser.spectrum 
                                        ? currentUser.spectrum === "rainbow" ||
                                        currentUser.spectrum === "silver" ||
                                        currentUser.spectrum === "gold" ||
                                        currentUser.spectrum === "platinum" ||
                                        currentUser.spectrum === "diamond" 
                                            ? "weight"
                                            : ""
                                        : ""
                                }`
                            }
                        >
                            {currentUser.unionName? "Your Union" : "You"}
                        </li>
                    }
                    {nameList.length > 18 ?
                        (
                            <>
                                {nameList.map((name, index) => (
                                    <li 
                                        className={
                                            `viewsDropdownListItem 
                                            ${name.spectrum ? name.spectrum : name.energy}
                                            ${name.spectrum 
                                                ? name.spectrum === "rainbow" ||
                                                name.spectrum === "silver" ||
                                                name.spectrum === "gold" ||
                                                name.spectrum === "platinum" ||
                                                name.spectrum === "diamond" 
                                                    ? "weight"
                                                    : ""
                                                : ""
                                            }`
                                        }  
                                        key={index}
                                    >
                                        {name.profileName}
                                    </li>
                                )).slice(0,17)}
                                <li className="viewsDropdownListItem gray">
                                    and {nameList.length - 18} more...
                                </li>
                            </>
                        ) : (
                            <>
                                {nameList.map((name, index) => (
                                    <li 
                                        className={
                                            `viewsDropdownListItem 
                                            ${name.spectrum ? name.spectrum : name.energy}
                                            ${name.spectrum 
                                                ? name.spectrum === "rainbow" ||
                                                  name.spectrum === "silver" ||
                                                  name.spectrum === "gold" ||
                                                  name.spectrum === "platinum" ||
                                                  name.spectrum === "diamond" 
                                                    ? "weight"
                                                    : ""
                                                : ""
                                            }`
                                        } 
                                        key={index}
                                    >
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

export default ViewsBubble;