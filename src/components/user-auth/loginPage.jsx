import React, {useState} from "react";
import { config } from "../../../config";
import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../context/authContext";
import { jwtDecode } from "jwt-decode";


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState('');
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAppContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            const response = await fetch(`${config.backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                email: email,
                password: password
            }) 
        });

        const data = await response.json();
        if (!response.ok) return setShowError(data.message)

            const decoded = jwtDecode(data.authToken);

            if (decoded.user.scope == 'password_reset_only') {
                navigate('/password-reset-page');
            };

            sessionStorage.setItem('auth-token', data.authToken);
            sessionStorage.setItem('name', data.firstName + " " + data.lastName);
            sessionStorage.setItem('email', data.email);

            setIsLoggedIn(true);

            navigate('/homepage');

        } catch (e) {
            console.log('Error fetching details: ' + e);
        }
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
            </div>
        </div>
    )
}

export default LoginPage;