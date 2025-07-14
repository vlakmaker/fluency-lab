// src/components/EngineContainer.tsx

import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
    Alert, AlertIcon, Box, Button, Divider, FormControl, FormLabel,
    Icon,
    Input,
    Select, Spinner, Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text, Textarea,
    Tooltip
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ExperimentForm from '../configs//ExperimentForm';
import { useApiKey } from '../context/ApiKeyContext';
import type { ExperimentConfig } from '../data/experiments';

// --- UPDATED: Corrected model IDs and better model selection ---
const MODEL_OPTIONS = [
    { value: 'mistralai/mistral-7b-instruct', label: 'Mistral 7B Instruct' },
    { value: 'anthropic/claude-3-haiku', label: 'Anthropic Claude 3 Haiku (Fast & Capable)' },
    { value: 'openai/gpt-4o', label: 'OpenAI: GPT-4o' },
    { value: 'google/gemini-flash-1.5', label: 'Google Gemini Pro 1.5 Flash (Large Context)' },
];

export default function EngineContainer({ config }: { config: ExperimentConfig }) {
    const { apiKey } = useApiKey();
    const [tabIndex, setTabIndex] = useState(0);
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

    useEffect(() => {
        if (config && config.defaultPrompt) {
            setRawPrompt(config.defaultPrompt);
            // Default to the Raw Editor if there's a pre-filled prompt
            setTabIndex(1);
        } else {
            // Default to the Structured Builder for a blank slate
            setTabIndex(0);
        }
    }, [config]);

    const buildStructuredPrompt = () => {
        const parts = [
            role && `Act as ${role}.`,
            directive,
            context && `Use the following context:\n${context}`,
            example && `Follow this example:\n${example}`,
            outputFormat && `Provide the output in this format:\n${outputFormat}`
        ].filter(Boolean);
        return parts.join('\n\n');
    };

    const handleConvertToRaw = () => {
        const structuredPrompt = buildStructuredPrompt();
        setRawPrompt(structuredPrompt);
        setTabIndex(1);
    };

    const handlePreview = () => {
        const promptToPreview = tabIndex === 0 ? buildStructuredPrompt() : rawPrompt;
        setPreview(promptToPreview);
    };

    const handleCastSpell = async () => {
        const prompt = tabIndex === 0 ? buildStructuredPrompt() : rawPrompt;

        if (!apiKey) {
            setError('API key is not set. Please provide it in the settings sidebar.');
            return;
        }
        if (!prompt) {
            setError('Prompt is empty. Please fill out the form or enter a raw prompt.');
            return;
        }

        setLoading(true);
        setError('');
        setResponse('');
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
                body: JSON.stringify({ prompt, model: selectedModel })
            });
            const responseText = await res.text();
            if (!res.ok) {
                const errorJson = JSON.parse(responseText);
                throw new Error(errorJson.error || 'An unknown API error occurred.');
            }
            const json = JSON.parse(responseText);
            const aiContent = json.choices?.[0]?.message?.content;
            setResponse(aiContent || '(The AI returned an empty response)');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="800px" mx="auto" p={{ base: 4, md: 6 }} bg="white" borderRadius="lg" boxShadow="xl">
            <ExperimentForm config={config} />
            <Divider my={6} />

            <Stack spacing={4}>
                <FormControl>
                    <FormLabel fontWeight="bold">LLM Model</FormLabel>
                    <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} bg="white">
                        {MODEL_OPTIONS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </Select>
                </FormControl>

                <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="soft-rounded" colorScheme="purple">
                    <TabList mb={4}>
                        <Tab>Structured Builder</Tab>
                        <Tab>Raw Editor</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p={0}>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel display="flex" alignItems="center">
                                        Directive (The main command)
                                        <Tooltip label="A clear, direct verb or instruction for the AI. What do you want it to DO?" placement="top">
                                            <Icon as={QuestionOutlineIcon} ml={2} color="gray.500" />
                                        </Tooltip>
                                    </FormLabel>
                                    <Input placeholder="e.g., Summarize, rewrite, extract, compare..." value={directive} onChange={(e) => setDirective(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel display="flex" alignItems="center">
                                        Role (Optional)
                                        <Tooltip label="Tell the AI who it should be. This focuses its knowledge and sets its tone. e.g., 'an expert copywriter', 'a helpful assistant for a 5th grader'." placement="top">
                                            <Icon as={QuestionOutlineIcon} ml={2} color="gray.500" />
                                        </Tooltip>
                                    </FormLabel>
                                    <Input placeholder="e.g., An expert financial analyst" value={role} onChange={(e) => setRole(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel display="flex" alignItems="center">
                                        Additional Context (Optional)
                                        <Tooltip label="The primary text, data, or information you want the AI to work with. Paste your article, email, code, etc. here." placement="top">
                                            <Icon as={QuestionOutlineIcon} ml={2} color="gray.500" />
                                        </Tooltip>
                                    </FormLabel>
                                    <Textarea placeholder="The text to be summarized goes here..." value={context} onChange={(e) => setContext(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel display="flex" alignItems="center">
                                        Example (Optional)
                                        <Tooltip label="Show, don't just tell. Providing a clear 'Input -> Output' example is one of the best ways to get the AI to follow your desired format." placement="top">
                                            <Icon as={QuestionOutlineIcon} ml={2} color="gray.500" />
                                        </Tooltip>
                                    </FormLabel>
                                    <Textarea placeholder="Input: [Text about cats]. Output: [Summary about cats]." value={example} onChange={(e) => setExample(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel display="flex" alignItems="center">
                                        Output Format (Optional)
                                        <Tooltip label="Explicitly tell the AI how to structure its response. e.g., 'a JSON object', 'a markdown table', 'three bullet points'." placement="top">
                                            <Icon as={QuestionOutlineIcon} ml={2} color="gray.500" />
                                        </Tooltip>
                                    </FormLabel>
                                    <Input placeholder="e.g., A JSON object with 'summary' and 'tags' keys" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} />
                                </FormControl>
                                <Button onClick={handleConvertToRaw} variant="link" colorScheme="purple" size="sm" alignSelf="flex-start">
                                    ↓ Convert to Raw Prompt
                                </Button>
                            </Stack>
                        </TabPanel>
                        <TabPanel p={0}>
                            <FormControl>
                                <FormLabel>Raw Prompt</FormLabel>
                                <Textarea
                                    placeholder="Paste a complete prompt here..."
                                    value={rawPrompt}
                                    onChange={(e) => setRawPrompt(e.target.value)}
                                    rows={15}
                                />
                            </FormControl>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Button onClick={handlePreview} variant="outline" colorScheme="gray">
                    Preview Full Prompt
                </Button>

                {preview && (
                    <Box p={4} bg="gray.50" borderRadius="md" whiteSpace="pre-wrap" border="1px solid" borderColor="gray.200">
                        <Text fontWeight="bold" mb={2}>Prompt Preview:</Text>
                        <Text as="pre" fontFamily="monospace" fontSize="sm">{preview}</Text>
                    </Box>
                )}

                <Button colorScheme="purple" onClick={handleCastSpell} isDisabled={!apiKey || loading} size="lg">
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