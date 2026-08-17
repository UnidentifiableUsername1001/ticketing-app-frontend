import React, { useState } from "react";
import { config } from "../../../config";
import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../context/authContext";
import { jwtDecode } from "jwt-decode";
import { useLogin } from "../../hooks/auth/useLogin";


function LoginPage() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const loginFunc = useLogin();
    const navigate = useNavigate();

    const [showError, setShowError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        loginFunc(loginData);
    }

    return (
        <div className="register-login-components">
        <div className="absolute inset-0 bg-linear-to-b from-bgMain/50 to-bgMain"></div>
            <div className="p-12 -mt-64 relative">
                <h2 className="text-center -mt-6 mb-3 font-wise text-wiseOffWhite text-3xl font-semibold">Login</h2>
                <form onSubmit={handleLogin} className="bg-wiseOffWhite/10 backdrop-blur-sm rounded-sm flex flex-col p-8 gap-6 items-center">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
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
                    <div className="flex flex-row gap-6">    
                        <button type="submit" 
                            className="cursor-pointer
                                        p-2
                                        bg-wiseSkin
                                        text-wiseOffWhite
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