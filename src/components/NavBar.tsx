// src/components/NavBar.tsx
import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useApiKey } from '../context/ApiKeyContext'; // ✅ Import your context hook

export default function Navbar() {
    const navigate = useNavigate();
    const { setApiKey } = useApiKey();  // ✅ Get setter from context

    const handleSetApiKey = () => {
        const key = prompt('Enter your API Key:');
        if (key) {
            setApiKey(key.trim());
            alert('API Key saved successfully!');
        }
    };

    return (
        <Flex
            as="nav"
            bg="primary"
            color="white"
            px={6}
            py={4}
            align="center"
            justify="space-between"
        >
            <Heading size="md" cursor="pointer" onClick={() => navigate('/')}>
                Fluency Lab
            </Heading>
            <Spacer />
            <Flex gap={4}>
                <Button variant="ghost" color="white" onClick={() => navigate('/')}>
                    Home
                </Button>
                <Button variant="ghost" color="white" onClick={() => navigate('/lab')}>
                    Lab
                </Button>
                <Button
                    variant="outline"
                    color="white"
                    borderColor="white"
                    _hover={{ bg: 'accent', color: 'black' }}
                    onClick={handleSetApiKey}
                >
                    Set API Key
                </Button>
            </Flex>
        </Flex>
    );
}
