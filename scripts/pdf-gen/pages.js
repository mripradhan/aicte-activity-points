const React = require("react");
const { Page, View, Text, Image, StyleSheet } = require("@react-pdf/renderer");
const { styles: commonStyles, INDEX_ROWS_PER_PAGE, EVALUATION_ROWS_PER_PAGE } = require("./styles");
const { Header, Footer, ActivityHeader, ActivityFooter } = require("./common");
const { formatDateRange, chunkArray } = require("./utils");

const e = React.createElement;

// ---- Certificate page ----
const CertificatePage = ({ data }) =>
  e(Page, { size: "A4", orientation: "portrait", style: commonStyles.pagePortrait },
    e(Header, null),
    e(View, { style: commonStyles.certificateContent },
      e(Text, { style: commonStyles.certificateTitle }, "CERTIFICATE"),
      e(Text, { style: commonStyles.certificateText },
        "This is to certify that ",
        e(Text, { style: { fontWeight: "bold" } }, data.student.name || "Student name"),
        " bearing USN ",
        e(Text, { style: { fontWeight: "bold" } }, data.student.usn || "USN"),
        " from the department of ",
        e(Text, { style: { fontWeight: "bold" } }, data.student.department || "Computer Science & Engineering"),
        " has satisfactorily completed ",
        e(Text, { style: { fontWeight: "bold" } }, String(data.student.totalPoints)),
        " Activity Points prescribed by AICTE for BE Graduate Programme during the period ",
        e(Text, { style: { fontWeight: "bold" } }, data.student.period),
        "."
      )
    ),
    e(View, { style: commonStyles.signatureSection },
      e(View, { style: commonStyles.signatureRow },
        e(View, { style: commonStyles.signatureBlock }, e(View, { style: commonStyles.signatureLine }), e(Text, { style: commonStyles.signatureLabel }, "Signature of Student")),
        e(View, { style: commonStyles.signatureBlock }, e(View, { style: commonStyles.signatureLine }), e(Text, { style: commonStyles.signatureLabel }, "Signature of Faculty Counsellor"))
      ),
      e(View, { style: commonStyles.signatureRow },
        e(View, { style: commonStyles.signatureBlock }, e(View, { style: commonStyles.signatureLine }), e(Text, { style: commonStyles.signatureLabel }, "Signature of Dean Student Affairs")),
        e(View, { style: commonStyles.signatureBlock }, e(View, { style: commonStyles.signatureLine }), e(Text, { style: commonStyles.signatureLabel }, "Signature of Principal"))
      )
    ),
    e(Footer, null)
  );

