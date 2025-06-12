'use client';

import { useRouter } from 'next/navigation';

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
    <div style={styles.container}>
      <h1 style={styles.h1}>送信完了</h1>
      <p>迷子物の情報を送信しました。</p>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleContinue}>続けて送信</button>
        <button style={styles.buttonSecondary} onClick={handleFinish}>送信を終了</button>
      </div>
    </div>
  );
}

// ... (stylesの定義は同じ、または共通のCSSファイルから読み込む)
const styles: { [key: string]: React.CSSProperties } = { /* ... */ };