import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const apikey = process.env.GEMINI_API_KEY;
if (!apikey) {
    console.log("no api key found");
    throw Error("aaaaaaaaaaaa");
}
console.log(apikey);
const ai = new GoogleGenAI({
    apiKey: apikey,
});

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

main();
