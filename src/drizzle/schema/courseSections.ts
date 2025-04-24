// each course can have multiple sections and lessions

import { pgTable, pgEnum, uuid, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import {id,createdAt,updatedAt} from "../schemaHelpers";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";

// we need Enum here
export const CourseSectionStatus = ["public","private"] as const;

//creating type for enum
export type CourseSectionStatus = (typeof CourseSectionStatus)[number];


export const CourseSectionStatusEnum = pgEnum("course_section_status",CourseSectionStatus);

export const CourseSectionTable = pgTable("course_sections",{
    id,
    name: text("title").notNull(),
    status: CourseSectionStatusEnum().notNull().default("private"),
    order: integer("order").notNull().default(0),
    courseId: uuid("courseId").notNull().references(()=> CourseTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt
})

export const CourseSectionRelationshipTable = relations(CourseSectionTable,({one})=> ({
    course: one(CourseTable,{fields:[CourseSectionTable.courseId], references: [CourseTable.id]}),
}))