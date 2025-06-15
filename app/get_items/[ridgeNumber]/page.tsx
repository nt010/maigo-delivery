"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Header from "@/app/components/Header";

interface DeliveryItem {
  id: number;
  date: string;
  photoURL: string;
  ridgeNumber: string;
  roomNumber: string;
  shape: string;
  title: string;
  isReceived: boolean;
}

export default function RidgeItemsPage({
  params,
}: {
  params: { ridgeNumber: string };
}) {
  const { ridgeNumber } = params;
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8002/ridge_info/${ridgeNumber}`
        );
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, detail: ${errorDetail}`
          );
        }
        const data = await response.json();
        setDeliveries(data);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        console.error("Fetch error:", e);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const roomNumber = searchValue.trim();
    if (!roomNumber) {
      alert("部屋番号を入力してください");
      return;
    }
    router.push(`/room_info/${ridgeNumber}/${roomNumber}`);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200">
      <Header title="迷子デリバリー" showBackButton />
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
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              {ridgeNumber}棟の荷物一覧
            </Typography>
          </div>
          <div className="space-y-6 mb-8">
            {deliveries.map((item) => (
              <Paper
                key={item.id}
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background: "#fffbe7",
                }}
              >
                {item.photoURL && (
                  <Image
                    src={item.photoURL}
                    alt={item.title || "未配達荷物"}
                    width={80}
                    height={80}
                    style={{ borderRadius: 8, objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "";
                    }}
                  />
                )}
                <div>
                  <Typography variant="h6" color="primary">
                    {item.title || "未分類"}
                  </Typography>
                  <Typography color="text.secondary">
                    部屋番号: {item.roomNumber}
                  </Typography>
                  <Typography color="text.secondary">
                    形状: {item.shape || "不明"}
                  </Typography>
                  <Typography color="text.secondary">
                    配送日: {item.date.split("T")[0].replace(/-/g, "/")}
                  </Typography>
                </div>
              </Paper>
            ))}
          </div>
        </Paper>
      </div>
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mt-4 mb-6 justify-center"
      >
        <input
          type="text"
          placeholder="部屋番号を入力"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border rounded px-3 py-2 text-black bg-white focus:bg-black-200  transition-colors"
        />
        <Button
          type="submit"
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
          検索
        </Button>
      </form>
    </main>
  );
}
