// src/pages/HomePage.tsx
import { Box, Button, Card, CardBody, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/NavBar'

export default function HomePage() {
    return (
        <>
            <Navbar />
            <Box bg="background" minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
                <Card w="100%" maxW="600px" p={6} boxShadow="md" borderRadius="md">
                    <CardBody textAlign="center">
                        <VStack spacing={4}>
                            <Heading as="h1" size="xl" color="primary">
                                Welcome to Fluency Lab
                            </Heading>
                            <Text fontSize="md" color="gray.600">
                                Assess your AI fluency, explore your behavioral lens, and level up your skills in a hands-on, interactive way.
                            </Text>
                            <HStack spacing={4}>
                                <Link to="/lab">
                                    <Button bg="accent" color="black" _hover={{ bg: 'primary', color: 'white' }}>
                                        Enter the Lab
                                    </Button>
                                </Link>
                                <Button
                                    bg="playful"
                                    color="white"
                                    _hover={{ bg: '#00a792' }}
                                    onClick={() => window.open('https://generalist.world', '_blank')}
                                >
                                    Learn More
                                </Button>
                            </HStack>
                        </VStack>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}
