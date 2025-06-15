# debug_insert_many_parcels.py

import random
import base64
from datetime import datetime, timedelta
from database import SessionLocal
from models import Parcel

# 値の候補
RANDOM_RIDGES = [str(i) for i in range(1, 9)]  # "1"〜"8"
RANDOM_ROOMS = [f"{floor}{room:02}" for floor in range(1, 5) for room in range(1, 6)]  # "101"〜"405"
RANDOM_SHAPES = ["四角", "袋", "筒型", None]
RANDOM_GENRES = ["食品", "衣類", "書籍", "日用品", None]

def generate_random_parcels(n=100):
    db = SessionLocal()

    for i in range(n):
        # 1〜60日前のランダムな日時
        random_days_ago = random.randint(1, 60)
        base_date = datetime.now() - timedelta(days=random_days_ago)

        parcel = Parcel(
            date=base_date.date(),
            ridgeNumber=random.choice(RANDOM_RIDGES),      # 1〜8棟
            roomNumber=random.choice(RANDOM_ROOMS),
            shape=random.choice(RANDOM_SHAPES),
            genre=random.choice(RANDOM_GENRES),
            image_base64=base64.b64encode(f"test_image_{i}".encode()).decode(),
            uploaded_at=base_date,
            is_received=random.choice([True, False])       # ← 追加
        )

        db.add(parcel)

    db.commit()
    db.close()
    print(f"✅ {n} 件の疑似データを登録しました")

if __name__ == "__main__":
    generate_random_parcels()
