
import { GoogleGenAI, Type } from "@google/genai";

// Strictly follow initialization guidelines for GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeComplaint = async (complaintText: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this machinery complaint into a professional action item: "${complaintText}"`,
      config: {
        systemInstruction: "You are a technical support supervisor for HiTech Machinery. Keep summaries concise and professional.",
      }
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI summary.";
  }
};

export const getProductRecommendations = async (customerNeeds: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these customer needs: "${customerNeeds}", recommend 3 types of industrial machinery from HiTech Machinery. Return as a plain comma-separated list.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return ["Standard Lathe X1", "Industrial Milling Unit", "Precision CNC"];
  }
};
