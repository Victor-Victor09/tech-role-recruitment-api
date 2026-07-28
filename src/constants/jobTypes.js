// Shared enums for job listings — import instead of retyping strings.
// Reference: Recruiting_System_Backend_Plan.docx -> Section 5 (Database Schema)

module.exports = {
  WORK_PREFERENCE: {
    REMOTE: "remote",
    HYBRID: "hybrid",
    ONSITE: "onsite",
  },
  LISTING_STATUS: {
    OPEN: "open",
    CLOSED: "closed",
  },
};
