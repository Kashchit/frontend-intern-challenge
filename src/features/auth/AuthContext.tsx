import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextValue {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('authToken')
    );

    const login = (newToken: string) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated: !!token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook — keeps consumers from importing context directly (cleaner DX, easier to mock in tests)
export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};