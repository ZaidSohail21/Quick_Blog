// import { GoogleGenAI } from "@google/genai";

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

// async function main(prompt) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
//   return response.text;
// }
// export default main;
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // ✅ Safely extract text
    const content =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    return content;
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return null;
  }
}

export default main;
