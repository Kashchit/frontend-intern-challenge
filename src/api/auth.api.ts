import type { LoginFormValues } from '@/features/auth/loginSchema';

export const loginRequest = async (credentials: LoginFormValues): Promise<{ token: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock verification
    if (credentials.email === 'eve.holt@reqres.in' && credentials.password === 'cityslicka') {
        return { token: 'mock_token_QpwL5tke4Pnpja7X4' };
    }

    throw new Error('Invalid credentials');
};