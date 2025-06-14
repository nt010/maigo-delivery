'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import styles from './admin.module.css';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.header}>管理者トップページ</h1>
      <p style={{ textAlign: 'center', marginBottom: '25px' }}>
        ようこそ、管理者。操作を選択してください。
      </p>
      <div className={styles.buttonGroup}>
        <Link href="/admin/lost-item" className={`${styles.btn} ${styles.primary}`}>
          迷子物を送信
        </Link>
        <Link href="/admin/parcels" className={`${styles.btn} ${styles.primary}`}>
          登録データ一覧を見る
        </Link>
        <button onClick={handleLogout} className={`${styles.btn} ${styles.secondary}`}>
          ログアウト
        </button>
      </div>
    </div>
  );
}
