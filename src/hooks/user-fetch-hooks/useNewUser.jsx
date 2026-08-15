import React, { useState, useEffect } from "react";
import { config } from "../../../config";

export default function useNewUser(formData, setFormData) {

        const postUrl = `${config.backendUrl}/api/users/new-user`;
        const jwtInStore = sessionStorage.getItem('auth-token');

        const handleNewUser = async (e) => {
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

    return handleNewUser;
};