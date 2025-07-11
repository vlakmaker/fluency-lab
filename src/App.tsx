import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import theme from './theme'

import AgentCollaborationPage from './pages/AgentCollaborationPage'
import CrossDomainReframingPage from './pages/CrossDomainReframingPage'
import EthicalPromptingPage from './pages/EthicalPromptingPage'
import InsightSynthesisPage from './pages/InsightSynthesisPage'
import WorkflowAutomationPage from './pages/WorkflowAutomationPage'

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/lab" element={<LabPage />} />
                    <Route path="/lab/insight-synthesis" element={<InsightSynthesisPage />} />
                    <Route path="/lab/workflow-automation" element={<WorkflowAutomationPage />} />
                    <Route path="/lab/cross-domain-reframing" element={<CrossDomainReframingPage />} />
                    <Route path="/lab/agent-collaboration" element={<AgentCollaborationPage />} />
                    <Route path="/lab/ethical-prompting" element={<EthicalPromptingPage />} />
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App
