import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "Frequently Asked Questions",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Used to sort the FAQs (1, 2, 3...)",
      initialValue: 0,
    }),
  ],
});
