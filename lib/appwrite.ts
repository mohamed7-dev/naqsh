import { APPWRITE, storage } from "@/config/appwrite";
import { ID } from "appwrite";

const uploadFile = async (file: File) => {
  return await storage.createFile(APPWRITE.storageId, ID.unique(), file);
};

const previewFullImage = (fileId: string) => {
  return storage.getFilePreview(APPWRITE.storageId, fileId);
};

const previewCardImage = (fileId: string, width?: number, height?: number) => {
  return storage.getFilePreview(
    APPWRITE.storageId,
    fileId,
    width || 1000,
    height || 1000
  );
};

const previewAvatar = (fileId: string) => {
  return storage.getFilePreview(APPWRITE.storageId, fileId, 500, 500);
};

export { uploadFile, previewFullImage, previewAvatar, previewCardImage };
