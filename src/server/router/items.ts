import { createRouter } from "./context";
import { z } from "zod";

export const allItems = createRouter().query("getAll", {
  async resolve({ ctx }) {},
});
