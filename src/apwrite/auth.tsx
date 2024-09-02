import conf from '../conf/conf.ts'
import { Client, Account, ID } from 'appwrite';


export class AuthService{
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client)
        
    }
    async createAccount({email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

        }
    }
}