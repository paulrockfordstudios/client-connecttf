import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import axios from "axios";
import "./Registration.css";
import { register } from '../../Redux/AuthSlice';

function Registration() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    const firstName = useRef();
    const lastName = useRef();
    const birthdate = useRef();
    const userName = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const code = useRef();


    const [passwordShow, setPasswordshow] = useState(false);

    const codeArr = [];


    const handleSubmit = (event) => {
        if (!codeArr.include(code.current.value)) return;
        event.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords do not match!")
        } else {
            const userData = {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                birthdate: birthdate.current.value,
                userName: userName.current.value,
                email: email.current.value,
                password: password.current.value,
            }    
            dispatch(register(userData)); 
            navigate("/registration/introInfo");
        }
    }

    return (
        <div className="registration">
            <div className="registration-container">
                <div className="registrationLeft">
                   <span className="registrationLogo">
                    <img className="registrationLogoImg" src="/logo/ConnectTF-logo-1.png" alt="" />
                    </span>
                    <span className="registrationDescription">A place where those who are on the <b style={{color: "#e639af"}}>twin flame</b> journey can <b style={{color: "#4a76fd"}}>connect</b>!</span>
                </div>
                <div className="registrationRight">
                    <form className="registrationForm" onSubmit={handleSubmit}>
                        <input 
                            className="registrationInput" 
                            required 
                            placeholder="first Name" 
                            ref={firstName}
                        />
                        <input 
                            className="registrationInput" 
                            required 
                            placeholder="Last Name" 
                            ref={lastName}
                        />
                        <input 
                            className="registrationInput" 
                            required 
                            placeholder="Birthdate" 
                            ref={birthdate}
                        />
                        <input 
                            className="registrationInput" 
                            required 
                            placeholder="Username" 
                            ref={userName}
                        />
                        <input 
                            className="registrationInput"
                            type="email" 
                            required 
                            placeholder="Email" 
                            ref={email}
                        />
                        <input 
                            className="registrationInput"
                            type={passwordShow ? "text" : "password"} 
                            required 
                            minLength="6"
                            placeholder="Password" 
                            ref={password}
                        />
                        <span 
                            className="showPasswordRegistrationBtn" 
                            onClick={() => setPasswordshow(!passwordShow)}
                        >
                            {passwordShow ? "Hide" : "Show"} Password
                        </span>
                        <input 
                            className="registrationInput re-enter"
                            type={passwordShow ? "text" : "password"}
                            required 
                            minLength="6"
                            placeholder="Re-Enter Password" 
                            ref={passwordAgain}
                        />
                        <input 
                            className="registrationInput" 
                            required 
                            minLength="6"
                            maxLength="6"
                            placeholder="Early Registration Code" 
                            ref={code}
                        />
                        <button className="registerBtn" type="submit">Sign Up</button>
                        <button className="loginAccBtn">
                            <Link to="/login">
                                Log into Account
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Registration;