import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import AccMenuDropdown from '../../Dropdowns/TopbarDropdowns/AccMenuDropdown/AccMenuDropdown';
import "./TopBar.css";
import { Search } from "@material-ui/icons";
import TBIconSpectrum from '../../../Utils/misc/tbIconSpectrum';
import useClickOutside from '../../../Utils/crHooks/useClickOutside';
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import ChatDropdown from '../../Dropdowns/TopbarDropdowns/ChatDropdown/ChatDropdown';
import FriendRequestsDropdown from '../../Dropdowns/TopbarDropdowns/FriendRequestsDropdown/FriendRequestsDropdown';
import NotificationsDropdown from '../../Dropdowns/TopbarDropdowns/NotificationsDropdown/NotificationsDropdown';
import Searchbar from '../../Searchbar/Searchbar';







function TopBar() {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    return (
        <>
            {user &&
                <>
                    {user.unionName ?
                        (
                            <>    
                                <div 
                                    className={`topbarBorder ${user.spectrum}`} 
                                    style={
                                        user.spectrum === "rainbow" ||
                                        user.spectrum === "silver" ||
                                        user.spectrum === "gold" ||
                                        user.spectrum === "platinum" ||
                                        user.spectrum === "diamond"  
                                            ? user. spectrum === "diamond" 
                                                ? {backgroundImage: `url(/misc/diamond-background.jpg)`} 
                                                : {backgroundImage: `url(/misc/${user.spectrum}-background.jpg)`, backgroundSize: "cover"}
                                            : {backgroundImage: "none"}
                                    }
                                >
                                    <div className="topbar-container">
                                        <div className="topbar-left-container">
                                            <Searchbar />
                                        </div>
                                        <div className="topbar-center-container">
                                            <Link to="/" className="topbarLogoLink">
                                                <span className="topbarLogo">
                                                    <img className="topbarlogoImg" src="/logo/ConnectTF-logo-2.png" alt="" />
                                                </span>
                                            </Link>
                                        </div>
                                        <div className={`topbar-right-container ${user.spectrum}`}>
                                            <div className="topbarIcons">
                                                <FriendRequestsDropdown />
                                                <ChatDropdown />
                                                <NotificationsDropdown />
                                            </div>
                                            <div className="topbar-right-right">
                                                <AccMenuDropdown />
                                            </div>
                                        </div>
                                    </div>
                                </div>                  
                            </>
                        ) : (
                            <>
                                <div className={`topbarBorder ${user.energy}`}>
                                    <div className="topbar-container">
                                        <div className="topbar-left-container">
                                            <Searchbar />
                                        </div>
                                        <div className="topbar-center-container">
                                            <Link to="/" className="topbarLogoLink">
                                                <span className="topbarLogo">
                                                    <img className="topbarlogoImg" src="/logo/ConnectTF-logo-2.png" alt="" />
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="topbar-right-container">
                                            <div className="topbarIcons">
                                                <FriendRequestsDropdown />
                                                <ChatDropdown />    
                                                <NotificationsDropdown />
                                            </div>
                                            <div className="topbar-right-right">
                                                 <AccMenuDropdown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </>
            }
        </>
    )
};

export default TopBar;