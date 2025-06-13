from fastapi import FastAPI, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import crud
import base64

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/parcels")
async def register_parcel(
    date: str = Form(...),
    building: str = Form(...),
    room: str = Form(...),
    box_type: str = Form(None),
    genre: str = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 画像ファイルの読み取りとBase64変換
    image_bytes = await image.read()
    
    # 容量制限チェック（例：2MB）
    if len(image_bytes) > 2 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="画像サイズが2MBを超えています")

    image_base64 = base64.b64encode(image_bytes).decode("utf-8")

    # 登録用データ作成
    parcel_data = {
        "date": date,
        "building": building,
        "room": room,
        "box_type": box_type,
        "genre": genre,
        "image_base64": image_base64
    }

    return crud.create_parcel(db, parcel_data)
