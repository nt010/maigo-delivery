"use client";
import { useRouter } from "next/navigation";
import RidgeButton from "./components/RidgeButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Header from "./components/Header";

export default function Home() {
  const deliveries = [
    {
      id: 1,
      ridgeNumber: 1,
      roomNumber: 101,
      shape: "四角",
      date: "2020/01/01",
      photoURL: "...",
    },
    {
      id: 2,
      ridgeNumber: 2,
      roomNumber: 201,
      shape: "丸",
      date: "2020/01/02",
      photoURL: "...",
    },
    {
      id: 3,
      ridgeNumber: 1,
      roomNumber: 102,
      shape: "三角",
      date: "2020/01/03",
      photoURL: "...",
    },
    {
      id: 4,
      ridgeNumber: 3,
      roomNumber: 301,
      shape: "四角",
      date: "2020/01/04",
      photoURL: "...",
    },
    {
      id: 5,
      ridgeNumber: 2,
      roomNumber: 202,
      shape: "丸",
      date: "2020/01/05",
      photoURL: "...",
    },
  ];

  const router = useRouter();

  // 1〜8棟のボタンを生成
  const ridgeNumbers = Array.from({ length: 8 }, (_, i) => i + 1);

  const handleClick = (num: number) => {
    router.push(`/get_items/${num}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200">
      <Header title="迷子デリバリー" />
      <div className="flex flex-1 items-center justify-center">
              <Paper
        elevation={8}
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 5,
          borderRadius: 6,
          boxShadow: "0 8px 32px 0 rgba(255, 193, 7, 0.2)",
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <div className="flex flex-col items-center mb-6">
          <EmojiEmotionsIcon sx={{ fontSize: 48, color: "#FFB300" }} />
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            📦 未受取の荷物
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            棟番号を選んで荷物を確認しよう！
          </Typography>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
          {ridgeNumbers.map((num) => (
            <RidgeButton key={num} num={num} onClick={handleClick} />
          ))}
        </div>
      </Paper>

      </div>
    </main>
  );
}