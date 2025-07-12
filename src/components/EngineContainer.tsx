// src/components/EngineContainer.tsx
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    ListItem,
    Stack,
    Text,
    Textarea,
    UnorderedList
} from '@chakra-ui/react'
import { useState } from 'react'

export default function EngineContainer({ config }: { config: any }) {
    const [directive, setDirective] = useState('')
    const [role, setRole] = useState('')
    const [example, setExample] = useState('')
    const [outputFormat, setOutputFormat] = useState('')
    const [context, setContext] = useState('')
    const [preview, setPreview] = useState('')
    const [response, setResponse] = useState('')
    const [promptFeedback, setPromptFeedback] = useState('')

    const handlePreview = () => {
        const parts = [
            role && `Act as ${role}`,
            directive,
            context && `Context: ${context}`,
            example && `Example: ${example}`,
            outputFormat && `Format: ${outputFormat}`,
        ].filter(Boolean)
        setPreview(parts.join('\n\n'))
    }

    const handleCastSpell = () => {
        if (!preview) return

        const simulatedResponse = `🧙‍♂️ AI Response:\n"${preview}"\n\n(This is where your LLM output will appear.)`
        const simulatedFeedback = `📝 Coach's Feedback:\n- Your directive could be more specific.\n- Try including tone or audience guidance.\n- Add examples when possible for clarity.`

        setResponse(simulatedResponse)
        setPromptFeedback(simulatedFeedback)
    }

    return (
        <Box maxW="800px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="md">
            <Heading as="h2" size="lg" color="primary" mb={4}>
                {config?.title || 'Experiment'}
            </Heading>
            <Text mb={4}>{config?.description}</Text>

            {/* Challenges Section */}
            {config?.challenges && (
                <Box mb={6}>
                    <Heading as="h3" size="md" mb={2}>🧪 Practice Challenges</Heading>
                    <UnorderedList spacing={2} pl={4}>
                        {config.challenges.map((challenge: string, idx: number) => (
                            <ListItem key={idx}>{challenge}</ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            )}

            <Divider my={4} />

            {/* Prompt Builder */}
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Directive</FormLabel>
                    <Input value={directive} onChange={(e) => setDirective(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel>Role (optional)</FormLabel>
                    <Input value={role} onChange={(e) => setRole(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel>Example (optional)</FormLabel>
                    <Textarea value={example} onChange={(e) => setExample(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel>Output Format (optional)</FormLabel>
                    <Input value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel>Additional Context (optional)</FormLabel>
                    <Textarea value={context} onChange={(e) => setContext(e.target.value)} />
                </FormControl>

                <Button colorScheme="purple" onClick={handlePreview}>
                    Preview Prompt
                </Button>

                {preview && (
                    <Box p={4} bg="gray.50" borderRadius="md" whiteSpace="pre-wrap">
                        <Text fontWeight="bold" mb={2}>Prompt Preview:</Text>
                        <Text>{preview}</Text>
                    </Box>
                )}

                <Button colorScheme="yellow" onClick={handleCastSpell}>
                    Cast Spell ✨
                </Button>

                {response && (
                    <Box mt={4} p={4} bg="gray.100" borderRadius="md" whiteSpace="pre-wrap">
                        <Text fontWeight="bold" mb={2}>AI Response:</Text>
                        <Text>{response}</Text>
                    </Box>
                )}

                {promptFeedback && (
                    <Box mt={4} p={4} bg="yellow.50" borderRadius="md" whiteSpace="pre-wrap">
                        <Text fontWeight="bold" mb={2}>Coach's Feedback:</Text>
                        <Text>{promptFeedback}</Text>
                    </Box>
                )}
            </Stack>
        </Box>
    )
}
