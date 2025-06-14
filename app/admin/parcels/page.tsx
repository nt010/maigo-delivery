'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

interface Parcel {
  id: number;
  ridgeNumber: string;
  roomNumber: string;
  shape: string;
  date: string;
  photoURL: string;
  title: string;
  upload_at: string;
}

export default function ParcelsListPage() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  
  // ★ 1. 印刷用のデータだけを保持する新しいstateを追加
  const [printableData, setPrintableData] = useState<Parcel[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_ENDPOINT}/parcels`);
        if (!response.ok) throw new Error('データの取得に失敗しました。');
        const data = await response.json();
        setParcels(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ★ 2. 印刷用のstateが更新されたら、印刷ダイアログを開くuseEffect
  useEffect(() => {
    // printableDataにデータがセットされた直後に実行
    if (printableData && printableData.length > 0) {
      window.print();
      // 印刷ダイアログが閉じた後にstateをリセットする
      setPrintableData(null);
    }
  }, [printableData]);


  const handleCheckboxChange = (id: number) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  // ★ 3. 印刷ボタンの処理を、stateを更新するだけのシンプルなものに変更
  const handlePrint = () => {
    const selectedParcels = parcels.filter(p => selectedIds.has(p.id));
    setPrintableData(selectedParcels);
  };

  if (loading) return <div className={styles.card}><p>読み込み中...</p></div>;
  if (error) return <div className={styles.card}><p className={styles.errorMessage}>{error}</p></div>;

  return (
    <>
      {/* 通常表示用のコンテナ */}
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>登録データ一覧</h1>
          <div className={styles.buttonGroupInline}>
            <button 
              onClick={handlePrint} 
              disabled={selectedIds.size === 0}
              className={`${styles.btn} ${styles.primary}`}
            >
              選択した項目を印刷 ({selectedIds.size}件)
            </button>
            <Link href="/admin" className={`${styles.btn} ${styles.secondary}`}>
              トップへ戻る
            </Link>
          </div>
        </div>

        <div className={styles.parcelGrid}>
          {parcels.map((p) => (
            <div key={p.id} className={styles.parcelCard}>
              <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={selectedIds.has(p.id)}
                onChange={() => handleCheckboxChange(p.id)}
              />
              <img src={p.photoURL} alt={p.title} className={styles.parcelImage} />
              <div className={styles.parcelInfo}>
                <p><strong>日付:</strong> {p.date}</p>
                <p><strong>棟番号:</strong> {p.ridgeNumber}</p>
                <p><strong>部屋番号:</strong> {p.roomNumber}</p>
                <p><strong>形状:</strong> {p.shape}</p>
                <p><strong>更新日:</strong> {p.upload_at}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ★ 4. 印刷用のコンテナ。printableDataが存在するときだけ中身を描画 */}
      {printableData && (
        <div className={styles.printableArea}>
          <h1>迷子宅配物リスト</h1>
          <table>
            <thead>
              <tr><th>棟</th><th>部屋</th><th>形状</th></tr>
            </thead>
            <tbody>
              {printableData.map(p => (
                <tr key={p.id}>
                  <td>{p.ridgeNumber}</td>
                  <td>{p.roomNumber}</td>
                  <td>{p.shape}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
