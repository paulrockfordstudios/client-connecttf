import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./AdPrimary.css";


function AdPrimary({ feed }) {

    const [adsObj, setAdsObj] =useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            const res = await axios.get(`/advertisements/ads/all`);
            setAdsObj(res.data);
        }
        fetchAds();
    }, []);

    const ads = adsObj.map((adObj, index) => {
        return (
            <div className="ad" key={index}>
                <a href={`https://${adObj.adLink}`} target="_blank">
                    <img className="adPrimaryPic" style={feed ? {marginBottom: "20px"} : {marginTop: "20px"}} src={adObj.adPhoto} alt="" />
                </a>
            </div>
        )
    });

    const randumNum = Math.floor(Math.random() * ads.length)
    
    return (
        <div className="adPrimary">
            <div className="adPrimary-container">
                {ads[randumNum]}
            </div>  
        </div> 
    )
};

export default memo(AdPrimary);