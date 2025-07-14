// src/pages/HelpPage.tsx

import { CheckCircleIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Box, Divider, Heading, Link, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/react';
import Navbar from '../components/NavBar';

// A small helper component for FAQ items to keep the code clean
const FaqItem = ({ question, children }: { question: string, children: React.ReactNode }) => (
    <Box>
        <Heading as="h4" size="sm" mb={2} color="gray.800">
            {question}
        </Heading>
        <Text color="gray.700">{children}</Text>
    </Box>
);

export default function HelpPage() {
    return (
        <>
            <Navbar />
            <Box bg="gray.50" minH="100vh" py={{ base: 8, md: 16 }} px={4}>
                <Box maxW="800px" mx="auto" bg="white" p={{ base: 6, md: 8 }} borderRadius="lg" boxShadow="lg">
                    <Stack spacing={8}>
                        <Box textAlign="center">
                            <Heading as="h1" size="xl" color="purple.600">
                                Fluency Lab Help Center
                            </Heading>
                            <Text mt={2} color="gray.600" fontSize="lg">
                                Your guide to mastering AI-powered prompting.
                            </Text>
                        </Box>

                        <Divider />

                        {/* --- THIS IS THE UPDATED, MORE DETAILED SECTION --- */}
                        <Stack spacing={4}>
                            <Heading as="h2" size="lg">Getting Started: Your API Key</Heading>
                            <Text>
                                Fluency Lab uses a "Bring Your Own Key" (BYOK) model. This gives you full control over your usage and costs. To start, you'll need an API key from a provider that supports many different AI models. We highly recommend <Link href="https://openrouter.ai/auth/sign-up" isExternal color="purple.500" fontWeight="bold">OpenRouter.ai</Link>.
                            </Text>

                            <Heading as="h3" size="md" pt={2}>How to get your OpenRouter Key:</Heading>
                            <List spacing={3} pl={2}>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    <strong>1. Go to OpenRouter:</strong> Click this link to go directly to the <Link href="https://openrouter.ai/auth/sign-up" isExternal color="purple.500" fontWeight="bold">OpenRouter Sign Up page</Link> and create a free account.
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    <strong>2. Add Credits (Important):</strong> After signing in, go to your "Credits" page. You must add a small amount of credits (e.g., $1.00) to activate your account's API access. This is required by OpenRouter.
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    <strong>3. Create Your API Key:</strong> Navigate to your "Keys" page (you can find it in the user menu). Click "Create Key", give it a name (like "FluencyLabKey"), and copy the key that appears.
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    <strong>4. Set Your Key in Fluency Lab:</strong> Come back to this app and click the "Set API Key" button in our top navigation bar. Paste the key you just copied.
                                </ListItem>
                            </List>
                            <Alert status="info" borderRadius="md" mt={2}>
                                <AlertIcon />
                                <Box>
                                    <Text fontWeight="bold">Your Privacy is Paramount:</Text>
                                    <Text>Your API key is stored only in your browser's local storage and is never sent to our servers for storage. It is used directly from your browser to our secure API proxy for each request you make.</Text>
                                </Box>
                            </Alert>
                        </Stack>

                        <Divider />

                        <Stack spacing={4}>
                            <Heading as="h2" size="lg">Using the Prompt Engine</Heading>
                            <Text>The lab has two modes for crafting prompts, accessible via tabs:</Text>
                            <Box pl={4} borderLeft="4px" borderColor="purple.200" py={2}>
                                <Heading as="h3" size="md" mb={2}>1. The Structured Builder</Heading>
                                <Text>
                                    Perfect for learning and experimentation. This mode breaks a prompt down into its essential components. Use the tooltips (<QuestionOutlineIcon display="inline-block" verticalAlign="middle" />) next to each field to learn why it's important. This is also where you can use the **Prompt Feedback Engine** to get an AI-powered analysis of your prompt structure.
                                </Text>
                            </Box>
                            <Box pl={4} borderLeft="4px" borderColor="gray.200" py={2}>
                                <Heading as="h3" size="md" mb={2}>2. The Raw Editor</Heading>
                                <Text>
                                    For power users and complex prompts. This gives you a single large text area to write or paste any prompt you like, giving you maximum flexibility. You can still get feedback on your raw prompts here.
                                </Text>
                            </Box>
                        </Stack>

                        <Divider />

                        <Stack spacing={6}>
                            <Heading as="h2" size="lg">Frequently Asked Questions (FAQ)</Heading>
                            <FaqItem question="Why did I get an 'API Key' error?">
                                This usually happens for one of three reasons: 1) The key was pasted incorrectly, 2) Your OpenRouter account is out of credits, or 3) The specific AI model you selected is temporarily unavailable. Try checking your key and your OpenRouter balance first.
                            </FaqItem>
                            <FaqItem question="Why did the 'Get Prompt Feedback' fail?">
                                The feedback engine uses an AI to analyze your prompt. Sometimes, especially with advanced models like GPT-4o, the AI might format its response in a way our app doesn't expect. If this happens, try a simpler model like Mistral 7B for the feedback, or try rephrasing your inputs slightly.
                            </FaqItem>
                            <FaqItem question="Where can I learn more?">
                                Fluency Lab is a companion tool for the Generalist World AI Fluency framework. Join the community to learn more about strategy, prompting, and building with AI.
                            </FaqItem>
                        </Stack>

                    </Stack>
                </Box>
            </Box>
        </>
    );
}