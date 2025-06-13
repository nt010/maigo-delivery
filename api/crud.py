# crud.py
from sqlalchemy.orm import Session
from models import Parcel
from schemas import ParcelCreate
from fastapi import HTTPException

def create_parcel(db: Session, parcel_data: dict):
    existing = db.query(Parcel).filter_by(
        date=parcel_data["date"],
        building=parcel_data["building"],
        room=parcel_data["room"]
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="すでに登録されています")

    parcel = Parcel(**parcel_data)
    db.add(parcel)
    db.commit()
    db.refresh(parcel)

    return parcel

