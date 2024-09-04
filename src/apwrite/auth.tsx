import { User } from "lucide-react";
import conf from "../conf/conf.ts";
import { Client, Account, ID } from "appwrite";

interface User {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }
  async createAccount({ name, email, password }: User) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }: { email: string; password: string }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);

      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: Logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
