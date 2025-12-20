import { type SchemaTypeDefinition } from "sanity";
import faq from "./faq";
import review from "./review";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [faq, review],
};
