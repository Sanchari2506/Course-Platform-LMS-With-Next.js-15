import { pgTable,uuid, text, varchar, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import {id,createdAt,updatedAt} from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { CourseProductTable } from "./courseProduct";

// crearting Enum for product status

export const ProductStatus = ["public","private"] as const;

export type ProductStatus = (typeof ProductStatus)[number];

export const ProductStatusEnum = pgEnum("product_status",ProductStatus);


export const ProductTable = pgTable("products",{
    id,
    coursename: text("title").notNull(),
    description: text("description"),
    imageURL: text("imageURL").notNull(),
    price: integer("price").notNull(),
    status: ProductStatusEnum().notNull().default("private"),
    createdAt,
    updatedAt
})

export const ProductRelationshipTable = relations(ProductTable,({many})=> ({
    courseProducts: many(CourseProductTable),
}))