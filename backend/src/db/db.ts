import {drizzle} from "drizzle-orm/mysql2";
require("dotenv").config();
import mysql from "mysql2/promise";
const poolConnection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database:process.env.DB,
  password:process.env.PASSWORD

});
export const db = drizzle(poolConnection);