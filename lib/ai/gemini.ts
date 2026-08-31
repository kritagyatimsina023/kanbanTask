import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export const geminiService = {
  async generateWorkFlow(title: string, description: string | null) {
    const prompt = `
You are an AI workflow planner.

Create a practical step-by-step workflow for the following task.

Task title:
${title}

Task description:
${description ?? "No description provided."}

Return a clear workflow that a developer can follow.

For each step include:
1. Step title
2. What needs to be done
3. Expected outcome

Keep the workflow practical and concise.
`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });
    return response.text;
  },
};
