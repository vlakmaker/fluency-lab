// src/lib/callLLM.ts

type LLMRequest = {
    prompt: string;
    apiKey: string;
    model: string;
};

/**
 * A simple wrapper to call our API proxy and get the AI's response content.
 */
export async function callLLM({ prompt, apiKey, model }: LLMRequest): Promise<string> {
    const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ prompt, model })
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'The LLM call failed');
    }

    const jsonData = await res.json();
    return jsonData.choices[0].message.content || '';
}