import React, { useState, useEffect, useRef, useContext, } from "react";
import { Update } from '@material-ui/icons';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './AuthService';

// Get user and/or union from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const flame = JSON.parse(localStorage.getItem("flame"));
const union = JSON.parse(localStorage.getItem("union"));
// Get mentions from localStorage
const mentions = JSON.parse(localStorage.getItem("mentions"));
// Conversation container remaining open or closed from localStorage
const convBox = JSON.parse(localStorage.getItem("convBox"));
// Get flame conversation 1, open and/or up from localStorage
const fConv1 = JSON.parse(localStorage.getItem("fConv1"));
const fC1Up = JSON.parse(localStorage.getItem("fC1Up"));
const fC1Open = JSON.parse(localStorage.getItem("fC1Open"));
// Get flame conversation 2, open and/or up from localStorage
const fConv2 = JSON.parse(localStorage.getItem("fConv2"));
const fC2Up = JSON.parse(localStorage.getItem("fC2Up"));
const fC2Open = JSON.parse(localStorage.getItem("fC2Open"));
// Get flame conversation 3, open and/or up from localStorage
const fConv3 = JSON.parse(localStorage.getItem("fConv3"));
const fC3Up = JSON.parse(localStorage.getItem("fC3Up"));
const fC3Open = JSON.parse(localStorage.getItem("fC3Open"));
// Get union conversation 1, open and/or up from localStorage
const uConv1 = JSON.parse(localStorage.getItem("uConv1"));
const uC1Up = JSON.parse(localStorage.getItem("uC1Up"));
const uC1Open = JSON.parse(localStorage.getItem("uC1Open"));
// Get union conversation 2, open and/or up from localStorage
const uConv2 = JSON.parse(localStorage.getItem("uConv2"));
const uC2Up = JSON.parse(localStorage.getItem("uC2Up"));
const uC2Open = JSON.parse(localStorage.getItem("uC2Open"));
// Get union conversation 3, open and/or up from localStorage
const uConv3 = JSON.parse(localStorage.getItem("uConv3"));
const uC3Up = JSON.parse(localStorage.getItem("uC3Up"));
const uC3Open = JSON.parse(localStorage.getItem("uC3Open"));



const initialState = {
    user: user ? user : null,
    flame: flame ? flame : null,
    union: union ? union : null,

    mentions: mentions ? mentions : null,

    convBox: convBox ? convBox : false,

    sentMessage: null,

    fConv1: fConv1 ? fConv1 : null,
    fC1Up: fC1Up ? fC1Up : null,
    fC1Open: fC1Open ? fC1Open : null,

    fConv2: fConv2 ? fConv2 : null,
    fC2Up: fC2Up ? fC2Up : null,
    fC2Open: fC2Open ? fC2Open : null,

    fConv3: fConv3 ? fConv3 : null,
    fC3Up: fC3Up ? fC3Up : null,
    fC3Open: fC3Open ? fC3Open : null,

    uConv1: uConv1 ? uConv1 : null,
    uC1Up: uC1Up ? uC1Up : null,
    uC1Open: uC1Open ? uC1Open : null,

    uConv2: uConv2 ? uConv2 : null,
    uC2Up: uC2Up ? uC2Up : null,
    uC2Open: uC2Open ? uC2Open : null,

    uConv3: uConv3 ? uConv3 : null,
    uC3Up: uC3Up ? uC3Up : null,
    uC3Open: uC3Open ? uC3Open : null,

    cPost: false,
    cQN: false,

    cdpAvatar: false,
    cdpbackground: false,

    pAEditor: false,
    pBEditor: false,
    deleteFlare: false,
    editFlare: false,

    actAcc: user ? user.unionName ? "union" : "flame" : "flame",
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    
};

// Register user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
    return authService.logout();
})


// Switch user to flame user
export const switch2FlameAcc = createAsyncThunk("auth/switch2FlameAcc", async () => {
    try {
        localStorage.setItem("user", JSON.stringify(flame))
    } catch (err) {
        console.log(err)
    }
})


