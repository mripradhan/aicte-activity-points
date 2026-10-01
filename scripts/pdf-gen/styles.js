const path = require("path");
const { StyleSheet, Font } = require("@react-pdf/renderer");

// Repo root = two levels up from this file (scripts/pdf-gen/styles.js -> repo root)
const REPO = path.join(__dirname, "..", "..");
const FONTS = path.join(REPO, "public/fonts");
const LOGO = path.join(REPO, "public/rvce-logo.png");

Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(FONTS, "inter/Inter-roman.ttf"), fontWeight: 400 },
    { src: path.join(FONTS, "inter/Inter-italic.ttf"), fontWeight: 400, fontStyle: "italic" },
    { src: path.join(FONTS, "inter/Inter-roman.ttf"), fontWeight: 600 },
    { src: path.join(FONTS, "inter/Inter-roman.ttf"), fontWeight: 700 },
  ],
});

Font.register({
  family: "Arial",
  fonts: [
    { src: path.join(FONTS, "arial/arial.ttf"), fontWeight: 400 },
    { src: path.join(FONTS, "arial/G_ari_bd.TTF"), fontWeight: 700 },
    { src: path.join(FONTS, "arial/G_ari_i.TTF"), fontWeight: 400, fontStyle: "italic" },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const INDEX_ROWS_PER_PAGE = 7;
const EVALUATION_ROWS_PER_PAGE = 8;

const styles = StyleSheet.create({
  page: { padding: 40, paddingBottom: 80, fontFamily: "Times-Roman", fontSize: 11, color: "#000" },
  pagePortrait: { paddingTop: 60, paddingBottom: 60, paddingLeft: 40, paddingRight: 40, fontFamily: "Times-Roman", fontSize: 11, color: "#000" },
  pageLandscape: { padding: 30, paddingBottom: 65, fontFamily: "Times-Roman", fontSize: 10, color: "#000" },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, paddingBottom: 8, borderBottomWidth: 1.5, borderBottomColor: "#1e3a5f", fontFamily: "Arial" },
  logoSection: { flexDirection: "row", alignItems: "center", gap: 12 },
  logo: { width: 60, height: 60 },
  collegeInfo: { flexDirection: "column" },
  collegeName: { fontSize: 16, fontWeight: 700, color: "#1e3a5f", fontFamily: "Arial", letterSpacing: 0.3 },
  collegeAddress: { fontSize: 9, color: "#1e3a5f", fontFamily: "Arial", marginTop: 2 },
  contactInfo: { textAlign: "right", fontSize: 9, color: "#1e3a5f", fontFamily: "Arial", lineHeight: 1.4 },

  footer: { position: "absolute", bottom: 25, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", paddingTop: 8, borderTopWidth: 1.5, borderTopColor: "#1e3a5f", fontFamily: "Arial" },
  trustName: { fontSize: 10, fontWeight: 600, color: "#1e3a5f", fontFamily: "Arial" },
  motto: { fontSize: 10, fontStyle: "italic", color: "#1e3a5f", fontFamily: "Arial" },

  certificateContent: { marginTop: 60, alignItems: "center" },
  certificateTitle: { fontSize: 22, fontWeight: "bold", color: "#1e3a5f", textDecoration: "underline", marginBottom: 40 },
  certificateText: { fontSize: 13, lineHeight: 2, textAlign: "justify", maxWidth: "90%", paddingHorizontal: 20 },
  signatureSection: { position: "absolute", bottom: 120, left: 40, right: 40 },
  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40 },
  signatureBlock: { width: "45%", alignItems: "center" },
  signatureLine: { width: 150, height: 30, borderBottomWidth: 1, borderBottomColor: "#000", marginBottom: 5 },
  signatureLabel: { fontSize: 10 },

  sectionTitle: { fontSize: 14, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  subsectionTitle: { fontSize: 12, textAlign: "center", marginBottom: 10 },
  studentInfoLine: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15, fontSize: 11 },

  table: { width: "100%", borderWidth: 1, borderColor: "#000" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000" },
  tableHeader: { backgroundColor: "transparent", fontWeight: "bold" },
  tableCell: { padding: 5, borderRightWidth: 1, borderRightColor: "#000", textAlign: "center", fontSize: 9 },
  tableCellLast: { padding: 5, textAlign: "center", fontSize: 9 },

  hodSignatureSection: { position: "absolute", bottom: 80, left: 30, right: 30, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30 },
  evaluatorSignatureSection: { position: "absolute", bottom: 80, left: 30, right: 30, flexDirection: "row", justifyContent: "space-around" },

  activityTable: { width: "100%", borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#000", marginTop: 0 },
  activityRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000", minHeight: 30 },
  activityLabel: { width: 120, padding: 8, borderRightWidth: 1, borderRightColor: "#000", fontSize: 10, textAlign: "center" },
  activityValue: { flex: 1, padding: 8, fontSize: 10, textAlign: "center" },
  descriptionCell: { flex: 1, padding: 8, fontSize: 10, textAlign: "justify" },
  photosCell: { flex: 1, padding: 8, fontSize: 10, minHeight: 80, color: "#999", fontStyle: "italic", textAlign: "center" },
  outcomeCell: { flex: 1, padding: 8, fontSize: 10, textAlign: "justify" },
  certificateNote: { marginTop: 15, fontSize: 10, fontStyle: "italic" },
  photosContainer: { flexDirection: "column", alignItems: "center", gap: 10, marginTop: 5 },
  photo: { width: 320, height: 220, objectFit: "contain" },
  certificateImage: { width: "100%", height: 500, objectFit: "contain", marginTop: 20 },
  activityHeader: { position: "absolute", top: 25, left: 40, right: 40, height: 35, textAlign: "center", fontSize: 14, fontFamily: "Times-Roman", borderBottomWidth: 1, borderBottomColor: "#000", justifyContent: "center" },
  activityFooter: { position: "absolute", bottom: 30, left: 40, right: 40, height: 30, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#000", paddingTop: 5, fontSize: 10, fontFamily: "Times-Roman" },
});

module.exports = { styles, INDEX_ROWS_PER_PAGE, EVALUATION_ROWS_PER_PAGE, LOGO, REPO };
