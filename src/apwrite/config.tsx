import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

interface Post {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}
interface UpdatePost {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
}

export class Service {
  client = new Client();
  databases;
  bucket: Storage;
  static bucket: any;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: Post) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serivce :: createPost:: error", error);
    }
  }
  async updatePost(
    slug: string,
    { title, content, featuredImage, status }: UpdatePost
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serivce :: updatePost:: error", error);
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serivce :: deletePost:: error", error);
      return false;
    }
  }
  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service
  async uploadFile(file: any) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serivce :: uploadFile:: error", error);
      return false;
    }
  }
  async deleteFile(fileId: string) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serivce :: deleteFile:: error", error);
      return false;
    }
  }
  getFilePreview(fileId: string) {
    return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
  }
  static getFilePreview(featuredImage: string): string | undefined {
    return this.bucket.getFilePreview(conf.appwriteBucketID, featuredImage);
  }
}

const service = new Service();

export default service;
