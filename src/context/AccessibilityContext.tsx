import { createContext, useContext, useState } from 'react';

interface AccessibilityContext {
    isAccessibilityMode: boolean;
    toggleAccessibilityMode: () => void;
}

export const AccessibilityContext = createContext<AccessibilityContext | undefined>(undefined);

export default function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

    const toggleAccessibilityMode = () => {
        setIsAccessibilityMode(!isAccessibilityMode);
    };

    return (
        <AccessibilityContext.Provider value={{ isAccessibilityMode, toggleAccessibilityMode }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

