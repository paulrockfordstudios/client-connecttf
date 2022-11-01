import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../Redux/AuthSlice";
import axios from 'axios';
import "./ConfirmFlagPopup.css";

function ConfirmFlagPopup({ type, data }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const flagHandler = async () => {
        try {
            axios.put(`/${type}s/${data._id}/flag`, { userId: user._id });
        } catch(err) {}         
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return (
        <div className="confirmFlagPopup">
            <div className="confirmFlagPopupContainer">
                <div className="confirmFlagPopupTop">
                    <span className="confirmFlagPopupComment">{`Are you sure you want to Flag this ${type}?`}</span>
                    {data?.title && <span className="confirmFlagPopupDataTitle">{data?.title}</span>}
                </div>
                <div className="confirmFlagPopupBottom">
                    <button 
                        className={
                            `confirmFlagPopupButton 
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
                            `confirmFlagPopupButton 
                            ${user.unionName 
                                ? user.spectrum 
                                    ? user.spectrum 
                                    : "gray" 
                                : user.energy 
                                    ? user.energy 
                                    : "gray"
                            }`
                        }
                        onClick={flagHandler}
                    >
                        Flag
                    </button>
                </div>
            </div>
        </div>
    )

}

export default ConfirmFlagPopup;