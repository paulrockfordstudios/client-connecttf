import React, { createContext, useReducer, useState, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import { auth } from "../Utils/firebase/firebase";

/*
function useLoggedInStatus() {
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        const foundUser = JSON.parse(storedUser);
        setLoggedIn(foundUser);
        }
    }, []);

    return loggedIn;
};

const logInUser = useLoggedInStatus();
*/

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
            value={{
                user: state.user, 
                isFetching: state.isFetching, 
                error: state.error, 
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};



//////////////////// USERS \\\\\\\\\\\\\\\\\\\\

/*
{ 
        _id: "614a795d7918069b19a8536c",
        firstName:"Bethany",
        lastName: "Doane",
        prefix: "Mrs.",
        suffix: "",
        userName: "DogLover89",
        age: 32,
        birthdate: "1989-05-30",
        sign: "Gemini",
        sex: "female",
        energy: "feminine",
        orientation: "straight",
        relationshipStatus: "married",
        journeyStatus: "no contact",
        about: "Country girl at heart who loves her dog, country and husband.",
        story: "I met my twin flame a year ago on accident. We haven't had any contact...",
        hereFor: ["friendship", "insight"],
        profilePicture: "/data/dummyData/dummySamplePics/profilePics/bethany-doane.jpg",
        backgroundPicture: "/data/dummyData/dummySamplePics/backgroundPics/love-and-dog.jpg",
        email: "bethanyd89@goggle.com",
        phoneNumber: 5551234567,
        password: "$2b$10$uarF3zqIO9v8Kkz7BWjAC.qqiMwv5/8SHnrp39WJpp9hD9u/4CIbG",
        flameFollowers: ["614a7c0d7918069b19a8536f", "614a9c527918069b19a85377", "614aa2057918069b19a8537e", "614b412067ba4c8d9af26628", "614aa6a67918069b19a85384"],
        flameFollowing: ["614a7c0d7918069b19a8536f", "614b36db67ba4c8d9af2661c", "614aa2057918069b19a8537e", "614a99fc7918069b19a85374", "614a9c527918069b19a85377", 
        "614aa4ae7918069b19a85381", "614b3b6a67ba4c8d9af2661f", "614b3f7e67ba4c8d9af26625", "614b412067ba4c8d9af26628" ],
        unionFollowers: ["61b6334c4d5b94880c94e613", "61b633c44d5b94880c94e615", "61b76e164d5b94880c94e83d"],
        unionFollowing: ["61b6334c4d5b94880c94e613", "61b633c44d5b94880c94e615", "61b76e164d5b94880c94e83d", "61b6570c4d5b94880c94e774", "61b7669e4d5b94880c94e81b"],
        flameBlockers: [],
        unionBlockers: [],
        flameBlocking: [],
        unionBlocking: [],
        flameSubscribers: [],
        unionSubscribers: [],
        flameSubscribing: [],
        unionSubscribing: [],
        isActive: true,
        isAdmin: false,
        location: {},
        profileName: "Bethany Doane",
        },

    {
        id: "614b3b6a67ba4c8d9af2661f",
        firstName: "Raj",
        lastName: "Nareem",
        prefix: "Mr.",
        Suffix: "",
        userName: "Raj Nareem",
        age: 36,
        birthDate: 16-01-1985,
        sign: "Capricorn",
        sex: "male",
        energy: "masculine",
        orientation: "straight",
        relationshipStatus: "single",
        journeyStatus: "no contact",
        about: "I am a Software Engineer and I like to rock climb",
        story: "Three years ago, I took a trip to the south island of New Zealand. On my trip, I met someone very special. We have an intense spiritual connection. She is very beautiful. The only problem is that my family would not allow it. She is jewish and I am originally from indai and my family is very religous and set heavy in our cultural ways. It would never be allowed for us to be together.",
        hereFor: ["friendship", "guidance", "insight", "I have questions"],
        profilePicture: "data/dummyData/dummySamplePics/profilePics/raj-nareem.jpg",
        backgroundPicture: "data/dummyData/dummySamplePics/backgroundPics/rock-climb.jpg",
        email: "raj.h.nareem@goggle.com",
        phoneNumber: 2345678901,
        password: "$2b$10$sV17t8GYBXUIbcHY8p/eOuFWomm6X9.E0tvWYDqLZfdNWvbllxnie",
        location: {
            city: "Portland",
            state: "OR",
            country: "United States",
        },
    */


//////////////////// UNIONS \\\\\\\\\\\\\\\\\\\\

/*
{
        _id: "61b3e4a3d9ec8bddc83be435",
        profileName: "The Joker & Harley",
        unionName: "$jokerharley$",
        masculineId: "616afe535f666ae29a9b18a8",
        feminineId: "616afefb5f666ae29a9b18aa",
        about: "Two nutcases out to have a good time!",
        story: "",
        hereFor: [],
        spectrum: "emerald",
        unionProfilePicture: "/data/dummyData/dummySamplePics/profilePics/joker-harley.jpg",
        masculineProfilePic: "/data/dummyData/dummySamplePics/profilePics/jack-napier.jpg",
        feminineProfilePic: "/data/dummyData/dummySamplePics/profilePics/harley-quinn.jpg",
        backgroundPicture: "/data/dummyData/dummySamplePics/backgroundPics/joker-and-harley.jpg",
        emailMasculine: "jokesonyou@spotmail.com",
        emailFeminine: "j0kersbab3@spotmail.com",
        flameFollowers: [],
        flameFollowing: [],
        unionFollowers: [],
        unionFollowing: [],
        flameBlockers: [],
        flameBlocking: [],
        unionBlockers: [],
        unionBlocking: [],
        flameSubscribers: [],        
        flameSubscribing: [],
        unionSubscribers: [],        
        unionSubscribing: [],
        isActive: true,
        admins: [],
        },
*/