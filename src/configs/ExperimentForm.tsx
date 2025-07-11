import { CheckCircleIcon } from '@chakra-ui/icons'
import {
    Box,
    Divider,
    Heading,
    List,
    ListIcon,
    ListItem,
    Text
} from '@chakra-ui/react'

export default function ExperimentForm({ config }) {
    return (
        <Box
            bg="background"
            color="text"
            minH="100vh"
            px={4}
            py={16}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
        >
            <Box maxW="800px" w="100%" bg="white" p={8} borderRadius="md" boxShadow="md">
                <Heading as="h2" size="xl" color="primary" mb={2}>
                    {config.title}
                </Heading>

                <Text fontSize="md" color="gray.600" mb={4}>
                    {config.description}
                </Text>

                <Divider mb={6} />

                <Heading as="h3" size="md" color="primary" mb={2}>
                    Practice Challenges:
                </Heading>

                <List spacing={3}>
                    {config.challenges.map((challenge, index) => (
                        <ListItem key={index} color="gray.800">
                            <ListIcon as={CheckCircleIcon} color="accent" />
                            {challenge}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}
