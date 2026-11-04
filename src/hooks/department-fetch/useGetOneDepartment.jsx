import React, { useState, useEffect } from 'react';
import { config } from '../../../config';
import { HttpError } from '../../utils/errors';

export function useGetOneDepartment() {

    const getOneDept = async (deptId) => {
        try {
            const destructDeptId = deptId && typeof deptId === 'object' ? deptId.value : deptId;
            
            const url = `${config.backendUrl}/api/department/${destructDeptId}`;
            const jwtInStore = sessionStorage.getItem('auth-token');

            if (destructDeptId === null || Object.keys(destructDeptId).length === 0 || destructDeptId === undefined) return;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }
            });

            if (!response.ok) {
                
                let errorData = null;
                
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }

                const errorMessage = errorData?.message || response.statusText || 'Request failed';

                throw new HttpError(response.status, errorMessage, errorData);

            };
            
            const data = await response.json();
            const departmentData = data.department;

            return departmentData;


        } catch(e) {
            console.log(e);
        }
    }

    return getOneDept;

}
