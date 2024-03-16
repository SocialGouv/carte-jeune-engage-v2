import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
ALTER TABLE "supervisors" ADD COLUMN "cgu" boolean;`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
ALTER TABLE "supervisors" DROP COLUMN IF EXISTS "cgu";`);
}
