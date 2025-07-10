import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import theme from './theme'

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/lab" element={<LabPage />} />
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App
