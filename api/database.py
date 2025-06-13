
# database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# データベースURL（SQLiteのローカルファイルを使う）
DATABASE_URL = "sqlite:///C:/Users/mayma/workspace/hackson_jaist/DB/delivery_items.db"

# DBエンジンの作成（SQLiteでは check_same_thread=False が必要）
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# DB操作用のセッションを作るための「工場」
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# モデル定義（models.py）で継承する共通の「土台」
Base = declarative_base()
