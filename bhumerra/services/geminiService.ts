
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const getGeminiResponse = async (userMessage: string, history: {role: 'user' | 'assistant', content: string}[]) => {
  try {
    // Correctly initialize GoogleGenAI right before the API call using process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const formattedHistory = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Access the .text property directly (not as a function) from the response.
    return response.text || "I apologize, but I am momentarily unable to assist. How else may I elevate your experience?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The luxury digital suite is experiencing high traffic. Please try again shortly.";
  }
};
