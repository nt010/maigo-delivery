"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Header from "@/app/components/Header";

interface DeliveryItem {
  id: number;
  date: string; 
  building: string;
  room: string;
  box_type: string | null;
  genre: string | null;
  image_base64: string;
  is_collected: boolean;
}

export default function RidgeItemsPage({ params }: { params: Promise<{ ridgeNumber: string }> }) {
  const { ridgeNumber } = use(params);
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8002/parcels/${ridgeNumber}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDeliveries(data);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [ridgeNumber]);

  if (loading) {
    return <div>Loading deliveries...</div>;
  }

  if (error) {
    return <div>Error loading deliveries: {error}</div>;
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200">
      {/* ヘッダー */}
      <Header showBackButton />

      {/* メイン */}
      <div className="flex flex-1 items-center justify-center">
        <Paper
          elevation={8}
          sx={{
            maxWidth: 600,
            width: "100%",
            p: 5,
            borderRadius: 6,
            boxShadow: "0 8px 32px 0 rgba(255, 193, 7, 0.2)",
            background: "rgba(255,255,255,0.95)",
            mt: 6,
          }}
        >
          <div className="flex flex-col items-center mb-6">
            <EmojiEmotionsIcon sx={{ fontSize: 48, color: "#43a047" }} />
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
              {ridgeNumber}棟の荷物一覧
            </Typography>
          </div>
          <div className="space-y-6 mb-8">
            {deliveries.map(item => (
              <Paper key={item.id} elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, background: "#fffbe7" }}>
                {item.image_base64 && (
                  <Image
                    src={`data:image/png;base64,${item.image_base64}`} // Base64データを<img>で表示する形式
                    alt={item.box_type || "荷物"}
                    width={80}
                    height={80}
                    style={{ borderRadius: 8, objectFit: 'cover' }}
                  />
                )}
                <div>
                  <Typography variant="h6" color="primary">{item.genre || "未分類"}</Typography>
                  <Typography color="text.secondary">部屋番号: {item.room}</Typography>
                  <Typography color="text.secondary">形状: {item.box_type || "不明"}</Typography>
                  <Typography color="text.secondary">配送日: {item.date.split('T')[0].replace(/-/g, '/')}</Typography> {/* 日付形式を調整 */}
                </div>
              </Paper>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{
                fontWeight: "bold",
                fontSize: 20,
                px: 5,
                py: 1.5,
                borderRadius: 8,
                boxShadow: 4,
                background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)",
                  opacity: 0.9,
                },
              }}
            >
              受け取りました
            </Button>
          </div>
        </Paper>
      </div>
    </main>
  );
}