// ---- Index pages ----
const IndexPages = ({ activities, student }) => {
  const activityPages = chunkArray(activities, INDEX_ROWS_PER_PAGE);
  return activityPages.map((pageActivities, pageIndex) => {
    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex === activityPages.length - 1;
    const startIndex = pageIndex * INDEX_ROWS_PER_PAGE;

    return e(Page, { key: `index-${pageIndex}`, size: "A4", orientation: "landscape", style: commonStyles.pageLandscape },
      isFirstPage && e(Header, null),
      isFirstPage && e(React.Fragment, null,
        e(Text, { style: commonStyles.sectionTitle }, "AICTE-Activity Book"),
        e(View, { style: commonStyles.studentInfoLine },
          e(Text, null, e(Text, { style: { fontWeight: "bold" } }, "Name:"), " ", student.name || "Student Name"),
          e(Text, null, e(Text, { style: { fontWeight: "bold" } }, "USN:"), " ", student.usn || "USN")
        ),
        e(Text, { style: commonStyles.subsectionTitle }, "Index sheet")
      ),
      e(View, { style: commonStyles.table },
        isFirstPage && e(View, { style: [commonStyles.tableRow, commonStyles.tableHeader] },
          e(Text, { style: [commonStyles.tableCell, { width: "5%" }] }, "Sl. No"),
          e(Text, { style: [commonStyles.tableCell, { width: "8%" }] }, "Semester"),
          e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, "Name of the Activity"),
          e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, "Map to AICTE Activity"),
          e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, "Date (from & to) duration"),
          e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, "Place where activity was carried"),
          e(Text, { style: [commonStyles.tableCell, { width: "8%" }] }, "Detailed report Page No"),
          e(Text, { style: [commonStyles.tableCell, { width: "10%" }] }, "Certificate / Proof Attached (Y/N)"),
          e(Text, { style: [commonStyles.tableCell, { width: "7%" }] }, "Points attained"),
          e(Text, { style: [commonStyles.tableCellLast, { width: "8%" }] }, "Signature of the counsellor")
        ),
        pageActivities.length > 0
          ? pageActivities.map((activity, idx) =>
              e(View, { key: activity.id, style: commonStyles.tableRow },
                e(Text, { style: [commonStyles.tableCell, { width: "5%" }] }, String(startIndex + idx + 1)),
                e(Text, { style: [commonStyles.tableCell, { width: "8%" }] }, activity.semester),
                e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, activity.name),
                e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, activity.aicteMapping),
                e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, formatDateRange(activity)),
                e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, activity.place),
                e(Text, { style: [commonStyles.tableCell, { width: "8%" }] }, activity.detailedReportPageNo || ""),
                e(Text, { style: [commonStyles.tableCell, { width: "10%" }] }, activity.certificateAttached ? "Y" : "N"),
                e(Text, { style: [commonStyles.tableCell, { width: "7%" }] }, String(activity.pointsEarned)),
                e(Text, { style: [commonStyles.tableCellLast, { width: "8%" }] }, "")
              )
            )
          : e(View, { style: commonStyles.tableRow },
              e(Text, { style: [commonStyles.tableCell, { width: "100%", color: "#999", fontStyle: "italic" }] }, "No activities added")
            )
      ),
      isLastPage && e(View, { style: commonStyles.hodSignatureSection },
        e(View, { style: commonStyles.signatureBlock }, e(View, { style: commonStyles.signatureLine }), e(Text, { style: commonStyles.signatureLabel }, "Signature of HoD")),
        e(View, { style: commonStyles.signatureBlock }, e(View, { style: commonStyles.signatureLine }), e(Text, { style: commonStyles.signatureLabel }, "Signature of NCC/NSS officer/DSA/Dean CAT"))
      ),
      e(Footer, null)
    );
  });
};

