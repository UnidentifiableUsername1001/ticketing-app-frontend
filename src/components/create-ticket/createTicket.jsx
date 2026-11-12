import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import Select  from 'react-select';
import { useCreateTicket } from "../../hooks/ticket-fetch/useTickets";
import { useGetDepartments } from "../../hooks/department-fetch/useDepartments";
import { useGetOneDepartment } from '../../hooks/department-fetch/useDepartments';
import { RenderFields } from "./sub-components/RenderFields";
import { useSearchParams } from "react-router";
import { useUploadAttachment } from "../../hooks/ticket-fetch/useTickets";
import { ToastContext } from "../../context/toast-notification/ToastContext";
import { style1 } from "../../hooks/assorted/react-select-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

function CreateTicket() {
    const { addToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: {
            bodyText: '',
            mentions: [],
            attachments: [],
        },
        customAttributes: []
    });

    // Evaluates to react-select object post-call of prepRenderFormState e.g. {label: <string>, value: {<ticketTypeObject>}}
    const [tickTypeToRender, setTickTypeToRender] = useState({})
    const [fetchedDept, setFetchedDept] = useState(null)
    const [selectedDeptTickets, setSelectedDeptTickets] = useState(null);
    const [deptId, setDeptId] = useState(null);
    const [bodyText, setBodyText] = useState(null);

    const { createTicket, isCreating, creationError, ticketErrorData, ticketSuccessData } = useCreateTicket();
    const { uploadFile, isUploading, uploadError } = useUploadAttachment();
    const { departments, departmentsPending, errorGetting } = useGetDepartments();
    const { deptData, deptPending, deptError } = useGetOneDepartment(deptId);

    // To make ticketTypes parsable by react-select
    const mappedTypesArray = async (dept) => {

        setDeptId(dept);

        setFetchedDept(deptData);

        const ticketTypes = deptData?.ticketTypes;

        if(ticketTypes && ticketTypes.length !== 0) {
            const mappedArray = ticketTypes.map((type) => ({
                label: type.typeName,
                value: type
            }));

            mappedArray.unshift({
                label: 'General Enquiry',
                value: {
                    typeName: 'General Enquiry',
                    fields: [
                    ]
                }
            });

            return setSelectedDeptTickets(mappedArray);
        };
    };

    const prepRenderFormState = (ticketTypeObj) => {

    if (!ticketTypeObj?.value) return;

        const defaultLeadingFields = [
            { name: 'title', 
                expectedType: 'String', 
                required: true, 
                toolTiptext: 'Placeholder text to illustrate the function of this element' 
            },
            { name: 'description', expectedType: 'Textarea', required: true, toolTiptext: 'Placeholder text to illustrate the function of this element'  }
        ];

        const defaultTrailingFields = [
            { name: 'file_upload', expectedType: 'fileUpload', required: true, toolTiptext: 'Placeholder text to illustrate the function of this element'  }
        ];

        const customFields = ticketTypeObj.value.typeName === 'General Enquiry'
            ? []
            : (ticketTypeObj.value.fields || []);

        const fieldsToRender = [
            ...defaultLeadingFields,
            ...customFields,
            ...defaultTrailingFields
        ];

        setTickTypeToRender({
            label: ticketTypeObj.label,
            value: {
                ...ticketTypeObj.value,
                fields: fieldsToRender
            }
        });

        setFormData(prev => ({
            ...prev,
            departmentId: fetchedDept?._id,
            ticketType: ticketTypeObj.value.typeName
        }));
    }


    const handleNormalChange = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setFormData({
            ...formData,
            [targetName]: targetValue
        });
    };

    const handleExplicitChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleCustAttrChange = (name, value) => {
        setFormData({
            ...formData,
            customAttributes: [
                ...formData.customAttributes,
                {
                    key: name,
                    value: value
                }
            ]
        });
    };

    const handleSubmit = async () => {
        try {

            let finalPayload;

            const parser = new DOMParser();
            const body = bodyText
            const parsedBody = parser.parseFromString(body, 'text/html'); 

            const idArr = parsedBody.querySelectorAll('[data-id]');
            const mentionIds = Array.from(idArr).map(node => node.getAttribute('data-id'));
            
            const filePromises = formData.description.attachments.map((file) => uploadFile(file));
            const completedFileArray = await Promise.all(filePromises);

            finalPayload = {
                ...formData,
                description: {
                    bodyText: bodyText,
                    mentions: mentionIds,
                    attachments: completedFileArray
                }
            };

            await createTicket(finalPayload);

            addToast({msg: `Ticket #${ticketSuccessData.ticketNumber} created!`, type: 'success'});
            navigate('/dashboard');

        } catch (e) {
            addToast({msg: e.message, type: 'error'});
            return console.error(e);
        }
    };

    const makeUpperCase = (string) => {
        return string.replace(string[0], string[0].toUpperCase());   
    }

    const [isFocused, setIsFocused] = useState(null);


    return (
        <div className='bg-wiseRose5/25 h-full min-w-275'>
            <div className={`transition-all grid grid-rows-[auto_1fr] gap-10 h-full py-5 mx-10`}>
                
                <div className='flex flex-row'>
                    <div>
                        <p
                            className={`
                                    font-lato text-sm text-wiseGrey3 mb-4
                                `}
                        >
                            Workspace / Create Issue
                        </p>
                        <h1 
                            className='font-lato font-extrabold text-wiseGrey1
                            text-4xl'>
                            Create Issue
                        </h1>
                        <p
                            className={`
                                    font-lato text- text-wiseGrey3 mt-2
                                `}
                        >
                            Choose a team and request type to route your issue correctly.
                        </p>
                    </div>
                </div>
                
                <div 
                    className={`
                        bg-white py-10 px-25 border border-wiseGrey4/20 rounded-2xl
                        grid grid-rows-[auto_1fr] h-fit relative
                    `}
                >
                    {fetchedDept && Object.keys(fetchedDept).length > 0 
                        ? (
                            <div
                                className={`
                                        absolute inset-7 flex flex-row font-lato gap-1 justify-items-center
                                        text-wiseRose3 hover:text-wiseRose2 h-fit w-fit p-2 cursor-pointer
                                        ${fetchedDept
                                            ? ''
                                            : 'hidden'
                                        }
                                    `}
                                onClick={() => {
                                    setFetchedDept(null)
                                    setTickTypeToRender(null)
                                }}
                                title="Previous page"
                            >
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className={`
                                            text-4xl  
                                        `}
                                />
                            </div>
                        )
                        : (<></>) 
                    }
                    <div 
                        className={`
                            grid grid-cols-3 gap-10 font-lato mt-15
                            
                            `}
                    >
                        {departments?.map((dept) => (
                            <div
                                key={departments?.indexOf(dept)}
                                onClick={() => mappedTypesArray(dept)}
                                className={
                                    `
                                        ${fetchedDept?.name === dept.name 
                                            ? 'opacity-100 bg-wiseRose4/15 col-span-3'
                                            : fetchedDept && Object.keys(fetchedDept).length > 0 
                                            ? 'hidden'
                                            : ''
                                        }
                                        cursor-pointer min-h-30 flex flex-col justify-center gap-2 p-4 rounded-lg transition-all duration-250
                                        bg-wiseRose4/15 hover:bg-wiseRose4/45 border border-wiseGrey4/15

                                    `
                                }
                                >
                                    <h2
                                        className={`
                                                font-lato font-semibold text-wiseRose3 text-xl
                                            `}
                                    >
                                        {dept.name}
                                    </h2>
                                    <p
                                        className={
                                            `
                                                text-wiseGrey2/80
                                            `
                                        }
                                    >
                                        {`Raise a request for ${dept.name} using the options provided`} 
                                    </p>
                            </div>
                        ))}
                    </div>
                    <div 
                        className={`
                            font-lato mt-15 flex flex-col shrink-0 gap-3
                                ${fetchedDept
                                    ? ''
                                    : 'hidden'
                                }
                        `}>
                        <div 
                            className={`
                                    font-semibold
                                    text-2xl mb-3 flex flex-row gap-3
                                `} 
                            htmlFor='ticketType'>
                            <span>Request Type: </span>
                            {tickTypeToRender && Object.keys(tickTypeToRender).length > 0
                                ? (
                                    <>
                                        
                                        <span
                                            className="text-wiseGrey3/80"
                                        >
                                            [ {tickTypeToRender.label} ]
                                        </span>
                                    </>
                                )
                                : (
                                    <>
                                    
                                    </>
                                )
                            }
                        </div>
                        <div
                            className={`
                                    flex flex-col gap-3 shrink-0

                                `}
                        >

                            <Select 
                                unstyled
                                classNames={style1}
                                options={selectedDeptTickets}
                                value={tickTypeToRender}
                                onChange={(selectedOption) => prepRenderFormState(selectedOption)}
                            />
                        </div>
                    </div>

                    <div className={`
                            grid grid-cols-1 mt-10 gap-10
                        `}>
                        {tickTypeToRender?.value?.fields?.map((field, index) => (
                            <>
                                <div key={index} className="grid grid-cols-1 gap-3">
                                    <div
                                        className="flex flex-row gap-2"
                                    >
                                        <label 
                                            htmlFor={field.name} 
                                            className="
                                                admin-form-label
                                                flex flex-row
                                            ">
                                                {field.name == 'file_upload' 
                                                    ? 'Attachments' 
                                                    : makeUpperCase(field.name)}
                                                {
                                                    field.required ? (
                                                        <span
                                                            className="text-red-600"
                                                        >
                                                            *
                                                        </span>
                                                    ) : (<></>)
                                                }

                                        </label>
                                        {field.toolTiptext ? (
                                            <div
                                                className={`
                                                        relative
                                                    `}
                                            >
                                                <FontAwesomeIcon
                                                    onMouseEnter={() => setIsFocused(index)}
                                                    onMouseLeave={() => setIsFocused(null)} 
                                                    icon={faCircleQuestion} 
                                                    
                                                />
                                                <p
                                                    className={`
                                                        absolute transition-all delay-300 duration-200
                                                        bg-white shadow-md border border-wiseGrey4/50
                                                        bottom-0 left-8 font-lato
                                                        p-4 min-w-50 min-h-25
                                                            ${isFocused === index
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                            }
                                                        `}
                                                >
                                                    {field.toolTiptext}
                                                </p>
                                            </div>
                                        ) : (<></>) }

                                    </div>
                                    <RenderFields
                                        formData={formData}
                                        formStateFunc={setFormData}
                                        bodyTextState={setBodyText}
                                        field={field}
                                        updateHandlerNormal={handleNormalChange}
                                        updateHandlerCustom={handleCustAttrChange}
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                    <div className='flex flex-row justify-end mt-10'>
                        <button 
                            type='button'
                            onClick={() => handleSubmit()}
                            disabled={isUploading || isCreating} 
                            className={`
                                button1-no-width w-30
                                ${fetchedDept
                                    ? ''
                                    : 'hidden'
                                }
                            `}>
                                {isUploading || isCreating ? 'Saving...' : 'Finish'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTicket;