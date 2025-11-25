import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiRecommendation = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `El usuario está buscando recomendaciones o tiene dudas sobre mates, bombillas y accesorios. 
      Actúa como un experto artesano matero con años de experiencia ("Don Matero").
      Tu tono debe ser amable, cálido y conocedor.
      Responde de forma concisa (máximo 2 párrafos).
      
      Consulta del usuario: "${query}"`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Disculpa, estoy cebando unos mates y me distraje. ¿Podrías preguntar de nuevo?";
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Tuve un problema de conexión con el taller. Por favor intenta más tarde.";
  }
};