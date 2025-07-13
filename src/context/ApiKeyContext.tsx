import { createContext, ReactNode, useContext, useState } from 'react';

type ApiKeyContextType = {
    apiKey: string | null;
    setApiKey: (key: string) => void;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
    const [apiKey, setApiKey] = useState<string | null>(null);

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKey = (): ApiKeyContextType => {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error('useApiKey must be used within ApiKeyProvider');
    }
    return context;
};
