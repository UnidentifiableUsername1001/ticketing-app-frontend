import React, { useContext } from "react";
import { config } from "../../../config";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../context/toast-notification/ToastContext";

export function useNewUser() {

    const postUrl = `${config.backendUrl}/api/users/new-user`;
    const jwtInStore = sessionStorage.getItem('auth-token');
    const { addToast } = useContext(ToastContext);

    const mutate = useMutation({
        mutationFn: async (payload) => {
    
            const pairsArray = Object.entries(payload);
            const cleanPairs = pairsArray.filter((pair) => {
                const sanitised = typeof pair[1] === 'string' ? pair[1].trim()  : pair[1]; 
                switch(sanitised) {
                    case "":
                        return false
                    case null:
                        return false
                    case false:
                        return true
                    default:
                        return true
                };
            });

            let finalPayload = Object.fromEntries(cleanPairs);

            if (finalPayload.departmentId) {
                const destructDeptId = typeof finalPayload.departmentId === 'object' ? finalPayload.departmentId.value : finalPayload.departmentId;
                finalPayload.departmentId = destructDeptId;
            };

            if (finalPayload.role) {
                const destructDeptId = typeof finalPayload.role === 'object' ? finalPayload.role.value : finalPayload.role;
                finalPayload.role = destructDeptId;
            }

            const response = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} ${response.message}`);
            };      
        },

        onSuccess: (data) => {
            addToast({msg: `New user added!`, type: 'success'});
        },

        onError: (error) => {
            addToast({msg: error.message, type: 'error'});
            console.log(error.message);
        }

    })

    return {
        addUser: mutate.mutate,
        isAdded: mutate.isSuccess,
        errorAdding: mutate.isError
    }
} 
