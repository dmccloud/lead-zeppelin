/* eslint-disable @typescript-eslint/no-unsafe-assignment  */
/* eslint-disable @typescript-eslint/no-unsafe-call  */
// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  decimal,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `lead-zeppelin_${name}`);

export const leads = createTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    ownerId: varchar("owner_id", { length: 256 }),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }),
    status: varchar("status", { length: 256 }),
    estimatedSaleAmount: decimal("estimated_sale_amount"),
    estimatedCommission: decimal("estimated_commission", { precision: 2 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
    emailIndex: index("email_idx").on(example.email),
  }),
);

export const insertLeadsSchema = createInsertSchema(leads, {
  ownerId: (schema) => schema.ownerId.min(2).max(256),
  name: (schema) => schema.name.min(2).max(256),
  email: (schema) => schema.email.email(),
  status: (schema) => schema.status.min(2).max(256),
  estimatedSaleAmount: (schema) => schema.estimatedSaleAmount.min(0),
  estimatedCommission: (schema) => schema.estimatedCommission.min(0),
  createdAt: (schema) => schema.createdAt,
  updatedAt: (schema) => schema.updatedAt,
});
