import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Stack,
    Text,
    Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';

const MODEL_OPTIONS = [
    { value: 'mistralai/mistral-7b-instruct', label: 'Mistral 7B Instruct (Recommended)' },
    { value: 'openai/gpt-3.5-turbo', label: 'OpenAI GPT-3.5 Turbo' },
    { value: 'google/gemini-pro', label: 'Google Gemini Pro' },
    { value: 'anthropic/claude-2.1', label: 'Anthropic Claude 2.1' },
];

export default function EngineContainer() {
    const { apiKey } = useApiKey();
    const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0].value);
    const [rawPrompt, setRawPrompt] = useState('');
    const [directive, setDirective] = useState('');
    const [role, setRole] = useState('');
    const [example, setExample] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [context, setContext] = useState('');
    const [preview, setPreview] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const buildPrompt = () => {
        if (rawPrompt.trim()) return rawPrompt.trim();
        const parts = [
            role && `Act as ${role}.`,
            directive,
            context && `Use the following context:\n${context}`,
            example && `Follow this example:\n${example}`,
            outputFormat && `Provide the output in this format:\n${outputFormat}`
        ].filter(Boolean);
        return parts.join('\n\n');
    };

    const handlePreview = () => setPreview(buildPrompt());

    const handleCastSpell = async () => {
        const prompt = buildPrompt();
        if (!apiKey) {
            setError('API key is not set. Please provide it in the settings sidebar.');
            return;
        }
        if (!prompt) {
            setError('Prompt is empty. Please fill out the directive or raw prompt field.');
            return;
        }

        setLoading(true);
        setError('');
        setResponse('');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify({ prompt, model: selectedModel })
            });

            const responseText = await res.text();

            if (!res.ok) {
                try {
                    const errorJson = JSON.parse(responseText);
                    throw new Error(errorJson.error || 'An unknown API error occurred.');
                } catch {
                    throw new Error(responseText);
                }
            }

            const json = JSON.parse(responseText);
            const aiContent = json.choices?.[0]?.message?.content;
            setResponse(aiContent || '(The AI returned an empty response)');

        } catch (err: any) {
            console.error("Error in handleCastSpell:", err);
            setError(err.message || 'An unexpected error occurred. Check the console for details.');
        } finally {
            setLoading(false);
        }
    };

    const isPromptReady = !!(rawPrompt.trim() || directive.trim());

    return (
        <Box maxW="800px" mx="auto" p={6} bg="white" borderRadius="lg" boxShadow="xl">
            <Heading as="h2" size="lg" mb={4}>Fluency Lab Engine</Heading>
            <Text mb={4} color="gray.600">
                Craft a structured prompt using the fields below, or enter a complete prompt in the "Raw Prompt" box to override them.
            </Text>

            <Divider my={6} />

            <Stack spacing={4}>
                <FormControl>
                    <FormLabel fontWeight="bold">LLM Model</FormLabel>
                    <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} bg="white">
                        {MODEL_OPTIONS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Raw Prompt (Overrides all fields below)</FormLabel>
                    <Textarea
                        placeholder="Paste a complete, pre-written prompt here."
                        value={rawPrompt}
                        onChange={(e) => setRawPrompt(e.target.value)}
                        bg="gray.50"
                        rows={5}
                    />
                </FormControl>

                <FormControl isDisabled={!!rawPrompt.trim()}>
                    <FormLabel>Directive (The main command)</FormLabel>
                    <Input placeholder="e.g., Summarize the following text into three key points." value={directive} onChange={(e) => setDirective(e.target.value)} />
                </FormControl>

                <FormControl isDisabled={!!rawPrompt.trim()}>
                    <FormLabel>Role (Optional)</FormLabel>
                    <Input placeholder="e.g., An expert financial analyst" value={role} onChange={(e) => setRole(e.target.value)} />
                </FormControl>

                <FormControl isDisabled={!!rawPrompt.trim()}>
                    <FormLabel>Additional Context (Optional)</FormLabel>
                    <Textarea placeholder="The text to be summarized goes here..." value={context} onChange={(e) => setContext(e.target.value)} />
                </FormControl>

                <FormControl isDisabled={!!rawPrompt.trim()}>
                    <FormLabel>Example (Optional)</FormLabel>
                    <Textarea placeholder="Input: [Text about cats]. Output: [Summary about cats]." value={example} onChange={(e) => setExample(e.target.value)} />
                </FormControl>

                <FormControl isDisabled={!!rawPrompt.trim()}>
                    <FormLabel>Output Format (Optional)</FormLabel>
                    <Input placeholder="e.g., A JSON object with 'summary' and 'tags' keys" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} />
                </FormControl>

                <Button onClick={handlePreview} variant="outline" colorScheme="gray">
                    Preview Full Prompt
                </Button>

                {preview && (
                    <Box p={4} bg="gray.50" borderRadius="md" whiteSpace="pre-wrap" border="1px solid" borderColor="gray.200">
                        <Text fontWeight="bold" mb={2}>Prompt Preview:</Text>
                        <Text as="pre" fontFamily="monospace" fontSize="sm">{preview}</Text>
                    </Box>
                )}

                <Button colorScheme="purple" onClick={handleCastSpell} isDisabled={!isPromptReady || !apiKey || loading} size="lg">
                    {loading ? <Spinner size="sm" /> : 'Run Experiment ✨'}
                </Button>

                {error && (
                    <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {response && (
                    <Box mt={4} p={4} bg="purple.50" borderRadius="md" whiteSpace="pre-wrap" border="1px solid" borderColor="purple.200">
                        <Text fontWeight="bold" mb={2}>AI Response:</Text>
                        <Text>{response}</Text>
                    </Box>
                )}
            </Stack>
        </Box>
    );
}