import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { config } from "../../../config";
import { ToastContext } from "../../context/toast-notification/ToastContext";

export function useCompanyRegistration() {
    const jwt = sessionStorage.getItem('auth-token');
    const url = `${config.backendUrl}/api/company/new-company`;
    const { addToast } = useContext(ToastContext);
    const navigate = useNavigate();    

    const regCompany = useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.json}`);

            const data = await response.json();

            return data;
        },

        onSuccess: (data) => {
            addToast({msg: 'Company registered', type: 'success'});
            navigate('/login');
        },

        onError: (error) => {
            addToast({msg: `Error: ${error.message ? error.message : error}`});
            console.log(error);
        }
    });

    return {
        companyRegFunc: regCompany.mutateAsync,
        companyRegPending: regCompany.isPending,
        companyRegSuccess: regCompany.isSuccess,
        companyRegError: regCompany.isError,
        companyErrorData: regCompany.error
    }
}