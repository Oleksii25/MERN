import { useState, useCallback } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const { token: storegToken, userId: storageId } = JSON.parse(localStorage.getItem(storageName)) || {};
  const [token, setToken] = useState(storegToken || null);
  const [userId, setUserId] = useState(storageId || null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id,
      token: jwtToken,
    }))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  return { login, logout, token, userId }
}