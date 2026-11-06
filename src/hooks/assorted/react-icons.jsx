import React from "react";
import { withBaseIcon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/icomoon/eye';
import {eyeBlocked} from 'react-icons-kit/icomoon/eyeBlocked';
import {longArrowDown} from 'react-icons-kit/fa/longArrowDown'
import {longArrowUp} from 'react-icons-kit/fa/longArrowUp'
import {angleDoubleLeft} from 'react-icons-kit/fa/angleDoubleLeft'

const PasswordIcon = 
    withBaseIcon({
        className: 'text-wiseGrey3/90 transition hover:text-wiseGrey2',
        size: 20

    });

const SortIcon = withBaseIcon({
        className: '',
        size: 20
    })

export const sortIcon1 = () => <SortIcon icon={longArrowDown}/>
export const sortIcon2 = () => <SortIcon icon={longArrowUp}/>
export const openEye = () => <PasswordIcon icon={eye} />
export const closedEye = () => <PasswordIcon icon={eyeBlocked} />