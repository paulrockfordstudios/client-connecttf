import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from "axios";
import parse from "html-react-parser";
import "./Story.css";
import DOMPurify from 'dompurify';

function Story() {

    const { userName } = useParams();
    const { unionName } = useParams();
    
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const res = unionName
            ? await axios.get(`/unions?unionName=${unionName}`)
            : await axios.get(`/users?userName=${userName}`)
            setProfile(res.data);
        }
        fetchProfile();
    }, [unionName, userName]);

    return (
        <div className="profileUserStory">
            <span className="storyBanner">{unionName ? "Our Story" : "My Story"}</span>
            <div className="storyBlog"><span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(profile.story)}}></span></div> 
        </div>   
    )
};

export default Story;