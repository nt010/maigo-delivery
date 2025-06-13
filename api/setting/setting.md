📦 放置宅配物通知サービス（バックエンド）
概要
本アプリケーションは、放置された宅配物の情報を登録・閲覧できるシステムのバックエンド（API）です。
主に以下の機能を提供します：

管理者による宅配物情報の登録（画像付き）

フロントエンドからの宅配物一覧取得

画像はBase64形式で保存

📁 ディレクトリ構成（抜粋）
bash
コピーする
project-root/
├── api/
│   ├── main.py             # FastAPIアプリケーション本体
│   ├── crud.py             # DB操作ロジック（CRUD）
│   ├── models.py           # SQLAlchemyモデル定義
│   ├── schemas.py          # Pydanticスキーマ定義
│   ├── database.py         # DB接続設定
│   └── create_tables.py    # DB初期化スクリプト
├── DB/
│   └── delivery_items.db   # SQLiteデータベースファイル（自動生成）
🚀 実行方法
1. 環境準備
bash
コピーする
pip install fastapi uvicorn sqlalchemy pydantic
2. データベース初期化
bash
コピーする
cd api
python create_tables.py
成功すると以下のようなメッセージが表示されます：

コピーする
🛠️ データベーステーブルを作成中...
✅ テーブル作成が完了しました
3. 開発サーバ起動
bash
コピーする
uvicorn main:app --reload
アクセスURL: http://127.0.0.1:8000

📤 宅配物の登録API（POST /parcels）
パラメータ（multipart/form-data）
フィールド名	型	必須	説明
date	str	✅	配達日（例：2025-06-13）
ridgeNumber	str	✅	棟番号
roomNumber	str	✅	部屋番号
shape	str	❌	箱の形状
genre	str	❌	荷物ジャンル
image	file	✅	画像ファイル（～2MB）

成功レスポンス
json
コピーする
{
  "id": 1,
  "date": "2025-06-13",
  "ridgeNumber": "A棟",
  "roomNumber": "101",
  "shape": "袋",
  "genre": "食品",
  "image_base64": "<Base64文字列>",
  "is_collected": false
}
📥 宅配物一覧取得API（GET /parcels）
レスポンス形式（例）
json
コピーする
[
  {
    "id": 1,
    "ridgeNumber": "A棟",
    "roomNumber": "101",
    "shape": "袋",
    "date": "2025/06/13",
    "photoURL": "data:image/png;base64,<Base64文字列>",
    "title": "荷物"
  }
]
🔧 注意点
DBファイル（delivery_items.db）は DB/ フォルダに自動作成されます。

SQLiteは日付型に datetime.date オブジェクトしか受け付けないため、POST /parcels では文字列を日付型に変換しています。

同じ「日付・棟・部屋番号」の宅配物は重複登録されません（重複チェックあり）。

登録画像はBase64形式で保存されます。

🐞 デバッグ出力
登録処理や取得処理には print() を用いたログ出力が含まれており、開発中の動作確認に便利です。