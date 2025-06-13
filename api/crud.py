# crud.py
# このファイルは、宅配物データに対するデータベース操作（CRUD）を定義します。
# 現在は「Create（新規登録）」処理と「Read（全件取得）」を実装しています。

from sqlalchemy.orm import Session
from models import Parcel
from schemas import ParcelCreate
from fastapi import HTTPException

def create_parcel(db: Session, parcel_data: dict):
    # 同じ日付・棟番号・部屋番号の宅配物がすでに存在するか確認
    existing = db.query(Parcel).filter_by(
        date=parcel_data["date"],
        ridgeNumber=parcel_data["ridgeNumber"],   # building → ridgeNumber
        roomNumber=parcel_data["roomNumber"]      # room → roomNumber
    ).first()

    if existing:
        # 重複している場合はエラーを返す
        raise HTTPException(status_code=400, detail="すでに登録されています")

    # 新しい宅配物データを作成してDBに追加
    parcel = Parcel(**parcel_data)
    db.add(parcel)
    db.commit()
    db.refresh(parcel)

    return parcel

# DBのすべての情報を返す
def get_all_parcels(db: Session):
    return db.query(Parcel).all()
