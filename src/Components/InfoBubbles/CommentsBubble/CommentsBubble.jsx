import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../../Context/AuthContext";
import useWindowDims from '../../../Utils/crHooks/useWindowDims';
import axios from "axios";
import "./CommentsBubble.css";

function CommentsBubble( { flameComments, unionComments, sp }) {

    const ref = useRef();

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const { height: wHeight } = useWindowDims();

    const [ fComments, setFComments ] = useState();
    const [ uComments, setUComments ] = useState();
    const [ flameNames, setFlameNames ] = useState([]);
    const [ unionNames, setUnionNames ] = useState([]);
    const [ nameList, setNameList ] = useState([]); 
    const [ scrollPosition, setScrollPosition ] = useState(sp);
    const [ height, setHeight ] = useState(0);
    const [ isFLoading, setIsFLoading ] = useState(true);
    const [ isULoading, setIsULoading ] = useState(true);


    useEffect(() => {
        if(flameComments.length + unionComments.length === 0) { return }
        if (isFLoading === false && isULoading === false) {
            const getHeight = () => {
                const displayHeight = ref.current.clientHeight;
                setHeight(displayHeight - 22);
            }
            getHeight();
        }
    }, [isFLoading, isULoading, flameComments, unionComments]);

    useEffect(() => {
        const uniqueFComments = [...new Set(flameComments)]
        const otherUniqueFComments = uniqueFComments.filter((uFComment) => uFComment !== currentUser._id)
        setFComments(otherUniqueFComments);
        const uniqueUComments = [...new Set(unionComments)]
        const otherUniqueUComments = uniqueUComments.filter((uUComment) => uUComment !== currentUser._id)
        setUComments(otherUniqueUComments);
    }, []);


    useEffect(() => {
        if (fComments) {
            const getFlames = async () => {
                const responses = await Promise.all(
                    fComments.map((fComment) => axios.get(`/users/flame-name/${fComment}`))
                );
                setFlameNames(responses.map((res) => res.data));
                setIsFLoading(false);
            }
            getFlames();
        }
    }, [fComments]);

    useEffect(() => {
        if (uComments) {
            const getUnions = async () => {
                const responses = await Promise.all(
                    uComments.map((uComment) => axios.get(`/unions/union-name/${uComment}`))
                );
                setUnionNames(responses.map((res) => res.data));
                setIsULoading(false);
            }
            getUnions();
        }
    }, [uComments]);


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
            <div className="commentsDropdown-Container" ref={ref} style={scrollPosition > wHeight/2 ? {marginTop: `-${height}px`} : {marginTop: "0px"}}>
                <span className="commentsDropdownTitle">Comments</span>
                <ul className="commentsDropdownList">                    
                    {nameList.length > 18 ?
                        (
                            <>
                                {flameComments.includes(currentUser._id) &&
                                    <li className={`commentsDropdownListItem ${currentUser.energy}`}>
                                        You
                                    </li>
                                }
                                {unionComments.includes(currentUser._id) &&
                                    <li className={`commentsDropdownListItem ${currentUser.spectrum}`}>
                                        Your Union
                                    </li>
                                }
                                {nameList.map((name, index) => (
                                    <li className={`commentsDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
                                        {name.profileName}
                                    </li>
                                )).slice(0,17)}
                                <li className="commentsDropdownListItem gray">
                                    and {nameList.length - 18} more...
                                </li>
                            </>
                        ) : (
                            <>
                                {flameComments.includes(currentUser._id) &&
                                    <li className={`commentsDropdownListItem ${currentUser.energy}`}>
                                        You
                                    </li>
                                }
                                {unionComments.includes(currentUser._id) &&
                                    <li className={`commentsDropdownListItem ${currentUser.spectrum}`}>
                                        Your Union
                                    </li>
                                }
                                {nameList.map((name, index) => (
                                    <li className={`commentsDropdownListItem ${name.spectrum ? name.spectrum : name.energy}`} key={index}>
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

export default CommentsBubble;