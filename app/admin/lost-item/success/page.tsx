'use client';

import { useRouter } from 'next/navigation';
import styles from '../../../admin/admin.module.css'; // ★ CSSモジュールをインポート（パスに注意）

export default function SuccessPage() {
  const router = useRouter();

  // 「続けて送信」→ フォームページに戻る
  const handleContinue = () => {
    router.push('/admin/lost-item');
  };

  // 「送信を終了」→ 管理者トップページへ
  const handleFinish = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.header}>送信完了</h1>
      <p style={{ textAlign: 'center' }}>
        迷子物の情報を送信しました。
      </p>
      <div className={styles.buttonGroup}>
        <button onClick={handleContinue} className={`${styles.btn} ${styles.primary}`}>
          続けて送信
        </button>
        <button onClick={handleFinish} className={`${styles.btn} ${styles.secondary}`}>
          管理者トップへ戻る
        </button>
      </div>
    </div>
  );
}