"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string; 
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, title, description }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <AppBar position="fixed" sx={{
        backgroundColor: 'rgba(255, 193, 7, 0.95)', 
        color: 'white',
        writingMode: 'horizontal-tb', 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center', 
        padding: '16px 20px', 
        height: 'auto', 
        minHeight: '80px', 
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1200,
    }}>
      <Toolbar sx={{ width: '100%', justifyContent: 'space-between', padding: '0 !important' }}>
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBackClick}
            sx={{ mr: 'auto' }} 
          >
            <ArrowBackIcon />
          </IconButton>
        )}
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
        <div style={{ width: showBackButton ? '48px' : '0px', marginLeft: 'auto' }}>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;