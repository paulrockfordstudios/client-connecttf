import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, switch2UnionAcc, switch2FlameAcc } from "../../../../Redux/AuthSlice";
import { Link } from "react-router-dom";
import "./AccMenuDropdown.css";
import {  
    Settings, 
    ArrowForwardIos, 
    Help,
    Brightness4
} from "@material-ui/icons";


function AccMenuDropdown() {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    
    const ref = useRef();
    const accMDomNode = useRef(null);
    const accMDDRef = useRef(null);

    const [ height, setHeight ] = useState();
    const [ accMDD, setAccMDD ] = useState(false);


    useEffect(() => {
        if (actAcc === "union") {
            const getHeight = () => {
                const displayHeight = ref.current.clientHeight;
                setHeight(displayHeight);
            }
        getHeight();
        }
    }, [user]);

    useEffect(() => {
        let accMDDHandler = (event) => {
            //if (event.path[0] !== accMDDRef || !accMDomNode.current.contains(event.target)) {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setAccMDD(false);
          }
        };
        if (accMDD) {
            document.body.addEventListener("click", accMDDHandler);
            return () => {
                document.body.removeEventListener("click", accMDDHandler);
            };
        }
      }, [accMDD]);


    const handleSignOut = () => {
        window.location.reload();
        dispatch(reset());
        dispatch(logout());  
    };

    const switchAccHandler = () => {
        window.location.reload();
        user.unionName
            ? dispatch(switch2FlameAcc())
            : dispatch(switch2UnionAcc())
        setAccMDD(false);
    };



    return (
        <>
            {user.unionName ?
                (
                    <div className="accMenuDDContainer">    
                        <img 
                            className={`topbarProfilePic union ${flame.energy}`} 
                            src={user.unionProfilePicture || "/picBlanks/no-union-avatar.jpg" } 
                            alt=""
                            onClick={() => setAccMDD(!accMDD)}
                        />            
                        <div className={`tbAMDropDown union ${accMDD ? "open" : ""}`} ref={accMDomNode}>
                            <div className="tbProfilePicDropdown union">
                                <div className="tbProfilePicDropdownContainer" style={{height: `${height}px`}}>
                                    {user.spectrum === "rainbow" && <div className={`tbProfilePicDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                                    {user.spectrum === "silver" && <div className={`tbProfilePicDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                                    {user.spectrum === "gold" && <div className={`tbProfilePicDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                                    {user.spectrum === "platinum" && <div className={`tbProfilePicDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                                    {user.spectrum === "diamond" && <div className={`tbProfilePicDropdownBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                                    <div className={`tbProfilePicDropdown-container union BOX_SHADOW ${user.spectrum} ${accMDD ? "open" : ""}`} ref={ref}>
                                        <div className="dropdownUser">
                                            <img className="dropdownProfilePic" src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg" } alt=""/>
                                            <span className={`dropdownUserName ${user.spectrum}`}>
                                                {union.spectrum === "diamond"
                                                    ? <span className="tbddDiamondText">{user.unionName}</span>
                                                    : user.unionName
                                                }
                                            </span>    
                                        </div>
                                        {user.spectrum === "diamond" ? 
                                            (
                                                <>
                                                    <Link className="viewProfileLink" to={`/union-profile/${user.unionName}`}>
                                                        <button className="viewProfileBtn" style={{backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover"}}>    
                                                            <span className="tbddDiamondText">View Profile</span>            
                                                        </button>
                                                    </Link>
                                                </>
                                            ) : (
                                                <> 
                                                    <Link className="viewProfileLink" to={`/union-profile/${user.unionName}`}> 
                                                        <button className={`viewProfileBtn ${user.spectrum}`}>   
                                                            View Profile 
                                                        </button>
                                                    </Link>
                                                </>
                                            )
                                        }
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img className="tbProfileDropdownHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        <ul className="tbProfilePicDropdownMenuItems">
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" onClick={switchAccHandler}>
                                                    <span>
                                                        Switch to 
                                                        <b className={`tbMenuAcc flame ${flame.energy}`}>
                                                            {flame.energy === "masculine" ? " DM " : " DF "}
                                                        </b>
                                                        Account
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img className="tbProfileDropdownHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        <ul className="tbProfilePicDropdownMenuItems">
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem">
                                                    <Settings className="tbProfilePicMenuIcon"/>
                                                    Settings & Privacy
                                                </div>
                                                <ArrowForwardIos className="tbProfilePicMenuIcon"/>
                                            </li>
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    <Help className="tbProfilePicMenuIcon"/>
                                                    Help & Support
                                                </div>
                                                <ArrowForwardIos className="tbProfilePicMenuIcon"/>
                                            </li>
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    <Brightness4 className="tbProfilePicMenuIcon"/>
                                                    Display & Accessibility
                                                </div>
                                                <ArrowForwardIos className="tbProfilePicMenuIcon"/>
                                            </li>
                                        </ul>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img className="tbProfileDropdownHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        <ul className="tbProfilePicDropdownMenuItems" >
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    <span>About <b className="tbMenuConnect">Connect</b><b className="tbMenuTF">TF</b></span>
                                                </div>
                                            </li>
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    Terms of Use
                                                </div>
                                            </li>
                                        </ul>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img className="tbProfileDropdownHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        {user.spectrum === "diamond" ? 
                                            (
                                                <>
                                                    <button className="signOutBtn" style={{backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover"}} onClick={handleSignOut}><span className="tbddDiamondText">Sign Out</span></button>
                                                </>
                                            ) : (
                                                <>  
                                                    <button className={`signOutBtn ${user.spectrum}`} onClick={handleSignOut}>Sign Out</button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="accMenuDDContainer">
                        {accMDDRef && union?.spectrum === "rainbow" && <div className={`accMenuProfilePicRing ${union?.spectrum ? union?.spectrum : "gray"}`} />}
                        {accMDDRef && union?.spectrum === "silver" && <div className={`accMenuProfilePicRing ${union?.spectrum ? union?.spectrum : "gray"}`} />}
                        {accMDDRef && union?.spectrum === "gold" && <div className={`accMenuProfilePicRing ${union?.spectrum ? union?.spectrum : "gray"}`} />}
                        {accMDDRef && union?.spectrum === "platinum" && <div className={`accMenuProfilePicRing ${union?.spectrum ? union?.spectrum : "gray"}`} />}
                        {accMDDRef && union?.spectrum === "diamond" && <img src="/misc/diamond-background.jpg" className="accMenuProfilePicRing" alt="" />}
                        <img 
                            className={`topbarProfilePic flame ${union ? "secondary" : "primary"} ${union?.spectrum ? union?.spectrum : "gray"}`}
                            src={user.profilePicture || "/picBlanks/no-avatar.jpg" } 
                            alt=""
                            ref={accMDDRef}
                            onClick={() => setAccMDD(!accMDD)}
                        /> 
                        <div className={`tbAMDropDown flame ${accMDD ? "open" : ""}`} ref={accMDomNode}>
                            <div className="tbProfilePicDropdown flame">
                                <div className={`tbProfilePicDropdown-container flame BOX_SHADOW ${user.energy} ${accMDD ? "open" : ""}`} ref={ref}>
                                    <div className="dropdownUser">
                                        <img className="dropdownProfilePic" src={user.profilePicture || "/picBlanks/no-avatar.jpg" } alt=""/>
                                        <span className={`dropdownUserName ${user.energy}`}>{user.userName}</span>
                                    </div>
                                    <Link className="viewProfileLink" to={`/flame-profile/userName/${user.userName}`}>  
                                        <button className={`viewProfileBtn ${user.energy}`}>
                                            View Profile
                                        </button>  
                                    </Link>                
                                    <hr className={`tbProfileDropdownHr ${user.energy}`}/>
                                    {user.unionAccount &&
                                        <>
                                            <ul className="tbProfilePicDropdownMenuItems">
                                                <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                                    <div className="tbPPMenuItem" onClick={switchAccHandler}>
                                                        <span>Switch to <b className={`tbMenuAcc flame ${union?.spectrum}`}>Union</b> Account</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <hr className={`tbProfileDropdownHr ${user.energy}`} />
                                        </>
                                    }
                                    <ul className="tbProfilePicDropdownMenuItems">
                                        <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                            <div className="tbPPMenuItem">
                                                <Settings className="tbProfilePicMenuIcon"/>
                                                Settings & Privacy
                                            </div>
                                            <ArrowForwardIos className="tbProfilePicMenuIcon"/>
                                        </li>
                                        <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                            <div className="tbPPMenuItem" >
                                                <Help className="tbProfilePicMenuIcon"/>
                                                Help & Support
                                            </div>
                                            <ArrowForwardIos className="tbProfilePicMenuIcon"/>
                                        </li>
                                        <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                            <div className="tbPPMenuItem" >
                                                <Brightness4 className="tbProfilePicMenuIcon"/>
                                                Display & Accessibility
                                            </div>
                                            <ArrowForwardIos className="tbProfilePicMenuIcon"/>
                                        </li>
                                    </ul>
                                    <hr className={`tbProfileDropdownHr ${user.energy}`}/>
                                    <ul className="tbProfilePicDropdownMenuItems" >
                                        <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                            <div className="tbPPMenuItem" >
                                            <span>About <b className="tbMenuConnect">Connect</b><b className="tbMenuTF">TF</b></span>
                                            </div>
                                        </li>
                                        <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                            <div className="tbPPMenuItem" >
                                                Terms of Use
                                            </div>
                                        </li>
                                    </ul>
                                    <hr className={`tbProfileDropdownHr ${user.energy}`}/>
                                    <button className={`signOutBtn ${user.energy}`} onClick={handleSignOut}>
                                        Sign Out
                                    </button> 
                                </div>    
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default AccMenuDropdown;