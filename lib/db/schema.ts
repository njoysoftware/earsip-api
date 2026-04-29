import {
pgTable,
text,
timestamp,
uuid,
integer
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const categories = pgTable('categories',{
 id:uuid('id').defaultRandom().primaryKey(),
 name:text('name').notNull(),
 folderId:text('folder_id').notNull(),
 userId:text('user_id').notNull(),
 createdAt:timestamp('created_at').defaultNow(),
})

export const archives = pgTable('archives',{
 id:uuid('id').defaultRandom().primaryKey(),
 title:text('title').notNull(),
 description:text('description'),
 categoryId:uuid('category_id').references(()=>categories.id),
 driveFileId:text('drive_file_id').notNull(),
 driveViewLink:text('drive_view_link'),
 mimeType:text('mime_type'),
 size:integer('size'),
 userId:text('user_id').notNull(),
 status:text('status').default('active').notNull(),
 retentionDate:timestamp('retention_date'),
 createdAt:timestamp('created_at').defaultNow(),
 updatedAt:timestamp('updated_at').defaultNow()
})

export const auditLogs=pgTable('audit_logs',{
 id:uuid('id').defaultRandom().primaryKey(),
 userId:text('user_id').notNull(),
 action:text('action').notNull(),
 details:text('details'),
 entityId:text('entity_id'),
 timestamp:timestamp('timestamp').defaultNow()
})

export const userSettings=pgTable('user_settings',{
 userId:text('user_id').primaryKey(),
 appsScriptUrl:text('apps_script_url')
})
