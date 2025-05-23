import React, { useEffect, useState } from 'react';
import { api } from "../../axios/ApiAxios";

// Helper functions for encoding and decoding
const encodeData = (data) => btoa(JSON.stringify(data));
const decodeData = (encodedData) => encodedData ? JSON.parse(atob(encodedData)) : null;

export function authCheck() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [userType, setUserType] = useState('user');
  const [isAction, setIsAction] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const decodedData = decodeData(storedAuthData);
      if (decodedData) {
        setAuth(true);
        // console.log(auth);
        setName(decodedData.name || '');
        setUserEmail(decodedData.email || '');
        setUserType(decodedData.userType || 'user');
        setUpdatedAt(decodedData.updatedAt || '');
      }
    }
    // Initial auth check and profile fetch
    checkAuth();
    userProfile();
  }, []);

  // Update data when isAction changes (e.g., after profile update)
  useEffect(() => {
    if (isAction === 'reload') {
      checkAuth();
      userProfile();
    }
  }, [isAction]);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/auth/protected');
      setMessage(response.data.message || 'Authenticated');
      setUserEmail(response.data.email || '');
      setAuth(true);
      // Update localStorage with minimal data from checkAuth
      // console.log(response.data)
      // const authData = {
      //   email: response.data.email || '',
      //   userType: response.data.type || 'user', // Extract type from response
      //   name,     // Retain existing name unless updated elsewhere
      //   updatedAt, // Retain existing updatedAt unless updated elsewhere
      // };
      console.log()
      // localStorage.setItem('authData', encodeData(authData));
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Authentication failed');
      setAuth(false);
      localStorage.removeItem('authData'); // Clear on auth failure
    } finally {
      setLoading(false);
    }
  };

  const userProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/auth/user');
      const profileData = {
        name: response.data.name || '',
        email: response.data.email || '',
        userType: response.data.type || 'user',
        updatedAt: response.data.updatedAt || '',
      };
      // console.log(response.data)

      // Update state
      setName(profileData.name);
      setUserEmail(profileData.email);
      setUserType(profileData.userType);
      setUpdatedAt(profileData.updatedAt);
      setMessage('Profile fetched successfully');
      setAuth(true);

      // Store in localStorage with encoded data
      localStorage.setItem('authData', encodeData(profileData));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Profile fetch failed');
      // Don't clear auth here; it might still be valid from checkAuth
    } finally {
      setLoading(false);
    }
  };

  // Enhanced logic for handling refresh or update
  const handleRefreshOrUpdate = () => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const decodedData = decodeData(storedAuthData);
      if (decodedData) {
        setName(decodedData.name);
        setUserEmail(decodedData.email);
        setUserType(decodedData.userType);
        setUpdatedAt(decodedData.updatedAt);
        setAuth(true);
      } else {
        // If decoding fails, force a full check
        checkAuth();
        userProfile();
      }
    } else {
      // No stored data, perform full auth check
      checkAuth();
      userProfile();
    }
  };

  // Call handleRefreshOrUpdate on mount and when window refreshes
  useEffect(() => {
    handleRefreshOrUpdate();
    const handlePageRefresh = () => handleRefreshOrUpdate();
    window.addEventListener('load', handlePageRefresh);
    return () => window.removeEventListener('load', handlePageRefresh);
  }, []);

  return { auth, loading, error, message, name, userEmail, userType, setIsAction, updatedAt };
};