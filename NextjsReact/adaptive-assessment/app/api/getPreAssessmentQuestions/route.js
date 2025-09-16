// import { generateQuestions } from "@/utils/AItransformermodel";

// export async function GET() {
//   try {
//     const questions = await generateQuestions();

//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error("Failed to parse questions");
//     }

//     return new Response(JSON.stringify(questions), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error generating questions:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch questions" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.9,
    topP: 1,
    topK: 40,
    maxOutputTokens: 2048,
  },
});

export const GET = async () => {
  const prompt = `
Generate me 10 **unique** multiple-choice questions (MCQs) related to moderate-level mathematics and logical IQ. 
Each run should produce completely different questions with varied topics, structures, and numbers. 
Include a mix of patterns, logic, arithmetic puzzles, etc.

Strictly respond in this JSON format only:
[
  {
    "id": 1,
    "question": "Sample question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  },
  ...
]
Only provide a valid JSON array. No explanations.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonStart = responseText.indexOf("[");
    const jsonEnd = responseText.lastIndexOf("]");
    const jsonString = responseText.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(jsonString);

    if (!Array.isArray(parsed)) {
      throw new Error("Parsed JSON is not an array.");
    }
    
    return NextResponse.json(parsed, { status: 200 });

  } catch (err) {
    console.error("Error generating pre-assessment questions:", err);
    return NextResponse.json({
      error: "Failed to generate questions. Please try again.",
      details: err.message
    }, { status: 500 });
  }
};

