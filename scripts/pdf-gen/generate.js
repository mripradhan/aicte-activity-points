const fs = require("fs");
const path = require("path");
const React = require("react");
const { Document, pdf } = require("@react-pdf/renderer");
const { PDFDocument } = require("pdf-lib");

const { data } = require("./data");
const { CertificatePage, IndexPages, EvaluationPages, ActivityPages, PreamblePage } = require("./pages");
const { chunkArray } = require("./utils");
const { INDEX_ROWS_PER_PAGE, EVALUATION_ROWS_PER_PAGE, REPO } = require("./styles");

const e = React.createElement;

async function main() {
  const { student, activities, evaluations, signatories } = data;

  const activityPages = chunkArray(activities, INDEX_ROWS_PER_PAGE);
  const evaluationPages = chunkArray(evaluations, EVALUATION_ROWS_PER_PAGE);
  const startPageOffset = 1 + activityPages.length + evaluationPages.length;

  const doc = e(Document, null,
    e(CertificatePage, { data }),
    e(IndexPages, { activities, student }),
    e(EvaluationPages, { evaluations, signatories }),
    e(ActivityPages, { activities, department: student.department, startPageOffset }),
    e(PreamblePage, null)
  );

  console.log("Rendering generated section...");
  const generatedPdfBuffer = await pdf(doc).toBuffer();
  const generatedPdfBytes = await streamToBuffer(generatedPdfBuffer);

  console.log("Merging with cover.pdf...");
  const coverPdfBytes = fs.readFileSync(path.join(REPO, "public/cover.pdf"));

  const coverDoc = await PDFDocument.load(coverPdfBytes);
  const generatedDoc = await PDFDocument.load(generatedPdfBytes);
  const mergedDoc = await PDFDocument.create();

  const startPages = await mergedDoc.copyPages(coverDoc, [0, 1]);
  startPages.forEach((page) => mergedDoc.addPage(page));

  const generatedPages = await mergedDoc.copyPages(generatedDoc, generatedDoc.getPageIndices());
  generatedPages.forEach((page) => mergedDoc.addPage(page));

  if (coverDoc.getPageCount() >= 4) {
    const endPages = await mergedDoc.copyPages(coverDoc, [2, 3]);
    endPages.forEach((page) => mergedDoc.addPage(page));
  }

  const mergedPdfBytes = await mergedDoc.save();

  const outPath = path.join(REPO, `activity_points_${student.usn || "form"}.pdf`);
  fs.writeFileSync(outPath, mergedPdfBytes);
  console.log("Wrote", outPath, `(${mergedDoc.getPageCount()} pages)`);
}

function streamToBuffer(streamOrBuffer) {
  if (Buffer.isBuffer(streamOrBuffer)) return Promise.resolve(streamOrBuffer);
  return new Promise((resolve, reject) => {
    const chunks = [];
    streamOrBuffer.on("data", (c) => chunks.push(c));
    streamOrBuffer.on("end", () => resolve(Buffer.concat(chunks)));
    streamOrBuffer.on("error", reject);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
