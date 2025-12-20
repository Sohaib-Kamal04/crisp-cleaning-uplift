import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Client Reviews",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Client Role",
      type: "string", // e.g. "Home Owner", "CEO"
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Review Content",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      initialValue: 5,
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "avatarInitials",
      title: "Avatar Initials",
      type: "string",
      description: 'e.g. "JD" for John Doe',
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "featured",
      title: "Featured Review?",
      type: "boolean",
      initialValue: true,
      description: "Toggle this ON to show it on the homepage carousel.",
    }),
  ],
});
