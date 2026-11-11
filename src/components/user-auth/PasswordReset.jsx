import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswordReset } from "../../hooks/user-fetch-hooks/usePasswordReset";
import { useLogin } from "../../hooks/auth/useLogin";

export function PasswordReset () {

    const [resetForm, setResetForm] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const navigate = useNavigate();

    const [newPassComparator, setNewPassComparator] = useState('');

    const [showError, setShowError] = useState(null);

    const [inputType, setInputType] = useState('password');
    const [currPassInput, setCurrPassInput] = useState('oldPassword');

    const handlePassToggle = () => {
        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        };
    };

    const { resetPassFunc, isResetting, errorResetting } = usePasswordReset();

    const { loginFunc, successData, loggingIn, loggedIn, errorData, isError } = useLogin();

    const handleSubmit = async () => {

        if (resetForm.newPassword !== newPassComparator) {
            return setShowError("The new passwords don't match.");

        } else if (resetForm.newPassword == resetForm.oldPassword) {
            return setShowError("Your new password can't be your old password");
        };

        await loginFunc({
            email: resetForm.email,
            password: resetForm.oldPassword,
            voluntaryReset: true
        });

        if (sessionStorage.getItem('auth-token')){
            resetPassFunc(resetForm);
        };

    }

    return (
        <>
            <h1
                className="
                    font-extrabold font-lato text-wiseGrey1
                    text-4xl
                "
            >
                Reset Your Password
            </h1>
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
                    placeholder="Enter your email"
                    value={resetForm.email}
                    onChange={(e) => setResetForm({...resetForm, email: e.target.value})}
                    className="
                    bg-wiseRose4/15 p-4 rounded-md outline-none transition-all duration-150 font-lato
                    hover:bg-wiseRose4/35 focus:bg-wiseRose4/35 
                    "
                />
            </div>
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
                        Password
                    </span>
                </label>
                <input
                    id="password"
                    type={inputType}
                    className="
                        bg-wiseRose4/15 p-4 rounded-md outline-none transition-all duration-150 font-lato
                        hover:bg-wiseRose4/35 focus:bg-wiseRose4/35 w-full
                    "
                    placeholder="Enter your old password"
                    value={resetForm.oldPassword}
                    onClick={() => setCurrPassInput('oldPassword')}
                    onChange={(e) => setResetForm({...resetForm, oldPassword: e.target.value})}
                />
                {currPassInput === 'oldPassword' ? (
                    <p
                        className="
                            cursor-pointer font-lato text-wiseRose3 font-bold transition-all duration-150
                            hover:underline hover:text-wiseRose2
                        "
                        onClick={handlePassToggle}>
                        Show password?
                    </p>
                ) : (
                    <></>
                )}
            </div>
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
                        Enter your new password
                    </span>
                </label>
                <input
                    id="password"
                    type={inputType}
                    className="
                        bg-wiseRose4/15 p-4 rounded-md outline-none transition-all duration-150 font-lato
                        hover:bg-wiseRose4/35 focus:bg-wiseRose4/35 w-full
                    "
                    placeholder="Enter your new password"
                    value={resetForm.newPassword}
                    onClick={() => setCurrPassInput('newPassword')}
                    onChange={(e) => setResetForm({...resetForm, newPassword: e.target.value})}
                />
                {currPassInput === 'newPassword' ? (
                    <p
                        className="
                            cursor-pointer font-lato text-wiseRose3 font-bold transition-all duration-150
                            hover:underline hover:text-wiseRose2
                        "
                        onClick={handlePassToggle}>
                        Show password?
                    </p>
                ) : (
                    <></>
                )}
            </div>
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
                        Re-enter your new password
                    </span>
                </label>
                <input
                    id="password"
                    type={inputType}
                    className="
                        bg-wiseRose4/15 p-4 rounded-md outline-none transition-all duration-150 font-lato
                        hover:bg-wiseRose4/35 focus:bg-wiseRose4/35 w-full
                    "
                    placeholder="Re-enter your new password"
                    value={newPassComparator}
                    onClick={() => setCurrPassInput('reenterPassword')}
                    onChange={(e) => setNewPassComparator(e.target.value)}
                />
                {currPassInput === 'reenterPassword' ? (
                    <p
                        className="
                            cursor-pointer font-lato text-wiseRose3 font-bold transition-all duration-150
                            hover:underline hover:text-wiseRose2
                        "
                        onClick={handlePassToggle}>
                        Show password?
                    </p>
                ) : (
                    <></>
                )}
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
                    onClick={() => handleSubmit()} 
                    className="cursor-pointer
                                py-2 bg-wiseSkin rounded-lg
                                text-wiseGrey1 text-xl font-normal
                                transition w-full
                                duration-200
                                hover:bg-wiseRose3 
                            ">
                    Reset Password
                </button>
            </div>
        </>
    )
}