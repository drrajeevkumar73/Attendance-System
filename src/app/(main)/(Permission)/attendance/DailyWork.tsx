"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./style.css";

import { EditorContent } from "@tiptap/react";
import LodingButton from "@/components/LodingButton";
import { useSubmitPost } from "./submitpost";

export default function DailyWork() {
  const useSubmitPostmuation = useSubmitPost();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write a work of today ?",
      }),
    ],
  });

  const inputPost =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  // Remove duplicate lines by splitting content, converting to a Set, and joining back
  const cleanedPost = inputPost
    .split("\n")
    .filter(Boolean) // Remove empty lines if any
    .reduce((acc: string[], current: string) => {
      // If the line is not already in the accumulator, add it
      if (!acc.includes(current)) {
        acc.push(current);
      }
      return acc;
    }, [])
    .join("\n");

  const onSubmit = async () => {
    useSubmitPostmuation.mutate(
      { content: cleanedPost }, // Send cleaned post content with unique lines
      {
        onSuccess: () => {
          editor?.commands.clearContent(); // Clear editor on success
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <EditorContent
        editor={editor}
        className="max-h-[25rem] w-full overflow-y-auto rounded-md border bg-background px-5 py-3"
      />

      <LodingButton
        onClick={onSubmit}
        loding={useSubmitPostmuation.isPending}
        disabled={!cleanedPost.trim()}
        className="min-w-20"
      >
        Post
      </LodingButton>
    </div>
  );
}
