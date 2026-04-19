import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Helper to set axios header
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
        if(token) {
            setAuthToken(token);
            
            // Handle Mock Admin Token
            if (token === 'mock_admin_token') {
                 setUser({
                    _id: 'admin_123',
                    name: 'Ashwin Srichandra',
                    email: 'ashwinsrichandra2008@gmail.com',
                    role: 'admin',
                    token: 'mock_admin_token'
                });
                setLoading(false);
                return;
            }

            // Handle Mock User Token (from Registration)
            if (token === 'mock_user_token') {
                const savedUser = localStorage.getItem('mockUser');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                } else {
                    setUser({ _id: 'mock', name: 'Member', role: 'member' });
                }
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get('/api/auth/me');
                setUser(data);
            } catch (error) {
                console.error("Auth Error:", error);
                logout();
            }
        } else {
            setAuthToken(null);
        }
        setLoading(false);
    };

    checkUserLoggedIn();
  }, [token]);

  const login = async (email, password) => {
    try {
        const { data } = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setToken(data.token); 
        // Ensure the user object has all necessary properties
        const userData = {
            ...data,
            role: data.role || 'user' // Make sure role is set
        };
        setUser(userData);
        return userData;
    } catch (error) {
        // Fallback for demo/offline mode
        if (email === 'ashwinsrichandra2008@gmail.com' && password === 'ashwinsri@2008') {
            const mockAdmin = {
                _id: 'admin_123',
                name: 'Ashwin Srichandra',
                email: 'ashwinsrichandra2008@gmail.com',
                role: 'admin',
                token: 'mock_admin_token'
            };
            localStorage.setItem('token', mockAdmin.token);
            setToken(mockAdmin.token);
            setUser(mockAdmin);
            return mockAdmin;
        }
        throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
        const { data } = await axios.post('/api/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        setToken(data.token); // This triggers useEffect
        setUser(data);
        return data;
    } catch {
        console.warn("Registration API failed, using mock fallback for demo.");
        const mockUser = {
            _id: Date.now().toString(),
            name,
            email,
            role: 'member',
            token: 'mock_user_token'
        };
        localStorage.setItem('token', mockUser.token);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        setToken(mockUser.token);
        setUser(mockUser);
        return mockUser;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
