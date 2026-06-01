import React, { useState, useEffect } from 'react';
import { config } from '../../config';

export default function useGetDepartments() {
    const [allDepartments, setAllDepartments] = useState([]);
    const url = `${config.backendUrl}/api/department/`;
    const jwtInStore = sessionStorage.getItem('auth-token');

    useEffect (() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/JSON',
                        'Content-Type':'application/JSON',
                        Authorization: `Bearer ${jwtInStore}`
                    }
                });

                if(!response.ok) {
                    throw new Error(`HTTP error: ${response.status}, ${response.message}`);
                    return;
                }

                const data = await response.json();
                const mappedArray = data.departments.map(({_id, name}) => ({
                    value: _id,
                    label: name
                }));

                setAllDepartments(mappedArray);
            } catch (e) {
                console.log(e);
            }
        };

        fetchDepartments();
    }, []);

    return allDepartments;
}