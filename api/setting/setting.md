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