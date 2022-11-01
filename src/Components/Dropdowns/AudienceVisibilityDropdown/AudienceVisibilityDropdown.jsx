import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { audienceDefault } from "../../../Redux/AuthSlice";
import axios from "axios";
import { 
    Public, 
    People, 
    ArrowBack, 
    ArrowForward, 
    PeopleAlt, 
    Person, 
    Category, 
    VisibilityOutlined, 
    CheckBox,
    CheckBoxOutlineBlank
} from "@material-ui/icons";
import "./AudienceVisibilityDropdown.css";

 function AudienceVisibilityDropdown({ type, feed, visible, setVisible, visDD, setVisDD }) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ selected, setSelected ] = useState(visible);
    const [ defaultVis, setDefaultVis ] = useState(false);
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
        if (user.defaultAudience === selected) {
            setDefaultVis(false);
        }
        setSelected(select);  
    };
            
    const defaultVisHandler = () => {
        if (user.defaultAudience === selected) return;
            setDefaultVis(!defaultVis);
    };
            
    const cancelHandler = () => {
        setVisDD(false);
        setSelected(visible);
        setDefaultVis(false)
    }

    const handleSubmit = async () => {
        setVisible(selected);
        setVisDD(false);
        if (defaultVis === true) {
            dispatch(audienceDefault(selected));
            localStorage.setItem("user", JSON.stringify({...user, defaultAudience: selected}));
            const updateDefaults = user.unionName
                ? {unionId: user._id, defaultAudience: selected}
                : {userId: user._id, defaultAudience: selected}           
            try {
                await axios.put(
                    `/${user.unionName ? "unions" : "users"}/${user._id}`, 
                    updateDefaults
                );
            } catch (err) {
                console.log(err);
            }
        }
        setDefaultVis(false);
    };
   

    return (
        <div 
            className="visibilityDropdown"
            style={visDD ? {height: "580px"} : {height: "0px"}} 
        >
            <div className="visibilityDropdownTop">
                <p className="visibilityDropdownTopQuestion"> 
                    {`Who can see your ${type.toLowerCase()}?`}
                </p>
                <p className="visibilityDropdownDescription">
                    {`Your ${type.toLowerCase()} will show up in "`}
                    <span className="visibilityDropdownDefault">{`${feed} ${type}s`}</span>
                    {`" Feed, on your profile and in search results.`}
                </p>
                <p className="visibilityDropdownDescription">
                    {"Your default audience is set to "}
                    <span className="visibilityDropdownDefault">{user.defaultAudience}</span>
                    {", but you can change the audience of this specific post."}
                </p>
            </div>
            <hr 
                className={`audienceVisibilityHr top COLOR_HR ${colorTheme}`} 
                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}} 
            />
            <div className="visibilityDropdownCenter">
                <ul className="visibilityAudienceList">
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Public" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Public" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Public")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Public className="audienceVisibilityChoiceIcon primary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Public</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {'Anyone on or off '}
                                    <span style={{ color: "#4a76fd", opacity: ".7" }}>Connect</span>
                                    <span style={{ color: "#e639af", opacity: ".7" }}>TF</span>
                                    {` can view your ${type.toLowerCase()}.`}
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
                                    {selected === "Public"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Public" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Public" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Friends" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Friends" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Friends")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <People className="audienceVisibilityChoiceIcon primary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Friends</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Anyone you are befriending or anyone befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Friends"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Friends" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Friends" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Befrienders" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Befrienders" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Befrienders")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <People className="audienceVisibilityChoiceIcon primary" />
                                <ArrowBack className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Befrienders</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Anyone befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Befrienders"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Befrienders" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Befrienders" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Befriending" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Befriending" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Befriending")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <People className="audienceVisibilityChoiceIcon primary" />
                                <ArrowForward className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Befriending</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Anyone you are befriending can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Befriending"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Befriending" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Befriending" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Unions" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Unions" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Unions")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <PeopleAlt className="audienceVisibilityChoiceIcon primary" />
                                <Public className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Unions</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Any union can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Unions"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Unions" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Unions" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Union Friends" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Union Friends" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Union Friends")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <PeopleAlt className="audienceVisibilityChoiceIcon primary" />
                                <People className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Union Friends</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Unions you are befriending or befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Union Friends"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Union Friends" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Unions Friends" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Union Befrienders" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Union Befrienders" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Union Befrienders")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <PeopleAlt className="audienceVisibilityChoiceIcon primary" />
                                <ArrowBack className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Union Befrienders</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Only unions befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Union Befrienders"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Union Befrienders" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Union Befrienders" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Unions Befriending" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Unions Befriending" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Unions Befriending")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <PeopleAlt className="audienceVisibilityChoiceIcon primary" />
                                <ArrowForward className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Unions Befriending</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Only unions you are befriending can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Unions Befriending"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Unions Befriending" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Unions Befriending" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Flames" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Flames" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Flames")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Person className="audienceVisibilityChoiceIcon primary" />
                                <Public className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flames</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Any flame users (NOT in union) can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flames"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flames" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flames" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Flame Friends" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Flame Friends" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Flame Friends")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Person className="audienceVisibilityChoiceIcon primary" />
                                <People className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flame Friends</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Flame users (NOT in union) you are befriending or befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flame Friends"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flame Friends" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flame Friends" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Flame Befrienders" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Flame Befrienders" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Flame Befrienders")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Person className="audienceVisibilityChoiceIcon primary" />
                                <ArrowBack className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flame Befrienders</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Flame users (NOT in union) befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flame Befrienders"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flame Befrienders" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flame Befrienders" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Flames Befriending" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Flames Befriending" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Flames Befriending")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Person className="audienceVisibilityChoiceIcon primary" />
                                <ArrowForward className="audienceVisibilityChoiceIcon secondary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flames Befriending</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Flame users (NOT in union) you are befriending can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flames Befriending"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flames Befriending" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flames Befriending" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    {/*
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Custom" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Custom" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Custom")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Category className="audienceVisibilityChoiceIcon primary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Custom</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Include or exclude anyone viewing your ${type.toLowerCase()}.`}
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
                                    {selected === "Custom"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Custom" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Custom" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    */}
                    <li 
                        className={
                            `visibilityAudienceListItemVoid 
                            ${colorTheme}`
                        }
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Category className="audienceVisibilityChoiceIcon primary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Custom</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Include or exclude anyone viewing your ${type.toLowerCase()}.`}
                                </div>
                            </div>
                        </div>
                        {colorTheme === "rainbow" ||
                         colorTheme === "silver" ||
                         colorTheme === "gold" ||
                         colorTheme === "platinum" ||
                         colorTheme === "diamond" ?
                            (     
                                <div className="audienceVisibilityChoiceRadioBtn inActive" />
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        inActive 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            inActive 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Only You" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Only You" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Only You")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <VisibilityOutlined className="audienceVisibilityChoiceIcon primary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Only You</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Only you, your spirit guides, and the Universal Source can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Only You"
                                        ? <img 
                                            className="audienceVisibilityChoiceRadioBtnHS" 
                                            src={`/icons/radioBtn/radioBtn-${colorTheme}.png`} 
                                            alt="" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Only You" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Only You" ? "active" : "inActive"} 
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
                className={`audienceVisibilityHr bottom COLOR_HR ${colorTheme}`} 
                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}}
            />
            <div className="visibilityDropdownBottom">
                <div className="defaultVisibilityCheckboxContainer" onClick={defaultVisHandler}>
                    {user.defaultAudience === selected ?
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
                                            {defaultVis
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
                                                ${defaultVis ? "checked" : ""}
                                                ${colorTheme}`
                                            }
                                        >
                                            {defaultVis ? <CheckBox /> : <CheckBoxOutlineBlank />}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    <div className={`defaultVisibilityCheckboxLabel ${user.defaultAudience === selected && "defaulted"}`}>
                        {`Set as default audience`} 
                    </div>
                </div>
                <div className="audienceVisibilityControlBtns">
                    <div 
                        className={
                            `audienceVisibilityControlBtnBackground 
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
                                `audienceVisibilityControlBtn 
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
                            `audienceVisibilityControlBtnBackground 
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
                                `audienceVisibilityControlBtn 
                                doneSave
                                ${colorTheme}`
                            }
                            onClick={handleSubmit}
                            onMouseDown={() => setDSAct(true)}
                            onMouseUp={() => setDSAct(false)}
                        >
                            {defaultVis ? "Save" : "Done"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AudienceVisibilityDropdown;