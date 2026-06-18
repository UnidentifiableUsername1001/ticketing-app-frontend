import React, { useState } from 'react';
import { config } from '../../../config';

export function useGetOneDepartment(deptId) {

    const [targetDept, setTargetDept] = useState({});
    const url = `${config.backendUrl}/api/${deptId}`;
    const jwtInStore = sessionStorage.getItem('auth-token');

    const destructDeptId = typeof deptId === 'object' ? deptId.value : deptId;

    const getOneDept = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }
            });

            if(!response.ok){
                throw new Error(`HTTP error ${response.status} ${response.message}`);
            }
            
            const data = await response.json();

            setTargetDept(data);
        } catch(e) {
            console.log(e);
        }
    }

    getOneDept();

    return targetDept;
}
