import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { newFlameAvatar, newUnionAvatar, pAEOpen, cdpAvatarOpen, cdpAvatarClose } from '../../../Redux/AuthSlice';
import { dFClose } from "../../../Redux/AuthSlice";
import axios from 'axios';
import "./CDPAvatar.css";

function CDPAvatar({ avatar }) {

    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const removeHandler = async () => {
        const noAvatar = user.unionName
            ? {unionId: user._id, unionProfilePicture: ""}
            : {userId: user._id, profilePicture: ""}
        if (user.unionName) {
            try {
                await axios.put(`/unions/${user._id}`, noAvatar);
                dispatch(newUnionAvatar(noAvatar.unionProfilePicture));
                localStorage.setItem("user", JSON.stringify({...user, unionProfilePicture: noAvatar.unionProfilePicture}));
                localStorage.setItem("union", JSON.stringify({...user, unionProfilePicture: noAvatar.unionProfilePicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axios.put(`/users/${user._id}`, noAvatar);
                dispatch(newFlameAvatar(noAvatar.profilePicture));
                localStorage.setItem("user", JSON.stringify({...user, profilePicture: noAvatar.profilePicture}));
                localStorage.setItem("flame", JSON.stringify({...user, profilePicture: noAvatar.profilePicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            } 
        }
    };


    const cancelHandler = () => {
        dispatch(cdpAvatarClose())
    }

    return (
        <div className="cdpAvatar">
            <div className="cdpAvatarContainer">
                <div className="cdpAvatarTop">
                    <span className="cdpAvatarQuestion">Are you sure you want to remove this Avatar?</span>
                </div>
                <div className="cdpAvatarBottom">
                    <button 
                        className={
                            `cdpAvatarButton 
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
                            `cdpAvatarButton 
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

export default CDPAvatar;