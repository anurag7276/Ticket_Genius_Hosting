import dotenv from "dotenv";
dotenv.config();

import {Inngest} from "inngest"

// console.log("INNGEST_SIGNING_KEY:", process.env.INNGEST_SIGNING_KEY);

export const inngest = new Inngest({
  id: "ticket-genius",
  signingKey: process.env.INNGEST_SIGNING_KEY,
  env: process.env.INNGEST_ENV || "dev", // optional
});

// console.log("INNGEST_SIGNING_KEY:", process.env.INNGEST_SIGNING_KEY);