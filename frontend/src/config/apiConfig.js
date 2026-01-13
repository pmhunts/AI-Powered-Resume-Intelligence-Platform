// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8001', // Updated to match backend port
    API_VERSION: '/api/v1',
    TIMEOUT: 30000, // 30 seconds
};

// Get full API endpoint URL
export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
};

export default API_CONFIG;
