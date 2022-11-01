import React, { memo } from 'react';
import AdPrimary from '../../AdSpace/AdPrimary/AdPrimary';
import FriendNews from '../../FriendNews/FriendNews';
import PopHashtags from '../../PopHashtags/PopHashtags';
import PopQuestions from '../../Questions/PopQuestions/PopQuestions';
import QuoteOfTheDay from '../../QuoteOfTheDay/QuoteOfTheDay';
import "./Rightbar.css";

function Rightbar() {


    const PrimaryRightbar = () => {
        return (
            <div 
                className="primaryRightbar"
            >
                <div className="rightbar-container">
                    <QuoteOfTheDay />
                    <FriendNews />
                    
                    <AdPrimary />
                    <PopQuestions />
                    <PopHashtags />   
                </div>
            </div>
        )
    };

    const SecondaryRightbar = () => {
        return (
            <div 
                className="secondaryRightbar"
            >
                <div className="rightbar-container">
                    <QuoteOfTheDay />
                    <FriendNews />
                    
                    <AdPrimary />
                    <PopQuestions />
                    <PopHashtags />   
                </div>
            </div>
        )
    };

    return (
        <>
            <SecondaryRightbar />
        </>
    )

};

export default memo(Rightbar);