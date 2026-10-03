import React, { Fragment, useState } from 'react';
import { useCompanyRegistration } from '../../hooks/registration/useCompanyRegistration';
import { InputTile } from './sub-components/InputTile';


export function Registration() {
    const [regForm, setRegForm] = useState({
        companyData: {
            companyName: '',
            companyAddress: '',
            numberOfEmployees: 0,   
        },
        userData: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            email: "",
            password: "",
        }
    });

    const [stage, setStage] = useState(1);

    const { companyRegFunc, companyRegError, companyRegPending, companyRegSuccess, companyErrorData } = useCompanyRegistration();

    const handleSubmit = async () => {
        try {
            const savedCompanyData = await companyRegFunc(regForm);
            return savedCompanyData;
        } catch (e) {
            console.log(e);
        }
    };

    const labelText = (label) => {
        switch(true) {
            case label === "companyName":
                return 'What company do you work for?';
            case label === "companyAddress":
                return "What's your company's address?";
            case label === "numberOfEmployees":
                return "How many people work at your company?";
            case label === "jobTitle":
                return "What's your job title?";
            case label === "firstName":
                return "First name";
            case label === "lastName":
                return "Last name";
            case label === "email":
                return "Enter your email address";
            case label === "password":
                return "Enter a strong password"
            default:
                return "The engineer didn't code this label properly so here's a placeholder!"
        };
    };

    const handleInput = (parentProp, childProp, inputValue) => {
        setRegForm((prev) => {
            return {
                ...prev,
                [parentProp]: {
                    ...prev[parentProp],
                    [childProp]: inputValue
                }
            }
        })
    };

    return (
        <div className='min-h-screen bg-wiseOffWhite bg-[url(/public/images/Dashboard-screenshot.png)]'>
            <div
                className={
                    `
                        grid grid-cols-5 min-h-screen place-content-start gap-10 pt-20
                        font-lato bg-wiseGrey1/50 backdrop-blur-[2px]
                    `
                }
            >
                <div
                    className={
                        ` 
                            progress-bar bg-amber-700
                            grid col-span-3 col-start-2
                        `
                    }
                >
                    <div
                        className={
                            `
                                text-wiseGrey5 text-2xl
                                place-self-center
                            `
                        }
                    >
                        Some placeholder
                    </div>
                    
                </div>
                <div
                    className={
                        `
                            grid col-start-2 col-span-3 -mt-
                            grid-cols-11

                        `
                    }
                >
                    <div 
                        className={`
                                col-start-3 col-span-7 grid
                                ${stage === 1 ? 
                                    'tranaition-all opacity-100' 
                                    : 
                                    'hidden opacity-0'
                               }
                            `}
                    >
                        <div 
                            className={
                                `
                                    bg-wiseGrey5 grid grid-cols-2 gap-10 min-h-75/100
                                    mb-5 p-10 rounded-sm border border-wiseGrey4/25 
                                `
                            }
                        >
                            <h1
                                className={
                                    `
                                        text-center text-3xl
                                        col-span-2
                                    `
                                }
                            > 
                                Tell us about your company
                            </h1>
                            {Object.entries(regForm.companyData).map(([childKey, childValue]) => (
                                <InputTile
                                    key={childKey}
                                    label={labelText(childKey)}
                                    inputValue={childValue}
                                    updateHandler={(value) => {
                                        handleInput(Object.keys(regForm)[0], childKey, value)
                                    }}
                                />
                        ))}
                        </div>
                        <button 
                            type='button'
                            className={
                                `
                                button1-no-width
                                w-20 h-10 text-center place-self-end
                                cursor-pointer
                                `
                            }
                            onClick={() => setStage((prev) => prev === 1 ? 2 : 1)}
                        >
                            Next
                        </button>
                    </div>
                    <div 
                        className={`
                                col-start-3 col-span-7 grid
                                ${stage === 2 ? 
                                    'opacity-100' : 
                                    'hidden opacity-0'}
                                `}
                    >
                        <div 
                            className={
                                `
                                bg-wiseGrey5 grid grid-cols-2 gap-10 min-h-75/100
                                mb-5 p-10 rounded-sm border border-wiseGrey4/25 
                                `
                            }
                        >
                            <h1
                                className={
                                    `
                                    text-center text-3xl
                                    col-span-2
                                    `
                                }
                            > 
                                Now tell us about you
                            </h1>
                            {Object.entries(regForm.userData).map(([childKey, childValue]) => (
                                <InputTile
                                    key={childKey}
                                    label={labelText(childKey)}
                                    inputValue={childValue}
                                    updateHandler={(value) => {
                                        handleInput(Object.keys(regForm)[1], childKey, value)
                                    }}
                                />
                        ))}
                        </div>
                        <div className='grid grid-cols-2'>
                            <button 
                                type='button'
                                className={
                                    `
                                    button1-no-width
                                    place-self-start w-20 h-10 text-center
                                    cursor-pointer
                                    ${stage === 1 ? 
                                        'hidden'
                                        :
                                        ''
                                    }
                                    `
                                }
                                onClick={() => setStage((prev) => prev === 3 ? 2 : 1)}
                            >
                                Back
                            </button>
                            <button 
                                type='button'
                                className={
                                    `
                                    button1-no-width
                                    w-20 h-10 text-center
                                    place-self-end
                                    cursor-pointer
                                    `
                                }
                                onClick={() => {
                                    stage !== 3 ? 
                                        setStage((prev) => prev === 1 ? 2 : 3)
                                        :
                                        handleSubmit()
                                }}
                            >
                                {stage === 1 || stage === 2 ? 'Next' : 'Finish'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}