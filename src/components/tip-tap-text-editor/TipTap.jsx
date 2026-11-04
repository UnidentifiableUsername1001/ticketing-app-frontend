import './style.scss';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import FileHandler from '@tiptap/extension-file-handler';
import Mention from '@tiptap/extension-mention'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import suggestion from './suggestion';
import { TextStyleKit } from '@tiptap/extension-text-style'
import { MenuBar } from './Menu-Bar/MenuBar';



function RichTextEditor ({stateFunc}) {

    const editor = useEditor({
        onUpdate({editor}) {
            const body = editor.getHTML();
            stateFunc(body);
        },
        extensions: [
            StarterKit,
            TextStyleKit,
            FileHandler.configure({

            }),
            Mention.configure({
                HTMLAttributes: {
                    class: 'mention',
                },
                suggestion
            })
        ]
    })

    return (
        <div className='tiptap-container bg-white shadow-sm border border-wiseGrey4/40 rounded-xl overflow-hidden transition-all focus-within:border-wiseRose3'>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}/>
        </div>
    );
};

export {
    RichTextEditor
}