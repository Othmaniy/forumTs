import { defineConfig } from "drizzle-kit";
require("dotenv").config()
export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema",
  out: "./src/db/migrations",
});