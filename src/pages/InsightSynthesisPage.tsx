import { Box } from '@chakra-ui/react';
import Navbar from '../components/NavBar';
import ExperimentForm from "../configs/ExperimentForm";
import { experiments } from '../configs/experiments';

export default function InsightSynthesisPage() {
    const config = experiments.find(e => e.key === 'insight-synthesis')

    return (
        <>
            <Navbar />
            <Box
                bg="background"
                color="text"
                minH="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={4}
            >
                <Box maxW="800px" w="100%">
                    {config && <ExperimentForm config={config} />}
                </Box>
            </Box>
        </>
    )
}
