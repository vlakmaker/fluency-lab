// src/components/FeedbackDisplay.tsx

import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
    Box,
    CircularProgress,
    CircularProgressLabel,
    Heading,
    List,
    ListIcon,
    ListItem,
    SimpleGrid,
    Stack,
    Text
} from '@chakra-ui/react';
import type { FeedbackResult } from '../lib/feedbackEngine';

export default function FeedbackDisplay({ result }: { result: FeedbackResult }) {
    const getScoreColor = (score: number) => {
        if (score >= 8) return 'green.400';
        if (score >= 5) return 'yellow.400';
        return 'red.400';
    };

    return (
        <Box mt={6} p={5} bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
            <Stack spacing={4}>
                <Heading size="md" color="blue.800">Prompt Feedback Report</Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} alignItems="center">
                    <Box textAlign="center">
                        <CircularProgress value={result.score * 10} color={getScoreColor(result.score)} size="120px" thickness="8px">
                            <CircularProgressLabel fontSize="2xl" fontWeight="bold">{result.score}/10</CircularProgressLabel>
                        </CircularProgress>
                        <Text mt={2} fontWeight="bold" color="blue.700">Overall Score</Text>
                    </Box>
                    <Box>
                        <Heading size="sm" mb={2}>💡 Top Tip:</Heading>
                        <Text fontStyle="italic">"{result.tips}"</Text>
                    </Box>
                </SimpleGrid>

                <Heading size="sm" pt={2}>Section-by-Section Review:</Heading>
                <List spacing={2}>
                    {Object.entries(result.sections).map(([key, value]) => (
                        <ListItem key={key} display="flex" alignItems="center">
                            <ListIcon as={value.toLowerCase().includes('good') || value.toLowerCase().includes('great') ? CheckCircleIcon : WarningIcon}
                                color={value.toLowerCase().includes('good') || value.toLowerCase().includes('great') ? 'green.500' : 'yellow.500'} />
                            <Text as="strong" textTransform="capitalize" mr={2}>{key}:</Text>
                            <Text>{value}</Text>
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </Box>
    );
}