# Mock Exam Starter (No Auth, Free Hosting)

- Static hosting on Cloudflare Pages
- Counters via Pages Functions + KV
- Client-side grading (no login, no DB)
- Upload exam PDFs directly in repo

## Structure
public/
  index.html
  exam.html
  exams.json
  exams/mock-2025-11/
    paper.pdf (placeholder missing)
    solution.pdf (placeholder missing)
    meta.json
    answers.json
functions/
  download.js
  stats.js
wrangler.toml (optional; bindings can be set in dashboard)

## How to deploy
1) Push this folder to a GitHub repo.
2) Create Cloudflare Pages project from that repo.
3) In Pages Settings -> Functions -> KV bindings, add a binding named DL_KV and attach a KV namespace.
4) Deploy. Open the Pages URL.

## Add new exam
- Copy `public/exams/mock-2025-11` to a new folder.
- Replace `paper.pdf` and `solution.pdf` with your files.
- Edit `meta.json` and `answers.json`.
- Append a new item to `public/exams.json`.
