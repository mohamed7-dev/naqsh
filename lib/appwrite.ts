import { APPWRITE, storage } from "@/config/appwrite";
import { ID } from "appwrite";

const uploadFile = async (file: File) => {
  return await storage.createFile(APPWRITE.storageId, ID.unique(), file);
};

const previewFullImage = (fileId: string) => {
  return storage.getFileView(APPWRITE.storageId, fileId);
};

const previewCardImage = (fileId: string) => {
  return storage.getFileView(APPWRITE.storageId, fileId);
};

const previewAvatar = (fileId: string) => {
  return storage.getFileView(APPWRITE.storageId, fileId);
};

export { uploadFile, previewFullImage, previewAvatar, previewCardImage };
