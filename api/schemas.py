# schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import date

# 登録用（POST時に使う）スキーマ
class ParcelCreate(BaseModel):
    date: date
    building: str
    room: str
    box_type: Optional[str] = None
    genre: Optional[str] = None
    image_base64: str  # Base64画像は文字列として送信
