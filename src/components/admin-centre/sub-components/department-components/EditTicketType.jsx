import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { expectedTypeMapping, dataSources } from '../../../../hooks/assorted/ticketConstants';
import Select from 'react-select';
import { style1 } from '../../../../hooks/assorted/react-select-styles';

export function EditTicketType ({appendTypeFunc, showTicketState, currentTicket, index}) {

    const [editTicketType, setEditTicketType] = useState(currentTicket);

    const addNewField = () => {
        const currentState = [...editTicketType.fields, {
            name: '',
            expectedType: '',
            dataSource: '',
            required: null          
        }];

        setEditTicketType({
            ...editTicketType,
            fields: currentState
        })
    };

    const removeField = (fieldIndex) => {
        const fieldsCopy = [...editTicketType.fields];
        const filteredCopy = fieldsCopy.filter((field) => fieldsCopy.indexOf(field) !== fieldIndex);
        setEditTicketType({
            ...editTicketType,
            fields: filteredCopy
        });
    };

    const handleFieldChange = (targetIndex, inputName, inputValue) => {
        const currentFieldsArray = editTicketType.fields.map((field, index)  => {
            if (index === targetIndex) {
                const newFieldObj = { ...field, [inputName]: inputValue};
                return newFieldObj;
            };
            return field;
        });

        setEditTicketType({
            ...editTicketType,
            fields: currentFieldsArray
        });
    };

    const handleSubmit = () => {
        appendTypeFunc(editTicketType, index);
        showTicketState(null);
    }

    return (
        <div
            className='
                flex flex-col gap-10 px-4
            '
        >
            <div className='grid grid-cols-1 gap-2 w-200'>
                <label htmlFor='typeName' className='admin-form-label'>
                    Request Name
                </label>
                <input
                    className='admin-form-control'
                    type='text'
                    name='typeName'
                    value={editTicketType.typeName}
                    onChange={(e) => setEditTicketType({...editTicketType, [e.target.name]: e.target.value})}
                    placeholder='E.g. Kit-list ammendments'
                />
            </div>
            <div className='flex flex-col gap-4 -mb-6'>
                <h2 htmlFor='typeName' className='admin-form-label text-xl'>
                    Set Custom Fields
                </h2>
                <p
                    className='
                        text-wiseGrey3 flex flex-col gap-2
                    '
                >
                    <span>
                        Custom fields outline what data this request type should include
                    </span>    
                    <span
                        className='italic font-bold text-wiseRose3'
                    >
                        *All request types come with a title, description and file upload field as default.
                    </span>
                </p>
            </div>
            {editTicketType.fields.map((field, index) => (
                <div key={index} className='
                    flex flex-row gap-10 border border-wiseGrey4/40 shadow-lg p-5
                    rounded-xl relative pt-10 w-200
                '>
                    <div
                        className='
                            flex flex-col flex-1 gap-5 
                        '
                    >
                        <div
                            className='
                                flex flex-row justify-between
                            '
                        >
                            <h1 
                                className='
                                    font-bold text-2xl text-wiseGrey2
                                    col-span-2 
                                '>
                                {editTicketType.fields[index].name}
                            </h1>  
                        </div>
                        
                        <div className='grid grid-cols-1 gap-2 col-span-2 '>
                            <label className='admin-form-label' htmlFor={field.name}>Title</label>
                            <input
                                className='admin-form-control'
                                type='text'
                                name='name'
                                placeholder='E.g. Select the equipment'
                                value={field.name}
                                onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label className='admin-form-label' htmlFor={field.expectedType}>Expected Data Type</label>
                            <Select
                                unstyled
                                classNames={style1}
                                value={expectedTypeMapping.find(option => option.value === field.expectedType) || null}
                                options={expectedTypeMapping}
                                onChange={(selectedOption) => handleFieldChange(index, 'expectedType', selectedOption ? selectedOption.value : '')} />
                        </div>
                        {editTicketType.fields[index].expectedType === 'Dropdown'
                            ? (
                                <div className='grid grid-cols-1 gap-2'>
                                    <label className='admin-form-label' htmlFor={field.dataSource}>Data Source</label>
                                    <Select
                                        unstyled
                                        classNames={style1}
                                        value={dataSources.find(option => option.value === field.dataSource) || null}
                                        options={dataSources}
                                        onChange={(selectedOption) => handleFieldChange(index, 'dataSource', selectedOption ? selectedOption.value : '')} />
                                </div>
                            )
                            : (
                                <></>
                            )
                        }
                        
                        <div className='grid grid-cols-1 gap-2'>
                            <label className='admin-form-label' htmlFor={field.required}>
                                Required
                            </label>
                            <Select
                                unstyled
                                classNames={style1}
                                onChange={(option) => handleFieldChange(index, option.label, option.value)}
                                options={[
                                    {
                                        label: 'Yes',
                                        value: true
                                    },
                                    {
                                        label: 'No',
                                        value: false
                                    }
                                ]}
                            
                            />
                        </div>
                    </div>
                    <div className='
                        absolute right-3 top-3
                    '>
                        { editTicketType.fields.length !== 1 ? (
                        <button 
                            type='button' 
                            onClick={() => removeField(index)}
                            className='
                                text-2xl text-wiseRose3 hover:text-wiseRose4 cursor-pointer
                                transition-all duration-150
                            '
                            title='Delete Field'>
                                <FontAwesomeIcon icon={faTrash}/>
                        </button>
                        ) : (
                            <></>
                        )}
                    </div>  
                </div>
            ))}
            <div
                className='
                    w-200 flex flex-col
                '
            >
                <button 
                    type='button' 
                    onClick={addNewField} 
                    className=' 
                        text-4xl text-wiseRose3 hover:text-wiseRose4 cursor-pointer
                        transition-all duration-150 w-fit self-center
                    '
                    title='Add New Field'>
                        <FontAwesomeIcon 
                            icon={faSquarePlus}
                            className='
                                px-3 
                            '
                        />
                </button>
            </div>
            
            <div className='
                flex flex-row gap-2 justify-end
            '>
                <button 
                    type='button' 
                    onClick={() => {
                        setEditTicketType(currentTicket);
                        showTicketState(false)
                    }}
                    className='
                        w-20 rounded-lg font-bold hover:bg-wiseGrey4/60
                        transition-all duration-150 cursor-pointer
                    '>
                        Cancel
                </button>
                <button 
                    type='button' 
                    onClick={handleSubmit}
                    className='
                        button1-no-width
                        font-bold w-40
                    '>
                        Add Request Type
                </button>
            </div>
        </div>

    )
}