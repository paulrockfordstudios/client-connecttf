import React, { useEffect, useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import { Link, useMatch } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import "./ConnectList.css";
import { energyIcon, spectrumIcon } from "../../Utils/icons/icons";
import ConnectListFollowBtns from '../FollowButtons/ConnectListFollowBtns/ConnectlistFollowBtns';


function ConnectList() {

    const { userName } = useParams();
    const { follow } = useParams();
    const { url } = useMatch();
    const { path } = useMatch();


    //const { user: currentUser, dispatch } = useContext(AuthContext);
    const { user: currentUser, flame: currentFlame, union: currentUnion,  } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ unions, setUnions ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ hover, setHover ] = useState(false);
    const [ user, setUser ] = useState({});

   
    
        
    
    // Get all unions
    useEffect(() => {
        const fetchUnions = async () => {
            const res = await axios.get("/unions/all");
            setUnions(res.data);
        }
        fetchUnions();
    }, []);
    

   
    // Get all users
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get("/users/all");
            setUsers(res.data);
        }
        fetchUsers();
    }, [userName]);


    const otherUnions = unions.filter((union) => union._id !== currentUnion?._id);
    const unblockedUnions = otherUnions.filter((union) => !currentUser.unionBlockers.includes(union._id));
    const connectUnions = unblockedUnions.filter((union) => !currentUser.unionFollowing.includes(union._id));
    const otherUsers = users.filter((user) => user._id !== currentFlame?._id);
    const unblockedUsers = otherUsers.filter((user) => !currentUser.flameBlockers.includes(user._id));
    const connectUsers = unblockedUsers.filter((user) => !currentUser.flameFollowing.includes(user._id));

    const sortedUnions = connectUnions.sort((a, b) => a.profileName > b.profileName ? 1:-1).map((union) => {

        const diamondHover = {
            backgroundImage: "url(/misc/diamond-sparkle-light.jpg)",
            borderTopLeftRadius: "18px",
            borderBottomLeftRadius: "18px",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            backgroundSize: "cover"
        }
            
        return (
            <> 
                {union.spectrum === "diamond" ?
                    (
                        <>
                            <li key={union._id}>  
                                <div className="connectUnionDiamondHover" style={hover ? diamondHover : null}>
                                    <div  className="connectUnion" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>   
                                        <Link className="connectUnionLink" to={"/union-profile/" + union.unionName}  refresh="true">    
                                            <div className="connectUnionProfilePic-container">
                                                <img className="connectUnionProfilePic" src={union.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                <img className="connectUnionEnergy" src={spectrumIcon(union.spectrum)} alt="" />
                                                <span className="connectUnionName" type="name">{union.profileName}</span>
                                            </div>     
                                        </Link>
                                        <ConnectListFollowBtns className="clFollowBtns" union={union}/>
                                    </div>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={`connectUnion ${union.spectrum}`} key={union._id}>        
                                <Link className="connectUnionLink" to={"/union-profile/" + union.unionName}  refresh="true">    
                                    <div className="connectUnionProfilePic-container">
                                        <img className="connectUnionProfilePic" src={union.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                        <img className="connectUnionEnergy" src={spectrumIcon(union.spectrum)} alt="" />
                                        <span className="connectUnionName" type="name">{union.profileName}</span>
                                    </div>     
                                </Link>
                                <ConnectListFollowBtns className="clFollowBtns" union={union}/>
                            </li>
                        </>
                    )
                }
            </> 
        )
    });

    const sortedFlames = connectUsers.sort((a, b) => a.profileName > b.profileName ? 1:-1).map((flame) => {
        return (
            <>
                <li className={`connectFlame ${flame.isAnonymous ? "gray" : flame.energy}`} key={flame._id}>
                    <Link className="connectFlameLink" to={flame.isAnonymous ? `/flame-profile/id/${flame._id}` : `/flame-profile/userName/${flame.userName}`}>    
                        <div className="connectFlameProfilePic-container">
                            <img className="connectFlameProfilePic" src={flame.isAnonymous ? "/picBlanks/no-avatar.jpg" : flame.profilePicture ? flame.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                            <img className="connectFlameEnergy" src={energyIcon(flame.energy)} alt="" />
                            <span className="connectFlameName" type="name">{flame.isAnonymous ? "Anonymous User" : flame.profileName}</span>
                        </div>     
                    </Link>
                    <ConnectListFollowBtns className="clFollowBtns" flame={flame}/>
                </li>
            </> 
        )
    });

        
    return (
        <div className="connectList">
            <div className={`connectList-container ${currentUser.energy}`}>
                <ul className="connects">

                    {sortedUnions}
                    {sortedFlames}
                </ul>
            </div>
        </div>
    )
};

export default ConnectList;