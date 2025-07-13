// src/utils/callLLM.ts
export async function callLLM(prompt: string): Promise<string> {
    const apiKey = localStorage.getItem('apiKey')

    if (!apiKey) {
        throw new Error('No API key found. Please set your API key in the navbar.')
    }

    const response = await fetch('https://api.openrouter.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        }),
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()

    // Return the AI’s reply text
    return data.choices?.[0]?.message?.content ?? '(No response)'
}
