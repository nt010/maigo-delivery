'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 環境変数から管理者パスワードを取得（なければデフォルト値）
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ページ読み込み時にセッションストレージを確認してログイン状態を復元
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminLoggedIn', 'true'); // ページをリロードしても状態を維持
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 他のコンポーネントから簡単にContextを呼び出すためのカスタムフック
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}