import { Toggle } from "@/components/toggle";
import { Bold, Italic, Underline } from "lucide-react";
import { BubbleMenu, Editor } from "@tiptap/react";

export function BubbleMenuEditor({ editor }: { editor: Editor }) {
  return (
      <BubbleMenu
        className="bg-background border-thin rounded-xl border-border shadow"
        updateDelay={100}
        editor={editor}
      >
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          className="rounded-r-none"
          aria-label="Format Bold"
        >
          <Bold />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
          className="rounded-none"
          aria-label="Format Italic"
        >
          <Italic />
        </Toggle>
        <Toggle
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          size="sm"
          className="rounded-l-none"
          aria-label="Format Underline"
        >
          <Underline />
        </Toggle>
      </BubbleMenu>
  );
}
