// Copy this file to data.js and fill it in with your own details.
// data.js is gitignored (the whole scripts/ folder is) so your personal
// data never gets committed.

const path = require("path");

const REPO = path.join(__dirname, "..", "..");
// Put your certificate images anywhere and point certificateImage at them below.
// They can live outside the repo too (e.g. CERTS = "/home/you/Desktop/certs").
const CERTS = path.join(REPO, "certificateimages");

const activities = [
  {
    id: "a1",
    slNo: 1,
    semester: "3", // "1" - "8"
    name: "Example Hackathon",
    aicteMapping: "Technical / Co-curricular Activity",
    startDate: "2025-01-10", // YYYY-MM-DD
    endDate: "2025-01-11",
    duration: 2, // days
    place: "RV College of Engineering, Bengaluru",
    detailedReportPageNo: "",
    certificateAttached: true,
    hoursSpent: 12,
    pointsEarned: 10,
    description:
      "Describe what the activity was, who organised it, and what your specific role involved. Longer, specific descriptions read better on the official form than one-liners.",
    photos: [], // optional extra photo paths, separate from the certificate image
    outcomes:
      "Describe what you learned or gained: skills built, experience, impact. Two to three sentences works well.",
    signatureOfCounsellor: "",
    certificateImage: path.join(CERTS, "example_hackathon.png"),
  },
  // Add one object per activity. Copy the block above and edit it.
];

const totalPoints = activities.reduce((sum, a) => sum + (a.pointsEarned || 0), 0);

function formatDMY(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y.slice(2)}`;
}

const evaluations = activities.map((act, idx) => {
  const days = act.duration || 0;
  const durationStr =
    act.startDate && act.endDate
      ? `${formatDMY(act.startDate)} to ${formatDMY(act.endDate)}, ${days} day${days > 1 ? "s" : ""}`
      : "";
  return {
    slNo: idx + 1,
    nameOfStudent: "Your Name",
    usn: "1RVXXXX000",
    typeOfWork: act.name,
    duration: durationStr,
    hoursSpent: act.hoursSpent,
    certificateAvailable: act.certificateAttached,
    pointsEarned: act.pointsEarned,
  };
});

const data = {
  student: {
    name: "Your Name",
    usn: "1RVXXXX000",
    department: "Computer Science & Engineering", // must match one of DEPARTMENTS in lib/types/form-filler.ts
    period: "2023-2027",
    totalPoints,
  },
  activities,
  evaluations,
  signatories: {
    // Leave blank unless you actually know the real faculty names/designations.
    evaluator1: { name: "", designation: "" },
    evaluator2: { name: "", designation: "" },
    counsellor: { name: "", designation: "" },
  },
};

module.exports = { data, formatDMY };
