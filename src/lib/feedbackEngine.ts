// src/lib/feedbackEngine.ts

import { debugLog } from "../utils/debug";
import { callLLM } from "./callLLM";

// --- UPDATED: The request can now optionally include a rawPrompt ---
export type FeedbackRequest = {
    directive?: string;
    role?: string;
    example?: string;
    outputFormat?: string;
    context?: string;
    rawPrompt?: string; // This is the new field
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

export async function callFeedbackEngine(request: FeedbackRequest): Promise<FeedbackResult> {
    let evaluationPrompt = "";

    // --- NEW: Logic to choose the correct meta-prompt ---
    if (request.rawPrompt) {
        // SCENARIO 1: We have a raw prompt. Ask the AI to deconstruct AND review.
        evaluationPrompt = `
You are an expert AI prompt engineer. Your task is to analyze and deconstruct a user's raw prompt, then provide feedback.

THE USER'S RAW PROMPT:
"""
${request.rawPrompt}
"""

YOUR STEPS:
1. First, deconstruct the raw prompt into its core components: Role, Directive, Context, Example, and Output Format. If a component is not present, state that.
2. After deconstructing, briefly evaluate each component you found.
3. Give a final score out of 10 based on the overall prompt's clarity and effectiveness.
4. Provide one specific, actionable tip for improvement.

Respond in this exact JSON format. IMPORTANT: You MUST include all keys.

{
  "review": {
    "role": "<comment on the role you identified>",
    "directive": "<comment on the directive you identified>",
    "example": "<comment on the example you identified>",
    "format": "<comment on the output format you identified>",
    "context": "<comment on the context you identified>"
  },
  "score": <score_integer>,
  "tip": "<one specific, actionable suggestion>"
}
`.trim();
    } else {
        // SCENARIO 2: We have structured fields. Use the original review prompt.
        evaluationPrompt = `
You are an expert AI prompt engineer and a helpful mentor. Your task is to review the structure of a user's prompt and provide constructive advice.

The user provided this draft:
- Role: ${request.role || "Not provided"}
- Directive: ${request.directive || "Not provided"}
- Example: ${request.example || "None"}
- Output Format: ${request.outputFormat || "None"}
- Additional Context: ${request.context || "None"}

Follow these steps:
1. Briefly evaluate each section.
2. Give a final score out of 10.
3. Provide one specific, actionable tip.

Respond in this exact JSON format. IMPORTANT: You MUST include all keys in the "review" object.

{
  "review": { "role": "<comment>", "directive": "<comment>", "example": "<comment>", "format": "<comment>", "context": "<comment>" },
  "score": <score_integer>,
  "tip": "<one specific, actionable suggestion>"
}
`.trim();
    }

    const response = await callLLM({
        prompt: evaluationPrompt,
        apiKey: request.apiKey,
        model: request.model,
    });

    debugLog("🧠 Raw feedback response:", response);

    // The robust parsing logic remains the same and will work for both scenarios.
    try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No valid JSON object found in the AI's response.");

        const jsonString = jsonMatch[0];
        const parsedResponse = JSON.parse(jsonString);
        const { review, score, tip } = parsedResponse;

        if (score === undefined || !tip) throw new Error("Missing score or tip in feedback JSON.");

        const defaultSections = { role: "Not reviewed.", directive: "Not reviewed.", example: "Not reviewed.", format: "Not reviewed.", context: "Not reviewed." };
        const completeSections = { ...defaultSections, ...review };

        return { score: score, tips: tip, sections: completeSections };
    } catch (e) {
        console.error("Failed to parse feedback JSON:", e);
        throw new Error("⚠️ Failed to get structured feedback from the AI. It might be busy or the response format changed.");
    }
}