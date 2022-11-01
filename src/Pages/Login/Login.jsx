import React, { useContext, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../../Redux/AuthSlice';
import { Link } from "react-router-dom";
import "./Login.css";
import { loginCall } from "../../Utils/apiCalls/apiCalls";
import { AuthContext } from "../../Context/AuthContext";
import { CircularProgress } from "@material-ui/core";

function Login() {

    const email = useRef();
    const password = useRef();

    const dispatch = useDispatch();

    const [passwordShow, setPasswordshow] = useState(false);

    const { user, isLoading } = useSelector((state) => state.auth);

    //const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: email.current.value, 
            password: password.current.value
        }
        dispatch(login(userData)); 
    };

   
    return (
        <div className="login">
        <div className="login-container">
            <div className="loginLeft">
                <span className="loginLogo">
                 <img className="loginLogoImg" src="/logo/ConnectTF-logo-1.png" alt="" />
                </span>
                <span className="loginDescription">A place where those who are on the <b style={{color: "#e639af"}}>twin flame</b> journey can <b style={{color: "#4a76fd"}}>connect</b>!</span>
            </div>
            <div className="loginRight">
                <form className="loginForm" onSubmit={handleSubmit}>
                     <input 
                         className="loginInput" 
                         type="email" 
                         required
                         placeholder="Email" 
                         ref={email} 
                     />
                     <input 
                         className="loginInput" 
                         type={passwordShow ? "text" : "password"} 
                         required
                         minLength="6"
                         placeholder="Password" 
                         ref={password} 
                     />
                     <span 
                         className="showPasswordLoginBtn" 
                         onClick={() => setPasswordshow(!passwordShow)}
                     >
                         {passwordShow ? "Hide" : "Show"} Password
                     </span>
                     <button className="loginBtn" type="submit" disabled={isLoading}>
                         {isLoading ? (
                             <CircularProgress color="white" size="25px" />
                         ) : (
                             "Log In"
                         )}
                     </button>
                     <span className="loginForgot">Forgot Password?</span>
                     <button className="loginRegisterBtn">
                         <Link to="/registration">
                             {isLoading ? (
                                 <CircularProgress color="white" size="25px" />
                             ) : (
                                 "Create New Account"
                             )}
                         </Link>
                     </button>
                </form>
            </div>
        </div>
    </div>
    )
};

export default Login;