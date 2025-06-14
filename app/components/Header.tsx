// app/components/Header.tsx (または .jsx)
// ヘッダーが戻るボタンを持つページでも使われるため、propsでタイトルと説明を受け取るように変更
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  showBackButton?: boolean;
  // 以下2つを新たに追加
  title?: string; // ヘッダーに表示するタイトル
  description?: string; // ヘッダーに表示する説明
}

const Header: React.FC<HeaderProps> = ({ showBackButton, title, description }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <AppBar position="fixed" sx={{
        backgroundColor: 'rgba(255, 193, 7, 0.95)', // 黄色系の背景
        color: 'white',
        writingMode: 'horizontal-tb', // これが縦書きを横書きに戻す
        display: 'flex',
        flexDirection: 'column', // タイトルと説明を縦に並べるため、ここではcolumn
        justifyContent: 'center', // 垂直方向中央揃え
        alignItems: 'center', // 水平方向中央揃え
        padding: '16px 20px', // パディングを追加
        height: 'auto', // コンテンツに合わせて高さを自動調整
        minHeight: '80px', // 最小の高さ
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1200,
        // ヘッダー内のコンテンツを水平中央揃えにするために、ToolbarではなくAppBar自体でflexを使う
    }}>
      <Toolbar sx={{ width: '100%', justifyContent: 'space-between', padding: '0 !important' }}>
        {/* 戻るボタンは左端に固定 */}
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBackClick}
            sx={{ mr: 'auto' }} // 左端に寄せる
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {/* タイトルと説明は中央寄せにする */}
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          {title && (
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body1" component="div" sx={{ fontSize: '0.9em' }}>
              {description}
            </Typography>
          )}
        </div>
        {/* 右側に何か表示する場合、ここではダミーでスペースを確保 */}
        <div style={{ width: showBackButton ? '48px' : '0px', marginLeft: 'auto' }}>
            {/* showBackButtonがある場合に、戻るボタンと同じ幅を確保して中央寄せを維持 */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;