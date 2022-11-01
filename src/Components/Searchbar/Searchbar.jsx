import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Search } from "@material-ui/icons";
import { energyIcon, spectrumIcon } from '../../Utils/icons/icons';
import "./Searchbar.css";


function Searchbar() {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const sbDomNode = useRef(null);
    const focusRef = useRef();

    const [ sbDD, setSbDD ] = useState(false);
    const [ searchWidth, setSearchWidth ] = useState(false);
    const [ searchHeight, setSearchHeight ] = useState(false);
    const [ searchbarWidth, setSearchbarWidth ] = useState();
    const [ query, setQuery ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ flames, setFlames ] = useState([]);
    const [ unions, setUnions ] = useState([]);
    const [ searchHover, setSearchHover ] = useState(false);
    const [ searchActive, setSearchActive ] = useState(false);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        let sbHandler = (event) => {
            if (!sbDomNode.current.contains(event.target)) {
                setQuery("")
                setSearchHeight(false);
                setSearchWidth(false);
            }
        };
        if (searchWidth) {
            document.body.addEventListener("click", sbHandler);
            return () => {
                document.body.removeEventListener("click", sbHandler);
            };
        }
    }, [searchWidth]);


    useEffect(() => {
        setSearchHeight(false)
        setLoading(true)
        setError(false);
        let cancel
        if (query.length > 0) {
            setSearchHeight(true);
            axios({
                method: "GET",
                url: "/users/search",
                params: {q: query},
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setFlames(res.data
                    .filter((f) => f._id !== user._id)
                    .filter((f) => !user.flameBlockers.includes(f._id))
                    .filter((f) => f.isAnonymous !== true)
                    .map((f) => ({
                        _id: f._id, 
                        userName: f.userName, 
                        profileName: f.profileName, 
                        profilePicture: f.profilePicture, 
                        energy: f.energy
                    }))
                    .slice(0,3)
                )
                setLoading(false);
            }).catch(e => {
                if(axios.isCancel(e)) return;
                    setError(true);
                })
                return () => cancel();
            }
      }, [query])

    useEffect(() => {
        setSearchHeight(false)
        setLoading(true)
        setError(false);
        let cancel
        if (query.length > 0) {
            setSearchHeight(true);
            axios({
                method: "GET",
                url: "/unions/search",
                params: {q: query},
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setUnions(res.data
                    .filter((u) => u._id !== user._id)
                    .filter((u) => !user.unionBlockers.includes(u._id))
                    .filter((u) => u.isAnonymous !== true)
                    .map((u) => ({
                        _id: u._id, 
                        unionName: u.unionName, 
                        profileName: u.profileName, 
                        unionProfilePicture: u.unionProfilePicture, 
                        spectrum: u.spectrum
                    }))
                    .slice(0,3)
                )
                setLoading(false);
            }).catch(e => {
                if(axios.isCancel(e)) return;
                setError(true);
            })
            return () => cancel();
        }
    }, [query])


    function handleSearch(e) {
      setQuery(e.target.value)
    }

    function searchbarClose() {
      setQuery("");
        setSearchHeight(false);
      setSearchWidth(false);
    }

    function handleFocusRef() {
        focusRef.current.focus();
    }



    return (
        <div className={`searchbarContainer  ${searchWidth ? "open" : "close"}`} ref={sbDomNode}>
            {user.unionName && user.spectrum === "rainbow" && <div className={`searchbarDropDownBackgroundTheme ${user.spectrum} ${searchHeight ? "down" : "up"}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover"}} />}
            {user.unionName && user.spectrum === "silver" && <div className={`searchbarDropDownBackgroundTheme ${user.spectrum} ${searchHeight ? "down" : "up"}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover"}} />}
            {user.unionName && user.spectrum === "gold" && <div className={`searchbarDropDownBackgroundTheme ${user.spectrum} ${searchHeight ? "down" : "up"}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover"}} />}
            {user.unionName && user.spectrum === "platinum" && <div className={`searchbarDropDownBackgroundTheme ${user.spectrum} ${searchHeight ? "down" : "up"}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover"}} />}
            {user.unionName && user.spectrum === "diamond" && <div className={`searchbarDropDownBackgroundTheme ${user.spectrum} ${searchHeight ? "down" : "up"}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"}} />}
            <div className={`searchbarDropDown BOX_SHADOW ${searchHeight ? "down" : "up"} ${user.unionName ? user.spectrum : user.energy}`}>
                <div className="sbDDSearchNames">
                    <div className="sbDDSearchFlames">                                        
                        {loading ?
                            ( <></> ) : (
                                <>
                                    <div className="sbDDSearchFlamesTitle">
                                        <span>Flame Search Results</span>
                                        <hr 
                                            className={
                                                `sbDDSFHr 
                                                flame 
                                                ${user?.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`
                                            }
                                            style={user?.unionName && user?.spectrum === "diamond" ? {backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"} : {backgroundImg: "none"}}
                                            />     
                                    </div>
                                    {flames.map((flame) => (
                                        <Link key={flame._id} className="sbDDSearchNameLink" to={`/flame-profile/userName/${flame.userName}`} onClick={searchbarClose}>    
                                            <div className={`sbDDSearchNameProfilePic-container ${flame.energy ? flame.energy : "gray"}`} >
                                                <img className="sbDDSearchNameProfilePic" src={flame.profilePicture ? flame.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                                <img className="sbDDSearchNameEnergy" src={energyIcon(flame.energy)} alt="" />
                                                <span className="sbDDSearchNameText" type="name">{flame.profileName}</span>
                                            </div>     
                                        </Link>
                                    ))}
                                    <Link className={`sbDDSearchFlameShowAllLink ${user?.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`}>
                                        {
                                            user.unionName && user.spectrum === "rainbow" ||
                                            user.unionName && user.spectrum === "silver" ||
                                            user.unionName && user.spectrum === "gold" ||
                                            user.unionName && user.spectrum === "platinum" ||
                                            user.unionName && user.spectrum === "diamond" 
                                                ? <img className="sbDDSearchFlameShowAllLinkBtnPNG" src={`/icons/search/search-${user.spectrum}.png`} alt=""/>
                                                : <Search />
                                        }
                                        <span>Show All Flame Results</span>
                                    </Link>
                                    <div className="sbDDSearchFlamesTitle">
                                        <span>Union Search Results</span>
                                        <hr 
                                            className={
                                                `sbDDSFHr 
                                                flame 
                                                ${user?.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`
                                            }
                                            style={user?.unionName && user?.spectrum === "diamond" ? {backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover"} : {backgroundImg: "none"}}
                                        />
                                    </div>
                                    {unions.map((union) => (
                                        <Link key={union._id} className="sbDDSearchNameLink" to={`/union-profile/${union.unionName}`} onClick={searchbarClose}>    
                                            <div className={`sbDDSearchNameProfilePic-container ${union.spectrum ? union.spectrum : "gray"}`} >
                                                <img className="sbDDSearchNameProfilePic" src={union.unionProfilePicture ? union.unionProfilePicture : "/picBlanks/no-union-avatar.jpg"} alt="" />
                                                <img className="sbDDSearchNameEnergy" src={spectrumIcon(union.spectrum)} alt="" />
                                                <span className="sbDDSearchNameText" type="name">{union.profileName}</span>
                                            </div>     
                                        </Link>
                                    ))}
                                    <Link className={`sbDDSearchFlameShowAllLink union ${user?.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`}>
                                        {
                                            user.unionName && user.spectrum === "rainbow" ||
                                            user.unionName && user.spectrum === "silver" ||
                                            user.unionName && user.spectrum === "gold" ||
                                            user.unionName && user.spectrum === "platinum" ||
                                            user.unionName && user.spectrum === "diamond" 
                                                ? <img className="sbDDSearchFlameShowAllLinkBtnPNG" src={`/icons/search/search-${user.spectrum}.png`} alt=""/>
                                                : <Search />
                                        }
                                        <span>Show All Union Results</span>
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {user.unionName ?
                (
                    <>
                        {searchWidth ?
                            (
                                <>
                                    <div className="searchbarHSBackgroundWhite" />
                                    <div 
                                        className={`searchbarHigherSpectrumBackground ${colorTheme}`} 
                                        style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`,
                                            backgroundSize: "cover", 
                                            opacity: ".3"
                                            } 
                                        }
                                    />
                                    <div className="searchbarWhiteBackground open" />
                                </>
                            ) : (
                                <>
                                    {user.spectrum === "rainbow" || 
                                     user.spectrum === "silver" || 
                                     user.spectrum === "gold" || 
                                     user.spectrum === "platinum" || 
                                     user.spectrum === "diamond" ?
                                        (
                                            <div 
                                                className={
                                                    `searchbarBackgroundTheme 
                                                    ${colorTheme} 
                                                    ${searchWidth ? "open" : "close"}`
                                                } 
                                                style={{
                                                    backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                                                    backgroundSize: "cover"
                                                }} 
                                            />
                                        ) : (null)
                                    }
                                </>
                            )
                        }
                        {user.spectrum === "diamond" ?
                            (
                                <>
                                    <div 
                                        className={`searchbar ${searchWidth ? "INNER_BOX_SHADOW" : " BOX_SHADOW"} ${searchWidth ? "open" : "close"}`}
                                        style={!searchWidth && searchHover ? {backgroundImage: `url(/misc/diamond-background${searchActive ? "-drk" : ""}-lgt.jpg)`, backgroundSize: "cover"} : {backgroundImage: "none"}}
                                        onMouseEnter={() => setSearchHover(true)} 
                                        onMouseLeave={() => setSearchHover(false)}
                                        onMouseDown={() => setSearchActive(true)} 
                                        onMouseUp={() => setSearchActive(false)}
                                        onClick={() => setSearchWidth(true)}
                                    >                          
                                        {searchWidth && query.length === 0 && 
                                            <label>
                                                <span style={{marginLeft: "17px", color: "#aeb4b7"}}>Search</span>
                                                <span style={{marginLeft: "5px", color: "#4a76fd", opacity: "0.6"}}>Connect</span>
                                                <span style={{color: "#e639af", opacity: "0.6"}}>TF</span>
                                            </label>
                                        }
                                        <input 
                                            ref={focusRef}
                                            className={`searchInput ${searchWidth ? "open" : "close"}`}
                                            type="text" 
                                            //placeholder="Search ConnectTF" 
                                            aria-label="search"
                                            onChange={handleSearch}
                                            value={query}      
                                        /> 
                                        {searchWidth ?
                                            (
                                                <button 
                                                    className={`searchbarBtn open ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onMouseEnter={() => setSearchHover(true)} 
                                                    onMouseLeave={() => setSearchHover(false)}
                                                    onMouseDown={() => setSearchActive(true)} 
                                                    onMouseUp={() => setSearchActive(false)}
                                                >
                                                    {   
                                                        user.spectrum === "rainbow" ||
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" ||
                                                        user.spectrum === "platinum" ||
                                                        user.spectrum === "diamond" 
                                                            ? <img className="searchBtnPNG open" src={`/icons/search/search-btn-${user.spectrum}${searchActive ? "-active" : searchHover ? "-hover" : ""}.png`} alt="" />
                                                            : <Search className="searchIcon" />
                                                    }
                                                </button>
                                            ) : (
                                                <button 
                                                    className={`searchbarBtn close ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onClick={handleFocusRef}
                                                >    
                                                    {   
                                                        user.spectrum === "rainbow" || 
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" || 
                                                        user.spectrum === "platinum" || 
                                                        user.spectrum === "diamond"
                                                            ? <img className="searchBtnPNG close" src={`/icons/search/search-${user.spectrum}${searchActive ? "-drk" : ""}.png`} alt="" />
                                                            : <Search className="searchIcon" />
                                                    }                                          
                                                </button>
                                            )
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div 
                                        className={
                                            `searchbar 
                                            ${`searchbar ${searchWidth ? "INNER_BOX_SHADOW open" : " BOX_SHADOW close"}`}
                                            flame 
                                            ${user.spectrum ? user.spectrum : "gray"}`
                                        }
                                        onMouseEnter={() => setSearchHover(true)} 
                                        onMouseLeave={() => setSearchHover(false)}
                                        onClick={() => setSearchWidth(true)}
                                    >                          
                                        {searchWidth && query.length === 0 && 
                                            <label>
                                                <span style={{marginLeft: "17px", color: "#aeb4b7"}}>Search</span>
                                                <span style={{marginLeft: "5px", color: "#4a76fd", opacity: "0.6"}}>Connect</span>
                                                <span style={{color: "#e639af", opacity: "0.6"}}>TF</span>
                                            </label>
                                        }
                                        <input 
                                            ref={focusRef}
                                            className={`searchInput ${searchWidth ? "open" : "close"}`}
                                            type="text" 
                                            //placeholder="Search ConnectTF" 
                                            aria-label="search"
                                            onChange={handleSearch}
                                            value={query}      
                                        /> 
                                        {searchWidth ?
                                            (
                                                <button 
                                                    className={`searchbarBtn open ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onMouseEnter={() => setSearchHover(true)} 
                                                    onMouseLeave={() => setSearchHover(false)}
                                                    onMouseDown={() => setSearchActive(true)} 
                                                    onMouseUp={() => setSearchActive(false)}
                                                >
                                                    {   
                                                        user.spectrum === "rainbow" ||
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" ||
                                                        user.spectrum === "platinum" ||
                                                        user.spectrum === "diamond" 
                                                            ? <img className="searchBtnPNG open" src={`/icons/search/search-btn-${user.spectrum}${searchActive ? "-active" : searchHover ? "-hover" : ""}.png`} alt="" />
                                                            : <Search className="searchIcon" />
                                                    }
                                                </button>
                                            ) : (
                                                <button 
                                                    className={`searchbarBtn close ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onClick={handleFocusRef}
                                                >    
                                                    {   
                                                        user.spectrum === "rainbow" || 
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" || 
                                                        user.spectrum === "platinum" || 
                                                        user.spectrum === "diamond"
                                                            ? <img className="searchBtnPNG close" src={`/icons/search/search-${user.spectrum}.png`} alt="" />
                                                            : <Search className="searchIcon" />
                                                    }                                          
                                                </button>
                                            )
                                        }
                                    </div>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={
                                `searchbar 
                                ${`searchbar ${searchWidth ? "INNER_BOX_SHADOW open" : " BOX_SHADOW close"}`}
                                flame 
                                ${user.energy ? user.energy : "gray"}`
                            }
                            onMouseEnter={() => setSearchHover(true)} 
                            onMouseLeave={() => setSearchHover(false)}
                            onClick={() => setSearchWidth(true)}
                        >                          
                            {searchWidth && query.length === 0 && 
                                <label>
                                    <span style={{marginLeft: "17px", color: "#aeb4b7"}}>Search</span>
                                    <span style={{marginLeft: "5px", color: "#4a76fd", opacity: "0.6"}}>Connect</span>
                                    <span style={{color: "#e639af", opacity: "0.6"}}>TF</span>
                                </label>
                            }
                            <input 
                                ref={focusRef}
                                className={`searchInput ${searchWidth ? "open" : "close"}`}
                                type="text" 
                                //placeholder="Search ConnectTF" 
                                aria-label="search"
                                onChange={handleSearch}
                                value={query} 
                                //ref={searchInput}     
                            />
                            <button 
                                className={
                                    `searchbarBtn 
                                    ${searchWidth ? "open" : "close"} 
                                    ${user.energy ? user.energy : "gray"}`
                                } 
                                aria-label="submit search"
                                onClick={handleFocusRef}
                            >
                                <Search className="searchIcon" />
                            </button>
                        </div>
                    </>
                )                                  
            }                                                              
        </div>
    )
}

export default Searchbar;