// ---- Evaluation pages ----
const EvaluationPages = ({ evaluations, signatories }) => {
  const evaluationPages = chunkArray(evaluations, EVALUATION_ROWS_PER_PAGE);
  return evaluationPages.map((pageEvaluations, pageIndex) => {
    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex === evaluationPages.length - 1;
    const startIndex = pageIndex * EVALUATION_ROWS_PER_PAGE;

    return e(Page, { key: `eval-${pageIndex}`, size: "A4", orientation: "landscape", style: commonStyles.pageLandscape },
      isFirstPage && e(Header, null),
      isFirstPage && e(Text, { style: commonStyles.sectionTitle }, "EVALUATION SHEET"),
      e(View, { style: commonStyles.table },
        isFirstPage && e(View, { style: [commonStyles.tableRow, commonStyles.tableHeader] },
          e(Text, { style: [commonStyles.tableCell, { width: "6%" }] }, "Sl. No"),
          e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, "Name of Student"),
          e(Text, { style: [commonStyles.tableCell, { width: "14%" }] }, "USN"),
          e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, "Type of work carried"),
          e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, "Duration"),
          e(Text, { style: [commonStyles.tableCell, { width: "10%" }] }, "Number of hours spent"),
          e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, "Availability of Certificate (Y/N)"),
          e(Text, { style: [commonStyles.tableCellLast, { width: "10%" }] }, "Points earned")
        ),
        pageEvaluations.length > 0
          ? pageEvaluations.map((evaluation, idx) =>
              e(View, { key: startIndex + idx, style: commonStyles.tableRow },
                e(Text, { style: [commonStyles.tableCell, { width: "6%" }] }, String(startIndex + idx + 1)),
                e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, evaluation.nameOfStudent),
                e(Text, { style: [commonStyles.tableCell, { width: "14%" }] }, evaluation.usn),
                e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, evaluation.typeOfWork),
                e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, evaluation.duration),
                e(Text, { style: [commonStyles.tableCell, { width: "10%" }] }, String(evaluation.hoursSpent || "")),
                e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, evaluation.certificateAvailable ? "Y" : "N"),
                e(Text, { style: [commonStyles.tableCellLast, { width: "10%" }] }, String(evaluation.pointsEarned))
              )
            )
          : e(View, { style: commonStyles.tableRow },
              e(Text, { style: [commonStyles.tableCell, { width: "6%" }] }, "1"),
              e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, ""),
              e(Text, { style: [commonStyles.tableCell, { width: "14%" }] }, ""),
              e(Text, { style: [commonStyles.tableCell, { width: "18%" }] }, ""),
              e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, ""),
              e(Text, { style: [commonStyles.tableCell, { width: "10%" }] }, ""),
              e(Text, { style: [commonStyles.tableCell, { width: "12%" }] }, ""),
              e(Text, { style: [commonStyles.tableCellLast, { width: "10%" }] }, "")
            )
      ),
      isLastPage && e(View, { style: commonStyles.evaluatorSignatureSection },
        e(View, { style: commonStyles.signatureBlock },
          e(Text, { style: { fontWeight: "bold", marginBottom: 3 } }, signatories?.evaluator1?.name || "Name of Evaluator 1"),
          e(Text, { style: { marginBottom: 3 } }, signatories?.evaluator1?.designation || "Designation"),
          e(View, { style: commonStyles.signatureLine }),
          e(Text, { style: commonStyles.signatureLabel }, "Signature")
        ),
        e(View, { style: commonStyles.signatureBlock },
          e(Text, { style: { fontWeight: "bold", marginBottom: 3 } }, signatories?.evaluator2?.name || "Name of Evaluator 2"),
          e(Text, { style: { marginBottom: 3 } }, signatories?.evaluator2?.designation || "Designation"),
          e(View, { style: commonStyles.signatureLine }),
          e(Text, { style: commonStyles.signatureLabel }, "Signature")
        ),
        e(View, { style: commonStyles.signatureBlock },
          e(Text, { style: { fontWeight: "bold", marginBottom: 3 } }, signatories?.counsellor?.name || "Name of Counsellor"),
          e(Text, { style: { marginBottom: 3 } }, signatories?.counsellor?.designation || "Designation"),
          e(View, { style: commonStyles.signatureLine }),
          e(Text, { style: commonStyles.signatureLabel }, "Signature")
        )
      ),
      e(Footer, null)
    );
  });
};

