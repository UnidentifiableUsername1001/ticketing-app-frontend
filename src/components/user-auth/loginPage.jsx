import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../hooks/auth/useLogin";
import { openEye, closedEye } from "../../hooks/assorted/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PasswordReset } from "./PasswordReset";


function LoginPage() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const loginFunc = useLogin();
    const navigate = useNavigate();

    const [showError, setShowError] = useState('');
    const [showResetJSX, setShowResetJSX] = useState(false);

    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(openEye);

    const handlePassToggle = () => {
        if (inputType === 'password') {
            setIcon(closedEye);
            setInputType('text');
        } else {
            setIcon(openEye);
            setInputType('password');
        };
    };

    const handleLogin = async (e) => {
        loginFunc(loginData);
    }

    return (
        <div className="h-screen bg-wiseRose5/25">
            <div className="grid grid-rows-[auto_1fr] py-20 mx-45 relative">
                <div
                    className="
                        flex flex-col mb-6
                    "
                >
                    <h1
                        className="
                            flex flex-row
                        "
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={`
                                    font-lato gap-1 text-4xl absolute -ml-35 top-7
                                    text-wiseRose3 hover:text-wiseRose2 h-fit w-fit p-2 cursor-pointer
                                `}
                            onClick={() => navigate('/homepage')}
                        />
                    </h1>
                    <h2 
                        className="
                            font-lato text-wiseGrey1 mb-2
                            text-3xl font-extrabold">
                        Welcome back!
                    </h2>
                    <p
                        className="
                            font-lato text-wiseGrey3
                        "
                    >
                        Let's tackle the workday wisely, one issue at a time
                    </p>
                </div>
                
                <div className="
                        bg-white border border-wiseGrey4/30 grid grid-cols-[auto_1fr]
                        min-h-200 rounded-3xl w-fit
                    "
                >
                    <div
                        className="
                                flex flex-col gap-20 rounded-3xl
                                bg-wiseGrey1 pl-16 py-12 min-w-160
                        "
                    >
                        <h3
                            className="
                                text-wiseRose4
                                text-base font-semibold
                            "
                        >
                            WORK MOVES BETTER TOGETHER
                        </h3>
                        <h1
                            className="
                                text-wiseGrey5 flex flex-col gap-2
                                text-4xl font-bold
                            "
                        >
                            <span>Less chasing.</span>
                            <span>Clearer ownership.</span>
                            <span>Better outcomes.</span>
                        </h1>
                        <p
                            className="
                                text-wiseRose5
                                flex flex-col
                            "
                        >
                            <span>
                                One place to raise, track and resolve
                            </span>
                            <span>
                                the work that matters to your team
                            </span>
                        </p>
                    </div>
                    <div
                        className={`
                                py-20 px-30 flex flex-col
                                min-w-250 gap-7
                            `}
                    >
                        {!showResetJSX
                            ? (
                                <>
                                    <h1
                                        className="
                                            font-extrabold font-lato text-wiseGrey1
                                            text-4xl
                                        "
                                    >
                                        Sign in to WiseTickets
                                    </h1>
                                    <Link 
                                        to={'/register'}
                                        className="
                                            flex flex-row gap-2 font-lato

                                        "
                                    >
                                        <span
                                            className="
                                                text-wiseGrey1 text-lg
                                            "
                                        >
                                            No Account?
                                        </span>
                                        <span
                                            className="
                                                text-wiseRose3 font-semibold text-lg
                                                hover:text-wiseRose2
                                                hover:underline
                                            "
                                        >
                                            Register here!
                                        </span>
                                            
                                    </Link>
                                    <div className="flex flex-col gap-2">
                                        <label
                                            className="
                                                flex flex-row justify-between
                                            "
                                        >
                                            <span
                                                className="
                                                    font-lato text-wiseGrey1 font-semibold
                                                "
                                            >
                                                Email
                                            </span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="
                                            bg-wiseRose4/15 p-4 rounded-md outline-none transition-all duration-150 font-lato
                                            hover:bg-wiseRose4/35 focus:bg-wiseRose4/35 
                                            "
                                            placeholder="Enter your email"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="relative flex flex-col gap-2">
                                        <label
                                            className="
                                                flex flex-row justify-between
                                            "
                                        >
                                            <span
                                                className="
                                                    font-lato text-wiseGrey1 font-semibold
                                                "
                                            >
                                                Password
                                            </span>
                                            <div
                                                onClick={() => setShowResetJSX(!showResetJSX)}
                                                className="
                                                    cursor-pointer font-lato text-wiseRose3  font-bold transition-all duration-150
                                                    hover:underline hover:text-wiseRose2 text-center
                                                    "
                                                >
                                                Forgot password?
                                            </div>
                                        </label>
                                        <input
                                            id="password"
                                            type={inputType}
                                            className="
                                            bg-wiseRose4/15 p-4 rounded-md outline-none transition-all duration-150 font-lato
                                            hover:bg-wiseRose4/35 focus:bg-wiseRose4/35 w-full
                                            "
                                            placeholder="Enter your password"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                        />
                                        <p
                                            className="
                                                cursor-pointer font-lato text-wiseRose3 font-bold transition-all duration-150
                                                hover:underline hover:text-wiseRose2
                                            "
                                            onClick={handlePassToggle}>
                                            Show password?
                                        </p>
                                    </div>

                                    <div className="subtext-section">
                                        {showError ? (
                                            <>
                                                <p className="error-pop-up">
                                                    {showError}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                {/* nothing to see here */}
                                            </>
                                        )}

                                    </div>
                                    <div className="-mt-10">    
                                        <button type="button"
                                            onClick={() => handleLogin()} 
                                            className="cursor-pointer
                                                        py-2 bg-wiseSkin rounded-lg
                                                        text-wiseGrey1 text-xl font-normal
                                                        transition w-full
                                                        duration-200
                                                        hover:bg-wiseRose3 
                                                    ">
                                            Login
                                        </button>
                                    </div>
                                </> 
                            )
                            : (
                                <PasswordReset/>
                            )
                        }
      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;