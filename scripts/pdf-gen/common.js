const React = require("react");
const { View, Text, Image } = require("@react-pdf/renderer");
const { styles, LOGO } = require("./styles");

const e = React.createElement;

const Header = () =>
  e(View, { style: styles.header },
    e(View, { style: styles.logoSection },
      e(Image, { src: LOGO, style: styles.logo }),
      e(View, { style: styles.collegeInfo },
        e(Text, { style: styles.collegeName }, "RV College of Engineering®"),
        e(Text, { style: styles.collegeAddress }, "Mysore Road, RV Vidyaniketan Post,"),
        e(Text, { style: styles.collegeAddress }, "Bengaluru - 560059, Karnataka, India")
      )
    ),
    e(View, { style: styles.contactInfo },
      e(Text, null, "principal@rvce.edu.in"),
      e(Text, null, "www.rvce.edu.in"),
      e(Text, null, "Tel: +91-80-68188110"),
      e(Text, null, "+91-80-68188111"),
      e(Text, null, "+91-80-68188112")
    )
  );

const Footer = () =>
  e(View, { style: styles.footer, fixed: true },
    e(Text, { style: styles.trustName }, "Rashtreeya Sikshana Samithi Trust®"),
    e(Text, { style: styles.motto }, "Go, change the world®")
  );

const ActivityHeader = () =>
  e(View, { style: styles.activityHeader, fixed: true },
    e(Text, { style: { textAlign: "center", width: "100%" } }, "RV College of Engineering® Bengaluru")
  );

const ActivityFooter = ({ department, pageOffset }) =>
  e(View, { style: styles.activityFooter, fixed: true },
    e(Text, { style: { width: "30%" } }, "AICTE Activity Points"),
    e(View, { style: { position: "absolute", left: 0, right: 0, top: 5, alignItems: "center", justifyContent: "center" } },
      e(Text, { render: ({ pageNumber }) => `${pageNumber - pageOffset}` })
    ),
    e(View, { style: { width: "30%", alignItems: "flex-end" } },
      e(Text, { style: { textAlign: "right" } }, `Department of ${department}`)
    )
  );

module.exports = { Header, Footer, ActivityHeader, ActivityFooter };
