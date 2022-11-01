import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { newFlameBackground, newUnionBackground, pAEOpen, cdpBackgroundOpen, cdpBackgroundClose } from '../../../Redux/AuthSlice';
import { dFClose } from "../../../Redux/AuthSlice";
import axios from 'axios';
import "./CDPBackground.css";

function CDPBackground() {

    
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const removeHandler = async () => {
        const noBackground = user.unionName
            ? {unionId: user._id, backgroundPicture: ""}
            : {userId: user._id, backgroundPicture: ""}
        if (user.unionName) {
            try {
                await axios.put(`/unions/${user._id}`, noBackground);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                localStorage.setItem("union", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axios.put(`/users/${user._id}`, noBackground);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                localStorage.setItem("flame", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            } 
        }
    };


    const cancelHandler = () => {
        dispatch(cdpBackgroundClose())
    }

    return (
        <div className="cdpBackground">
            <div className="cdpBackgroundContainer">
                <div className="cdpBackgroundTop">
                    <span className="cdpBackgroundQuestion">Are you sure you want to remove this Background Picture?</span>
                </div>
                <div className="cdpBackgroundBottom">
                    <button 
                        className={
                            `cdpBackgroundButton 
                            ${user.unionName 
                                ? user.spectrum 
                                    ? user.spectrum 
                                    : "gray" 
                                : user.energy 
                                    ? user.energy 
                                    : "gray"
                            }`
                        }
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button 
                        className={
                            `cdpBackgroundButton 
                            ${user.unionName 
                                ? user.spectrum 
                                    ? user.spectrum 
                                    : "gray" 
                                : user.energy 
                                    ? user.energy 
                                    : "gray"
                            }`
                        }
                        onClick={removeHandler}
                    >
                        remove
                    </button>
                </div>
            </div>
        </div>
    )

}

export default CDPBackground;