# models.py
# これは「宅配物のデータの形」を定義するファイルです。

from sqlalchemy import Column, Integer, String, Date, Boolean, Text
from database import Base  # SQLAlchemyの「共通の土台」

# 1つの宅配物を表すクラス（＝1レコードの設計図）
class Parcel(Base):
    __tablename__ = "parcels"  # テーブルの名前は "parcels"

    # ID：自動的に増える番号
    id = Column(Integer, primary_key=True)

    # 宅配日（例：2025-06-11）
    date = Column(Date, nullable=False)

    # 棟番号（例："A棟" や "7"）
    building = Column(String, nullable=False)

    # 部屋番号（例："103"）
    room = Column(String, nullable=False)

    # 箱の形（例："ハコ", "袋"）
    box_type = Column(String)

    # ジャンル（食品、衣類など）任意
    genre = Column(String)

    # 写真をBase64という文字列で保存
    image_base64 = Column(Text, nullable=False)

    # 回収されたか（初期はFalse）
    is_collected = Column(Boolean, default=False)
