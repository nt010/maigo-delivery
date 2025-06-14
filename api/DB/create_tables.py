import sys
import os

# ANSIカラーコード
RED = "\033[91m"
GREEN = "\033[92m"
RESET = "\033[0m"

# このスクリプトの場所を起点にプロジェクトルートを見つける
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, '..'))

# sys.pathにプロジェクトルートを追加（models, databaseを見つけられるように）
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

try:
    from models import Base
    from database import engine
except ImportError as e:
    print(f"{RED}❌ モジュールのインポートに失敗しました:{RESET}", e)
    print("現在のsys.path:", sys.path)
    sys.exit(1)

def create_tables():
    print("🛠️ データベーステーブルを作成中...")
    Base.metadata.create_all(bind=engine)
    print(f"{GREEN}✅ テーブル作成が完了しました{RESET}")

if __name__ == "__main__":
    create_tables()
