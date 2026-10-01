# AICTE Activity Points PDF generator (standalone, local)

Generates the same PDF the web app's "Download PDF" button produces
(cover + certificate + index sheet + evaluation sheet + one page per
activity + preamble), but runs locally in Node with no Supabase/Azure
account, no login, and no file uploads. Certificate images are read
straight off your disk.

## Setup

```bash
cd scripts/pdf-gen
npm install
cp data.example.js data.js
```

Edit `data.js`:
- Fill in your name, USN, department (must match `DEPARTMENTS` in
  `lib/types/form-filler.ts`), and period.
- Add one object to the `activities` array per activity, pointing
  `certificateImage` at a certificate image file on your disk.
- Write real descriptions/outcomes, or ask Claude Code to draft them
  (see the prompt below) based on your certificate images and any
  public info about the event.

`data.js` is gitignored (the whole `scripts/` folder is, repo-wide),
so your personal data and USN never get committed.

## Run

```bash
node generate.js
```

Writes `activity_points_<usn>.pdf` to the project root.

## How it works

- `styles.js` / `common.js` / `pages.js` mirror
  `components/form-filler/pdf/*` from the main app, with fonts and
  the RVCE logo loaded from `public/` via absolute filesystem paths
  (not the `/fonts/...` web paths the app uses, which only resolve
  inside the browser/Next.js server).
- `generate.js` renders the document with `@react-pdf/renderer`,
  then merges it with `public/cover.pdf` using `pdf-lib`, replicating
  `components/form-filler/pdf.worker.ts` exactly (cover pages 1-2,
  generated content, cover pages 3-4).
- Certificate/photo images are referenced by local absolute path
  (`certificateImage: "/path/to/cert.png"`), which `@react-pdf/renderer`
  reads directly from disk when run in Node, so there's no need to
  upload them anywhere first.
