
import { pgTable,uuid, text, varchar, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import {id,createdAt,updatedAt} from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CourseTable } from "./course";
import { ProductTable } from "./products";

export const CourseProductTable = pgTable("course_products",{
    courseId: uuid("courseId").notNull().references(()=> CourseTable.id,{onDelete:"restrict"}),
    productId: uuid("productId").notNull().references(()=> ProductTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt
}, t => [primaryKey({columns: [t.courseId,t.productId]})])

export const CourseProductRelationshipTable = relations(CourseProductTable,({one})=> ({
    course: one(CourseTable,{fields:[CourseProductTable.courseId], references: [CourseTable.id]}),
    product: one(ProductTable,{fields:[CourseProductTable.productId], references: [ProductTable.id]}),
}))