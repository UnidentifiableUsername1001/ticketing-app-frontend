import React, { useState } from "react";
import { config } from "../../../config";
import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../context/authContext";
import { jwtDecode } from "jwt-decode";
import { useLogin } from "../../hooks/auth/useLogin";
import { openEye, closedEye } from "../../hooks/assorted/react-icons";


function LoginPage() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const loginFunc = useLogin();
    const navigate = useNavigate();

    const [showError, setShowError] = useState('');

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
        e.preventDefault();
        loginFunc(loginData);
    }

    return (
        <div className="register-login-components">
        <div className="absolute inset-0 bg-"></div>
            <div className="p-12 -mt-128 relative w-125">
                <h2 className="text-center -mt-6 mb-3 font-wise text-wiseGrey1 text-3xl font-medium">Login</h2>
                <form onSubmit={handleLogin} className="bg-wiseOffWhite border border-wiseGrey4 flex flex-col p-8 py-15 gap-12 items-center">
                    <div className="flex flex-col gap-2 w-8/10">
                        <input
                            id="email"
                            type="email"
                            className="admin-form-control"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-2 w-8/10">
                        <input
                            id="password"
                            type={inputType}
                            className="admin-form-control w-full"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
                        <span
                            className="flex justify-around items-center cursor-pointer"
                            onClick={handlePassToggle}>
                            {icon}
                        </span>
                    </div>
                    <div
                        onClick={() => navigate('/password-reset')}
                        className="cursor-pointer font-lato text-wiseRose2 hover:underline hover:text-wiseRose1">
                        I've forgotten my password.
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
                    <div className="flex flex-row -mt-10">    
                        <button type="submit" 
                            className="cursor-pointer
                                        py-1 px-4
                                        bg-wiseSkin
                                        text-wiseGrey2
                                        text-lg
                                        font-normal
                                        transition
                                        duration-200
                                        hover:bg-bgMain
                                        hover:text-wiseDarkPink
                                        hover:outline
                                        hover:outline-offset-2
                                        hover:outline-wiseSkin">
                            Login
                        </button>
                    </div>       
                </form>
            </div>
        </div>
    )
}

export default LoginPage;