import React, { memo } from 'react';
import FeedContainer from '../../FeedContainer/FeedContainer';
import FriendsList from '../../FriendsList/FriendsList';
import AdSecondary from '../../AdSpace/AdSecondary/AdSecondary';
import "./Middlebar.css";

function Middlebar({friendList, setCreatePost}) {


    const PrimaryMiddlebar = () => {
        return (
            <div 
                className="primaryMiddlebar"
            >
                <div className="middlebar-container">
                    <AdSecondary />
                    <FeedContainer setCreatePost={setCreatePost}/>
                </div>     
            </div> 
        )
    };

    const SecondaryMiddlebar = () => {
        return (
            <div className="secondaryMiddlebar">
                <div className="middlebar-container">
                    <AdSecondary />
                    <FriendsList/>
                </div>     
            </div> 
        )
    };

    return (
        <>
            {friendList ? <SecondaryMiddlebar /> : <PrimaryMiddlebar />}
        </>
    )
};

export default memo(Middlebar);