// ---- Activity pages ----
const ActivityPages = ({ activities, department, startPageOffset }) =>
  activities.map((activity, index) =>
    e(Page, { key: activity.id, size: "A4", orientation: "portrait", style: commonStyles.pagePortrait },
      e(ActivityHeader, null),
      e(View, { style: commonStyles.activityTable },
        e(View, { style: commonStyles.activityRow },
          e(Text, { style: commonStyles.activityLabel }, "Sl. No."),
          e(Text, { style: commonStyles.activityValue }, String(index + 1))
        ),
        e(View, { style: commonStyles.activityRow },
          e(Text, { style: commonStyles.activityLabel }, "Date & Duration"),
          e(Text, { style: commonStyles.activityValue }, formatDateRange(activity))
        ),
        e(View, { style: commonStyles.activityRow },
          e(Text, { style: commonStyles.activityLabel }, "Activity Name"),
          e(Text, { style: commonStyles.activityValue }, activity.name)
        ),
        e(View, { style: commonStyles.activityRow },
          e(Text, { style: commonStyles.activityLabel }, "Description of the activity"),
          e(Text, { style: commonStyles.descriptionCell }, activity.description)
        ),
        e(View, { style: commonStyles.activityRow },
          e(Text, { style: commonStyles.activityLabel }, "Photos"),
          e(View, { style: commonStyles.photosCell },
            activity.photos && activity.photos.length > 0
              ? e(View, { style: commonStyles.photosContainer },
                  activity.photos.map((photo, idx) => e(Image, { key: idx, src: photo, style: commonStyles.photo }))
                )
              : e(Text, null, "[Attach photos here]")
          )
        ),
        e(View, { style: commonStyles.activityRow },
          e(Text, { style: commonStyles.activityLabel }, "Outcome"),
          e(Text, { style: commonStyles.outcomeCell }, activity.outcomes)
        ),
        e(View, { style: commonStyles.activityRow },
          e(Text, { style: commonStyles.activityLabel }, "Points earned"),
          e(Text, { style: commonStyles.activityValue }, String(activity.pointsEarned))
        )
      ),
      activity.certificateAttached && activity.certificateImage &&
        e(Image, { src: activity.certificateImage, style: commonStyles.certificateImage }),
      e(ActivityFooter, { department: department || "", pageOffset: startPageOffset })
    )
  );

