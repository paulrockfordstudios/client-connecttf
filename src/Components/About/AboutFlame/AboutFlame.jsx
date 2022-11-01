import React, { useEffect, useState} from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import "./AboutFlame.css";
import { 
    energyIcon,
    chargeIcon,
    zodiacIcon,
    sexIcon,
    compassIcon,
    orientationIcon,
    spectrumIcon
 } from "../../../Utils/icons/icons";


function AboutFlame() {

    const { userName } = useParams();

    const [ user, setUser ] = useState({});
    const [ twinFlame, setTwinFlame ] = useState();
    const [ active, setActive ] = useState("Incarnation");

    // Get user
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userName=${userName}`);
            setUser(res.data);
        }
        fetchUser();
    }, [userName]);

    // Get twin flame
    useEffect(() => {
        if(user.inUnion === true) {
            const getTwinFlame = async () => {
                try {
                    const TF = await axios.get("/users/twin-flame/" + user._id);
                    setTwinFlame(TF.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getTwinFlame();
        }
    }, [user._id]);

    const aboutDetails = (active) => {
        let display = null;
        switch (active) {
            case "Incarnation":
                display = (
                    <div className="aboutDetails">
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Birthdate:</span>
                            <span className="aboutDetailItemValueText">{user.birthdate}</span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Age:</span>
                            <span className="aboutDetailItemValueText">{user.age}</span>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Sex:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={sexIcon(user.sex)} alt="" />
                                <span className="aboutDetailItemValueText">{user.sex}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Zodiac Sign:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src={zodiacIcon(user.sign)} alt="" />
                                <span className="aboutDetailItemValueText">{user.sign}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">chinese Zodiac:</span>
                            <div className="aboutDetailItemValue">
                                <img className="aboutDetailIcon" src="" alt="" />
                                <span className="aboutDetailItemValueText">{user.chineseZodiac}</span>
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
                                <img className="aboutDetailIcon" src={orientationIcon(user.orientation, user.sex)} alt="" />
                                <span className="aboutDetailItemValueText">{user.orientation}</span>
                            </div>
                        </div>
                        <div className="aboutDetail">
                            <span className="aboutDetailItemKey">Relationship Status:</span>
                            <span className="aboutDetailItemValueText">{user.relationshipStatus}</span>
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
                )
                break;
            case "Union":
                display = (
                    <div className="aboutDetails">
                        {twinFlame ?
                                    (
                                        <>
                                        <div className="aboutDetailTF">
                                            <span className={`aboutDetailTFKey ${user.energy}`}>TF:</span>
                                            <div className="aboutDetailTFValue">
                                                <Link 
                                                    className="aboutDetailTFLink" 
                                                    to={`/tf-profile/${twinFlame.userName}`} 
                                                >
                                                    <img className="aboutDetailTFPic" src={twinFlame.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                    <img className="aboutDetailTFEnergy" src={energyIcon(twinFlame.energy)} alt="" />
                                                    <span className="aboutDetailTFName">{twinFlame.profileName}</span>
                                                </Link>
                                            </div>
                                        </div>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }
                                <div className="aboutDetail">
                                    <span className="aboutDetailItemKey">Union Status:</span>
                                    <span className="aboutDetailItemValueText">{user.unionStatus}</span>
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
                                <img className="aboutDetailIcon" src={spectrumIcon(user.spectrum)} alt="" />
                                <span className="aboutDetailItemValueText">{user.spectrum} ray</span>
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
                                <span className="aboutDetailItemValueText">{user.orientation}</span>
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
                )
                break;
        }
        return display;
    };

    return (
        <div className="about">
            <span className="aboutBanner">{user.unionName ? "About Us" : "About Me"}</span>
            <hr className={`aboutHrTop ${user.unionName ? user.spectrum : user.energy}`}/>
            <div className="about-container">
                <div className="aboutNav-container">
                    <nav className="aboutNav">
                        <a 
                            className={
                                active === "Incarnation" 
                                    ? `aboutNavItem ${user.energy}-active` 
                                    : `aboutNavItem ${user.energy}`    
                                }
                            onClick={() => setActive("Incarnation")}    
                        >
                            Incarnation
                        </a>
                        <a 
                            className={
                                active === "Carnal/Courtship" 
                                    ? `aboutNavItem ${user.energy}-active` 
                                    : `aboutNavItem ${user.energy}`    
                                }
                            onClick={() => setActive("Carnal/Courtship")}    
                        >
                            Carnal/Courtship
                        </a>
                        <a 
                            className={
                                active === "Flame/Spark" 
                                    ? `aboutNavItem ${user.energy}-active` 
                                    : `aboutNavItem ${user.energy}`    
                                }
                            onClick={() => setActive("Flame/Spark")}    
                        >
                            Flame/Spark
                        </a>
                        <a 
                            className={
                                active === "Union" 
                                    ? `aboutNavItem ${user.energy}-active` 
                                    : `aboutNavItem ${user.energy}`    
                                }
                            onClick={() => setActive("Union")}    
                        >
                            Union
                        </a>
                        <a 
                            className={
                                active === "Mission" 
                                    ? `aboutNavItem ${user.energy}-active` 
                                    : `aboutNavItem ${user.energy}`    
                                }
                            onClick={() => setActive("Mission")}    
                        >
                            Mission
                        </a>
                        <a 
                            className={
                                active === "Celestial" 
                                    ? `aboutNavItem ${user.energy}-active` 
                                    : `aboutNavItem ${user.energy}`    
                                }
                            onClick={() => setActive("Celestial")}    
                        >
                            Celestial
                        </a>
                        <a 
                            className={
                                active === "Spirit Animal Totem" 
                                    ? `aboutNavItem ${user.energy}-active` 
                                    : `aboutNavItem ${user.energy}`    
                                }
                            onClick={() => setActive("Spirit Animal Totem")}    
                        >
                            Spirit Animal Totem
                        </a>
                    </nav>
                    <div className={`aboutNavDivider ${user.energy}`} />
                </div>
               
                <div className="aboutInfo-container">
                    {aboutDetails(active)}
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
            <hr className={`aboutHrBottom ${user.unionName ? user.spectrum : user.energy}`}/>   
        </div> 
    )
};

export default AboutFlame;