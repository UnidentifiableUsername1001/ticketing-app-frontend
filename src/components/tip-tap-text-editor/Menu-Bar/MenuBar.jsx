import { useEditorState } from '@tiptap/react'
import React from 'react'
import { menuBarStateSelector } from './menuBarState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faList, faListOl, faRotateLeft, faRotateRight, faStrikethrough } from '@fortawesome/free-solid-svg-icons';

export const MenuBar = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
        title='Bold'
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faBold}/>
        </button>
        <button
          type='button'
          title='Italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faItalic}/>
        </button>
        <button
          type='button'
          title='Strike-through'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faStrikethrough}/>
        </button>

        <button
          type='button'
          title='Paragraph'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button
          type='button'
          title='Heading 1'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          type='button'
          title='Heading 2'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          type='button'
          title='Bullet List'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faList}/>
        </button>
        <button
          type='button'
          title='Ordered List'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faListOl}/>
        </button>
        <button
          type='button' onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button>
        <button
          type='button' onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button>
        <button
          type='button' title='Undo' onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
          <FontAwesomeIcon icon={faRotateLeft}/>
        </button>
        <button
          type='button' title='Redo' onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
          <FontAwesomeIcon icon={faRotateRight}/>
        </button>
      </div>
    </div>
  )
}