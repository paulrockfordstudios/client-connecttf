import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from "../../Context/AuthContext";
import { 
    Search, 
    Person, 
    Chat, 
    Notifications, 
    KeyboardArrowDown, 
    Settings, 
    ArrowForward, 
    Help,
    Brightness4,
    People
} from "@material-ui/icons";


// Changes the topbar icons according to higher spectrums
function TBIconSpectrum({ spectrum, type, cn}) {

    //const { user } = useContext(AuthContext);
    const { user } = useSelector((state) => state.auth); 

    function getIcon(type, fStyle) {
        let icon = null;
        switch (type) {
            case "search":
                icon = <Search style={{ fill: fStyle}} className={cn ? cn : null}/>
                break;
            case "people":
                icon = <People style={{ fill: fStyle}} className={cn ? cn : null}/>
                break;
            case "chat":
                icon = <Chat style={{ fill: fStyle}} className={cn ? cn : null}/>
                break;
            case "notifications":
                icon = <Notifications style={{ fill: fStyle}} className={cn ? cn : null}/>
                break;
            default:
                icon = null;
        }
        return icon;
    }

    function getTBIconSpectrum(spectrum) {
        let tbIconSpectrum = null;
        switch (spectrum) {
            case "rainbow":
                tbIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="tbRainbow-gradient">
                                <stop stopColor="#850014" offset="0%" />
                                <stop stopColor="#ff8303" offset="16.67%" />
                                <stop stopColor="#ffe700" offset="33.36%" />
                                <stop stopColor="#50c878" offset="50.02%" />
                                <stop stopColor="#098de9" offset="66.68%" />
                                <stop stopColor="#30307e" offset="83.34%" />
                                <stop stopColor="#8a2be2" offset="100%" />
                            </linearGradient>
                        </svg>
                        {getIcon(type, "url(#tbRainbow-gradient)", cn)}
                    </>
                );
                break;
                case "rainbowHover":
                tbIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="tbRainbow-gradient">
                                <stop stopColor="#d4a6ad" offset="0%" />
                                <stop stopColor="#ffdab3" offset="16.67%" />
                                <stop stopColor="#fff9bf" offset="33.36%" />
                                <stop stopColor="#caeed6" offset="50.02%" />
                                <stop stopColor="#cee8fb" offset="66.68%" />
                                <stop stopColor="#babad4" offset="83.34%" />
                                <stop stopColor="#dcbff6" offset="100%" />
                            </linearGradient>
                        </svg>
                        {getIcon(type, "url(#tbRainbow-gradient)", cn)}
                    </>
                );
                break;
                case "rainbowActive":
                tbIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="tbRainbow-gradient">
                                <stop stopColor="#8a2be2" offset="0%" />
                                <stop stopColor="#30307e" offset="16.67%" />
                                <stop stopColor="#098de9" offset="33.36%" />
                                <stop stopColor="#50c878" offset="50.02%" />
                                <stop stopColor="#ffe700" offset="66.68%" />
                                <stop stopColor="#ff8303" offset="83.34%" />
                                <stop stopColor="#850014" offset="100%" />
                            </linearGradient>
                        </svg>
                        {getIcon(type, "url(#tbRainbow-gradient)", cn)}
                    </>
                );
                break;
            case "silver":
                tbIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="tbSilver-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#dadada" offset="0%"/>
                                <stop stopColor="#8e8e8e" offset="50%"/>
                                <stop stopColor="#dadada" offset="100%"/>
                            </linearGradient>
                        </svg>
                        {getIcon(type, "url(#tbSilver-gradient)", cn)}
                    </>
                );
                break;
            case "gold":
                tbIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="tbGold-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#ab781d" offset="0%"/>
                                <stop stopColor="#eed264" offset="50%"/>
                                <stop stopColor="#ab781d" offset="100%"/>
                            </linearGradient>
                        </svg>
                        {getIcon(type, "url(#tbGold-gradient)", cn)}
                    </>
                );
                break;
            case "platinum":
                tbIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="tbPlatinum-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#d3e9f6" offset="0%" />
                                <stop stopColor="#6b8c95" offset="16.67%" />
                                <stop stopColor="#566167" offset="33.36%" />
                                <stop stopColor="#8e8e8e" offset="50.02%" />
                                <stop stopColor="#6d606a" offset="66.68%" />
                                <stop stopColor="#af9499" offset="83.34%" />
                                <stop stopColor="#dadada" offset="100%" />
                            </linearGradient>
                        </svg>
                        {getIcon(type, "url(#tbPlatinum-gradient)", cn)}
                    </>
                );
                break;
            default:
                tbIconSpectrum = (
                    <div className="topbarIconItem">
                        {getIcon(type, null, cn)}
                    </div>
                );
        }
        return tbIconSpectrum;
    }
    return (
        <> 
            {getTBIconSpectrum(spectrum)}
        </>
    )
};

export default TBIconSpectrum;