import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react'

import Navbar from '../components/NavBar'

const capabilities = [
    { key: 'insight', title: '🔍 Insight Synthesis', description: 'Summarize, extract themes, distill meaning.' },
    { key: 'workflow', title: '🔁 Workflow Automation', description: 'Automate tasks, reduce repetition.' },
    { key: 'reframing', title: '🔄 Cross-Domain Reframing', description: 'Reframe ideas for different contexts.' },
    { key: 'agent', title: '🤖 Agent Collaboration', description: 'Chain agents together for tasks.' },
    { key: 'ethics', title: '⚖️ Ethical Prompting & Judgment', description: 'Critically assess and verify outputs.' }
]

export default function LabPage() {
    return (
        <>
            <Navbar />

            <Box p={8} maxW="1200px" mx="auto">
                <VStack spacing={4} mb={8}>
                    <Heading as="h1" size="xl" color="primary">🧪 Fluency Lab</Heading>
                    <Text fontSize="lg">Experiment live with AI Fluency capabilities.</Text>
                </VStack>

                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={6}
                    justifyContent="center"
                >
                    {capabilities.map((cap) => (
                        <Card
                            key={cap.key}
                            p={4}
                            border="1px solid #E2E8F0"
                            borderRadius="md"
                            transition="transform 0.2s, box-shadow 0.2s"
                            _hover={{
                                transform: 'translateY(-4px)',
                                boxShadow: 'lg'
                            }}
                        >
                            <CardHeader>
                                <Heading size="md">{cap.title}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text mb={4}>{cap.description}</Text>
                                <Button
                                    bg="accent"
                                    color="black"
                                    size="sm"
                                    transition="background-color 0.2s, transform 0.2s"
                                    _hover={{
                                        bg: 'primary',
                                        color: 'white',
                                        transform: 'scale(1.05)'
                                    }}
                                >
                                    Try Now
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}
