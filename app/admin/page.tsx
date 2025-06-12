'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext'; // 正しいパスを指定

export default function AdminDashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>管理者トップページ</h1>
      <p>ようこそ、管理者。操作を選択してください。</p>
      <div style={styles.buttonGroup}>
        <Link href="/admin/lost-item" style={styles.linkButton}>迷子物を送信</Link>
        <button onClick={handleLogout} style={styles.buttonSecondary}>ログアウト</button>
      </div>
    </div>
  );
}

// 共通のスタイル
const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' },
  h1: { color: '#333' },
  buttonGroup: { marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' },
  linkButton: { display: 'block', padding: '12px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '16px' },
  buttonSecondary: { width: '100%', padding: '12px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' },
  /* ... 他に必要なスタイル ... */
};