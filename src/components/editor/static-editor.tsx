"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

interface EditorProps {
  content?: string;
  className?: string;
}

export function StaticEditor({ content, className }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editable: false,
    immediatelyRender: false,
    content,
  });
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  return (
    <div>
      <EditorContent
        editor={editor}
        className={cn("flex-auto text-sm", className)}
      />
    </div>
  );
}
