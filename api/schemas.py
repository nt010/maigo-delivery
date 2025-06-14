from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

# 登録用（POST時に使う）スキーマ
class ParcelCreate(BaseModel):
    date: date
    ridgeNumber: str             # building → ridgeNumber
    roomNumber: str              # room → roomNumber
    shape: Optional[str] = None  # box_type → shape
    genre: Optional[str] = None
    image_base64: str            # Base64画像は文字列として送信

# 読み取り用（GET時に返す用）
class ParcelRead(ParcelCreate):
    id: int
    is_collected: bool
    uploaded_at: datetime        # ← 更新日を追加

    class Config:
        from_attributes = True
