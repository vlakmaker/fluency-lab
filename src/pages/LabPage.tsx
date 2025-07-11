// src/pages/LabPage.tsx
import {
    Box,
    Button,
    Card, CardBody, CardHeader, Heading, SimpleGrid, Text,
    VStack
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/NavBar'

const capabilities = [
    { key: 'insight-synthesis', title: '🔍 Insight Synthesis', description: 'Summarize, extract themes, distill meaning.' },
    { key: 'workflow-automation', title: '🔁 Workflow Automation', description: 'Automate tasks, reduce repetition.' },
    { key: 'cross-domain-reframing', title: '🔄 Cross-Domain Reframing', description: 'Reframe ideas for different contexts.' },
    { key: 'agent-collaboration', title: '🤖 Agent Collaboration', description: 'Chain agents together for tasks.' },
    { key: 'ethical-prompting', title: '⚖️ Ethical Prompting & Judgment', description: 'Critically assess and verify outputs.' }
]

export default function LabPage() {
    return (
        <>
            <Navbar />
            <Box bg="background" minH="100vh" p={4} display="flex" justifyContent="center">
                <Card w="100%" maxW="1000px" p={6} boxShadow="md" borderRadius="md">
                    <CardBody>
                        <VStack spacing={4} mb={8} textAlign="center">
                            <Heading as="h1" size="lg" color="primary">🧪 Fluency Lab</Heading>
                            <Text fontSize="md" color="gray.600">Experiment live with AI Fluency capabilities.</Text>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            {capabilities.map((cap) => (
                                <Card key={cap.key} p={4} border="1px solid #E2E8F0" borderRadius="md"
                                    transition="transform 0.2s, box-shadow 0.2s"
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                                >
                                    <CardHeader pb={2}>
                                        <Heading as="h3" size="md">{cap.title}</Heading>
                                    </CardHeader>
                                    <CardBody pt={0}>
                                        <Text fontSize="sm" mb={4} color="gray.700">{cap.description}</Text>
                                        <Link to={`/lab/${cap.key}`}>
                                            <Button size="sm" bg="accent" color="black"
                                                _hover={{ bg: 'primary', color: 'white', transform: 'scale(1.05)' }}>
                                                Try Now
                                            </Button>
                                        </Link>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}
