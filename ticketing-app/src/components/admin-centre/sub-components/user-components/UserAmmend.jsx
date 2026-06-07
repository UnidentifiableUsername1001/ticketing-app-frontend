import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../../../context/authContext";
import { useNavigate } from "react-router";
import Select from 'react-select';
import { NewUserForm } from './newUserForm';
import { UpdateUserForm } from './updateUserForm';


export default function UserAmmend() {

    return (
        <div className='grid gap-10 '>
            <div className='new-user'>
                <NewUserForm />
            </div>
            <div className='update-user'>
                <UpdateUserForm/>
            </div>
        </div>
    )
};

