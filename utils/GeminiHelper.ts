import { GoogleGenAI } from "@google/genai";
// import { GEMINI_API_KEY } from "@env";
// import dotenv from "dotenv";
// dotenv.config();

type messageRole = "user" | "model"
interface messgeparts {
    text: string
}
interface message {
    role: messageRole,
    parts: messgeparts[]
}

interface messageHistory extends Array<message> { }

interface geminiConfig {
    temp: number,
    topP: number,
    resposType: string,
}

interface chatSetting {
    tempertaure: number,
    model: string,
    sysInstruction: string
}

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY

// const api = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("API key not found");

// Initialize Gemini
const AI = new GoogleGenAI({ apiKey: apiKey })
// const AI = new GoogleGenAI({ apiKey: api })

// export const cahtWithGemini = async(
//     userMessage:string , 
//     history: messageHistory , 
//     setting: chatSetting
// ): Promise<string>=>{

// }

export async function main(input: string) {
    const response = await AI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
    });
    console.log(response.text);
}

