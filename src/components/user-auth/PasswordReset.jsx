import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswordReset } from "../../hooks/user-fetch-hooks/usePasswordReset";
import { useLogin } from "../../hooks/auth/useLogin";
import { openEye, closedEye } from "../../hooks/assorted/react-icons";

export function PasswordReset () {

    const [resetForm, setResetForm] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const [newPassComparator, setNewPassComparator] = useState('');

    const [error, setError] = useState(null);

    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(openEye);
    const [currPassInput, setCurrPassInput] = useState('oldPassword');

    const handlePassToggle = () => {
        if (inputType === 'password') {
            setIcon(closedEye);
            setInputType('text');
        } else {
            setIcon(openEye);
            setInputType('password');
        };
    };

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
        <div className="absolute inset-0 bg-wiseNavy5"></div>
            <div className="p-12 -mt-96 relative w-125">
                <h2 className="text-center -mt-6 mb-3 font-wise text-wiseGrey1 text-3xl font-medium">Reset Password</h2>
                <div className="bg-wiseOffWhite border border-wiseGrey4 flex flex-col p-8 py-15 gap-12 items-center">
                    <div className="flex flex-col gap-2 w-8/10">
                        <input
                            id="email"
                            type="email"
                            className="admin-form-control"
                            placeholder="Enter your email"
                            value={resetForm.email}
                            onChange={(e) => setResetForm({...resetForm, email: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-2 w-8/10">
                        <input
                            id="password" w-full
                            type={inputType}
                            className="admin-form-control w-full"
                            placeholder="Enter your old password"
                            value={resetForm.oldPassword}
                            onClick={() => setCurrPassInput('oldPassword')}
                            onChange={(e) => setResetForm({...resetForm, oldPassword: e.target.value})}
                        />
                        {currPassInput === 'oldPassword' ? (
                            <span
                                className="flex justify-around items-center cursor-pointer"
                                onClick={handlePassToggle}>
                                {icon}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="flex gap-2 w-8/10">
                        <input
                            id="password"
                            type={inputType}
                            className="admin-form-control w-full"
                            placeholder="Enter your new password"
                            value={resetForm.newPassword}
                            onClick={() => setCurrPassInput('newPassword')}
                            onChange={(e) => setResetForm({...resetForm, newPassword: e.target.value})}
                        />
                        {currPassInput === 'newPassword' ? (
                            <span
                                className="flex justify-around items-center cursor-pointer"
                                onClick={handlePassToggle}>
                                {icon}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="flex gap-2 w-8/10">
                        <input
                            id="password"
                            type={inputType}
                            className="admin-form-control w-full"
                            placeholder="Re-enter your new password"
                            value={newPassComparator}
                            onClick={() => setCurrPassInput('reenterPassword')}
                            onChange={(e) => setNewPassComparator(e.target.value)}
                        />
                        {currPassInput === 'reenterPassword' ? (
                            <span
                                className="flex justify-around items-center cursor-pointer"
                                onClick={handlePassToggle}>
                                {icon}
                            </span>
                        ) : (
                            <></>
                        )}
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
                    <div className="flex flex-row -mt-10">    
                        <button type="button"
                            onClick={() => handleSubmit()} 
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
                            Reset
                        </button>
                    </div>    
                </div>
                   
            </div>
        </div>
    )

}