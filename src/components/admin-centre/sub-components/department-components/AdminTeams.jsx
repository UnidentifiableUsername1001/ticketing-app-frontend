import { useState, useEffect, useRef } from 'react'
import { CreateDepartment } from './createDepartment';
import { EditDepartment } from './editDepartment';
import { useGetDepartments } from '../../../../hooks/department-fetch/useDepartments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export function AdminTeams() {
    const { departments, departmentsPending, errorGetting } = useGetDepartments();
    const [selectedDept, setSelectedDept] = useState();
    const [selectedReqType, setSelectedReqType] = useState()
    const activeDept = selectedDept ?? departments?.[0];
    const [bulkTypes, setBulkTypes] = useState([]);
    const [formOverlay, setFormOverlay] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [allSelected, setAllSelected] = useState(false);
    const containerRef = useRef(null);
    const actions = [
        {
            title: 'Edit',
            function: () => {
                setFormOverlay('edit');
                setIsFocused(false);
            }
        },
        {
            title: 'Delete',
            function: async (user) => {
                try {
                    await deleteUser(user);
                    addToast({msg: "User deleted!", type: "success"});
                    setIsFocused(false);
                } catch (e) {
                    console.error(e);
                    addToast({msg: e.message, type: "error"});
                }
            }
        },
    ]

    const selectAll = () => {
        if(allSelected) {
            setAllSelected(!allSelected);
            setBulkTypes([]); 
        } else {
            setAllSelected(!allSelected);
            setBulkTypes(departments);
        }
        
    }

    const singleCheckSelect = (type) => {
        let arrayCopy = [...bulkTypes];
        
        if(allSelected || arrayCopy.includes(type)) {
            setAllSelected(false);
            return setBulkTypes(arrayCopy.toSpliced(arrayCopy.indexOf(type), 1));
        };

        arrayCopy.push(type);

        return setBulkTypes(arrayCopy);
    };

    const hamburgerClick = (type) => {
        setSelectedReqType(type);
        setIsFocused(true);  
    };

    useEffect(() => {

        if(!isFocused) return

        function handlePointerDown(event) {
            if (containerRef && !containerRef.current.contains(event.target)) {
                setIsFocused(false)
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);

        return () => document.removeEventListener('pointerdown', handlePointerDown)

    }, [isFocused])

    return (
        <div 
            className='
                h-full min-h-0 grid grid-cols-[auto_1fr]
                relative font-lato mr-10 border border-wiseGrey4/25 bg-white rounded-2xl 
        '>
            <div
                className={`
                        p-5 min-w-75 flex flex-col gap-10 min-h-0 max-h-full
                    `}
            >
                <div
                    className='
                        flex flex-row justify-between shrink-0
                    '
                >
                    <h2
                        className='
                            font-bold text-xl
                        '
                    >
                        Active Teams
                    </h2>
                    <button
                        type='button'
                        title='Add Department'
                        onClick={() => setFormOverlay('new')}
                        className='
                            text-[26px] text-center text-wiseRose3
                            transition-all duration-150 flex
                            hover:text-wiseRose3/75 cursor-pointer
                          
                        '
                    >
                        <FontAwesomeIcon icon={faCirclePlus}/>
                    </button>
                </div>
                <div
                    className={`
                            flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto
                        `}
                >
                    {departments?.map((dept, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedDept(dept)}
                            className={`
                                     py-2.5 px-4 rounded-[10px] cursor-pointer
                                    hover:bg-wiseRose4 tranition-all duration-150
                                    ${activeDept?._id === dept?._id
                                        ? `
                                            bg-wiseRose4
                                        `
                                        : `
                                            bg-wiseRose4/25
                                        `
                                    }
                                `}
                        >
                            <h3
                                className='
                                    font-semibold
                                '
                            >
                                {dept.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={`
                        bg-whitepy-5 px-8 py-5
                        min-h-0 max-h-full flex flex-col gap-10
                    `}
            >
                <div
                    className='
                        flex flex-col gap-2 shrink-0
                    '
                >
                    <h3
                        className='
                            font-bold text-xl
                        '
                    >
                        {activeDept?.name}
                    </h3>
                    <p
                        className='
                            text-wiseGrey3
                        '
                    >
                        Manage the team and its request categories.
                    </p>
                </div>
                <div
                    className='
                        flex flex-row justify-between shrink-0               
                    '
                >
                    <h3
                        className='
                            font-bold text-lg
                        '
                    >
                        Request Types
                    </h3>
                    <button
                        onClick={() => setFormOverlay('requestType')}
                        className='
                            button1-no-width font-bold
                        '
                    >
                        + Add Request Type
                    </button>
                </div>
                <div
                    className='
                        border border-wiseGrey4/25 h-full
                    '
                >
                    <table
                        className='w-full text-left border-collapse'
                    >
                        <thead
                            className='bg-wiseRose4/25 sticky'
                        >
                            <tr
                                className='text-wiseGrey3 font-lato *:shrink-0'
                            >
                                <th
                                    className='
                                        px-4 py-2 flex flex-row gap-3 w-40
                                    '
                                >
                                    <input
                                        type='checkbox'
                                        checked={allSelected}
                                        className=' w-5 h-5 accent-wiseRose4'
                                        onChange={() => selectAll()}
                                    />
                                    Select All
                                </th>
                                <th
                                    className='
                                        px-3 py-2
                                    '
                                >
                                    Request Name
                                </th>
                                <th
                                    className='
                                        px-3 py-2
                                    '
                                >
                                    Custom Fields  
                                </th>
                                <th
                                    className='
                                        px-3 py-2
                                    '
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className='overflow-y-auto'
                            ref={containerRef}
                        >
                            {activeDept?.ticketTypes?.length !== 0 ? (
                                <>
                                    {activeDept?.ticketTypes?.map((type, index) => (
                                        <tr key={index}  
                                            className={`
                                                border-b-2 border-wiseGrey4/35 
                                                *:shrink-0 transition-all
                                                ${bulkTypes?.includes(type) || allSelected
                                                    ? 'bg-wiseRose3/20'
                                                    : ''
                                                }
                                            `}
                                            >
                                            <td className='py-4 px-4'>
                                                <input
                                                    type='checkbox'
                                                    checked={allSelected || bulkTypes.includes(type)}
                                                    className='
                                                            
                                                        w-5 h-5 accent-wiseRose4
                                                    '
                                                    onChange={() => singleCheckSelect(type)}
                                                />
                                            </td>
                                            <td 
                                                className='
                                                    py-2 px-3
                                                    font-semibold         
                                            '>
                                                {type.typeName}
                                            </td>
                                            <td className='py-2 px-3 flex flex-row gap-1'>
                                                {type.fields.map((field, index) => (
                                                    <span
                                                        key={index}
                                                        className='
                                                            text-wiseGrey2
                                                        '
                                                    >
                                                        {field.name}
                                                        {type.fields.length === index + 1
                                                            ? ''
                                                            : ' ,'
                                                        }
                                                    </span>
                                                ))}
                                            </td>
                                            <td 
                                                className='py-2 px-3 relative'
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBars}
                                                    onClick={() => hamburgerClick(type)}
                                                    className='
                                                        cursor-pointer transition-all hover:scale-110
                                                        text-wiseGrey1
                                                    ' 
                                                />
                                                <div
                                                    className={`
                                                        absolute bg-white border border-wiseGrey4/30 shadow-md z-50
                                                        flex flex-col rounded-md min-w-fit left-8 top-5
                                                        ${isFocused && selectedReqType?.typeName === type?.typeName
                                                            ? ''
                                                            : 'hidden'
                                                        }
                                                    `}
                                                >
                                                    {actions.map((action, index) => (
                                                        <p 
                                                            key={index}
                                                            onClick={() => action.function(type)}
                                                            className='
                                                                border-b border-wiseGrey4/40 hover:bg-wiseRose5
                                                                p-2 transition-all cursor-pointer text-sm font-semibold
                                                            '
                                                        >
                                                            {action.title}
                                                        </p>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>    
                                ) : (<>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className='py-10'>No tickets to show in this view</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}