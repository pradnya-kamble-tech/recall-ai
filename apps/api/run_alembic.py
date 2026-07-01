import sys
from alembic.config import main

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "upgrade":
        sys.argv = ["alembic", "upgrade", "head"]
    else:
        sys.argv = ["alembic", "revision", "--autogenerate", "-m", "Init Auth"]
    main()
