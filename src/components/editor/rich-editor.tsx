"use client";

import { useEditor, EditorContent, FocusPosition } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenuEditor } from "./bubble-menu-editor";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { useEffect } from "react";

interface RichEditorProps {
  content?: string;
  handleSave: (arg: string) => void;
  placeholder: string;
  autofocus?: FocusPosition;
}

export function RichEditor({
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
    immediatelyRender: false,
    editorProps: { attributes: { spellcheck: "false" } },
  });
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
    if (placeholder === "Provide title...") editor?.commands.focus();
  }, [content, editor, placeholder]);

  if (!editor) return null;
  return (
    <div>
      <EditorContent editor={editor} className="text-sm" />
      <BubbleMenuEditor editor={editor} />
    </div>
  );
}
