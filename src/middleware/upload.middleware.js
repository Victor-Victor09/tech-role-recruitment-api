/**
 * src/middleware/upload.middleware.js
 * ------------------------------------------------------------
 * Owner : Person B — Applicant Track
 * Layer : middleware (multer plugs into the request pipeline, so it lives here — not in a generic helpers folder)
 *
 * Responsibility:
 *   multer configuration for the resume upload feature.
 *
 * Build this file to:
 *   - Configure multer storage (disk storage for local dev; swap for cloud storage later without touching callers)
 *   - Restrict file type (pdf/doc/docx) and a sane max size (e.g. 5MB)
 *   - Export a single-file middleware, e.g. uploadResume = multer({...}).single('resume'), used directly in applicant.routes.js's middleware chain
 *   - Export a small helper that turns the saved file into the resume_url string applicant.service.js expects
 *
 * Depends on / imports from:
 *   - multer
 *
 * Reference: Recruiting_System_Backend_Plan.docx -> Section 7 (Stub Your Utils, Helpers & File Uploads)
 */ // TODO: implement    
import multer from "multer";
import path from "path";
import fs from "fs";
import ApiError from "../utils/ApiError.js";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "resumes");

// Make sure the folder exists before multer tries to write into it —
// multer's diskStorage does NOT create directories for you.
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set([
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        // req.user is populated by auth.middleware.js, which always runs
        // before this in the route chain — safe to rely on here.
        const uniqueSuffix = `${req.user.id}-${Date.now()}`;
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return cb(new ApiError("Resume must be a PDF, DOC, or DOCX file", 400));
    }
    cb(null, true);
};

// Single-file middleware — used directly in applicant.routes.js:
// router.post('/profile/resume', auth, role('applicant'), uploadResume, applicantController.uploadResume)
// The form field name multer looks for is 'resume'.
export const uploadResume = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE_BYTES },
}).single("resume");

// Turns the file multer just saved (req.file) into the string
// applicant.service.js expects to store in the `resume` column.
// Kept as a plain path here; swap this one function if you move to
// cloud storage (S3 URL, signed URL, etc.) — nothing else changes.
export const resumeFileToUrl = (file) => `/uploads/resumes/${file.filename}`;
