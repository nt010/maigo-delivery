'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// ... (BOX_SHAPESの定義は同じ)
const BOX_SHAPES = [
  "箱（大）", "箱（中）", "箱（小）",
  "紙袋（大）", "紙袋（中）", "紙袋（小）",
  "封筒"
];

export default function LostItemFormPage() {
  const router = useRouter();

  // フォームの入力値を管理
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [boxShape, setBoxShape] = useState(BOX_SHAPES[0]);
  
  // 送信状態とエラーを管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError('写真を選択してください。');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    // ... (formDataへの追加処理は同じ)
    formData.append('file', imageFile);
    formData.append('capturedAt', new Date().toISOString());
    formData.append('building', building);
    formData.append('room', room);
    formData.append('deliveryDate', deliveryDate);
    formData.append('boxShape', boxShape);

    try {
      const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_ENDPOINT}/lost-items`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('サーバーとの通信に失敗しました。');

      // ★変更点: 成功したら完了ページへリダイレクト
      router.push('/admin/lost-item/success');

    } catch (err: any) {
      setError(err.message || '送信中にエラーが発生しました。');
      setIsSubmitting(false); // エラー時のみここでfalseにする
    }
  };

  // 入力フォームのJSX（変更なし）
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>迷子物を送信</h1>
      <form onSubmit={handleSubmit}>
        {/* ... フォームの各入力フィールドのJSXは同じ ... */}
        <div style={styles.formGroup}>
          <label style={styles.label}>写真 (1枚)</label>
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} required style={styles.input}/>
          {imageFile && <img src={URL.createObjectURL(imageFile)} alt="プレビュー" style={styles.preview} />}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>棟番号</label>
          <input type="text" value={building} onChange={(e) => setBuilding(e.target.value)} required style={styles.input} placeholder="例: A棟"/>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>部屋番号</label>
          <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} required style={styles.input} placeholder="例: 101"/>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>宅配日</label>
          <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required style={styles.input}/>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>箱の形状</label>
          <select value={boxShape} onChange={(e) => setBoxShape(e.target.value)} required style={styles.select}>
            {BOX_SHAPES.map(shape => (<option key={shape} value={shape}>{shape}</option>))}
          </select>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? '送信中...' : '迷子物を送信'}
        </button>
      </form>
    </div>
  );
}

// ... (stylesの定義は同じ)
const styles: { [key: string]: React.CSSProperties } = { /* ... */ };