// TypeScript interfaces for type safety
interface ApiEndpoints {
  AUTH: {
    LOGIN: string;
    REGISTER: string;
    REFRESH: string;
    LOGOUT: string;
  };
}

interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: ApiEndpoints;
}

interface ApiCallOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}

// API Configuration
const API_CONFIG: ApiConfig = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:9090',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      REFRESH: '/api/auth/refresh',
      LOGOUT: '/api/auth/logout'
    },
    // Add other endpoints as needed
  }
};

// Create full URL for API calls
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Default headers for API calls
export const getDefaultHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// API utility functions
export const apiCall = async <T = any>(
  endpoint: string, 
  options: ApiCallOptions = {}
): Promise<T> => {
  const url = getApiUrl(endpoint);
  const defaultHeaders = getDefaultHeaders();
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default API_CONFIG;