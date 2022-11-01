import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import "./CreateComment.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";








function CreateComment() {

    const description = useRef();
    const editor = useRef();

   
    const { user } = useSelector((state) => state.auth);

    //const [ editorState, setEditorState ] = useState(EditorState.createEmpty());
    const [ suggestions, setSuggestions ] = useState();
    const [ flameFollowing, setFlameFollowing ] = useState([]);
    const [ unionFollowing, setUnionFollowing ] = useState([]);
    const [ following, setFollowing ] = useState([]);
    const [file, setFile] = useState(null);
    const [ open, setOpen ] = useState(false);

    const { id } = useParams();

     

    // Get user's flame following
    useEffect(() => {
        const getFlameFollowing = async () => {
            try {
                const res = user.unionName 
                ? await axios.get(`/unions/flame-following/${user._id}`)
                : await axios.get(`/users/flame-following/${user._id}`)
                setFlameFollowing(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getFlameFollowing();
    }, []);

    // Get user's union following
    useEffect(() => {
        const getUnionFollowing = async () => {
            try {
                const res = user.unionName 
                ? await axios.get(`/unions/union-following/${user._id}`)
                : await axios.get(`/users/union-following/${user._id}`)
                setUnionFollowing(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUnionFollowing();
    }, []);

    useEffect(() => {
        if (flameFollowing && unionFollowing) {
            const flameMentions = flameFollowing.map((follow) => ({ name: follow.profileName, avatar: follow.profilePicture}))
            //console.log(flameMentions)
            const unionMentions = unionFollowing.map((follow) => ({ name: follow.profileName, avatar: follow.unionProfilePicture}))
            setFollowing(flameMentions.concat(unionMentions));
        }
    }, []);


/*
    useEffect(() => {
        if (following) {
            setSuggestions(following)
        }
    }, []);
    */

    /*
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newComment = user.unionName
            ? { unionId: user._id, postId: id, description: description.current.value, union: true}
            : { userId: user._id, postId: id, description: description.current.value, union: false}
        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newComment.photos = fileName;
            console.log(fileName)
            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log(err);
            }
        }
        try {
            await axios.post("/comments", newComment);
            user.unionName
                ? await axios.put(`/posts/${id}/unionComment`, {unionId: user._id})
                : await axios.put(`/posts/${id}/flameComment`, {userId: user._id});
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    };
    */

    const onOpenChange = useCallback(() => {
        setOpen(!open);
    }, []);

    /*
    const onSearchChange = ({ value }) => {
        if (value) {
            setSuggestions(.filter(m => {
                return m.name.toLowerCase().includes(value.toLowerCase())}))
        }
    };
    */

    return (
        <div className={`createComment ${user.unionName ? user.spectrum : user.energy}`}>
            <form className="createComment-container" /*</div>onSubmit={handleSubmit}*/>
                <div className="createCommentTop">
                    {user.unionName 
                        ? <img className="createCommentProfilePic" src={user.unionProfilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                        : <img className="createCommentProfilePic" src={user.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                    }
                    {/*<input 
                        className='createCommentInput'
                        placeholder={user.unionName
                            ? `Write a comment ${user.firstName} of ${user.profileName}.`
                            : `Write a comment ${user.firstName}.`
                        }  
                        ref={description}
                    />*/}
                    <div className="createCommentEditor">
                        {/*
                        <Editor
                            toolbarHidden
                            editorState={editorState}
                            onChange={setEditorState}
                            plugins={plugins}
                            placeholder={user.unionName
                                ? `Write a comment ${user.firstName} of ${user.profileName}.`
                                : `Write a comment ${user.firstName}.`
                            }  
                            ref={editor}
                        />
                        {/*
                        <MentionSuggestions
                            open={open}
                            onOpenChange={onOpenChange}
                            onSearchChange={onSearchChange}
                            suggestions={suggestions}                            
                        />
                        */}
                    </div>
                        
                </div>
                {user.unionName ?
                    (
                        <>
                            {user.spectrum === "diamond" ?
                                (
                                    <>
                                        <img className="createCommentHrDiamond" src="/misc/diamond-sparkle.jpg" alt=""/>
                                    </>
                                ) : (
                                    <>
                                        <hr className={`createCommentHr ${user.spectrum}`} />
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <hr className={`createCommentHr ${user.energy}`} />
                        </>
                    )
                }
                {file && (
                    <div className="createCommentImages-container">
                        <img className="createCommentImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className='createCommentCancelImgBtn' onClick={() => setFile(null)} />
                    </div>
                )}
                <div className="createCommentBottom">
                    <div className="createCommentOptions">
                        <label htmlFor="file" className="createCommentOption">
                            <PermMedia className="createCommentIcon" htmlColor="tomato" />
                            <span className="createCommentOptionText">Photo or Video</span>
                            <input 
                                style={{display: "none"}} 
                                type="file" 
                                id="file" 
                                accept=".png,.jpeg,.jpg" onChange={(event) => setFile(event.target.files[0])} 
                            />
                        </label>
                        <div className="createCommentOption">
                            <Label className="createCommentIcon" htmlColor="blue" />
                            <span className="createCommentOptionText">Tag</span>
                        </div>
                        <div className="createCommentOption">
                            <Room className="createCommentIcon" htmlColor="green" />
                            <span className="createCommentOptionText">Location</span>
                        </div>
                        <div className="createPostOption">
                            <EmojiEmotions className="createCommentIcon" htmlColor="goldenrod" />
                            <span className="createCommentOptionText">Feelings</span>
                        </div>
                    </div>
                    {user.unionName ?
                        (
                            <>
                                {user.spectrum === "diamond" ? 
                                    (
                                        <>
                                            <button className="createCommentShareButton" style={{backgroundImage: "url(/misc/diamond-btn1.jpg)", backgroundSize: "cover"}} type="submit"><span className="caDiamondText">Comment</span></button>
                                        </>
                                    ) : (
                                        <>  
                                            <button className={`createCommentShareButton ${user.spectrum}`} type="submit">Comment</button>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <button className={`createCommentShareButton ${user.energy}`} type="submit">Comment</button>
                            </>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default CreateComment;