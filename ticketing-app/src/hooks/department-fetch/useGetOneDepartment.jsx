import React, { useState, useEffect } from 'react';
import { config } from '../../../config';

export function useGetOneDepartment(deptId) {

    const destructDeptId = deptId && typeof deptId === 'object' ? deptId.value : deptId;

    const [targetDept, setTargetDept] = useState({});
    const url = `${config.backendUrl}/api/department/${destructDeptId}`;
    const jwtInStore = sessionStorage.getItem('auth-token');

    useEffect(() => {

        if (!destructDeptId) return;

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
                const departmentData = data.department;

                setTargetDept(departmentData);
            } catch(e) {
                console.log(e);
            }
        }

        getOneDept();
    }, [destructDeptId, url, jwtInStore]);

    return targetDept;
}
