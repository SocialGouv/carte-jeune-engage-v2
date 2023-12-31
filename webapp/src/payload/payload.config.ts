import path from "path";
import { env } from "~/env";
import { buildConfig } from "payload/config";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";

import { Admins } from "./collections/Admin";
import { Users } from "./collections/User";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categorie";
import { Partners } from "./collections/Partner";
import { Discounts } from "./collections/Discount";

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: slateEditor({}),
  admin: {
    bundler: webpackBundler(),
    user: "admins",
  },
  collections: [Admins, Users, Media, Categories, Partners, Discounts],
  localization: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  globals: [],
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
});
