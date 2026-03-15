import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { title, description, question, currentProgress } = await req.json();

    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
            error: "Google GenAI API Key missing. Please add GOOGLE_GENAI_API_KEY to your .env file.",
            hint: "Check if the hashing logic involves concatenating strings or treating them as bytes. (Simulated Hint)" 
        }),
        { status: 200 } // Returning 200 with a fallback hint for demo purposes
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `
      You are the AI Tutor, a Socratic mentor for blockchain technology.
      Your goal is to guide students to discover answers through first-principles reasoning.
      
      RULES:
      1. DO NOT provide the answer.
      2. DO NOT provide code snippets.
      3. Provide a subtle, encouraging hint that points to the underlying logic.
      4. If the student is stuck on hashing, talk about deterministic mapping.
      5. If they are stuck on immutability, talk about the integrity of the chain link.
    `;

    const prompt = `
      Context:
      Lesson Title: ${title}
      Lesson Description: ${description}
      Current Question/Task: ${question}
      User Progress: ${currentProgress}
      
      Please provide a short, Socratic hint for this student.
    `;

    const result = await model.generateContent([systemInstruction, prompt]);
    const response = await result.response;
    const hint = response.text();

    return new Response(JSON.stringify({ hint }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI Hint Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate hint" }), {
      status: 500,
    });
  }
}
