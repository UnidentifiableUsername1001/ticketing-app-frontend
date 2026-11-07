import React, { Fragment, useState } from 'react';
import { useCompanyRegistration } from '../../hooks/registration/useCompanyRegistration';
import { InputTile } from './sub-components/InputTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


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

    const navigate = useNavigate();

    const [stage, setStage] = useState(1);

    const { 
        companyRegFunc, 
        companyRegError, 
        companyRegPending, 
        companyRegSuccess, 
        companyErrorData 
    } = useCompanyRegistration();

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
        <div className='h-full bg-wiseRose5/25'>
            <div
                className='grid grid-rows-[auto_1fr] pt-5 mx-auto max-w-400'
                
            >
                <div
                    className="
                        flex flex-col mb-6 min-w-135
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
                                    font-lato gap-1 text-4xl -ml-3 mb-2
                                    text-wiseRose3 hover:text-wiseRose2 h-fit w-fit p-2 cursor-pointer
                                `}
                            onClick={() => navigate('/homepage')}
                        />
                    </h1>
                    <h2 
                        className="
                            font-lato text-wiseGrey1 mb-2
                            text-3xl font-extrabold">
                        Set your team up for success.
                    </h2>
                    <p
                        className="
                            font-lato text-wiseGrey3
                        "
                    >
                        We're looking forward to helping you build a Wise team!
                    </p>
                </div>
            
                <div
                    className={
                        `
                            lg:grid lg:grid-cols-[auto_1fr]
                            grid grid-cols-1
                            font-lato gap-10
                        `
                    }
                >

                    {/* 
                    =====================
                    Progress Bar Section
                    =====================
                    */}
                    <div
                        className={
                            ` 
                                progress-section bg-white rounded-3xl p-10
                                lg:min-w-50 lg:flex lg:flex-col gap-7 h-fit text-sm
                                flex flex-row min-w-135 justify-evenly border border-wiseGrey4/30
                            `
                        }
                    >
                        <div
                            className='
                                w-full
                            '
                        >
                            <h3
                                onClick={() => setStage(1)}
                                className={`
                                         p-2 rounded-xl lg:-ml-3
                                         transition-all duration-150
                                         hover:bg-wiseRose4 cursor-pointer
                                        ${stage === 1
                                            ? 'bg-wiseRose4/60'
                                            : 'bg-wiseRose5'
                                        }
                                    `}
                            >
                                1. Your company
                            </h3>
                            
                        </div>
                        <div
                            className='
                            w-full
                            '
                        >
                            <h3
                                onClick={() => setStage(2)}
                                className={`
                                         p-2 rounded-xl lg:-ml-3 transition-all duration-150
                                         hover:bg-wiseRose4 cursor-pointer
                                        ${stage === 2
                                            ? 'bg-wiseRose4/60'
                                            : 'bg-wiseRose5'
                                        }
                                    `}
                            >
                                2. About you
                            </h3>
                            
                        </div>
                        <div
                            className='w-full'
                        >
                            <h3
                                onClick={() => setStage(3)}
                                className={`
                                         p-2 rounded-xl lg:-ml-3
                                         transition-all duration-150
                                         hover:bg-wiseRose4 cursor-pointer
                                        ${stage === 3
                                            ? 'bg-wiseRose4/60'
                                            : 'bg-wiseRose5'
                                        }
                                    `}
                            >
                                3. Review
                            </h3>
                            
                        </div>

                    </div>
                    <div
                        className={
                            `
                                bg-white rounded-3xl p-10
                                border border-wiseGrey4/30 
                            `
                        }
                    >
                        <div 
                            className={`
                                    
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
                                        flex flex-col gap-8 
                                    `
                                }
                            >
                                <h1
                                    className={
                                        `
                                        text-2xl font-bold
                                        `
                                    }
                                > 
                                    Tell us about your company
                                </h1>
                                <div
                                    className={
                                        `
                                            flex flex-col gap-10 px-4
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
                                                div: 'flex flex-col gap-3',
                                                label: 'font-lato text-wiseGrey1 font-semibold',
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
                                        w-40 h-10 text-center place-self-end
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
                                    ${stage === 2 ? 
                                        'opacity-100' : 
                                        'hidden opacity-0'}
                                    `}
                        >
                            <div 
                                className={
                                    `
                                        flex flex-col gap-5 
                                    `
                                }
                            >
                                <h1
                                    className={
                                        `
                                            text-2xl font-bold
                                        `
                                    }
                                > 
                                    Now tell us about you
                                </h1>
                                <div
                                    className='
                                        grid grid-cols-2 gap-5 mb-4 px-4
                                        
                                    '
                                >
                                    {Object.entries(regForm.userData).map(([childKey, childValue]) => (
                                        <InputTile
                                            key={childKey}
                                            label={labelText(childKey)}
                                            inputValue={childValue.value}
                                            updateHandler={(value) => {
                                                handleInput(Object.keys(regForm)[1], childKey, value)
                                            }}
                                            customClass={{
                                                div: 'flex flex-col gap-3 nth-[n+3]:col-span-2',
                                                label: 'admin-form-label',
                                                input: 'admin-form-control'
                                            }}
                                            type={childValue.inputType}
                                        />
                                    ))}
                                </div>
                                    
                                <div className='grid grid-cols-2 col-span-2'>
                                    <button 
                                        type='button'
                                        className={
                                            `
                                            button2-no-width
                                            place-self-start w-40 h-10 text-center
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
                                            w-40 h-10 text-center
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
                                        font-lato
                                        ${stage === 3
                                            ? ''
                                            : 'hidden '
                                        }
                                    `
                                }
                        >
                            <div
                                className={
                                    `

                                    `
                                }
                            >
                                <h1
                                    className={
                                        `
                                            text-2xl font-extrabold mb-6
                                        `
                                    }
                                > 
                                    Review Your Input
                                </h1>
                                <div
                                    className={
                                        `
                                            flex flex-col gap-4 px-4
                                        `
                                    }
                                >
                                    {Object.entries(regForm).map(([parentKey, parentValue]) => (
                                        <div 
                                            key={parentKey}
                                            className={
                                                `
                                                    
                                                    ${parentKey == 'companyData'
                                                        ? ''
                                                        : 'pt-4'
                                                    }
                                                `
                                            }
                                        >
                                            <h2
                                                className='
                                                    text-lg  font-bold mb-6
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
                                                        w-full  
                                                        grid grid-cols-2 gap-4 px-4
                                                    `
                                                }
                                            >
                                                {Object.entries(parentValue).map(([childKey, childValue]) => (
                                                    <div 
                                                        key={childKey}
                                                        className={`
                                                                grid grid-cols-1 gap-2
                                                                ${childKey === 'companyAddress'
                                                                    ? 'col-span-2'
                                                                    : ''
                                                                }
                                                                 
                                                            `}
                                                    >
                                                        <h3
                                                            className={`
                                                                    text-wiseGrey1/60 font-bold
                                                                    ${childKey === 'password'
                                                                    ? 'hidden'
                                                                    : ''
                                                                    } 
                                                                `}
                                                        >
                                                            {labelText(childKey)}
                                                        </h3>
                                                        <p
                                                            className={`
                                                                text-wiseRose3 font-semibold text-sm
                                                                bg-wiseRose5 p-2 rounded-xl min-h-10
                                                                ${childKey === 'password'
                                                                    ? 'hidden'
                                                                    : ''
                                                                } 
                                                            `}
                                                        >
                                                            {childValue.value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex flex-row justify-between mt-8'>
                                    <button 
                                        type='button'
                                        className={
                                            `
                                            button2-no-width
                                            w-40 h-10 text-center
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
                                                    w-40 h-10 text-center
                                                    cursor-pointer                                                
                                                `
                                                : `
                                                    button1-no-width
                                                    w-40 h-10 text-center
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
        </div>
    )
}