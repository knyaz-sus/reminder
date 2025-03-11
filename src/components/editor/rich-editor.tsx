"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, FocusPosition } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenuEditor } from "./bubble-menu-editor";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";

interface RichEditorProps {
  content?: string;
  handleSave: (arg: string) => void;
  placeholder: string;
  autofocus?: FocusPosition;
}

export default function RichEditor({
  handleSave,
  content,
  placeholder,
  autofocus,
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder }), Underline],
    content,
    onUpdate(editor) {
      handleSave(editor.editor.getHTML());
    },
    autofocus,
    editorProps: { attributes: { spellcheck: "false" } },
  });
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor, placeholder]);

  return editor ? (
    <div>
      <EditorContent editor={editor} className="text-sm" />
      <BubbleMenuEditor editor={editor} />
    </div>
  ) : (
    <div className="placeholder min-h-[20px] text-sm">Loading editor...</div>
  );
}
