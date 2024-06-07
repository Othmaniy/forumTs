
import {mysqlTable,int,mysqlEnum,varchar,timestamp} from "drizzle-orm/mysql-core"

export const usertable=mysqlTable("users",{
    id:int("id").primaryKey().autoincrement(),
name:varchar("name",{length:256}).notNull(),
lastname:varchar("lastname",{length:256}),
password:varchar("password",{length:256}).notNull(),
role:mysqlEnum("role",["admin","user","employee"]).notNull().default("user"),
createdAt:timestamp("createdAt").defaultNow().notNull(),

})
// export const table2=mysqlTable("table2",{
//     id:int("id").primaryKey().autoincrement(),
// name:varchar("name",{length:256}).notNull(),
// lastname:varchar("lastname",{length:256}),
// password:varchar("password",{length:256}).notNull(),
// role:mysqlEnum("role",["admin","user","employee"]).notNull().default("user"),
// createdAt:timestamp("createdAt").defaultNow().notNull(),

// })
// export const books=mysqlTable("books",{
//     bookId:int("bookid").primaryKey().autoincrement().notNull(),
//     book_name:varchar("bookName",{length:256}).notNull(),
//     book_author:varchar("bookAuthor",{length:256}).notNull(),
//     createdAt:timestamp("createdAt").defaultNow().notNull()

// })
export const questions =mysqlTable("questions",{
    question_id:int("questionId").primaryKey().notNull().autoincrement(),
    user_id :int("userId").notNull().references(()=>usertable.id),
    questions:varchar("question",{length:256}).notNull(),
})

export const answer =mysqlTable("answers",{
    answer_id:int("answerId").notNull().autoincrement().primaryKey(),
    answer:varchar("answer",{length:256}),
    an_userid:int("anUserid").references(()=>usertable.id),
    question_id:int("questionid").references(()=>questions.question_id)
})
