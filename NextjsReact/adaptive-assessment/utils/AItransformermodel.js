
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-pro",
//   generationConfig: {
//     temperature: 0.7,
//     topP: 1,
//     topK: 1,
//     maxOutputTokens: 2048,
//   },
// });

// async function generateQuestions() {
//   const prompt = `
// Generate me 10 multiple-choice questions (MCQ) related to moderate mathematics and logical IQ. The questions must be best fit for determining a student's IQ.
// Provide the output strictly in this JSON format:

// [
//   {
//     "id": 1,
//     "question": "Sample question?",
//     "options": ["Option A", "Option B", "Option C", "Option D"],
//     "answer": "Option A"
//   },
//   ...
// ]
// Only provide valid JSON array.
// `;

//   const result = await model.generateContent(prompt);
//   const response = result.response.text();

//   const jsonStart = response.indexOf('[');
//   const jsonEnd = response.lastIndexOf(']');
//   const jsonString = response.slice(jsonStart, jsonEnd + 1);

//   try {
//     const parsed = JSON.parse(jsonString);

//     // Normalize keys: Rename 'answer' to 'correct_answer'
//     const cleanedQuestions = parsed.map((q) => ({
//       id: q.id,
//       question: q.question.trim(),
//       options: q.options.map(opt => opt.trim()),
//       correct_answer: q.answer.trim(),  // <-- Key renaming happens here!
//     }));

//     return cleanedQuestions;
//   } catch (err) {
//     console.error("Error parsing JSON:", err);
//     return []; // Return empty array on failure
//   }
// }

// module.exports = { generateQuestions };

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.9,   // Encourages variation
    topP: 1,
    topK: 40,
    maxOutputTokens: 2048,
  },
});

async function generateQuestions() {
  const randomTag = Math.random().toString(36).substring(2, 8); // Ensures prompt uniqueness

  const prompt = `
Generate me 10 **unique** multiple-choice questions (MCQs) related to moderate-level mathematics and logical IQ. 
Each run should produce completely different questions with varied topics, structures, and numbers. 
Include a mix of patterns, logic, arithmetic puzzles, etc.
[Prompt ID: ${randomTag}]

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
    const response = result.response.text();

    const jsonStart = response.indexOf('[');
    const jsonEnd = response.lastIndexOf(']');
    const jsonString = response.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(jsonString);

    const cleanedQuestions = parsed.map((q) => ({
      id: q.id,
      question: q.question.trim(),
      options: q.options.map(opt => opt.trim()),
      correct_answer: q.answer.trim(),
    }));

    return cleanedQuestions;
  } catch (err) {
    console.error("Error generating or parsing questions:", err);
    return [];
  }
}

module.exports = { generateQuestions };
