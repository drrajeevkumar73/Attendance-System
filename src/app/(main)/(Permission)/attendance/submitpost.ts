import { useToast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { json } from "stream/consumers";

export function useSubmitPost() {
  const { toast } = useToast();

  const mutaion = useMutation({
    mutationFn: async (variables: { content: string }) => {
      await kyInstance.post("/api/work", { json: variables }); // Send content to API
    },

    onSuccess: () => {
      toast({ title: "Success!", description: "Work added successfully." });
    },

    onError(error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  return mutaion;
}
