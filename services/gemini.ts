
import { GoogleGenAI } from "@google/genai";

export const getQuestionExplanation = async (questionText: string, options: string[], correctAnswer: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the following CUET PG MCA question in detail. 
      Question: ${questionText}
      Options: ${options.join(', ')}
      Correct Answer: ${correctAnswer}
      
      Provide a step-by-step logical explanation suitable for a graduate student. Use Markdown for formatting.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Sorry, I couldn't generate an explanation at this time.";
  } catch (error) {
    console.error("Error fetching explanation from Gemini:", error);
    return "An error occurred while fetching the explanation. Please try again.";
  }
};
