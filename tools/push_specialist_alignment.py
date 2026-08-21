import subprocess
from pathlib import Path

REPOS = [
    Path(r"C:\Users\asits\Projects\bks-pujo-sponsor"),
    Path(r"C:\Users\asits\Projects\bks-pujo-government"),
    Path(r"C:\Users\asits\Projects\bks-pujo-farmtech-agritech"),
    Path(r"C:\Users\asits\Projects\bks-pujo-public"),
    Path(r"C:\Users\asits\Projects\bks-pujo-nrb"),
]
MSG = "Align specialist sites to the Pujo umbrella with shared identity, approved photography, and Munshir Bheri location."


def run(cmd, cwd):
    print("+", " ".join(cmd), "in", cwd)
    subprocess.run(cmd, cwd=cwd, check=True)


for repo in REPOS:
    run(["git", "add", "-A"], repo)
    st = subprocess.run(["git", "status", "--porcelain"], cwd=repo, capture_output=True, text=True, check=True)
    if not st.stdout.strip():
        print("clean", repo.name)
        continue
    print(st.stdout)
    run(["git", "commit", "-m", MSG], repo)
    run(["git", "push"], repo)
    print("pushed", repo.name)
