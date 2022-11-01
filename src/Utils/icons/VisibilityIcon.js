import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { People, Person, Public, VisibilityOutlined, PeopleAlt, ArrowBack, ArrowForward, Category } from "@material-ui/icons";



function VisibilityIcon({ visible, primary, secondary}) {

    const { user } = useContext(AuthContext);

    function getVisibilityIcon() {
        if(visible) {
            let icon;
                switch (visible) {
                    case "Public":
                        icon = <Public style={primary}/>;
                        break;
                    case "Friends":
                        icon = <People style={primary}/>;
                        break;
                    case "Befrienders":
                        icon = <>
                                <People style={primary}/>
                                <ArrowBack style={secondary}/>
                               </>;
                        break;
                    case "Befriending":
                        icon = <>
                                <People style={primary}/>
                                <ArrowForward style={secondary}/>
                               </>;
                        break;
                    case "Unions":
                        icon = <>
                                <PeopleAlt style={primary}/>
                                <Public style={secondary}/>
                               </>;
                        break;
                    case "Union Friends":
                        icon = <>
                                <PeopleAlt style={primary}/>
                                <People style={secondary}/>
                               </>;
                        break;
                    case "Union Befrienders":
                        icon = <>
                                <PeopleAlt style={primary}/>
                                <ArrowBack style={secondary}/>
                               </>;
                        break;
                    case "Unions Befriending":
                        icon = <>
                                <PeopleAlt style={primary}/>
                                <ArrowForward style={secondary}/>
                               </>;
                        break;
                    case "Flames":
                        icon = <>
                                <Person style={primary}/>
                                <Public style={secondary}/>
                               </>;
                        break;
                    case "Flame Friends":
                        icon = <>
                                <Person style={primary}/>
                                <People style={secondary}/>
                               </>;
                        break;
                    case "Flame Befrienders":
                        icon = <>
                                <Person style={primary}/>
                                <ArrowBack style={secondary}/>
                               </>;
                        break;
                    case "Flames Befriending":
                        icon = <>
                                <Person style={primary}/>
                                <ArrowForward style={secondary}/>
                               </>;
                        break;
                    case "Custom":
                        icon = <Category style={primary}/>;
                        break;
                    case "Only You":
                        icon = <VisibilityOutlined style={primary}/>;
                        break;
                    default:
                        icon = <Public style={primary}/>;
            }
            return icon;
        }
    };
    return (
        <> 
            {getVisibilityIcon()}
        </>
    )
};

export default VisibilityIcon;