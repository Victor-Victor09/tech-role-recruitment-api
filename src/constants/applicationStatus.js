// The ONLY 4 valid application statuses per the brief. Enforce against this
// list in application.validator.js and in the DB enum/migration — never
// allow a 5th value to sneak in from either side.
// Reference: Recruiting_System_Backend_Plan.docx -> Section 2 (Features), Section 5 (Database Schema)

module.exports = {
  APPLIED: "applied",
  UNDER_REVIEW: "under review",
  REJECTED: "rejected",
  HIRED: "hired",
};
