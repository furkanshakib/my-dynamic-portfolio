/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { useTheme } from './ThemeContext';

const MenuBar = ({ editor, isDark }) => {
    if (!editor) {
        return null;
    }

    const buttonStyle = (isActive) => ({
        background: isActive ? (isDark ? '#3b82f6' : '#2563eb') : 'transparent',
        color: isActive ? 'white' : (isDark ? '#e2e8f0' : '#475569'),
        border: 'none',
        padding: '6px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.2s'
    });

    return (
        <div style={{
            display: 'flex',
            gap: '5px',
            padding: '10px',
            borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            flexWrap: 'wrap',
            background: isDark ? '#1e293b' : '#f8f9fa',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
        }}>
            <button onClick={() => editor.chain().focus().toggleBold().run()} style={buttonStyle(editor.isActive('bold'))}>B</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} style={buttonStyle(editor.isActive('italic'))}>I</button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} style={buttonStyle(editor.isActive('underline'))}>U</button>

            <div style={{ width: '1px', background: isDark ? '#475569' : '#cbd5e1', margin: '0 5px' }}></div>

            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} style={buttonStyle(editor.isActive('heading', { level: 1 }))}>H1</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={buttonStyle(editor.isActive('heading', { level: 2 }))}>H2</button>

            <div style={{ width: '1px', background: isDark ? '#475569' : '#cbd5e1', margin: '0 5px' }}></div>

            <button onClick={() => editor.chain().focus().toggleBulletList().run()} style={buttonStyle(editor.isActive('bulletList'))}>• List</button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} style={buttonStyle(editor.isActive('orderedList'))}>1. List</button>

            <div style={{ width: '1px', background: isDark ? '#475569' : '#cbd5e1', margin: '0 5px' }}></div>

            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} style={buttonStyle(editor.isActive({ textAlign: 'left' }))}>Left</button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} style={buttonStyle(editor.isActive({ textAlign: 'center' }))}>Center</button>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} style={buttonStyle(editor.isActive({ textAlign: 'right' }))}>Right</button>

            <div style={{ width: '1px', background: isDark ? '#475569' : '#cbd5e1', margin: '0 5px' }}></div>

            <button onClick={() => {
                const url = window.prompt('URL');
                if (url) editor.chain().focus().setLink({ href: url }).run();
            }} style={buttonStyle(editor.isActive('link'))}>🔗</button>
            <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} style={{ ...buttonStyle(false), opacity: editor.isActive('link') ? 1 : 0.5 }}>Unlink</button>
        </div>
    );
};

const TiptapEditor = ({ content, onChange, placeholder }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose',
                style: `min-height: 150px; padding: 15px; background: ${isDark ? '#0f172a' : 'white'}; color: ${isDark ? '#f1f5f9' : '#333'}; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; outline: none;`
            },
        }
    });

    // Handle external content changes (e.g. initial load or switching items)
    useEffect(() => {
        if (editor && content) {
            // Check if content is different to avoid cursor jumps/re-renders
            // We only update if the editor is NOT focused, OR if the content is drastically different
            // (e.g. switching from Project A to Project B)
            // Comparing HTML strings can be tricky, but Tiptap provides a way?
            // For now, checks if we are focused.
            if (!editor.isFocused && editor.getHTML() !== content) {
                // Check for empty case mismatch specifically to avoid loops
                if (editor.isEmpty && content === '<p></p>') return;
                editor.commands.setContent(content);
            }
        }
        // Also handle reset (if content is empty string)
        if (editor && !content && !editor.isEmpty) {
            if (!editor.isFocused) editor.commands.setContent('');
        }
    }, [content, editor]);

    return (
        <div style={{
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            borderRadius: '8px',
            overflow: 'hidden',
            background: isDark ? '#0f172a' : 'white',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <MenuBar editor={editor} isDark={isDark} />
            <EditorContent editor={editor} style={{ flex: 1 }} />
            <style>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: "${placeholder || 'Start typing...'}";
          color: #adb5bd;
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

export default TiptapEditor;
