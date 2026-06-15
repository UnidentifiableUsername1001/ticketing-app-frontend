import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export function AddTicketType ({appendTypeFunc, showTicketTypeForm}) {

    const [newTicketType, setNewTicketType] = useState({
        typeName: '',
        fields: [{
            name: '',
            expectedType: '',
            dataSource: '',
            required: null
        }]
    });

    const addNewField = () => {
        const currentState = [...newTicketType.fields, {
            name: '',
            expectedType: '',
            dataSource: '',
            required: null          
        }];

        setNewTicketType({
            ...newTicketType,
            fields: currentState
        })
    };

    const removeField = (fieldIndex) => {
        const fieldsCopy = [...newTicketType.fields];
        const filteredCopy = fieldsCopy.filter((field) => fieldsCopy.indexOf(field) !== fieldIndex);
        setNewTicketType({
            ...newTicketType,
            fields: filteredCopy
        });
    };

    const handleFieldChange = (targetIndex, inputName, inputValue) => {
        const currentFieldsArray = newTicketType.fields.map((field, index)  => {
            if (index === targetIndex) {
                const newFieldObj = {...field, [inputName]: inputValue};
                return newFieldObj;
            };
            return field;
        });

        setNewTicketType({
            ...newTicketType,
            fields: currentFieldsArray
        });
    };

    const handleSubmit = () => {
        appendTypeFunc(newTicketType);
        setNewTicketType({
            typeName: '',
            fields: [{
                name: '',
                expectedType: '',
                dataSource: '',
                required: null
            }]
        });
        showTicketTypeForm(false);
    }

    return (
        <div>
            <div className='grid grid-cols-1 gap-2 mb-10'>
                <label htmlFor='typeName' className='admin-form-label'>Ticket Type Name:</label>
                <input
                    className='admin-form-control'
                    type='text'
                    name='typeName'
                    value={newTicketType.typeName}
                    onChange={(e) => setNewTicketType({...newTicketType, [e.target.name]: e.target.value})}
                    placeholder='E.g. Kit-list ammendments'
                />
            </div>
            {newTicketType.fields.map((field, index) => (
                <div key={index} className='grid grid-cols-1 gap-10'>
                    <div className='grid grid-cols-1 gap-2'>
                        <label className='admin-form-label' htmlFor={field.name}>Field Title:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='name'
                            placeholder='E.g. Select the equipment'
                            value={field.name}
                            onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label className='admin-form-label' htmlFor={field.expectedType}>Expected Type:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='expectedType'
                            placeholder='E.g. String, Array, Number, Boolean'
                            value={field.expectedType}
                            onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label className='admin-form-label' htmlFor={field.dataSource}>Data Source:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='dataSource'
                            placeholder="E.g. 'ALL_KIT' or 'KIT_BY_ID'"
                            value={field.dataSource}
                            onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                    </div>
                    <div className='grid grid-cols-1 gap-2 border-b border-wiseSkin'>
                        <label className='admin-form-label' htmlFor={field.required}>Required:</label>
                        <div className='grid grid-cols-5 '>
                            <div className=''>
                                <label>True</label>
                                <input
                                    className='ml-3'
                                    type='radio'
                                    name='required'
                                    value={true}
                                    onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                            </div>
                            <div className=''>
                                <label>False</label>
                                <input
                                    className='ml-3'
                                    type='radio'
                                    name='required'
                                    value={false}
                                    onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-evenly'>
                        {index === newTicketType.fields.length - 1 ? (
                        <button 
                            type='button' 
                            onClick={addNewField} 
                            className='nav-item'
                            title='Add New Field'>
                                <FontAwesomeIcon icon={faSquarePlus}/>
                        </button>
                        ) : (
                            <></>
                        )}
                        <button 
                            type='button' 
                            onClick={() => removeField(index)}
                            className='nav-item'
                            title='Delete Field'>
                                <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </div>
            ))}
            <div className='grid justify-items-stretch'>
                <button 
                    type='button' 
                    onClick={handleSubmit}
                    className='admin-form-button mt-10 mb-10 justify-self-center'>
                        Save Ticket Type
                </button>
            </div>
        </div>

    )
}