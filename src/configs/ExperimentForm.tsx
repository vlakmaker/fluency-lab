// src/components/ExperimentForm.tsx

import { CheckCircleIcon } from '@chakra-ui/icons';
import {
    Box,
    Divider,
    Heading,
    List,
    ListIcon,
    ListItem,
    Text
} from '@chakra-ui/react';
import type { ExperimentConfig } from '../data/experiments'; // It's good practice to type the props

// --- UPDATED: The props are now properly typed ---
export default function ExperimentForm({ config }: { config: ExperimentConfig }) {

    // --- UPDATED: All the full-page layout styles have been removed ---
    // This is now just a simple container for the experiment info.
    return (
        <Box>
            <Heading as="h2" size="xl" color="primary.600" mb={2}>
                {config.title}
            </Heading>

            <Text fontSize="md" color="gray.600" mb={4}>
                {config.description}
            </Text>

            <Divider mb={6} />

            <Heading as="h3" size="md" color="secondary.700" mb={2}>
                Practice Challenges:
            </Heading>

            <List spacing={3}>
                {config.challenges.map((challenge, index) => (
                    <ListItem key={index} color="gray.800">
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        {challenge}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}