import React, {useState} from 'react';
import Select from 'react-select';
import { useEditDepartment } from '../../../../hooks/department-fetch/useEditDepartment';
import { useGetDepartments } from '../../../../hooks/department-fetch/useGetDepartments';
import { useGetOneDepartment } from '../../../../hooks/department-fetch/useGetOneDepartment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function EditDepartment() {
    
    const departments = useGetDepartments();
    const [targetDeptId, setTargetDeptId] = useState({});
    const { targetDepartment } = useGetOneDepartment(targetDeptId);

    const [formData, setFormData] = useState({...targetDepartment});

    const submitHandler = useEditDepartment(formData, setFormData, targetDeptId);

    const updateHandler = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setFormData({
            ...formData,
            [targetName]:targetValue
        });
    };

    const [showForm, setShowForm] = useState(false);

    return (
        <div className='top-div grid grid-cols-1 gap-10 font-lato'>
            <button type='button' className='form-dropDown-button' onClick={() => setShowForm(!showForm)}>
                <div className='width-full flex flex-row justify-between relative z-10'>
                    <span className=''>Edit Departments</span>
                    <span className=''>
                        {showForm === false ? 
                            <><FontAwesomeIcon icon={faChevronDown}/></> 
                            : 
                            <><FontAwesomeIcon icon={faAngleUp}/></>}
                    </span>
                </div>
            </button>
            <div className={` 
                    ${showForm ? 'block opacity-100' : 'hidden opacity-0'}
                    transition-all bg-wiseNavy shadow-wiseSkin shadow-sm p-7 rounded-md outline-1 outline-wiseSkin
                `}>
                <form onSubmit={submitHandler} className='grid grid-cols-7 gap-10 text-wiseOffWhite'>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='selectUser'>Select a Department:</label>
                        <Select
                            className='text-wiseNavy'
                            value={targetDeptId}
                            options={departments}
                            onChange={(selectedOption) => setTargetDeptId(selectedOption)} />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='firstName'>Department Name - <span className='text-wiseDarkPink'>Current: {targetDepartment ? targetDepartment.name : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={updateHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='lastName'>Last Name - <span className='text-wiseDarkPink'>Current: {user ? user.lastName : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='lastName'
                            value={updateFormData.lastName}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='jobTitle'>Job title - <span className='text-wiseDarkPink'>Current: {user ? user.jobTitle : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='jobTitle'
                            value={updateFormData.jobTitle}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='email'>Email - <span className='text-wiseDarkPink'>Current: {user ? user.email : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='email'
                            value={updateFormData.email}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='password'>Password Reset Required?</label>
                        <input
                            className='admin-form-control'
                            type='checkbox'
                            name='password'
                            value={updateFormData.passwordResetRequired}
                            onChange={updateEventHandler}
                        />
                    </div>
                     <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='department'>Department:</label>
                        <Select
                            className='text-wiseNavy'
                            value={updateFormData.departmentId}
                            options={departments}
                            onChange={(selectedOption) => handleExplicitChange('departmentId', selectedOption)} />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='role'>Permission Level - <span className='text-wiseDarkPink'>Current: {user ? user.role : ""}</span></label>
                        <div>
                            <Select
                                className='text-wiseNavy'
                                value={updateFormData.role}
                                options={roleOptions}
                                onChange={(selectedOption) => handleExplicitChange('role', selectedOption)} />
                        </div>
                    </div>
 
                 <button type='submit' className='cursor-pointer col-start-3 col-span-3 text-center'>Update Details</button>
                </form>
            </div>
        </div>
    )
}