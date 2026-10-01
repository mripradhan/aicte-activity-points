# AICTE Activity Points PDF generator (standalone, local)

Generates the same PDF that CubeStar1's original web app's "Download PDF" button produces
(cover + certificate + index sheet + evaluation sheet + one page per
activity + preamble), but runs locally in Node with no Supabase/Azure
account, no login, and no file uploads. Certificate images are read
straight off your disk.

## 1. Clone the repo

```bash
git clone https://github.com/mripradhan/aicte-activity-points.git
cd aicte-activity-points
```

## 2. Set up the script

```bash
cd scripts/pdf-gen
npm install
cp data.example.js data.js
```

`data.js` is gitignored, so your personal data (name, USN, activities)
never gets committed. Same for a `certificateimages/` folder at the
project root and the generated `activity_points_*.pdf`, if you put
them there.

## 3. Fill in `data.js`

- Your name, USN, department (must match `DEPARTMENTS` in
  `lib/types/form-filler.ts`), and period.
- One object in the `activities` array per activity, with
  `certificateImage` pointing at a certificate image file on disk.
- A description and outcome for each activity.

Writing these by hand works fine, but this is also a good task to
hand to an AI assistant, see the prompt below.

## 4. Run it

```bash
node generate.js
```

Writes `activity_points_<usn>.pdf` to the project root.

## Using Claude Code (or another AI assistant) to fill in your data

This works well as an assisted workflow: point the assistant at your
certificate images and a rough list of events/points, and have it
research, draft, and fill in `data.js` for you, rather than writing
each activity by hand. A prompt that works well for this:

> I want to fill in `scripts/pdf-gen/data.js` in this repo to generate
> my AICTE Activity Points PDF. My name is `<your name>`, USN
> `<your USN>`, department `<your department>`. Here's my list of
> activities and the points each is worth: `<paste your list>`. My
> certificate images are in `<folder path>`.
>
> For each activity: look at the certificate image to confirm the
> name/USN/points match, and if you can find public information about
> the event (via web search), use it to ground the description. Ask
> me for anything you can't determine confidently, such as exact
> dates, semester, hours spent, or venue, rather than guessing, since
> this is an official academic form. Leave signatory names blank
> unless I give them to you.
>
> Write full, professional-length descriptions and outcomes for each
> activity (covering what the event was, who organised it, what my
> role involved, and what I gained from it), not one-liners. Don't use
> em dashes anywhere in the generated text.
>
> Once `data.js` is filled in, run `node generate.js` from
> `scripts/pdf-gen/` and render a couple of pages to PNG with
> `pdftoppm` to visually confirm the layout and certificate images
> look right before calling it done.
