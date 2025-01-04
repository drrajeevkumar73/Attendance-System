"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./style.css";

import { EditorContent } from "@tiptap/react";
import LodingButton from "@/components/LodingButton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function DailyWork() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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
    }, [] )
    .join("\n");

    const onSubmit = async () => {
      setLoading(true); // Start loading
    
      try {
        // Log the payload before sending
        console.log("Posting data:", { content: cleanedPost });
    
        // Replace this with the actual API URL for your backend
        const response = await axios.post("/api/work", { content: cleanedPost });
    
        if (response.status === 200) {
          toast({
            title: "Success",
            description: "Post submitted successfully!",
          });
          editor?.commands.clearContent(); // Clear editor content on success
        }
      } catch (error: any) {
      
    
        // Check if error is an AxiosError
        if (axios.isAxiosError(error)) {
          // Try to extract the backend error message from the response
          const errorMessage = error?.response?.data?.message || "There was an issue while submitting your post.";
          
          // Display the backend error message in the toast
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          // Handle non-Axios errors
          toast({
            title: "Error",
            description: "An unknown error occurred.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    

  return (
    <div className="space-y-6">
      <EditorContent
        editor={editor}
        className="max-h-[25rem] w-full overflow-y-auto rounded-md border bg-background px-5 py-3"
      />

      <LodingButton
        onClick={onSubmit}
        loding={loading} // Use your own loading state
        disabled={!cleanedPost.trim()}
        className="min-w-20"
      >
        Post
      </LodingButton>
    </div>
  );
}
