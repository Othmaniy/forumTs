import {migrate} from "drizzle-orm/mysql2/migrator"
import {drizzle} from "drizzle-orm/mysql2"
import path from "path"
import mysql2 from "mysql2/promise"
require("dotenv").config();
const dbmigrate = async()=>{
    try{
        const dbconnection = await mysql2.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database:process.env.DB,
        password:process.env.PASSWORD
        })
        const dbmigrator =drizzle(dbconnection)
        await migrate(dbmigrator, {
            migrationsFolder:path.resolve("./src/db/migrations")
        })
        console.log("migration done");
    }
    catch(error){
        console.log(error);
    }

}
dbmigrate();