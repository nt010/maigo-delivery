from fastapi import FastAPI, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import crud
import base64
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS設定（開発中はすべて許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DBセッション取得関数
def get_db():
    db = SessionLocal()
    try:
        print("🔄 DBセッションを開始")
        yield db
    finally:
        db.close()
        print("✅ DBセッションを終了")

# 宅配物登録API
@app.post("/parcels")
async def register_parcel(
    date: str = Form(...),
    ridgeNumber: str = Form(...),
    roomNumber: str = Form(...),
    shape: str = Form(None),
    genre: str = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    print("📥 新規宅配物を登録リクエスト受信")
    print(f"📦 情報: 日付={date}, 棟={ridgeNumber}, 部屋={roomNumber}, 形={shape}, ジャンル={genre}")
    print(f"🖼️ ファイル名: {image.filename}")

    # 日付を datetime.date に変換
    try:
        parsed_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        print("❌ 日付形式が不正です")
        raise HTTPException(status_code=400, detail="日付の形式が正しくありません（例: 2025-06-13）")

    # 画像処理（容量制限 + Base64変換）
    image_bytes = await image.read()
    print(f"📏 画像サイズ: {len(image_bytes)} bytes")

    if len(image_bytes) > 2 * 1024 * 1024:
        print("❌ 画像サイズオーバー")
        raise HTTPException(status_code=400, detail="画像サイズが2MBを超えています")

    image_base64 = base64.b64encode(image_bytes).decode("utf-8")
    print("✅ 画像をBase64に変換完了")

    # 登録用データ作成
    parcel_data = {
        "date": parsed_date,
        "ridgeNumber": ridgeNumber,
        "roomNumber": roomNumber,
        "shape": shape,
        "genre": genre,
        "image_base64": image_base64
    }

    print("📤 データベースに登録開始")
    parcel = crud.create_parcel(db, parcel_data)
    print("✅ データベースに登録完了")

    return parcel

# 宅配物取得API
@app.get("/parcels")
def get_parcels_for_frontend(db: Session = Depends(get_db)):
    print("📡 全宅配物データの取得リクエスト受信")
    parcels = crud.get_all_parcels(db)
    print(f"📦 {len(parcels)} 件のデータを取得")

    result = []
    for p in parcels:
        result.append({
            "id": p.id,
            "ridgeNumber": p.ridgeNumber,
            "roomNumber": p.roomNumber,
            "shape": p.shape or "不明",
            "date": p.date.strftime("%Y/%m/%d") if isinstance(p.date, datetime) else str(p.date),
            "photoURL": f"data:image/png;base64,{p.image_base64}",
            "title": "荷物"
        })

    print("✅ JSON形式でレスポンスを返却")
    return result
