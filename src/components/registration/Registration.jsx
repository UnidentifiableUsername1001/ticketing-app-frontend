import React, { Fragment, useState } from 'react';
import { useCompanyRegistration } from '../../hooks/registration/useCompanyRegistration';
import { InputTile } from './sub-components/InputTile';


export function Registration() {
    const [regForm, setRegForm] = useState({
        companyData: {
            companyName: {
                value: '',
                inputType: 'text',
            },
            numberOfEmployees: {
                value: '',
                inputType: 'number',
            },
            companyAddress: {
                value: '',
                inputType: 'text',
            },
               
        },
        userData: {
            firstName: {
                value: '',
                inputType: 'text',
            },
            lastName: {
                value: '',
                inputType: 'text',
            },
            jobTitle: {
                value: '',
                inputType: 'text',
            },
            email: {
                value: '',
                inputType: 'email',
            },
            password: {
                value: '',
                inputType: 'password',
            },
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
        const labels = {
            companyName: {
                input: 'What company do you work for?',
                summary: 'Company Name'
            },
            companyAddress: {
                input: "What's your company's address?",
                summary: 'Company Address'
            },
            numberOfEmployees: {
                input: 'How many employees?',
                summary: 'Number of Employees'
            },
            jobTitle: {
                input: "What's your job title?",
                summary: 'Your Job Title'
            },
            firstName: {
                input: 'First name',
                summary: 'Your First Name'
            },
            lastName: {
                input: 'Last name',
                summary: 'Your Last Name'
            },
            email: {
                input: 'Enter your email address',
                summary: 'Your Email Address'
            },
            password: {
                input: 'Enter a strong password',
                summary: 'Your Password'
            },
        };

        if (!labels[label]) return "The engineer didn't code this label properly so here's a placeholder!";

        return stage === 3 ? labels[label].summary : labels[label].input;
    };

    const handleInput = (parentProp, childProp, inputValue) => {
        setRegForm((prev) => {
            return {
                ...prev,
                [parentProp]: {
                    ...prev[parentProp],
                    [childProp]: {
                        ...prev[parentProp][childProp],
                        value: inputValue
                    }
                }
            }
        })
    };

    const getLineWidth = () => {
        if (stage === 2) return 'w-1/2';
        if (stage === 3) return 'w-full';
        return 'w-0';
    }

    return (
        <div className='min-h-screen bg-wiseOffWhite bg-[url(/images/Dashboard-screenshot.png)]'>
            <div
                className={
                    `
                        grid grid-cols-5 min-h-screen place-content-start gap-10 pt-10
                        font-lato bg-wiseGrey1/70 backdrop-blur-[2px]
                    `
                }
            >
                <div
                    className={
                        ` 
                            progress-bar
                            relative flex justify-between items-center w-1/2 place-self-center  
                            col-span-3 col-start-2
                        `
                    }
                >
                    <div
                        className='absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-wiseGrey4/5 z-0'
                    />
                    <div
                        className={
                            `
                                absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-wiseRose3
                                transition-all duration-300 ease-in-out z-0 ${getLineWidth()}
                            `
                        }
                    />
                    {[1,2,3].map((step) => {
                        const isReached = stage >= step;
                        return (
                            <div
                                key={step}
                                onClick={() => setStage(step)}
                                className={`
                                        relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                                        cursor-pointer transition-all duration-300 text-2xl
                                        ${
                                            isReached
                                                ? 'bg-wiseRose3 text-white delay-150'
                                                : 'bg-wiseGrey5 text-wiseGrey4 delay-0'
                                        }
                                    `}
                            >
                                {step}
                            </div>
                        )
                    })}
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
                                    bg-wiseGrey5 grid grid-cols-1 gap-10 min-h-75/100
                                    mb-5 p-10 rounded-sm border border-wiseGrey4/25 
                                `
                            }
                        >
                            <h1
                                className={
                                    `
                                    text-center text-3xl w-6/10
                                    border-b-2 border-wiseRose3 place-self-center
                                    `
                                }
                            > 
                                Tell us about your company
                            </h1>
                            <div
                                className={
                                    `
                                        grid grid-cols-2 gap-10
                                    `
                                }
                            >
                                {Object.entries(regForm.companyData).map(([childKey, childValue]) => (
                                    <InputTile
                                        key={childKey}
                                        label={labelText(childKey)}
                                        inputValue={childValue.value}
                                        updateHandler={(value) => {
                                            handleInput(Object.keys(regForm)[0], childKey, value)
                                        }}
                                        customClass={{
                                            div: 'nth-3:col-span-2',
                                            label: 'admin-form-label',
                                            input: 'admin-form-control'
                                        }}
                                        type={childValue.inputType}
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
                                    text-3xl text-center col-span-2 w-5/10
                                    border-b-2 border-wiseRose3 place-self-center
                                    `
                                }
                            > 
                                Now tell us about you
                            </h1>
                            {Object.entries(regForm.userData).map(([childKey, childValue]) => (
                                <InputTile
                                    key={childKey}
                                    label={labelText(childKey)}
                                    inputValue={childValue.value}
                                    updateHandler={(value) => {
                                        handleInput(Object.keys(regForm)[1], childKey, value)
                                    }}
                                    customClass={{
                                        div: 'nth-4:col-span-2',
                                        label: 'admin-form-label',
                                        input: 'admin-form-control'
                                    }}
                                    type={childValue.inputType}
                                />
                        ))}
                            <div className='grid grid-cols-2 col-span-2'>
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
                    <div
                            className={
                                `
                                    col-start-2 col-span-9 grid
                                    ${stage === 3
                                        ? 'opacity-100'
                                        : 'hidden opacity-0'
                                    }
                                `
                            }
                    >
                        <div
                            className={
                                `
                                    bg-wiseGrey5 grid grid-cols-1 gap-10 max-h-85/100
                                    mb-5 p-10 rounded-sm border border-wiseGrey4/25 
                                `
                            }
                        >
                            <h1
                                className={
                                    `
                                    text-3xl text-center col-span-2 w-5/10
                                    border-b-2 border-wiseRose3 place-self-center
                                    `
                                }
                            > 
                                Review Your Input
                            </h1>
                            <div
                                className={
                                    `
                                        grid grid-cols-1 
                                        max-h-80/100 overflow-y-scroll
                                    `
                                }
                            >
                                {Object.entries(regForm).map(([parentKey, parentValue]) => (
                                    <div 
                                        key={parentKey}
                                        className={
                                            `
                                                grid grid-cols-1
                                                ${parentKey == 'companyData'
                                                    ? 'col'
                                                    : ''
                                                }
                                            `
                                        }
                                    >
                                        <h2
                                            className='
                                                w-full border border-wiseGrey4 bg-wiseGrey4/40
                                                text-md font-semibold text-center col-span-2 mb-5
                                            '
                                        >
                                            {parentKey === 'companyData'
                                                ? "Your Company's Details"
                                                : "Your Details"
                                            }
                                        </h2>
                                        <div
                                            className={
                                                `
                                                    w-full grid grid-cols-2 mb-12 gap-4
                                                    p-3 border border-wiseGrey4/25
                                                `
                                            }
                                        >
                                            {Object.entries(parentValue).map(([childKey, childValue]) => (
                                                <div 
                                                    key={childKey}
                                                    className={`
                                                            mb-4 grid grid-cols-1 gap-3
                                                            p-2 
                                                        `}
                                                >
                                                    <h3
                                                        className=' text-wiseGrey1/60 font-bold'
                                                    >
                                                        {labelText(childKey)}
                                                    </h3>
                                                    <p
                                                        className='
                                                            p-1 pl-2 border-l border-wiseGrey3/50 text-wiseRose3
                                                        '
                                                    >
                                                        {childValue.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-row justify-between -mt-30 col-span-2'>
                                <button 
                                    type='button'
                                    className={
                                        `
                                        button1-no-width
                                        w-20 h-10 text-center
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
                                        ${companyRegPending 
                                            ? `
                                                button1-loading
                                                w-20 h-10 text-center
                                                cursor-pointer                                                
                                            `
                                            : `
                                                button1-no-width
                                                w-20 h-10 text-center
                                                cursor-pointer                                           
                                            `
                                        }
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
        </div>
    )
}