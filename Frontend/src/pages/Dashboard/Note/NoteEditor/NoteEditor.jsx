import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
} from "lucide-react";

const NoteEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-full max-w-none text-gray-700 leading-relaxed font-sans placeholder-gray-400 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-3 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:my-2 [&_a]:text-cyan-600 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_code]:bg-gray-100 [&_code]:text-pink-600 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-sm [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:my-4 [&__pre_code]:bg-transparent [&__pre_code]:text-inherit [&_hr]:my-8 [&_hr]:border-gray-200",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-6 sm:px-12 pt-6 pb-3 border-b border-gray-100 bg-white z-10 sticky top-0">
        <Toolbar editor={editor} />
      </div>
      <div 
        className="flex-1 overflow-y-auto px-6 sm:px-12 py-6 cursor-text pb-32"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            editor?.chain().focus('end').run();
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default NoteEditor;

const ToolbarButton = ({ onClick, isActive, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
      isActive
        ? "bg-cyan-50 text-cyan-600 fill-cyan-100"
        : disabled
        ? "text-gray-300 cursor-not-allowed"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    }`}
  >
    {children}
  </button>
);

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 bg-white">
      {/* Undo/Redo */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo size={18} strokeWidth={2.5} />
        </ToolbarButton>
      </div>

      {/* Headings */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 size={18} strokeWidth={2.5} />
        </ToolbarButton>
      </div>

      {/* Marks */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          <Code size={18} strokeWidth={2.5} />
        </ToolbarButton>
      </div>

      {/* Alignment */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight size={18} strokeWidth={2.5} />
        </ToolbarButton>
      </div>

      {/* Lists & Quotes & HR */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote size={18} strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={18} strokeWidth={2.5} />
        </ToolbarButton>
      </div>
    </div>
  );
};
