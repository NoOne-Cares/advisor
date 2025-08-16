import { GoogleGenAI, Type } from "@google/genai";
import { useState } from 'react';
import products from './products.json';
import type {
    GeminiProductRecommendation,
    Product
} from './types';


const typedProducts: Product[] = products;
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY
if (!apiKey) throw new Error("API key not found");
const AI = new GoogleGenAI({ apiKey: apiKey })

export const useProductRecommender = () => {
    const [recommendation, setRecommendation] = useState<GeminiProductRecommendation | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const categoryList = Array.from(new Set(typedProducts.map(p => p.category)));

    const recommend = async (query: string) => {
        setLoading(true);
        setError(null);
        setRecommendation(null);

        const categoryPrompt = `
                Given the following product categories:
                ${categoryList.join(', ')}

                User query: "${query}"

                Respond only in JSON format like this:
                { "matchedCategory": "Kitchen Essentials"}

                If no category matches:
                { "matchedCategory": null }
                `;

        try {

            const categoryRes = await AI.models.generateContent({
                model: "gemini-2.5-flash",
                contents: categoryPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            matchedCategory: { type: Type.STRING },
                        },
                        required: ["matchedCategory"],
                    },
                },
            });

            const response = categoryRes.text
            if (!response) return
            const categoryParsed = JSON.parse(response);
            if (!categoryParsed.matchedCategory) {
                setRecommendation({
                    cetegory: "",
                    product_name: "No Product found",
                    price: 0,
                    reason: ""
                });
                setLoading(false)
                return;
            }

            const categoryProducts = typedProducts.filter(
                p => p.category.toLowerCase() === categoryParsed.matchedCategory!.toLowerCase()
            );

            if (categoryProducts.length === 0) {
                setRecommendation({
                    cetegory: "",
                    product_name: "No Product found",
                    price: 0,
                    reason: ""
                });
                setLoading(false)
                return;
            }

            const productsAsText = categoryProducts.map(p => (
                `- ${p.product_name} by ${p.brand}: ${p.description} (₹${p.price})`
            )).join('\n');

            const productPrompt = `
                A user is interested in: "${query}".

                Here are products from the matched category "${categoryParsed.matchedCategory}":

                ${productsAsText}
                
                Pick one product that best fits the query.
                And write the reson like you are selling the product and why the user should buy it
                and keep it professional and short.
                Respond only in JSON format like:
                {
                "cetegory":"Kitchen",
                "product_name": "Smart Water Bottle",
                "price": 2002,
                "reason": "Helps track hydration which is what user asked about."
                }
                `;

            const productRes = await AI.models.generateContent({
                model: "gemini-2.5-flash",
                contents: productPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            cetegory: { type: Type.STRING },
                            product_name: { type: Type.STRING },
                            price: { type: Type.INTEGER },
                            reason: { type: Type.STRING },
                        },
                        required: ["product_name", "reason", "cetegory", "price"],
                    },
                },
            });

            const recommendResponse = productRes.text
            if (!recommendResponse) return
            const matchedProduct = JSON.parse(recommendResponse);


            if (matchedProduct) {
                setRecommendation(matchedProduct);
                setLoading(false)
            } else {
                setRecommendation({
                    cetegory: "",
                    product_name: "No Product found",
                    price: 0,
                    reason: ""
                });
                setLoading(false)
            }
            //function to genearte ai_conversation_log.md

            // if (recommendation) {
            //     logRecommendationToFile(query, recommendation)
            // }

        } catch (err: any) {
            console.error(err);
            setError("Error getting product recommendation.");
        } finally {
            setLoading(false);
        }
    };

    return { recommend, recommendation, loading, error }
};
