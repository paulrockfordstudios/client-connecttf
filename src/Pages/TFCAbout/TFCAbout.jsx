import React from 'react';
import CDPQuestion from '../../Components/ConfirmDeletePopups/CDPQuestion/CDPQuestion';
import HashtagEditor from '../../Components/Editors/HashtagEditor/HashtagEditor';
import CreatePost from '../../Components/Posts/CreatePost/CreatePost';
import EditQuestion from '../../Components/Questions/EditQuestion/EditQuestion';
import IntroInfo from '../IntroInfo/IntroInfo';
import FlameProfilePics from '../ProfilePictures/FlameProfilePics/FlameProfilePics';

import "./TFCAbout.css";

function TFCAbout() {
    return (
        <div className="appAbout">
            <div className="appAbout-container">
               {/*About Us*/} 
              {/*<HashtagEditor />*/}
                {/*<CreatePost />*/}
                {/*<EditQuestion />*/}
                {/*<IntroInfo />*/}
                <FlameProfilePics />
              {/*<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/9C8IcuFO44Y?showinfo=0"></iframe><p></p>*/}
               {/*<div className="rainbowSquare"></div>*/}
            </div>    
        </div> 
    )
};

export default TFCAbout;