import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { ApiKeyProvider } from './context/ApiKeyContext';
import theme from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ApiKeyProvider>
                <Router>
                    <App />
                </Router>
            </ApiKeyProvider>
        </ChakraProvider>
    </React.StrictMode>
);
