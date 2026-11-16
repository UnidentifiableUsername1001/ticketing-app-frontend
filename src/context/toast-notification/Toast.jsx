import { faTriangleExclamation, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export const Toast = ({ id, msg, type, duration = 3000, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), duration);
    }, [id, duration, onClose])

    return (
        <div className={`
            toast toast-${type}
            px-5 py-2 text-center rounded-sm border
            shadow-lg font-lato text-lg w-full flex flex-row gap-1 relative
            ${type === 'success'
                ? `
                    border-wiseRose4 bg-wiseGrey5
                `
                : `
                    border-red-700 
                `
            }
        `}>
            {type === 'success'
                ? (
                    <FontAwesomeIcon
                        icon={faTrophy}
                        className={`
                                self-center 
                                text-wiseRose3
                            `}
                    />
                )
                : (
                    <>
                        <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            className={`
                                    self-center text-red-700
                                `}
                        />
                    </>
                )
            }
            <span
                className={`
                        ${type === 'success'
                            ? `
                                text-wiseGrey2 font-[650]
                            `
                            : `
                                text-wiseGrey2 font-[650]
                            `
                        }
                    `}
            >
                {msg}
            </span>
            
        </div>
    );
};