// Switch user to union user
export const switch2UnionAcc = createAsyncThunk("auth/switch2UnionAcc", async () => {
    try {
        localStorage.setItem("user", JSON.stringify(union))
    } catch (err) {
        console.log(err)
    }
})

// set conversations
export const conversation = createAsyncThunk("auth/conversation", async (conv, thunkAPI) => {
    try {
        localStorage.setItem("conv1", JSON.stringify(conv))
    } catch (err) {
        console.log(err)
    }
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
       
    reducers: {
        updateStart: ( state ) => {
            state.isLoading = true;
        },
        updateSuccess: ( state, action ) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        updateError: ( state ) => {
            state.isError = true;
            state.isLoading = false;
        },
        reset: ( state ) => {
            state.user = null;
            state.flame = null;
            state.union = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "flame";
        },


        newProfileName: ( state, action ) => {
            state.user.profileName = action.payload;
        },

        newAbout: ( state, action ) => {
            state.user.about = action.payload;
        },
        newHereFor: ( state, action ) => {
            state.user.hereFor = action.payload;
        },


        newFlameAvatar: ( state, action ) => {
            state.user.profilePicture = action.payload;
        },
        newUnionAvatar: ( state, action ) => {
            state.user.unionProfilePicture = action.payload;
        },
        newBackgroundPic: ( state, action ) => {
            state.user.backgroundPicture = action.payload;
        },

        mentionList: ( state, action ) => {
            state.mentions = action.payload;
        },

        flameFollowing: ( state, action ) => {
            state.user.flameFollowing = [...state.user.flameFollowing, action.payload];
        }, 
        flameUnfollowing: ( state, action ) => {
            state.user.flameFollowing = state.user.flameFollowing.filter((fFollowing) => fFollowing !== action.payload);
        },
        unionFollowing: ( state, action ) => {
            state.user.unionFollowing = [...state.user.unionFollowing, action.payload];
        }, 
        unionUnfollowing: ( state, action ) => {
            state.user.unionFollowing = state.user.unionFollowing.filter((uFollowing) => uFollowing !== action.payload);
        },

        flameRequestFollow: ( state, action ) => {
            state.user.flameFollowRequesting = [...state.user.flameFollowRequesting, action.payload];
        }, 
        flameUnrequestFollow: ( state, action ) => {
            state.user.flameFollowRequesting = state.user.flameFollowRequesting.filter((fFollowRequesting) => fFollowRequesting !== action.payload);
        },
        unionRequestFollow: ( state, action ) => {
            state.user.unionFollowRequesting = [...state.user.unionFollowRequesting, action.payload];
        }, 
        unionUnrequestFollow: ( state, action ) => {
            state.user.unionFollowRequesting = state.user.unionFollowRequesting.filter((uFollowRequesting) => uFollowRequesting !== action.payload);
        },

        flameFollower: ( state, action ) => {
            state.user.flameFollowers = [...state.user.flameFollowers, action.payload];
        }, 
        unionFollower: ( state, action ) => {
            state.user.unionFollowers = [...state.user.unionFollowers, action.payload];
        }, 
       


        flameBlock: ( state, action ) => {
            state.user.flameBlocking = [...state.user.flameBlocking, action.payload];
        }, 
        flameUnBlock: ( state, action ) => {
            state.user.flameBlocking = state.user.flameBlocking.filter((fBlocking) => fBlocking !== action.payload);
        },
        unionBlock: ( state, action ) => {
            state.user.unionBlocking = [...state.user.unionBlocking, action.payload];
        }, 
        unionUnBlock: ( state, action ) => {
            state.user.unionBlocking = state.user.unionBlocking.filter((uBlocking) => uBlocking !== action.payload);
        },

        flameSubscribing: ( state, action ) => {
            state.user.flameSubscribing = [...state.user.flameSubscribing, action.payload];
        }, 
        flameUnsubscribing: ( state, action ) => {
            state.user.flameSubscribing = state.user.flameSubscribing.filter((fSubscribing) => fSubscribing !== action.payload);
        },
        unionSubscribing: ( state, action ) => {
            state.user.unionSubscribing = [...state.user.unionSubscribing, action.payload];
        }, 
        unionUnsubscribing: ( state, action ) => {
            state.user.unionSubscribing = state.user.unionSubscribing.filter((uSubscribing) => uSubscribing !== action.payload);
        },

        flameRequestSubscribe: ( state, action ) => {
            state.user.flameSubscribeRequesting = [...state.user.flameSubscribeRequesting, action.payload];
        }, 
        flameUnrequestSubscribe: ( state, action ) => {
            state.user.flameSubscribeRequesting = state.user.flameSubscribeRequesting.filter((fSubscribeRequesting) => fSubscribeRequesting !== action.payload);
        },
        unionRequestSubscribe: ( state, action ) => {
            state.user.unionSubscribeRequesting = [...state.user.unionSubscribeRequesting, action.payload];
        }, 
        unionUnrequestSubscribe: ( state, action ) => {
            state.user.unionSubscribeRequesting = state.user.unionSubscribeRequesting.filter((uSubscribeRequesting) => uSubscribeRequesting !== action.payload);
        },

        flameSubscriber: ( state, action ) => {
            state.user.flameSubscribers = [...state.user.flameSubscribers, action.payload];
        }, 
        unionSubscriber: ( state, action ) => {
            state.user.unionSubscribers = [...state.user.unionSubscribers, action.payload];
        }, 


        audienceDefault: ( state, action ) => {
            state.user.postDefaultAudience = action.payload;
        },
        feedDefault: ( state, action ) => {
            state.user.postDefaultFeed = action.payload;
        },


        cvBxOpen: ( state ) => {
            state.convBox = true;
        },
        cvBxClose: ( state ) => {
            state.convBox = false;
        },

        newSentMessage: ( state, action ) => {
            state.sentMessage = action.payload;
        },

        setFCv1: ( state, action ) => {
            state.fConv1 = action.payload;
        },
        fCv1Open: ( state ) => {
            state.fC1Open = true;
        },
        fCv1Close: ( state ) => {
            state.fC1Open = false;
        },
        fCv1Up: ( state ) => {
            state.fC1Up = true;
        },
        fCv1Down: ( state ) => {
            state.fC1Up = false;
        },

        setFCv2: ( state, action ) => {
            state.fConv2 = action.payload;
        },
        fCv2Open: ( state ) => {
            state.fC2Open = true;
        },
        fCv2Close: ( state ) => {
            state.fC2Open = false;
        },
        fCv2Up: ( state ) => {
            state.fC2Up = true;
        },
        fCv2Down: ( state ) => {
            state.fC2Up = false;
        },

        setFCv3: ( state, action ) => {
            state.fConv3 = action.payload;
        },
        fCv3Open: ( state ) => {
            state.fC3Open = true;
        },
        fCv3Close: ( state ) => {
            state.fC3Open = false;
        },
        fCv3Up: ( state ) => {
            state.fC3Up = true;
        },
        fCv3Down: ( state ) => {
            state.fC3Up = false;
        },

        setUCv1: ( state, action ) => {
            state.uConv1 = action.payload;
        },
        uCv1Open: ( state ) => {
            state.uC1Open = true;
        },
        uCv1Close: ( state ) => {
            state.uC1Open = false;
        },
        uCv1Up: ( state ) => {
            state.uC1Up = true;
        },
        uCv1Down: ( state ) => {
            state.uC1Up = false;
        },

        setUCv2: ( state, action ) => {
            state.uConv2 = action.payload;
        },
        uCv2Open: ( state ) => {
            state.uC2Open = true;
        },
        uCv2Close: ( state ) => {
            state.uC2Open = false;
        },
        uCv2Up: ( state ) => {
            state.uC2Up = true;
        },
        uCv2Down: ( state ) => {
            state.uC2Up = false;
        },

        setUCv3: ( state, action ) => {
            state.uConv3 = action.payload;
        },
        uCv3Open: ( state ) => {
            state.uC3Open = true;
        },
        uCv3Close: ( state ) => {
            state.uC3Open = false;
        },
        uCv3Up: ( state ) => {
            state.uC3Up = true;
        },
        uCv3Down: ( state ) => {
            state.uC3Up = false;
        },

        cPOpen: ( state ) => {
            state.cPost = true;
        }, 
        cQNOpen: ( state ) => {
            state.cQN = true;
        }, 
        cPClose: ( state ) => {
            state.cPost = false;
        }, 
        cQNClose: ( state ) => {
            state.cQN = false;
        },
        
        cdpAvatarOpen: ( state ) => {
            state.cdpAvatar = true;
        },
        cdpAvatarClose: ( state ) => {
            state.cdpAvatar = false;
        },
        cdpBackgroundOpen: ( state ) => {
            state.cdpBackground = true;
        },
        cdpBackgroundClose: ( state ) => {
            state.cdpBackground = false;
        },

        pAEOpen: ( state ) => {
            state.pAEditor = true;
        }, 
        pBEOpen: ( state ) => {
            state.pBEditor = true;
        }, 
        pAEClose: ( state ) => {
            state.pAEditor = false;
        }, 
        pBEClose: ( state ) => {
            state.pBEditor = false;
        }, 
        dFOpen: ( state ) => {
            state.deleteFlare = true;
        },
        dFClose: ( state ) => {
            state.deleteFlare = false;
        },
        eFOpen: ( state ) => {
            state.editFlare = true;
        },
        eFClose: ( state ) => {
            state.editFlare = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.flame = action.payload;
                state.union = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.flame = null;
                state.union = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.flame;
                state.flame = action.payload.flame;
                state.union = action.payload.union;
                state.actAcc = "flame"
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.flame = null;
                state.union = null;
               
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.flame = null;
                state.union = null;
                state.actAcc = "flame";
            })
            .addCase(switch2UnionAcc.fulfilled, (state) => {
                state.actAcc = "union";
                state.user = state.union; 
            })
            .addCase(switch2FlameAcc.fulfilled, (state) => {
                state.actAcc = "flame";
                state.user = state.flame;
            })
    }
});

