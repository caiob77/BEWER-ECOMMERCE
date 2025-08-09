import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

//exportando tabela 
export const userTable = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const categoryTable = pgTable("category", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categoryRelations = relations(categoryTable, (params) => {
    return {
        products: params.many(productTable),

    }

});

//exportando tabela de produtos
export const productTable = pgTable("product", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    categoryId: uuid("category_id").references(() => categoryTable.id).notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    
});


export const productRelations = relations(productTable, ({one}) => ({
        category: one(categoryTable, {
            fields: [productTable.categoryId],
            references: [categoryTable.id],
        }),
    
}));


export const productVariantTable = pgTable("product_variant", {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id").references(() => productTable.id).notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    priceInCents: integer("price_in_cents").notNull(),
    imageUrl: text("image_url").notNull(),
    color: text("color").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariantRelations = relations(productVariantTable, ({one}) => ({
    product: one(productTable, {
        fields: [productVariantTable.productId],
        references: [productTable.id],
    }),
}));