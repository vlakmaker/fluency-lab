import { Box } from '@chakra-ui/react';
import EngineContainer from '../components/EngineContainer';
import Navbar from '../components/NavBar';
import { experiments } from '../configs/experiments';

export default function WorkflowAutomationPage() {
    // Find the specific configuration for this page
    const config = experiments.find(e => e.key === 'workflow-automation');

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
                py={8} // Add some vertical padding
            >
                {/* Safety check: Only render if config is found */}
                {config && <EngineContainer config={config} />}
            </Box>
        </>
    );
}