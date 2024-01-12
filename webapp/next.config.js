// next.config.js
const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  dynamicStartUrl: true,
  workboxOptions: {
    maximumFileSizeToCacheInBytes: 10000000,
    disableDevLogs: true,
  },
});

module.exports = withPayload(
  withPWA({
    // your Next config here
    reactStrictMode: true,
  }),
  {
    // The second argument to `withPayload`
    // allows you to specify paths to your Payload dependencies
    // and configure the admin route to your Payload CMS.

    // Point to your Payload config (required)
    configPath: path.resolve(__dirname, "./src/payload/payload.config.ts"),

    // Point to your exported, initialized Payload instance (optional, default shown below`)
    payloadPath: path.resolve(process.cwd(), "./src/payload/payloadClient.ts"),

    // Set a custom Payload admin route (optional, default is `/admin`)
    // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
    adminRoute: "/admin",
  }
);
