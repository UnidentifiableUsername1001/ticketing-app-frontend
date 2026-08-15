import { ReactRenderer } from '@tiptap/react';
import DropdownList from './DropdownList';
import { flip, shift } from '@floating-ui/dom';
import { config } from '../../../config';

export default {
    items: async ({ query, signal }) => {

        const jwtInStore = sessionStorage.getItem('auth-token');

        const urlUsers = `${config.backendUrl}/api/users/`;

        const response = await fetch(urlUsers, {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }
            });

        const data = await response.json();

        return data.userArray.map((object) => ({

            id: object._id,
            label: object.firstName + ' ' + object.lastName

        })).filter(user => {

            return user.label.toLowerCase().startsWith(query.toLowerCase());

        }).slice(0, 5);
    },

    placement: 'top-start',

    offset: { mainAxis: 8 },

    flip: false,

    floatingUi: {
    strategy: 'fixed',
    middleware: [flip({ padding: 8 }), shift({ padding: 8 })],
    },

    // Dismiss the popup when clicking outside it (and outside the editor).
    dismissOnOutsideClick: true,

    render: () => {
    let component
    let unmount = null

    return {
        onStart: props => {
        component = new ReactRenderer(DropdownList, {
            props,
            editor: props.editor,
        })

        unmount = props.mount(component.element)
        },

        onUpdate(props) {
        component.updateProps(props)
        },

        onKeyDown(props) {
        if (props.event.key === 'Escape') {
            component.destroy()

            return true
        }

        return component.ref?.onKeyDown(props)
        },

        onExit() {
        unmount?.()
        component.destroy()
        },
    }
    },
};