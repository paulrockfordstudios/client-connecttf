import React from 'react';
import Middlebar from '../../Components/PageBars/Middlebar/Middlebar';
import Rightbar from '../../Components/PageBars/Rightbar/Rightbar';
import Sidebar from '../../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../../Components/PageBars/TopBar/TopBar';
import "./FriendList.css";


function FriendList() {
    
    return (
        <>
            <div className="home-container">
                <Middlebar friendList/>
                <Rightbar />
            </div> 
        </>
    )
};

export default FriendList;