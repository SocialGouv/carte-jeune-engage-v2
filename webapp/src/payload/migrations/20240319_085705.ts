import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
DO $$ BEGIN
 CREATE TYPE "enum_users_cej_from" AS ENUM('franceTravail', 'missionLocale');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users" ADD COLUMN "cejFrom" "enum_users_cej_from";`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
ALTER TABLE "users" DROP COLUMN IF EXISTS "cejFrom";`);
}
