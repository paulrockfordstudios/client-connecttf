import React, { useEffect, useRef, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { Cancel } from '@material-ui/icons';
import "./HashtagEditor.css";

const root = document.getElementById("root");
const inputRoot = document.getElementById("input-root");

function HashtagEditor({ tagValue, setTagValue }) {

    const { user } = useSelector((state) => state.auth);

    const inputRef = useRef();
    const htListRef = useRef();
 
    const [ colorTheme, setColorTheme ] = useState(user.unionName ? user.spectrum : user.energy);
    const [ tags, setTags ] = useState(tagValue? tagValue : []);
    const [ margin, setMargin ] = useState({});

    useEffect(() => {
        setTagValue(tags)
    }, [tags]);

    useEffect(() => {
        inputRef.current?.scrollIntoView({behavior: "smooth"});
    }, [tags]);

    useEffect(() => {
        if (htListRef?.current?.clientHeight > 30) {
            setMargin({marginBottom: "9px"})
        } 
        if (htListRef?.current?.clientHeight === 39) {
            setMargin({})
        } 
    }, [tags]);

    
    const removeTags = (idx2Rmv) => {
        setTags(tags.filter((_, index) => index !== idx2Rmv));
    };


    const addTags = (e) => {
        const value = e.target.value
        if (e.key !== "Enter") return
        if (value[0] !== "#") return
        if(value.indexOf(" ") >= 0) return
        setTags([...tags, e.target.value]);
        e.target.value = "";
    };


    return (
        <div className="hashtagEditorContainer">
            <div 
                className={`hashtagEditorHigherSpectrumBackground ${colorTheme}`} 
                style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`,
                       backgroundSize: "cover", 
                       opacity: ".3"
                    } 
                }
            />
            <div className="hashtagEditorWhiteBackground" />
            <div className={`hashtagEditor INNER_BOX_SHADOW ${colorTheme}`}>
                <div 
                    className="hashtagEditorContainerContainer"
                >
                    {tags.length > 0 &&
                        <ul 
                            ref={htListRef}
                            className="hashtagList"
                        >
                            {tags.map((tag, index) => (
                                <li 
                                    className={`hashtagItem ${colorTheme}`}
                                    style={margin}
                                    key={index}
                                >
                                    <span>{tag}</span>
                                    <Cancel
                                        className={`hashtagIcon ${colorTheme}`}
                                        onClick={() => removeTags(index)}
                                    />
                                </li>
                            ))}
                        </ul>
                    }
                    <input
                        ref={inputRef}
                        className="hashtagInput"
                        type="text"
                        placeHolder="Press # to create Hashtag."
                        onKeyUp={(e) => addTags(e)}
                    />
                </div>
                <div className="hashtagCount">{`(${tags.length})`}</div>
            </div>
        </div>
    )
}


export default HashtagEditor;