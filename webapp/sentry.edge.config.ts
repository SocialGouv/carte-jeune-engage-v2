// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV !== "development" && process.env.NEXT_PUBLIC_ENV_APP) {
  Sentry.init({
    dsn: "https://a225262302b847f2baff3c42466efd6b@sentry.fabrique.social.gouv.fr/105",
    environment: process.env.NEXT_PUBLIC_ENV_APP,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
