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



function RichTextEditor ({formStateFunc, form}) {

    const editor = useEditor({
        onUpdate({editor}) {
            const body = editor.getHTML();
            formStateFunc({
                ...form,
                description: {
                    ...form.description,
                    bodyText: body
                }
            })
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
        <div className='tiptap-container'>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}/>
        </div>
    );
};

export {
    RichTextEditor
}