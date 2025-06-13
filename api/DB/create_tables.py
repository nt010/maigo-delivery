# create_tables.py
from models import Base
from database import engine

# DBにテーブルを作成（既に存在していれば何もしない）
Base.metadata.create_all(bind=engine)
