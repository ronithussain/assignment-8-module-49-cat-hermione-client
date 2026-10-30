import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
  //...other options
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // google:{
    //     clientId:process.env,
    //     clientSecret:
    // },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
//   ___________________________
  database: mongodbAdapter(db, {
    client,
  }),
});