export const { 
    updateStart, 
    updateSuccess, 
    updateError, 
    reset,
    
    newProfileName,
    newAbout,
    newHereFor,

    newFlameAvatar,
    newUnionAvatar,
    newBackgroundPic,

    mentionList,

    flameFollowing,
    flameUnfollowing,
    unionFollowing,
    unionUnfollowing,

    flameRequestFollow,
    flameUnrequestFollow,
    unionRequestFollow,
    unionUnrequestFollow,

    flameFollower,
    unionFollower,

    flameBlock,
    flameUnblock,
    unionBlock,
    unionUnblock,

    flameSubscribing,
    flameUnsubscribing,
    unionSubscribing,
    unionUnsubscribing,

    flameRequestSubscribe,
    flameUnrequestSubscribe,
    unionRequestSubscribe,
    unionUnrequestSubscribe,

    flameSubscriber,
    unionSubscriber,

    audienceDefault,
    feedDefault,

    cvBxOpen, 
    cvBxClose, 

    newSentMessage,

    setFCv1, 
    fCv1Open, 
    fCv1Close, 
    fCv1Up, 
    fCv1Down,
    setFCv2, 
    fCv2Open, 
    fCv2Close, 
    fCv2Up, 
    fCv2Down,
    setFCv3, 
    fCv3Open, 
    fCv3Close, 
    fCv3Up, 
    fCv3Down,

    setUCv1, 
    uCv1Open, 
    uCv1Close, 
    uCv1Up, 
    uCv1Down,
    setUCv2, 
    uCv2Open, 
    uCv2Close, 
    uCv2Up, 
    uCv2Down,
    setUCv3, 
    uCv3Open, 
    uCv3Close, 
    uCv3Up, 
    uCv3Down,

    cPOpen,
    cQNOpen,
    cPClose,
    cQNClose,

    cdpAvatarOpen,
    cdpAvatarClose,
    cdpBackgroundOpen,
    cdpBackgroundClose,

    pAEOpen,
    pBEOpen,
    pAEClose,
    pBEClose,
    dFOpen,
    dFClose,
    eFOpen,
    eFClose,
    
} = authSlice.actions;
export default authSlice.reducer;