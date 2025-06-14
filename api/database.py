import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 現在のファイル（database.py）のディレクトリ
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# DBディレクトリへのパス（プロジェクト直下の DB フォルダ）
DB_DIR = os.path.join(BASE_DIR, "DB")

# DBディレクトリがなければ作成
os.makedirs(DB_DIR, exist_ok=True)

# SQLite DBファイルのパスを設定
DB_PATH = os.path.join(DB_DIR, "delivery_items.db")
DATABASE_URL = f"sqlite:///{os.path.abspath(DB_PATH)}"

# SQLAlchemyのエンジン・セッション・ベースを設定
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
