import { client } from "@/sanity/lib/client"; // Adjust path to your sanity client
import FAQsClient from "@/components/FAQsClient"; // Adjust path to the component created in Step 2

// 1. Define GROQ Query
const query = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

// 2. Fetch data (Server Component)
export default async function FAQsPage() {
  const data = await client.fetch(query, {}, { cache: "no-store" });
  // 'no-store' ensures fresh data on every visit.
  // Change to 'force-cache' or use 'revalidate' for Static Site Generation (SSG).

  return <FAQsClient data={data} />;
}
