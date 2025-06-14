"use client";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";

type RidgeButtonProps = {
  num: number;
  onClick: (num: number) => void;
};

function RidgeButton({ num, onClick }: RidgeButtonProps) {
  return (
    <Button
      variant="contained"
      color="warning"
      size="large"
      startIcon={<ApartmentIcon fontSize="large" />}
      onClick={() => onClick(num)}
      sx={{
        borderRadius: "50%",
        width: 100,
        height: 100,
        fontSize: 24,
        fontWeight: "bold",
        boxShadow: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.08)",
        },
      }}
      aria-label={`${num}棟の荷物を見る`}
    >
      {num}棟
    </Button>
  );
}

export default RidgeButton;