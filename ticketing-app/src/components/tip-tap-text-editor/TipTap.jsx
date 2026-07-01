import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import FileHandler from '@tiptap/extension-file-handler';
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';

function RichTextEditor () {
    const editor = useEditor({
        extensions: [
            StarterKit,
            FileHandler.configure({

            })
        ]
    })

    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}/>
        </>
    );
};

export {
    RichTextEditor
}