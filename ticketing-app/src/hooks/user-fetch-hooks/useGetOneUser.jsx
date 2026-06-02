import React, {useState, useEffect} from 'react';
import { config } from '../../../config';

export function useGetOneUser(targetUserId) {
    const [targetUser, setTargetUser] = useState({});
        const getUser = async (e) => {
            e.preventDefault()
            try {
                const jwtInStore = sessionStorage.getItem('auth-token');
                const destructTargId = typeof targetUserId === 'object' ? targetUserId.value : targetUserId;
                const url = `${config.backendUrl}/api/user/${targetUserId}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/JSON',
                        'Content-Type':'application/JSON',
                        Authorization: `Bearer ${jwtInStore}`
                    }, 
                });

                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}, ${response.message}`);
                };

                const data = response.json();
                setTargetUser(data);
            } catch (e) {
                console.log(e);
            }
        };
    return targetUser;
};