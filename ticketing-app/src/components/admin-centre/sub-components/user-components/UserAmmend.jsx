import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../../../context/authContext";
import { useNavigate } from "react-router";
import Select from 'react-select';
import { NewUserForm } from './newUserForm';
import { UpdateUserForm } from './updateUserForm';


export default function UserAmmend() {

    return (
        <div className='top-div'>
            <div className='new-user bg-red-300'>
                <NewUserForm />
            </div>
            <div className='update-user bg-blue-300'>
                <UpdateUserForm/>
            </div>
        </div>
    )
};

