import path from "path";
import { buildConfig } from "payload/config";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";

import { Posts } from "./collections/Post";
import { Offers } from "./collections/Offer";
import { Admins } from "./collections/Admin";
import { Users } from "./collections/User";

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
  collections: [Admins, Users, Posts, Offers],
  localization: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  globals: [],
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
});
