from sqlalchemy.orm import Session
from models import Parcel
from schemas import ParcelCreate
from fastapi import HTTPException
from datetime import datetime, timedelta

# 宅配物を作成（同一データがあれば uploaded_at を更新）
def create_parcel(db: Session, parcel_data: dict):
    existing = db.query(Parcel).filter_by(
        date=parcel_data["date"],
        ridgeNumber=parcel_data["ridgeNumber"],
        roomNumber=parcel_data["roomNumber"]
    ).first()

    if existing:
        # 登録済みなら uploaded_at を更新する
        existing.uploaded_at = parcel_data["uploaded_at"]
        db.commit()
        db.refresh(existing)
        return existing

    # 新規登録
    parcel = Parcel(**parcel_data)
    db.add(parcel)
    db.commit()
    db.refresh(parcel)
    return parcel

# DB内の全宅配物を取得
def get_all_parcels(db: Session):
    return db.query(Parcel).all()

# 棟番号で宅配物を検索
def get_parcels_by_ridge(db: Session, ridge_number: str):
    return db.query(Parcel).filter(Parcel.ridgeNumber == ridge_number).all()

# 棟番号＋部屋番号で宅配物を検索
def get_parcels_by_room(db: Session, ridge_number: str, room_number: str):
    return db.query(Parcel).filter(
        Parcel.ridgeNumber == ridge_number,
        Parcel.roomNumber == room_number
    ).all()

# uploaded_at が1か月以上前の宅配物を削除
def delete_old_parcels(db: Session):
    threshold_date = datetime.now() - timedelta(days=30)
    old_parcels = db.query(Parcel).filter(Parcel.uploaded_at < threshold_date).all()

    count = len(old_parcels)
    for parcel in old_parcels:
        db.delete(parcel)
    db.commit()
    return count
