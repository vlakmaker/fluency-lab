// src/components/NavBar.tsx

import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useApiKey } from '../context/ApiKeyContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { setApiKey } = useApiKey();

    const handleSetApiKey = () => {
        const key = prompt('Please enter your OpenRouter.ai API Key:');
        if (key) {
            // It's good practice to save the key to localStorage for session persistence
            localStorage.setItem('apiKey', key.trim());
            setApiKey(key.trim());
            alert('API Key has been set for this session!');
        }
    };

    // --- NEW: Define a common style for button hover effects ---
    const hoverStyles = {
        bg: 'yellow.400', // Use a specific color token from Chakra's theme
        color: 'gray.800', // A dark gray for good contrast on yellow
    };

    return (
        <Flex
            as="nav"
            bg="purple.600" // A deep purple for the "primary" color
            color="white"
            px={6}
            py={3}
            align="center"
            justify="space-between"
            boxShadow="md"
        >
            <Heading
                size="md"
                cursor="pointer"
                onClick={() => navigate('/')}
                _hover={{ color: 'yellow.300' }}
            >
                Fluency Lab
            </Heading>
            <Spacer />
            <Flex gap={4} align="center">
                <Button
                    variant="ghost"
                    color="white"
                    _hover={hoverStyles} // Apply the common hover style
                    onClick={() => navigate('/')}
                >
                    Home
                </Button>
                <Button
                    variant="ghost"
                    color="white"
                    _hover={hoverStyles} // Apply the common hover style
                    onClick={() => navigate('/lab')}
                >
                    Lab
                </Button>

                {/* --- NEW: Help button added --- */}
                <Button
                    variant="ghost"
                    color="white"
                    _hover={hoverStyles}
                    onClick={() => navigate('/help')} // Navigates to a new /help route
                >
                    Help
                </Button>

                <Button
                    variant="outline"
                    colorScheme="yellow" // Using a colorScheme makes it yellow by default
                    borderColor="yellow.400"
                    color="yellow.400"
                    _hover={{ bg: 'yellow.400', color: 'purple.800' }} // A more specific hover for the "call to action" button
                    onClick={handleSetApiKey}
                >
                    Set API Key
                </Button>
            </Flex>
        </Flex>
    );
}