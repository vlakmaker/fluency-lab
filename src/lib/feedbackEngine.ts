// src/lib/feedbackEngine.ts

import { debugLog } from "../utils/debug";
import { callLLM } from "./callLLM";

export type FeedbackRequest = {
    directive: string;
    role: string;
    example?: string;
    outputFormat?: string;
    context?: string;
    apiKey: string;
    model: string;
};

export type FeedbackResult = {
    score: number;
    tips: string;
    sections: {
        role: string;
        directive: string;
        example: string;
        format: string;
        context: string;
    };
};

export async function callFeedbackEngine({
    directive,
    role,
    example = "",
    outputFormat = "",
    context = "",
    apiKey,
    model,
}: FeedbackRequest): Promise<FeedbackResult> {
    const evaluationPrompt = `
You are an expert AI prompt engineer and a helpful mentor for the Generalist World community.
Your task is to review the structure of a user's prompt and provide clear, constructive advice.

The user provided this prompt draft:
- Role: ${role || "Not provided"}
- Directive: ${directive || "Not provided"}
- Example: ${example || "None"}
- Output Format: ${outputFormat || "None"}
- Additional Context: ${context || "None"}

Follow these steps:
1. Briefly evaluate each section.
2. Give a final score out of 10 based on clarity and effectiveness.
3. Provide one specific, actionable tip for improvement.

Respond in this exact JSON format. IMPORTANT: You MUST include all keys in the "review" object. Do not include any text or markdown formatting outside of the JSON object.

{
  "review": {
    "role": "<comment on role>",
    "directive": "<comment on directive>",
    "example": "<comment on example>",
    "format": "<comment on format>",
    "context": "<comment on context>"
  },
  "score": <score_integer>,
  "tip": "<one specific, actionable suggestion>"
}
`.trim();

    const response = await callLLM({
        prompt: evaluationPrompt,
        apiKey,
        model,
    });

    debugLog("🧠 Raw feedback response:", response);

    try {
        // --- NEW ROBUST JSON EXTRACTION LOGIC ---
        // Advanced models often wrap JSON in markdown. This regex finds the JSON block.
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No valid JSON object found in the AI's response.");
        }
        const jsonString = jsonMatch[0];
        // --- END OF NEW LOGIC ---

        const parsedResponse = JSON.parse(jsonString); // We now parse the cleaned string
        const { review, score, tip } = parsedResponse;

        if (score === undefined || !tip) {
            throw new Error("Missing score or tip in feedback JSON.");
        }

        const defaultSections = {
            role: "Not reviewed.",
            directive: "Not reviewed.",
            example: "Not reviewed.",
            format: "Not reviewed.",
            context: "Not reviewed.",
        };

        const completeSections = { ...defaultSections, ...review };

        return {
            score: score,
            tips: tip,
            sections: completeSections,
        };
    } catch (e) {
        console.error("Failed to parse feedback JSON:", e);
        throw new Error("⚠️ Failed to get structured feedback from the AI. It might be busy or the response format changed.");
    }
}