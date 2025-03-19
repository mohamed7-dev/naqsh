import { previewFullImage, uploadFile } from "@/lib/appwrite";
import { queryKeys } from "@/lib/queryKeys";
import { useMutation } from "@tanstack/react-query";

const useUploadImage = () => {
  return useMutation({
    mutationKey: queryKeys.uploadImage,
    mutationFn: async ({
      addToEditor,
      file,
    }: {
      addToEditor: (url: string) => void;
      file: File;
    }) => {
      await uploadFile(file)
        .then((file) => {
          const url = previewFullImage(file.$id);
          addToEditor(url);
        })
        .catch((err: unknown) => {
          throw err;
        });
      return { done: true };
    },
  });
};

export { useUploadImage };
