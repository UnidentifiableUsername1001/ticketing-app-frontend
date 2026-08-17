import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswordReset } from "../../hooks/user-fetch-hooks/usePasswordReset";
import { useLogin } from "../../hooks/auth/useLogin";

export function PasswordReset () {

    const [resetForm, setResetForm] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const [newPassComparator, setNewPassComparator] = useState('');

    const [error, setError] = useState(null);

    const { resetPassFunc, isResetting, errorResetting } = usePasswordReset();

    const loginFunc = useLogin();

    const handleSubmit = async () => {

        if (resetForm.newPassword !== newPassComparator) {
            return setError("The new passwords don't match.");

        } else if (resetForm.newPassword == resetForm.oldPassword) {
            return setError("Your new password can't be your old password");
        };

        const tempToken = await loginFunc({
            email: resetForm.email,
            password: resetForm.oldPassword,
            voluntaryReset: true
        });

        if (sessionStorage.getItem('auth-token')){
            resetPassFunc(resetForm);
        };

    }

    return (
        <div className="register-login-components">
        <div className="absolute inset-0 bg-linear-to-b from-bgMain/50 to-bgMain"></div>
            <div className="p-12 -mt-64 relative">
                <h2 className="text-center -mt-6 mb-3 font-wise text-wiseOffWhite text-3xl font-semibold">Reset Password</h2>
                <div className="bg-wiseOffWhite/10 backdrop-blur-sm rounded-sm flex flex-col p-8 gap-6 items-center">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={resetForm.email}
                            onChange={(e) => setResetForm({...resetForm, email: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="form-label">Old Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={resetForm.oldPassword}
                            onChange={(e) => setResetForm({...resetForm, oldPassword: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={resetForm.newPassword}
                            onChange={(e) => setResetForm({...resetForm, newPassword: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="form-label">Re-enter New Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={newPassComparator}
                            onChange={(e) => setNewPassComparator(e.target.value)}
                        />
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
                            </>
                        )}

                    </div> 
                    <div className="flex flex-row gap-6">    
                        <button type="button"
                            onClick={() => handleSubmit()} 
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
                            Reset
                        </button>
                    </div>    
                </div>
                   
            </div>
        </div>
    )

}