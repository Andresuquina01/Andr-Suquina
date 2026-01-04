
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateDesignInspiration(topic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere 3 ideias criativas de design gráfico para: ${topic}. Para cada ideia, forneça um título, uma descrição curta e 3 palavras-chave.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "description", "keywords"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async generateColorPalette(mood: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Crie uma paleta de cores harmoniosa baseada no clima/conceito: ${mood}. Retorne o nome da paleta, uma descrição do porquê dessas cores e 5 códigos hexadecimais.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            colors: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["name", "description", "colors"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getChatResponse(message: string, history: { role: string, parts: { text: string }[] }[]) {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "Você é um mentor sênior de design gráfico brasileiro. Ajude outros designers com críticas construtivas, dicas de ferramentas e tendências. Seja amigável e inspirador."
      }
    });
    
    const response = await chat.sendMessage({ message });
    return response.text;
  },

  async getBusinessAdvice(context: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Como um consultor de negócios para designers, analise ou ajude com o seguinte: ${context}. Forneça uma estimativa de preço sugerida (em Reais), tempo de entrega e 3 dicas profissionais para fechar o contrato.`,
    });
    return response.text;
  }
};
