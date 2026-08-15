import React, { useContext } from 'react';
import { config } from '../../../config';
import { useMutation } from '@tanstack/react-query';
import { ToastContext } from '../../context/toast-notification/ToastContext';

export function useUploadAttachment() {

    const jwtInStore = sessionStorage.getItem('auth-token');

    const { addToast } = useContext(ToastContext);

    const mutationResult = useMutation({
        mutationFn: async (payload) => {

            const getPresignUrl = `${config.backendUrl}/api/ticket/presigned-url?fileName=${payload.name}&fileType=${payload.type}`;

            const response = await fetch(getPresignUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,

                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error while uploading files. Status: ${response.status}`);
            }

            const data = await response.json();

            const uploadFile = await fetch(data.uploadUrl, {
                method: 'PUT',
                body: payload
            });

            if (!uploadFile.ok) {
                throw new Error(`HTTP error while uploading files. Status: ${uploadFile.status}`);
            }

            let metaData = {

            }

            return metaData = {
                fileUrl: data.fileUrl,
                fileName: data.fileName,
                fileType: data.fileType
            };

        },

        onSuccess: (result) => {

            addToast({msg: `File ${result.fileName} uploaded!`, type: 'success'});

        },

        onError: (error) => {
            addToast({msg: `${error.statusText ? error.statusText : error}`, type: 'error'});

            console.log(error);
        }
    });
    
    return {
        uploadFile: mutationResult.mutateAsync,       
        isUploading: mutationResult.isPending,      
        uploadError: mutationResult.error,       
  };

}