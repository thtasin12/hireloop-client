import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins/admin";

const client = new MongoClient(
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/hireloop"
);
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin({
      /**
       * Roles used by HireLoop:
       *  - job_seeker  → default for all public sign-ups
       *  - recruiter   → chosen at sign-up
       *  - admin       → set server-side only
       */
      defaultRole: "job_seeker",
      adminRoles: ["admin"],
    }),
  ],
  database: mongodbAdapter(db, { client }),
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
