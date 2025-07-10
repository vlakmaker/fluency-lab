// src/pages/HomePage.tsx
import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/NavBar'

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Box
            bg="background"
            color="text"
            minH="100vh"
            px={4}
        >
            {/* Add Navbar at the top */}
            <Navbar />

            <VStack spacing={8} textAlign="center" mt={12}>
                <Heading as="h1" size="2xl" color="primary">
                    Welcome to Fluency Lab
                </Heading>
                <Text fontSize="lg" maxW="600px">
                    Assess your AI fluency, explore your behavioral lens, and learn how to level up your skills — all in one interactive experience.
                </Text>

                <HStack spacing={4} justify="center">
                    <Link to="/lab">
                        <Button
                            bg="accent"
                            color="text"
                            size="lg"
                            px={8}
                            _hover={{ bg: '#e6c200' }}
                        >
                            Enter the Lab
                        </Button>
                    </Link>
                    <Button
                        bg="playful"
                        color="white"
                        size="lg"
                        px={8}
                        _hover={{ bg: '#00a792' }}
                        onClick={() => window.open('https://generalist.world', '_blank')}
                    >
                        Learn More
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}
