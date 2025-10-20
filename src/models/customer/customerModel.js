import { getDB, mongoConnect } from "../../config/mongoConfig.js";

export const getAllCustomers = async () => {
  await mongoConnect();
  const db = getDB();

  const customers = await db
    .collection("customers")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return customers;
};
