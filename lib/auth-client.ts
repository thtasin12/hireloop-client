import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  plugins: [adminClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;

/** Strongly-typed role values used across the app */
export type UserRole = "job_seeker" | "recruiter" | "admin";

/** Map each role to its dashboard path */
export const roleDashboard: Record<UserRole, string> = {
  job_seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
};
