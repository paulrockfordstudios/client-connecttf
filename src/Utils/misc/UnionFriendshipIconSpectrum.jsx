import React from 'react';
import { People, Check } from "@material-ui/icons";


// Changes the UnionRequest friendship icons according to spectrum
function UnionFriendshipIconSpectrum({ spectrum }) {

    function getUFIconSpectrum(spectrum) {
        let ufIconSpectrum = null;
        switch (spectrum) {
            case "rainbow":
                ufIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="rainbow2-gradient">
                                <stop stopColor="#850014" offset="0%" />
                                <stop stopColor="#ff8303" offset="41.67%" />
                                <stop stopColor="#ffe700" offset="83.33%" />
                                <stop stopColor="#50c878" offset="100%" />
                            </linearGradient>
                        </svg>
                        <People className="profileFollowIcon" style={{ fill: "url(#rainbow2-gradient)"}} />
                        <svg width="0em" height="0em">
                            <linearGradient id="rainbow3-gradient">
                                <stop stopColor="#50c878" offset="0%" />
                                <stop stopColor="#098de9" offset="16.67%" />
                                <stop stopColor="#30307e" offset="58.33%" />
                                <stop stopColor="#8a2be2" offset="100%" />
                            </linearGradient>
                        </svg>
                        <Check style={{ fill: "url(#rainbow3-gradient)"}}/>
                    </>
                );
                break;
            case "silver":
                ufIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="silver2-gradient">
                                <stop stopColor="#dadada" offset="0%" />
                                <stop stopColor="#8e8e8e" offset="100%" />
                            </linearGradient>
                        </svg>
                        <People className="profileFollowIcon" style={{ fill: "url(#silver2-gradient)"}} />
                        <svg width="0em" height="0em">
                            <linearGradient id="silver3-gradient">
                                <stop stopColor="#8e8e8e" offset="0%" />
                                <stop stopColor="#dadada" offset="100%" />
                            </linearGradient>
                        </svg>
                        <Check style={{ fill: "url(#silver3-gradient)"}}/>
                    </>
                );
                break;
            case "gold":
                ufIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="gold2-gradient">
                                <stop stopColor="#ab781d" offset="0%" />
                                <stop stopColor="#eed264" offset="100%" />
                            </linearGradient>
                        </svg>
                        <People className="profileFollowIcon" style={{ fill: "url(#gold2-gradient)"}} />
                        <svg width="0em" height="0em">
                            <linearGradient id="gold3-gradient">
                                <stop stopColor="#eed264" offset="0%" />
                                <stop stopColor="#ab781d" offset="100%" />
                            </linearGradient>
                        </svg>
                        <Check style={{ fill: "url(#gold3-gradient)"}}/>
                    </>
                );
                break;
            case "platinum":
                ufIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="platinum2-gradient">
                                <stop stopColor="#850014" offset="0%" />
                                <stop stopColor="#ff8303" offset="41.67%" />
                                <stop stopColor="#ffe700" offset="83.33%" />
                                <stop stopColor="#50c878" offset="100%" />
                            </linearGradient>
                        </svg>
                        <People className="profileFollowIcon" style={{ fill: "url(#platinum2-gradient)"}} />
                        <svg width="0em" height="0em">
                            <linearGradient id="platinum3-gradient">
                                <stop stopColor="#50c878" offset="0%" />
                                <stop stopColor="#098de9" offset="16.67%" />
                                <stop stopColor="#30307e" offset="58.33%" />
                                <stop stopColor="#8a2be2" offset="100%" />
                            </linearGradient>
                        </svg>
                        <Check style={{ fill: "url(#platinum3-gradient)"}}/>
                    </>
                );
                break;
            default:
                ufIconSpectrum = (
                    <div className={`unionRequestTitleRight ${spectrum}`}>
                        <People className="unionRequestTitleIcon people"/>
                        <Check className="unionRequesttitleIcon check"/>
                    </div>
                );
        }
        return ufIconSpectrum;
    }
    return (
        <> 
            {getUFIconSpectrum(spectrum)}
        </>
    )
};

export default UnionFriendshipIconSpectrum;