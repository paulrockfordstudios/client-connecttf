import React, { uuseEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { feedDefault } from "../../../Redux/AuthSlice";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import axios from "axios";
import "./FlareTypeDropdown.css";

 function FlareTypeDropdown({ type, feed, setFeed, fTDD, setFTDD }) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ selected, setSelected ] = useState(feed ? feed : user.defaultFeed ? user.defaultFeed : "Journey");
    const [ defaultFT, setDefaultFT ] = useState(false);
    const [ backHov, setBackHov ] = useState(false);
    const [ backAct, setBackAct ] = useState(false);
    const [ dSAct, setDSAct ] = useState(false);

    const colorTheme = user.unionName 
            ? user.spectrum 
                ? user.spectrum
                : "gray"
            : user.energy
                ? user.energy
                : "gray";

    const selectHandler = (select) => {
        if (user.defaultFeed === selected) {
            setDefaultFT(false);
        }
        setSelected(select);          
    };
            
    const defaultFTHandler = () => {
        if (user.defaultFeed === selected) return;
        setDefaultFT(!defaultFT);
    };
            
    const cancelHandler = () => {
        setFTDD(false);
        setSelected(feed);
        setDefaultFT(false)
    };


    const handleSubmit = async () => {
        setFeed(selected);
        setFTDD(false);
        if (defaultFT === true) {
            dispatch(feedDefault(selected));
            localStorage.setItem("user", JSON.stringify({...user, defaultFeed: selected}));
            const updateDefaults = user.unionName
                ? {unionId: user._id, defaultFeed: selected}
                : {userId: user._id, defaultFeed: selected}
            try {
                await axios.put(
                    `/${user.unionName ? "unions" : "users"}/${user._id}`, 
                    updateDefaults
                );
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <div 
            className="flareTypeDropdown"
            style={fTDD ? {height: "586px"} : {height: "0px"}} 
        >
            <div className="flareTypeDropdownTop">
                <p className="flareTypeDropdownTopQuestion"> 
                    {`Who can see your ${type}?`}
                </p>
                <p className="flareTypeDropdownDescription">
                    {`Your ${type.toLowerCase()} will show up in the "`}
                    <span className="flareTypeDropdownDefault">{`${feed} ${type}s`}</span>
                    {`" feed, on your profile and in search results.`}
                </p>
                <p className="flareTypeDropdownDescription">
                    {"The default feed is set to "}
                    <span className="flareTypeDropdownDefault">{`${feed} ${type}s`}</span>
                    {`, but you can change the feed of this specific ${type.toLowerCase()}.`}
                </p>
            </div>
            <hr 
                className={`flareTypeHr top COLOR_HR ${colorTheme}`} 
                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}} 
            />
            <div className="flareTypeDropdownCenter">
                <ul className="flareTypeList">
                    <li 
                        className={
                            `flareTypeListItem 
                            ${feed === "Journey" ? "visible" : ""}
                            ${user.unionName ? user.spectrum : user.energy}`
                        }
                        style={colorTheme === "diamond" && feed === "Journey" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Journey")}
                    >
                        <div className="flareTypeChoice">
                            <div className="flareTypeChoiceDescription">
                                <div className="flareTypeChoiceDescriptionTop">{`Journey ${type}s`}</div>
                                <div className="flareTypeChoiceDescriptionBottom">
                                    {`Journey ${type}s are for anyone and everyone on the twin flame journey, awakening or enlightenment.  
                                    This is the feed in which you can express yourself and/or gain insight.`}
                                </div>
                            </div>
                        </div>
                        {colorTheme === "rainbow" ||
                         colorTheme === "silver" ||
                         colorTheme === "gold" ||
                         colorTheme === "platinum" ||
                         colorTheme === "diamond" ?
                            (
                                <>
                                    {selected === "Journey"
                                        ? <img 
                                            className="flareTypeChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="flareTypeChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `flareTypeChoiceRadioBtn 
                                        ${selected === "Journey" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `flareTypeChoiceRadioBtnCenter 
                                            ${selected === "Journey" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `flareTypeListItem 
                            ${feed === "Coaching" ? "visible" : ""}
                            ${user.unionName ? user.spectrum : user.energy}`
                        }
                        style={colorTheme === "diamond" && feed === "Coaching" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Coaching")}
                    >
                        <div className="flareTypeChoice">
                            {/*<div className="flareTypeChoiceIconDiv"></div>*/}
                            <div className="flareTypeChoiceDescription">
                                <div className="flareTypeChoiceDescriptionTop">{`Coaching ${type}s`}</div>
                                <div className="flareTypeChoiceDescriptionBottom">
                                    {`Coaching ${type}s are for helping others on the journey with guidence, insight, and understanding.  
                                    Only select this feed with the intent of guiding others.`}
                                </div>
                            </div>
                        </div>
                        {colorTheme === "rainbow" ||
                         colorTheme === "silver" ||
                         colorTheme === "gold" ||
                         colorTheme === "platinum" ||
                         colorTheme === "diamond" ?
                            (
                                <>
                                    {selected === "Coaching"
                                        ? <img 
                                            className="flareTypeChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="flareTypeChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `flareTypeChoiceRadioBtn 
                                        ${selected === "Coaching" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `flareTypeChoiceRadioBtnCenter 
                                            ${selected === "Coaching" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                </ul>
            </div>
            <hr 
                className={`flareTypeHr top COLOR_HR ${colorTheme}`} 
                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}} 
            />
            <div className="flareTypeDropdownBottom">
                <div className="defaultflareTypeCheckboxContainer" onClick={defaultFTHandler}>
                    {user.defaultFeed === selected ?
                        (
                            <div className="defaultVisibilityCheckbox defaulted">
                                <CheckBox />
                            </div>
                        ) : (
                            <>
                                {colorTheme === "rainbow" ||
                                colorTheme === "silver" ||
                                colorTheme === "gold" ||
                                colorTheme === "platinum" ||
                                colorTheme === "diamond" ?
                                    (
                                        <>
                                            {defaultFT
                                                ? <img 
                                                    className="defaultVisibilityCheckboxPNGIcon"
                                                    src={`/icons/checkbox/checkbox-${colorTheme}.png`}
                                                    alt=""
                                                />
                                                : <div className="defaultVisibilityCheckbox">
                                                    <CheckBoxOutlineBlank />
                                                </div>
                                            }
                                        </>
                                    ) : (
                                        <div 
                                            className={
                                                `defaultVisibilityCheckbox
                                                ${defaultFT ? "checked" : ""}
                                                ${colorTheme}`
                                            }
                                        >
                                            {defaultFT ? <CheckBox /> : <CheckBoxOutlineBlank />}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    <div className={`defaultflareTypeCheckboxLabel ${user.defaultFeed === selected && "defaulted"}`}>
                        {`Set as default feed`} 
                    </div>
                </div>
                <div className="flareTypeControlBtns">
                    <div 
                        className={
                            `flareTypeControlBtnBackground 
                            back
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && backHov
                            ? {backgroundImage: `url(/misc/${colorTheme}-background${backAct ? "-drk-lgt" : "-lgt"}.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                    >
                        <button 
                            className={
                                `flareTypeControlBtn 
                                back
                                ${colorTheme}`
                            }
                            onClick={cancelHandler}
                            onMouseEnter={() => setBackHov(true)}
                            onMouseLeave={() => setBackHov(false)}
                            onMouseDown={() => setBackAct(true)}
                            onMouseUp={() => setBackAct(false)}
                        >
                            Back
                        </button>
                    </div>
                    <div 
                        className={
                            `flareTypeControlBtnBackground 
                            doneSave
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond"
                            ? {backgroundImage: `url(/misc/${colorTheme}-background${dSAct ? "-drk" : ""}.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                    >
                        <button 
                            className={
                                `flareTypeControlBtn 
                                doneSave
                                ${colorTheme}`
                            }
                            onClick={handleSubmit}
                            onMouseDown={() => setDSAct(true)}
                            onMouseUp={() => setDSAct(false)}
                        >
                            {defaultFT ? "Save" : "Done"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FlareTypeDropdown;