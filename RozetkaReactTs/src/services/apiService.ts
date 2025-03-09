
const API_URL = 'http://localhost:5119/api/Accounts/GoogleSignIn'; 

export const fetchWithToken = async (
    endpoint: string, 
    options: RequestInit = {}
) => {
    const token = localStorage.getItem('googleToken'); 

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers, 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        } as HeadersInit, 
    });

    if (!response.ok) {
        console.error('Помилка запиту:', response.statusText);
        return null;
    }

    return response.json();
};
