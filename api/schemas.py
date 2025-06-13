from pydantic import BaseModel
from typing import Optional
from datetime import date

# 登録用（POST時に使う）スキーマ
class ParcelCreate(BaseModel):
    date: date
    ridgeNumber: str             # building → ridgeNumber
    roomNumber: str              # room → roomNumber
    shape: Optional[str] = None  # box_type → shape
    genre: Optional[str] = None
    image_base64: str            # Base64画像は文字列として送信

class ParcelRead(ParcelCreate):
    id: int
    is_collected: bool

    class Config:
        from_attributes = True
