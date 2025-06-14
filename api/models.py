# models.py
# フロントエンドに合わせて命名を統一した、宅配物データの定義

from sqlalchemy import Column, Integer, String, Date, Boolean, Text, DateTime, func
from database import Base

class Parcel(Base):
    __tablename__ = "parcels"

    # ID：自動的に増える番号
    id = Column(Integer, primary_key=True)

    # 宅配日（例："2025-06-11"）
    date = Column(Date, nullable=False)

    # 棟番号（例："7"）
    ridgeNumber = Column(String, nullable=False)  # ← building を ridgeNumber に変更

    # 部屋番号（例："103"）
    roomNumber = Column(String, nullable=False)   # ← room を roomNumber に変更

    # 箱の形（例："四角", "袋"）
    shape = Column(String)                        # ← box_type を shape に変更

    # ジャンル（食品、衣類など）任意
    genre = Column(String)

    # 写真をBase64で保存
    image_base64 = Column(Text, nullable=False)

    # 回収済みフラグ
    is_collected = Column(Boolean, default=False)

    # ✅ アップロード日時（登録された日時を自動で記録）
    uploaded_at = Column(DateTime, nullable=False, default=func.now())
