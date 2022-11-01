import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../Components/PageBars/Sidebar/Sidebar';
import TopBar from '../Components/PageBars/TopBar/TopBar';


function PageAmenitiesOne({ onlineFlameUsers, onlineUnionUsers}) {
  return (
    <>
        <div className="div-1-1">
            <TopBar /> 
        </div>
        <div className="div-1-4">
            <Sidebar
                onlineFlameUsers={onlineFlameUsers} 
                onlineUnionUsers={onlineUnionUsers} 
            />
        </div>
        <Outlet />
    </>
  )
}

export default PageAmenitiesOne;