import '../../tip-tap-text-editor/style.scss';
import { EditorContent, useEditor } from '@tiptap/react'; 
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import { TextStyleKit } from '@tiptap/extension-text-style';
import React, { useEffect, useState } from 'react';

export function ReadOnlyEditor ({inputText}) {
    const editor = useEditor({
        shouldRerenderOnTransaction: false,
        content: inputText,
        editable: false,
        extensions: [
            StarterKit,
            TextStyleKit,
            Mention.configure({
                HTMLAttributes: {
                    class: 'mention',
                },
            })
        ]
    });

    return (
        <>
            <div className='tiptap-container'>
                <EditorContent editor={editor}/>
            </div>
        </>
    )
}