'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext'; // 正しいパスを指定

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(password);
    if (success) {
      router.push('/admin'); // ログイン成功後、管理者トップへ
    } else {
      setError('パスワードが間違っています。');
    }
  };

  return (
    <div style={styles.container}>
      <h1>管理者ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>ログイン</button>
      </form>
    </div>
  );
}
// ... (前回のstylesオブジェクトをここに貼り付け)
const styles: { [key: string]: React.CSSProperties } = { /* ... */ };