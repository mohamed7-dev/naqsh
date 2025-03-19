import { Avatars, Client, Storage } from "appwrite";

const client = new Client();
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const APPWRITE = {
  storageId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
};

if (!projectId || !endpoint) {
  throw new Error("Appwrite is not configured properly!");
}
client.setEndpoint(endpoint).setProject(projectId);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { client, APPWRITE, storage, avatars };
