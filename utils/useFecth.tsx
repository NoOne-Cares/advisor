import axios from 'axios';

import { useState } from 'react';


import products from './products.json'; // or '../data/products.json'



// Types
type Product = {
    brand: string;
    product_name: string;
    price: number;
    category: string;
    description: string;
};

type GeminiCategoryResponse = {
    matchedCategory: string | null;
    reason: string;
};

type GeminiProductRecommendation = {
    product_name: string;
    reason: string;
};

const typedProducts: Product[] = products;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with secure env variable

export const useProductRecommender = () => {
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const categoryList = Array.from(new Set(typedProducts.map(p => p.category)));

    const recommend = async (query: string) => {
        setLoading(true);
        setError(null);
        setRecommendation(null);

        // Step 1: Match query to category
        const categoryPrompt = `
Given the following product categories:
${categoryList.join(', ')}

User query: "${query}"

Respond only in JSON format like this:
{ "matchedCategory": "Kitchen Essentials", "reason": "User asked about cooking tools." }

If no category matches:
{ "matchedCategory": null, "reason": "No matching category found." }
`;

        try {
            const categoryRes = await axios.post(
                `${GEMINI_API_URL}?key=${API_KEY}`,
                {
                    contents: [{ parts: [{ text: categoryPrompt }] }]
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const categoryText = categoryRes.data.candidates?.[0]?.content?.parts?.[0]?.text;
            const categoryParsed: GeminiCategoryResponse = JSON.parse(categoryText);

            if (!categoryParsed.matchedCategory) {
                setRecommendation(`No matching category. Reason: ${categoryParsed.reason}`);
                return;
            }

            const categoryProducts = productsList.filter(
                p => p.category.toLowerCase() === categoryParsed.matchedCategory!.toLowerCase()
            );

            if (categoryProducts.length === 0) {
                setRecommendation(`Matched category "${categoryParsed.matchedCategory}", but no products found.`);
                return;
            }

            // Step 2: Recommend product from category
            const productsAsText = categoryProducts.map(p => (
                `- ${p.product_name} by ${p.brand}: ${p.description} ($${(p.price / 100).toFixed(2)})`
            )).join('\n');

            const productPrompt = `
A user is interested in: "${query}".

Here are products from the matched category "${categoryParsed.matchedCategory}":

${productsAsText}

Pick one product that best fits the query. Respond only in JSON format like:
{
  "product_name": "Smart Water Bottle",
  "reason": "Helps track hydration which is what user asked about."
}
`;

            const productRes = await axios.post(
                `${GEMINI_API_URL}?key=${API_KEY}`,
                {
                    contents: [{ parts: [{ text: productPrompt }] }]
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const productText = productRes.data.candidates?.[0]?.content?.parts?.[0]?.text;
            const productParsed: GeminiProductRecommendation = JSON.parse(productText);

            const matchedProduct = categoryProducts.find(
                p => p.product_name.toLowerCase() === productParsed.product_name.toLowerCase()
            );

            if (!matchedProduct) {
                setRecommendation(`Gemini suggested "${productParsed.product_name}", but it wasn't found in the list.`);
                return;
            }

            setRecommendation(
                `✅ Recommended: ${matchedProduct.product_name} by ${matchedProduct.brand} ($${(matchedProduct.price / 100).toFixed(2)})\n\nReason: ${productParsed.reason}`
            );
        } catch (err: any) {
            console.error(err);
            setError("❌ Error getting product recommendation.");
        } finally {
            setLoading(false);
        }
    };

    return { recommend, recommendation, loading, error };
};
