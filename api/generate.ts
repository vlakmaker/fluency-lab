// api/generate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt, model } = req.body;
    let authHeader = req.headers.authorization;
    if (Array.isArray(authHeader)) {
        authHeader = authHeader[0];
    }
    const userApiKey = (authHeader || '').replace(/^Bearer\s*/, '').trim();

    if (!userApiKey) {
        return res.status(401).json({ error: 'API key is missing.' });
    }
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        const llmResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userApiKey}`,
            },
            body: JSON.stringify({
                model: model || 'openai/gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        const responseText = await llmResponse.text();
        if (!llmResponse.ok) {
            return res.status(llmResponse.status).json({ error: `OpenRouter Error: ${responseText}` });
        }

        return res.status(200).send(responseText);

    } catch (err: any) {
        console.error('[API PROXY ERROR]', err);
        return res.status(500).json({ error: 'The server proxy encountered an unhandled error.' });
    }
}