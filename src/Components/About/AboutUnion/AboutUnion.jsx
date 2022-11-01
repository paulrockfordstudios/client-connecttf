import React, { useEffect, useState} from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import "./AboutUnion.css";
import { 
    energyIcon,
    chargeIcon,
    zodiacIcon,
    sexIcon,
    compassIcon,
    orientationIcon,
    spectrumIcon
 } from "../../../Utils/icons/icons";

function AboutUnion() {

    const { unionName } = useParams();

    const { flame: currentFlame } = useSelector((state) => state.auth);

    const [ union, setUnion ] = useState({});
    const [ DM, setDM ] = useState({});
    const [ DF, setDF ] = useState({});
    const [ active, setActive ] = useState("Incarnation");

    // Get user
    useEffect(() => {
        const fetchUnion = async () => {
            const res = await axios.get(`/unions?unionName=${unionName}`);
            setUnion(res.data);
        }
        fetchUnion();
    }, [unionName]);

    // Get Devine Masculine (DM)
    useEffect(() => {
        if(union) {
            const getDM = async () => {
                try {
                    const dm = await axios.get(`/users?userId=${union.masculineId}`);
                    setDM(dm.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getDM();
        }
    }, [union]);

    // Get Devine Feminine (DF)
    useEffect(() => {
        if(union) {
            const getDF = async () => {
                try {
                    const df = await axios.get(`/users?userId=${union.feminineId}`);
                    setDF(df.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getDF();
        }
    }, [union]);

    const aboutDetails = (active, flame) => {
        let display = null;
        switch (active) {
            case "Incarnation":
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Birthdate:</span>
                            <span className="aboutDetailItemValueText">{flame.birthdate}</span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Age:</span>
                            <span className="aboutDetailItemValueText">{flame.age}</span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Sex:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={sexIcon(flame.sex)} alt="" />
                                <span className="aboutDetailItemValueText">{flame.sex}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Zodiac Sign:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={zodiacIcon(flame.sign)} alt="" />
                                <span className="aboutDetailItemValueText">{flame.sign}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">chinese Zodiac:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src="" alt="" />
                                <span className="aboutDetailItemValueText">{flame.chineseZodiac}</span>
                            </div>
                        </div>
                    </div>     
                )
                break;
            case "Carnal/Courtship":
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Orientation:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={orientationIcon(flame.orientation, flame.sex)} alt="" />
                                <span className="aboutDetailItemValueText">{flame.orientation}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Relationship Status:</span>
                            <span className="aboutDetailItemValueText">{flame.relationshipStatus}</span>
                        </div>
                    </div>     
                )
                break;
            case "Flame/Spark":
                display = (
                    <div className="aboutDetails">
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Energy:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={energyIcon(flame.energy)} alt="" />
                                        <span className="aboutDetailItemValueText">{flame.energy}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Charge:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={chargeIcon(flame.charge)} alt="" />
                                        <span className="aboutDetailItemValueText">{flame.charge}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Journey Status:</span>
                                    <span className="aboutDetailItemValueText">{flame.journeyStatus}</span>
                                </div>
                            </div>
                )
                break;
            case "Union":
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Union Status:</span>
                            <span className="aboutDetailItemValueText">{flame.unionStatus}</span>
                        </div>
                    </div>
                )
                break;
            case "Mission":
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Spectrum:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={spectrumIcon(flame.spectrum)} alt="" />
                                <span className="aboutDetailItemValueText">{flame.spectrum} ray</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Compass:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={compassIcon(flame.compass)} alt="" />
                                <span className="aboutDetailItemValueText">{flame.compass}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Mission Status:</span>
                                    <span className="aboutDetailItemValueText">{flame.missionStatus}</span>
                                </div>
                    </div>     
                )
                break;
            case "Celestial":
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Ruling Planet:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src="" alt="" />
                                <span className="aboutDetailItemValueText"></span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Celestial Energy:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src="" alt="" />
                                <span className="aboutDetailItemValueText">{flame.orientation}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Spiritual Domain:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Star Origin:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Star Family:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                    </div>     
                )
                break;
            case "Spirit Animal Totem":
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Primary:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Secondary:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Tertiary:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Quaternary:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Quinary:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Senary:</span>
                            <span className="aboutDetailItemValueText"></span>
                        </div>
                  </div>      
                )
                break;
            default:
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Sex:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={sexIcon(flame.sex)} alt="" />
                                <span className="aboutDetailItemValueText">{flame.sex}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Orientation:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={orientationIcon(flame.orientation, flame.sex)} alt="" />
                                <span className="aboutDetailItemValueText">{flame.orientation}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Relationship Status:</span>
                            <span className="aboutDetailItemValueText">{flame.relationshipStatus}</span>
                        </div>
                    </div>     
                )
                break;
        }
        return display;
    };

    return (
        <div className="about">
            <span className="aboutBanner">About Us</span>
            <hr className={`aboutHrTop ${union.spectrum}`}/>
            <div className="about-container">
                <div className="aboutNav-container">
                    <nav className="aboutNav">
                        <a 
                            className={
                                active === "Incarnation" 
                                    ? `aboutNavItem ${union.spectrum} active` 
                                    : `aboutNavItem ${union.spectrum}`    
                                }
                            onClick={() => setActive("Incarnation")}    
                        >
                            Incarnation
                        </a>
                        <a 
                            className={
                                active === "Carnal/Courtship" 
                                    ? `aboutNavItem ${union.spectrum} active` 
                                    : `aboutNavItem ${union.spectrum}`    
                                }
                            onClick={() => setActive("Carnal/Courtship")}    
                        >
                            Carnal/Courtship
                        </a>
                        <a 
                            className={
                                active === "Flame/Spark" 
                                    ? `aboutNavItem ${union.spectrum} active` 
                                    : `aboutNavItem ${union.spectrum}`    
                                }
                            onClick={() => setActive("Flame/Spark")}    
                        >
                            Flame/Spark
                        </a>
                        <a 
                            className={
                                active === "Union" 
                                    ? `aboutNavItem ${union.spectrum} active` 
                                    : `aboutNavItem ${union.spectrum}`    
                                }
                            onClick={() => setActive("Union")}    
                        >
                            Union
                        </a>
                        <a 
                            className={
                                active === "Mission" 
                                    ? `aboutNavItem ${union.spectrum} active` 
                                    : `aboutNavItem ${union.spectrum}`    
                                }
                            onClick={() => setActive("Mission")}    
                        >
                            Mission
                        </a>
                        <a 
                            className={
                                active === "Celestial" 
                                    ? `aboutNavItem ${union.spectrum} active` 
                                    : `aboutNavItem ${union.spectrum}`    
                                }
                            onClick={() => setActive("Celestial")}    
                        >
                            Celestial
                        </a>
                        <a 
                            className={
                                active === "Spirit Animal Totem" 
                                    ? `aboutNavItem ${union.spectrum} active` 
                                    : `aboutNavItem ${union.spectrum}`    
                                }
                            onClick={() => setActive("Spirit Animal Totem")}    
                        >
                            Spirit Animal Totem
                        </a>
                    </nav>
                    {
                        union.spectrum === "rainbow" ||
                        union.spectrum === "silver" ||
                        union.spectrum === "gold" ||
                        union.spectrum === "platinum" ||
                        union.spectrum === "diamond" ?
                            (
                               <img className="aboutNavJPGDivider" src={`/misc/${union.spectrum}-background${union.spectrum === "diamond" ? "" : "-vertical"}.jpg`} alt=""/>
                            ) : (
                                <div className={`aboutNavDivider ${union.spectrum}`} />         
                            )
                    }

                    
                </div>
               
                <div className="aboutUnionInfo-container">
                    <div className="aboutUnionFlameInfo">
                        <div className={`aboutUnionFlame ${currentFlame.energy? currentFlame.energy === "masculine" ? "masculine" : "feminine" : "masculine"}`}>{currentFlame.energy? currentFlame.energy === "masculine" ? "DM" : "DF" : "DM"}</div>
                        {aboutDetails(active, currentFlame.energy? currentFlame.energy === "masculine" ? "DM" : "DF" : "DM")}
                    </div>
                    <div className="aboutUnionFlameInfo">
                        <div className={`aboutUnionFlame ${currentFlame.energy? currentFlame.energy === "masculine" ? "feminine" : "masculine" : "feminine"}`}>{currentFlame.energy? currentFlame.energy === "masculine" ? "DF" : "DM" : "DF"}</div>
                        {aboutDetails(active, currentFlame.energy? currentFlame.energy === "masculine" ? "DF" : "DM" : "DF")}
                    </div>
                </div>
                
            
                    {/*
                        <div className="aboutInfo-container">
                            
                            <div className="aboutDetails">
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Sex:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={sexIcon(user.sex)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.sex}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Orientation:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={orientationIcon(user.orientation, user.sex)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.orientation}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Relationship Status:</span>
                                    <span className="aboutDetailItemValueText">{user.relationshipStatus}</span>
                                </div>
                            </div>
                        </div>

                        <div className="aboutInfo-container">
                            
                            <div className="aboutDetails">
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Energy:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={energyIcon(user.energy)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.energy}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Charge:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={chargeIcon(user.charge)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.charge}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Journey Status:</span>
                                    <span className="aboutDetailItemValueText">{user.journeyStatus}</span>
                                </div>
                            </div>
                        </div>

                        <div className="aboutInfo-container">
                            
                            <div className="aboutDetails">
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Spectrum:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={spectrumIcon(user.spectrum)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.spectrum}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Compass:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={compassIcon(user.compass)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.compass}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Mission Status:</span>
                                    <span className="aboutDetailItemValueText">{user.missionStatus}</span>
                                </div>
                            </div>
                        </div>

                        <div className="aboutInfo-container">
                            
                            <div className="aboutDetails">
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Sign:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={zodiacIcon(user.sign)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.sign}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Compass:</span>
                                    <div className="aboutDetailItemValue">
                                        <img className="aboutDetailIcon" src={compassIcon(user.compass)} alt="" />
                                        <span className="aboutDetailItemValueText">{user.compass}</span>
                                    </div>
                                </div>
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Mission Status:</span>
                                    <span className="aboutDetailItemValueText">{user.missionStatus}</span>
                                </div>
                            </div>
                        </div>
                    */}                  

            </div> 
            <hr className={`aboutHrBottom ${union.spectrum}`}/>   
        </div> 
    )
}

export default AboutUnion;