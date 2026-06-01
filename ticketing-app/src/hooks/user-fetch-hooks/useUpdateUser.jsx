import React, { useState, useEffect } from "react";
import { config } from "../../../config";

export default function useUpdateUser(formData, setFormData, userId) {

    const jwtInStore = sessionStorage.getItem('auth-token');

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {

            const pairsArray = Object.entries(formData);
            const cleanPairs = pairsArray.filter((pair) => {
                const sanitised = typeof pair[1] === 'string' ? pair[1].trim()  : pair[1]; 
                switch(sanitised) {
                    case "":
                        return false
                        break;
                    case null:
                        return false
                        break
                    case false:
                        return true
                        break;
                    default:
                        return true
                };
            });

            let finalPayload = Object.fromEntries(cleanPairs);

            if (finalPayload.departmentId) {
                const destructDeptId = typeof finalPayload.departmentId === 'object' ? finalPayload.departmentId.value : finalPayload.departmentId;
                finalPayload.departmentId = destructDeptId;
            }

            const destructUserId = typeof userId === 'object' ? userId.value : userId;
            const putUrl = `${config.backendUrl}/api/users/update-user/${destructUserId}`; 

            const response = await fetch(putUrl, {
                method: 'PUT',
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

            setFormData({
                jobTitle: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordResetRequired: null,
                departmentId: "",
                role: ""
            });
        } catch (e) {
            console.log(e);
        }
    };

    return handleUpdateUser;
};
