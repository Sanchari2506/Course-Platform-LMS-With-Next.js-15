
import { pgTable,uuid, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import {id,createdAt,updatedAt} from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CourseProductTable } from "./courseProduct";

// the course table
export const CourseTable = pgTable("courses",{
    id,
    coursename: text("title").notNull(),
    description: text("description"),
    createdAt,
    updatedAt
})

// the course relationship table
export const CourseRelationshipTable = relations(CourseTable,({many})=> ({
    courseProducts: many(CourseProductTable),
}))