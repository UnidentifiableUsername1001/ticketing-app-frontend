import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../hooks/auth/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PasswordReset } from "./PasswordReset";
import { ToastContext } from "../../context/toast-notification/ToastContext";
import { jwtDecode } from "jwt-decode";

function LoginPage() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const {loginFunc, loggedIn, loggingIn, successData, errorData, isError} = useLogin();

    const { addToast } = useContext(ToastContext);
    
    const [error, setError] = useState(null)
    
    const navigate = useNavigate();

    const [showResetJSX, setShowResetJSX] = useState(false);

    const [inputType, setInputType] = useState('password');

    const handlePassToggle = () => {
        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        };
    };

    const handleLogin = async () => {
        await loginFunc(loginData);

        if(isError) {
            setError(errorData.message);
            console.log(errorData);
        };

        if(loggedIn && successData.scope === 'password_reset_only') {
            addToast({msg: 'Password reset required', type: 'warn'});
            return navigate('/password-reset');
        }

        addToast({msg: `Welcome ${successData?.firstName}!`, type: 'success'});
        return navigate('/dashboard');

    }

    return (
        <div className="h-screen bg-wiseRose5/25">
            <div className="grid grid-rows-[auto_1fr] pt-5 mx-auto max-w-300">
                <div
                    className="
                        flex flex-col mb-6
                    "
                >
                    <h1
                        className="
                            flex flex-row justify-start
                        "
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={`
                                    font-lato gap-1 text-4xl mb-5
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

                        bg-white border border-wiseGrey4/30 grid lg:grid-cols-[auto_1fr]
                        min-h-100 rounded-3xl min-w-fit lg:min-w-150
                    "
                >
                    <div
                        className="
                                hidden lg:flex flex-col gap-20 rounded-3xl
                                bg-wiseGrey1 px-14 py-12 
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
                                py-10 px-30 flex flex-col
                                gap-7 min-w-125
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
                                        {error ? (
                                            <>
                                                <p className="error-pop-up">
                                                    {error}
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
                                            className={`
                                                ${loggingIn 
                                                    ? `
                                                        cursor-progress
                                                        py-2 bg-wiseGre4/60 rounded-lg
                                                        text-wiseGrey1 text-xl font-normal
                                                        w-full
                                                    `
                                                    : `
                                                        cursor-pointer
                                                        py-2 bg-wiseSkin rounded-lg
                                                        text-wiseGrey1 text-xl font-normal
                                                        transition w-full
                                                        duration-200
                                                        hover:bg-wiseRose3
                                                    `
                                                }
                                                 
                                                    `}>
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