# 手順

1. ライブラリのinstall
`pip install -r requirements.txt`

2. データベースの作成
./api/DB　に移動
`python create_tables.py`

3. apiサーバの起動
./api　に移動
`python -m uvicorn main:app --reload`

# データ型
日付は2025-6-13　のような型で入力してください


✅ 2. 全宅配物を取得（GET）
エンドポイント：GET /parcels

用途：登録された全宅配物の一覧を取得

レスポンス形式：JSON（画像は photoURL に Base64）

✅ 3. 棟番号で絞り込み取得（GET）
エンドポイント：GET /ridge_info/{ridge_number}

例：/ridge_info/A棟

用途：指定した棟の宅配物だけを取得

✅ 4. 棟＋部屋番号で取得（GET）
エンドポイント：GET /room_info/{ridge_number}/{room_number}

例：/room_info/A棟/101

用途：特定の部屋に届いた荷物だけを取得

