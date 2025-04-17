// src/appwrite.js

import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_SCREENBOX_APPWRITE_AUTH_ENDPOINT).setProject(import.meta.env.VITE_SCREENBOX_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
export { client, account, databases, storage, ID, Query };
