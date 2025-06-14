# 手順

1. 実行にライブラリのinstall
`npm install`
`pip install -r requirements.txt`

2. データベースの作成
./api/DB　に移動
`python create_tables.py`

3. maigo-deliveryに.env.localを作成し、下記の1行でパスワードを作成する。
`'NEXT_PUBLIC_ADMIN_PASSWORD=<設定したいadminのパスワード>`

4. apiサーバの起動
./api　に移動
`python -m uvicorn main:app --reload`

5. webサーバの起動
./　に移動
`npm run dev`