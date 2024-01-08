import "ignore-styles";
import "dotenv/config";
import { getPayloadClient } from "../payloadClient";

import { seedCategories } from "./categories";
import { seedPartners } from "./partners";
import { seedDiscounts } from "./discounts";

export const seedData = async () => {
  try {
    const payload = await getPayloadClient({
      seed: true,
    });

    await payload.create({
      collection: "admins",
      data: {
        email: "admin@test.loc",
        firstName: "Admin",
        lastName: "Test",
        password: "admin123",
      },
    });

    await payload.create({
      collection: "users",
      data: {
        email: "user@test.loc",
        firstName: "User",
        lastName: "Test",
        password: "user123",
      },
    });

    await seedCategories(payload);

    await seedPartners(payload);

    await seedDiscounts(payload);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
};

seedData();
