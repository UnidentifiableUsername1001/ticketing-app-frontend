import React from "react";
import { withBaseIcon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/icomoon/eye';
import {eyeBlocked} from 'react-icons-kit/icomoon/eyeBlocked';

const PasswordIcon = 
    withBaseIcon({
        className: 'absolute mr-10 text-wiseGrey3/90 transition hover:text-wiseGrey2',
        size: 20

    });

export const openEye = () => <PasswordIcon icon={eye} />
export const closedEye = () => <PasswordIcon icon={eyeBlocked} />