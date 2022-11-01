import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ProfileLinkBubble.css";
import { 
    energyIcon,
    spectrumIcon,
    chargeIcon,
    zodiacIcon,
    sexIcon,
    compassIcon,
    orientationIcon
 } from "../../../Utils/icons/icons";



function ProfileLinkBubble({ user, union, short }) {

    const [ devFem, setDevFem ] = useState();
    const [ devMasc, setDevMasc ] = useState();

    useEffect(() => {
        if(union) {
            const getDevInfo = async () => {
                const femRes = await axios.get(`/users?userId=${union.feminineId}`);
                setDevFem(femRes.data);
                const mascRes = await axios.get(`/users?userId=${union.masculineId}`);
                setDevMasc(mascRes.data);
            }
            getDevInfo();
        }
    }, []);


    return (
        <>
            {union ?
                (
                    <>
                        {devFem && devMasc ?
                            (
                                <>
                                    {
                                        devFem.energy || 
                                        devFem.spectrum || 
                                        devFem.charge || 
                                        devFem.sex || 
                                        devFem.orientation || 
                                        devFem.sunSign || 
                                        devFem.compass ||
                                        devMasc.energy || 
                                        devMasc.spectrum || 
                                        devMasc.charge || 
                                        devMasc.sex || 
                                        devMasc.orientation || 
                                        devMasc.sunSign || 
                                        devMasc.compass ?
                                        (
                                            <>
                                                {union.spectrum === "diamond" ?
                                                    (
                                                        <>
                                                            <div className={`profileLinkDropdown ${union.spectrum}`} style={short ? {top: "24px", backgroundImage: "url(/misc/diamond-sparkle-light.jpg)"} : {top: "26px", backgroundImage: "url(/misc/diamond-sparkle-light.jpg)"}}>
                                                                <div className="profileLinkDropdownLeft">
                                                                    <span className="devFemInfo">DF:</span>
                                                                    {devFem.energy && <img className="profileLinkDropdownSpiritIcon union" src={energyIcon(devFem.energy)} alt=""/>}
                                                                    {devFem.charge && <img className="profileLinkDropdownSpiritIcon union" src={chargeIcon(devFem.charge)} alt=""/>}                                                        
                                                                    {devFem.sex && <img className="profileLinkDropdownSpiritIcon union" src={sexIcon(devFem.sex)} alt=""/>}
                                                                    {devFem.orientation && devFem.sex && <img className="profileLinkDropdownSpiritIcon union" src={orientationIcon(devFem.orientation, devFem.sex)} alt=""/>}
                                                                    {devFem.sunSign && <img className="profileLinkDropdownSpiritIcon union" src={zodiacIcon(devFem.sunSign)} alt=""/>}
                                                                    {devFem.compass && <img className="profileLinkDropdownSpiritIcon union" src={compassIcon(devFem.compass)} alt=""/>}
                                                                </div>
                                                                <div className="profileLinkDropdownRight">
                                                                    <span className="devMascInfo">DM:</span>
                                                                    {devMasc.energy && <img className="profileLinkDropdownSpiritIcon union" src={energyIcon(devMasc.energy)} alt=""/>}
                                                                    {devMasc.charge && <img className="profileLinkDropdownSpiritIcon union" src={chargeIcon(devMasc.charge)} alt=""/>}                                                        
                                                                    {devMasc.sex && <img className="profileLinkDropdownSpiritIcon union" src={sexIcon(devMasc.sex)} alt=""/>}
                                                                    {devMasc.orientation && devMasc.sex && <img className="profileLinkDropdownSpiritIcon union" src={orientationIcon(devMasc.orientation, devMasc.sex)} alt=""/>}
                                                                    {devMasc.sunSign && <img className="profileLinkDropdownSpiritIcon union" src={zodiacIcon(devMasc.sunSign)} alt=""/>}
                                                                    {devMasc.compass && <img className="profileLinkDropdownSpiritIcon union" src={compassIcon(devMasc.compass)} alt=""/>}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className={`profileLinkDropdown ${union.spectrum}`} style={short ? {top: "24px"} : {top: "26px"}}>
                                                                <div className="profileLinkDropdownLeft">
                                                                    <span className="devFemInfo">DF:</span>
                                                                    {devFem.energy && <img className="profileLinkDropdownSpiritIcon union" src={energyIcon(devFem.energy)} alt=""/>}
                                                                    {devFem.charge && <img className="profileLinkDropdownSpiritIcon union" src={chargeIcon(devFem.charge)} alt=""/>}                                                        
                                                                    {devFem.sex && <img className="profileLinkDropdownSpiritIcon union" src={sexIcon(devFem.sex)} alt=""/>}
                                                                    {devFem.orientation && devFem.sex && <img className="profileLinkDropdownSpiritIcon union" src={orientationIcon(devFem.orientation, devFem.sex)} alt=""/>}
                                                                    {devFem.sunSign && <img className="profileLinkDropdownSpiritIcon union" src={zodiacIcon(devFem.sunSign)} alt=""/>}
                                                                    {devFem.compass && <img className="profileLinkDropdownSpiritIcon union" src={compassIcon(devFem.compass)} alt=""/>}
                                                                </div>
                                                                <div className="profileLinkDropdownRight">
                                                                    <span className="devMascInfo">DM:</span>
                                                                    {devMasc.energy && <img className="profileLinkDropdownSpiritIcon union" src={energyIcon(devMasc.energy)} alt=""/>}
                                                                    {devMasc.charge && <img className="profileLinkDropdownSpiritIcon union" src={chargeIcon(devMasc.charge)} alt=""/>}                                                        
                                                                    {devMasc.sex && <img className="profileLinkDropdownSpiritIcon union" src={sexIcon(devMasc.sex)} alt=""/>}
                                                                    {devMasc.orientation && devMasc.sex && <img className="profileLinkDropdownSpiritIcon union" src={orientationIcon(devMasc.orientation, devMasc.sex)} alt=""/>}
                                                                    {devMasc.sunSign && <img className="profileLinkDropdownSpiritIcon union" src={zodiacIcon(devMasc.sunSign)} alt=""/>}
                                                                    {devMasc.compass && <img className="profileLinkDropdownSpiritIcon union" src={compassIcon(devMasc.compass)} alt=""/>}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        ) : ( <></> )
                                    }
                                </>
                            ) : ( <></> )
                        }
                    </>
                ) : (
                    <>
                        {
                            user.energy || 
                            user.spectrum || 
                            user.charge || 
                            user.sex || 
                            user.orientation || 
                            user.sunSign || 
                            user.compass ?
                            (
                                <div className={`profileLinkDropdown ${user.energy}`} style={short ? {top: "24px"} : {top: "26px"}}>
                                    {user.spectrum && <img className="profileLinkDropdownSpiritIcon flame" src={spectrumIcon(user.spectrum)} alt=""/>}
                                    {user.charge && <img className="profileLinkDropdownSpiritIcon flame" src={chargeIcon(user.charge)} alt=""/>}                                                        
                                    {user.sex && <img className="profileLinkDropdownSpiritIcon flame" src={sexIcon(user.sex)} alt=""/>}
                                    {user.orientation && user.sex && <img className="profileLinkDropdownSpiritIcon flame" src={orientationIcon(user.orientation, user.sex)} alt=""/>}
                                    {user.sunSign && <img className="profileLinkDropdownSpiritIcon flame" src={zodiacIcon(user.sunSign)} alt=""/>}
                                    {user.compass && <img className="profileLinkDropdownSpiritIcon flame" src={compassIcon(user.compass)} alt=""/>}
                                </div>
                            ) : ( <></> )
                        }
                    </>
                )
            }
        </>
    )
}

export default ProfileLinkBubble;