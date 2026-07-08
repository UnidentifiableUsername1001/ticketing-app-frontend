import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';

export function FileUpload ({fieldName, formData, formStateFunc}) {

    const inputRef = useRef(null);

    function setFiles (e) {
        const files = e.target.files;

        const filesArray = Array.from(files);

        formStateFunc({
            ...formData,
            description: {
                ...formData.description,
                attachments: filesArray
            }
        });
    };

    function deleteFile (index) {
        const filesArray = [...formData.description.attachments];

        const filteredArray = filesArray.filter((file) => filesArray.indexOf(file) !== index);

        formStateFunc({
            ...formData,
            description: {
                ...formData.description,
                attachments: filteredArray
            }
        });

        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.type = 'text';
            inputRef.current.type = 'file';
        };
    };

    function pdfOrImage(file) {

        let src;
        const type = file.type;

        switch (true) {
            case type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return src = '/images/DOCX_image.png';
            case type === 'application/pdf':
                return src = '/images/PDF_image.jpg';
            case type === 'text/csv':
            case type === 'application/vnd.ms-excel':
            case type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return src = '/images/Excel_image.jpg';
            case type === 'image/jpeg':
            case type === 'image/png':
            case type === 'image/webp':
            case type === 'image/gif':
            case type === 'image/svg+xml':
            case type === 'image/bmp':
            case type === 'image/x-icon':
            case type === 'mage/vnd.microsoft.icon':
            case type === 'image/apng':
                return src = URL.createObjectURL(file);
            default:
                return src = '/images/Generic_File.jpg' 
        };

        return src;
    }

    return (
        <>
            <label htmlFor='file-upload' 
                className='cursor-pointer p-1 border border-dashed border-bgMain/20
                text-center font-lato rounded-sm 
                transition hover:border-bgMain
                w-1/5'>
                    Choose a File <span><FontAwesomeIcon icon={faArrowUpFromBracket}/></span>
            </label>
            <input
                type="file"
                ref={inputRef}
                name={fieldName}
                onChange={(e) => setFiles(e)}
                multiple
                id="file-upload"
                className="sr-only"
            />
            {formData.description.attachments.length !== 0 && formData.description.attachments !== undefined ? (
                <div className="grid grid-cols-3 gap-5">
                    {formData.description.attachments.map((file, index) => (
                        <>
                            <div key={index} className="shadow-lg relative group grid grid-cols-1 border-6 border-gray-200">
                                <img 
                                    title={file.name}
                                    src={pdfOrImage(file)}
                                    className="w-full h-32 object-cover"
                                    />
                                <p className="bg-gray-200 p-2 text-sm font-lato font-medium absolute bottom-0 w-full">{file.name}</p>
                                <button 
                                    type="button"
                                    onClick={() => deleteFile(index)}
                                    className="absolute bg-wiseOffWhite p-2 opacity-0 cursor-pointer border border-gray-300 hover:bg-gray-300 shadow-lg rounded-bl-lg top-0 right-0 transition duration-300 group-hover:opacity-100">
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                <>
                </>
            )}
        </>
    )
};