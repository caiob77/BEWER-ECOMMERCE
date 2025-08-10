import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});

export { auth };
export default auth;