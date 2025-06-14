# debug_insert_old_data.py

from database import SessionLocal
from models import Parcel
from datetime import datetime, timedelta

def insert_old_parcel():
    db = SessionLocal()

    old_date = datetime.now() - timedelta(days=40)  # 40日前
    parcel = Parcel(
        date=old_date.date(),                      # 配達日
        ridgeNumber="テスト棟",
        roomNumber="999",
        shape="四角",
        genre="衣類",
        image_base64="dGVzdA==",                   # "test"のBase64
        uploaded_at=old_date,
        is_collected=False
    )

    db.add(parcel)
    db.commit()
    db.close()
    print("✅ 古いデバッグ用データを登録しました")

if __name__ == "__main__":
    insert_old_parcel()
