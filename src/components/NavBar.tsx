// src/components/Navbar.tsx
import { Box, Button, Flex, HStack, Spacer } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <Box bg="primary" color="white" px={6} py={4} boxShadow="sm">
            <Flex alignItems="center">
                <HStack spacing={4}>
                    <Button
                        as={RouterLink}
                        to="/"
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'accent', color: 'black' }}
                    >
                        Home
                    </Button>
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'accent', color: 'black' }}
                        onClick={() => {
                            alert('Set API Key clicked!')
                        }}
                    >
                        Set API Key
                    </Button>
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'accent', color: 'black' }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </HStack>
                <Spacer />
            </Flex>
        </Box>
    )
}