// ---- Preamble page ----
const preambleStyles = StyleSheet.create({
  title: { fontSize: 12, marginTop: 20, marginBottom: 10, textAlign: "center", fontFamily: "Times-Roman", fontWeight: "bold" },
  subtitle: { fontSize: 11, marginBottom: 10, fontFamily: "Times-Roman", fontWeight: "bold" },
  text: { fontSize: 11, marginBottom: 10, textAlign: "justify", fontFamily: "Times-Roman", lineHeight: 1.5 },
  tableCaption: { fontSize: 11, marginTop: 10, marginBottom: 5, textAlign: "left", fontFamily: "Times-Roman" },
  table: { width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: "#000", marginBottom: 15 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000", minHeight: 25, alignItems: "stretch" },
  lastTableRow: { flexDirection: "row", minHeight: 25, alignItems: "stretch" },
  tableHeader: { padding: 2, fontSize: 10, fontFamily: "Times-Roman", textAlign: "center", fontWeight: "bold" },
  tableCell: { padding: 3, fontSize: 10, fontFamily: "Times-Roman", textAlign: "left" },
  col1: { width: "10%", borderRightWidth: 1, borderRightColor: "#000", textAlign: "center", justifyContent: "center" },
  col2: { width: "70%", borderRightWidth: 1, borderRightColor: "#000", textAlign: "center", justifyContent: "center" },
  col3: { width: "20%", textAlign: "center", justifyContent: "center" },
  t2Col1: { width: "8%", borderRightWidth: 1, borderRightColor: "#000", textAlign: "center", justifyContent: "center" },
  t2Col2: { width: "52%", borderRightWidth: 1, borderRightColor: "#000", justifyContent: "center" },
  t2Col34Group: { width: "22%", borderRightWidth: 1, borderRightColor: "#000", flexDirection: "column" },
  t2Col3: { width: "11%", borderRightWidth: 1, borderRightColor: "#000", textAlign: "center", justifyContent: "center" },
  t2Col4: { width: "11%", borderRightWidth: 1, borderRightColor: "#000", textAlign: "center", justifyContent: "center" },
  t2Col5: { width: "18%", textAlign: "center", justifyContent: "center" },
  bulletPoint: { flexDirection: "row", marginBottom: 5, paddingLeft: 10, paddingRight: 10 },
  bullet: { width: 15, fontSize: 16, fontFamily: "Times-Roman", textAlign: "center", marginTop: -2 },
  bulletText: { flex: 1, fontSize: 10, fontFamily: "Times-Roman", textAlign: "justify", lineHeight: 1.4 },
  footer: { marginTop: 20, fontSize: 10, fontFamily: "Times-Roman", textAlign: "left" },
});

const preambleActivities = [
  "Helping local schools to achieve good result and enhance their enrolment in Higher/technical/ vocational education.",
  "Preparing an actionable business proposal for enhancing the village income.",
  "Developing Sustainable Water management system.",
  "Tourism approaches through innovative approaches.",
  "Promotion of appropriate technologies.",
  "Reduction in energy consumption.",
  "To skill rural population.",
  "Facilitating 100% digitized money transactions.",
  "Setting of the information imparting club for women leading to contribution in social and economic issues.",
  "Developing and managing efficient garbage disposable system.",
  "To assist the marketing of rural produce.",
  "Food preservation/ packaging.",
  "Automation of local activities.",
  "Spreading public awareness under rural outreach program.",
  "Contribution to any national level initiative of Government of India. For eg. Digital India, Skill India, Swachh Bharat Internship etc.",
];

const PreamblePage = () =>
  e(Page, { size: "A4", style: commonStyles.pagePortrait },
    e(Text, { style: preambleStyles.title }, "Activity Points for Award of Degree"),
    e(Text, { style: preambleStyles.subtitle }, "Preamble:"),
    e(Text, { style: preambleStyles.text },
      "Apart from technical knowledge and skills, to be successful as professional, students should have excellent soft skills, leadership qualities and team spirit. They should have entrepreneurial capabilities and societal commitment. In order to match these multifarious requirement, AICTE has created a unique mechanism of awarding Activity points over and above the academic grades."
    ),
    e(Text, { style: preambleStyles.tableCaption }, "Table 1: Activity point requirement"),
    e(View, { style: preambleStyles.table },
      e(View, { style: preambleStyles.tableRow },
        e(View, { style: preambleStyles.col1 }, e(Text, { style: preambleStyles.tableHeader }, "Sl.No.")),
        e(View, { style: preambleStyles.col2 }, e(Text, { style: preambleStyles.tableHeader }, "Student category")),
        e(View, { style: preambleStyles.col3 }, e(Text, { style: preambleStyles.tableHeader }, "Activity points prescribed by AICTE"))
      ),
      e(View, { style: preambleStyles.tableRow },
        e(View, { style: preambleStyles.col1 }, e(Text, { style: preambleStyles.tableCell }, "1")),
        e(View, { style: [preambleStyles.col2, { alignItems: "flex-start", paddingLeft: 5 }] }, e(Text, { style: preambleStyles.tableCell }, "Day college regular student admitted to the 4 years Degree programme")),
        e(View, { style: preambleStyles.col3 }, e(Text, { style: preambleStyles.tableCell }, "100"))
      ),
      e(View, { style: preambleStyles.tableRow },
        e(View, { style: preambleStyles.col1 }, e(Text, { style: preambleStyles.tableCell }, "2")),
        e(View, { style: [preambleStyles.col2, { alignItems: "flex-start", paddingLeft: 5 }] }, e(Text, { style: preambleStyles.tableCell }, "Student entering 4 years degree programme through lateral entry")),
        e(View, { style: preambleStyles.col3 }, e(Text, { style: preambleStyles.tableCell }, "75"))
      ),
      e(View, { style: preambleStyles.lastTableRow },
        e(View, { style: preambleStyles.col1 }, e(Text, { style: preambleStyles.tableCell }, "3")),
        e(View, { style: [preambleStyles.col2, { alignItems: "flex-start", paddingLeft: 5 }] }, e(Text, { style: preambleStyles.tableCell }, "Students transferred from other Universities to fifth semester")),
        e(View, { style: preambleStyles.col3 }, e(Text, { style: preambleStyles.tableCell }, "50"))
      )
    ),
    e(View, { style: preambleStyles.bulletPoint },
      e(Text, { style: preambleStyles.bullet }, "•"),
      e(Text, { style: preambleStyles.bulletText }, "The Activity Points earned shall be reflected on the students eighth semester Grade card (duration of the programme), anytime during the semester weekends and holidays, as per the interest and convenience of the student from the year of entry to the programme. However, minimum hours specified must be satisfied.")
    ),
    e(View, { style: preambleStyles.bulletPoint },
      e(Text, { style: preambleStyles.bullet }, "•"),
      e(Text, { style: preambleStyles.bulletText }, "Activity Points (non-credit) have no effect on SGPA/CGPA and shall not be considered for vertical progression.")
    ),
    e(View, { style: preambleStyles.bulletPoint },
      e(Text, { style: preambleStyles.bullet }, "•"),
      e(Text, { style: preambleStyles.bulletText }, "In case students fail to earn the prescribed activity points, Eighth semester Grade Card shall be issued only after earning the required activity points. Students shall be admitted for the award of degree only after the release of the Eighth semester Grade card.")
    ),
    e(View, { style: preambleStyles.bulletPoint },
      e(Text, { style: preambleStyles.bullet }, "•"),
      e(Text, { style: preambleStyles.bulletText }, "The consolidated report of activity points earned by the students will be sent to the University. A notification in this respect will be issued by Registrar (Evaluation), VTU, Belagavi.")
    ),
    e(Text, { style: [preambleStyles.tableCaption, { marginTop: 15 }] }, "Table 2: Following suggestive activities may be carried out by students in teams as per their choice:"),
    e(View, { style: preambleStyles.table },
      e(View, { style: [preambleStyles.tableRow, { height: 40 }] },
        e(View, { style: preambleStyles.t2Col1 }, e(Text, { style: preambleStyles.tableHeader }, "Sl. No")),
        e(View, { style: preambleStyles.t2Col2 }, e(Text, { style: preambleStyles.tableHeader }, "Activity Head")),
        e(View, { style: preambleStyles.t2Col34Group },
          e(View, { style: { borderBottomWidth: 1, borderBottomColor: "#000", height: "50%", justifyContent: "center" } }, e(Text, { style: preambleStyles.tableHeader }, "Minimum duration")),
          e(View, { style: { flexDirection: "row", height: "50%" } },
            e(View, { style: { width: "50%", borderRightWidth: 1, borderRightColor: "#000", justifyContent: "center" } }, e(Text, { style: preambleStyles.tableHeader }, "Weeks")),
            e(View, { style: { width: "50%", justifyContent: "center" } }, e(Text, { style: preambleStyles.tableHeader }, "Hours"))
          )
        ),
        e(View, { style: preambleStyles.t2Col5 }, e(Text, { style: preambleStyles.tableHeader }, "Performance appraisal/Maximum points/activity"))
      ),
      preambleActivities.map((activity, index) =>
        e(View, { key: index, style: index === preambleActivities.length - 1 ? preambleStyles.lastTableRow : preambleStyles.tableRow },
          e(View, { style: preambleStyles.t2Col1 }, e(Text, { style: preambleStyles.tableCell }, `${index + 1}.`)),
          e(View, { style: [preambleStyles.t2Col2, { padding: 4 }] }, e(Text, { style: preambleStyles.tableCell }, activity)),
          e(View, { style: preambleStyles.t2Col3 }, e(Text, { style: preambleStyles.tableCell }, "2")),
          e(View, { style: preambleStyles.t2Col4 }, e(Text, { style: preambleStyles.tableCell }, "80-90")),
          e(View, { style: preambleStyles.t2Col5 }, e(Text, { style: preambleStyles.tableCell }, "20"))
        )
      )
    ),
    e(Text, { style: preambleStyles.footer }, "Evaluated by NSS/youth Red cross Co-ordinators/Chair person-CICC(College Internal complaints committee)/SAGY(Sansad Adarsh Gram yojana, Govt. of India) of the institute/ Mentor")
  );

module.exports = { CertificatePage, IndexPages, EvaluationPages, ActivityPages, PreamblePage };
