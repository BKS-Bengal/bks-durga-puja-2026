# Create GitHub repos for specialist sites. Does not change git config.
import subprocess
from pathlib import Path

PARENT = Path(r"C:\Users\asits\Projects")
SITES = [
    ("bks-pujo-sponsor", "Sponsor V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-government", "Government and influencers V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-farmtech-agritech", "Farmer FarmTech AgriTech V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-public", "Public Puja V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-nrb", "NRB supporters V1 for Bharatiya Krishak Samaj Pujo"),
]
MSG = "Initial V1 specialist experience for Bharatiya Krishak Samaj Pujo."


def run(cmd, cwd):
    print("+", " ".join(cmd))
    subprocess.run(cmd, cwd=cwd, check=True)


def main():
    only = None
    import sys
    if len(sys.argv) > 1:
        only = sys.argv[1]
    for name, desc in SITES:
        if only and name != only:
            continue
        dest = PARENT / name
        git = dest / ".git"
        if not git.exists():
            run(["git", "init", "-b", "main"], dest)
            run(["git", "add", "."], dest)
            run(["git", "commit", "-m", MSG], dest)
        else:
            print("git exists", dest)
        # create remote if missing
        remotes = subprocess.run(["git", "remote"], cwd=dest, capture_output=True, text=True, check=True).stdout
        if "origin" not in remotes.split():
            run([
                "gh", "repo", "create", f"BKS-Bengal/{name}",
                "--private",
                "--description", desc,
                "--source", ".",
                "--remote", "origin",
                "--push",
            ], dest)
        else:
            run(["git", "push", "-u", "origin", "HEAD"], dest)
        print("DONE", name)


if __name__ == "__main__":
    main()
