'use strict';

const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');


const SALT_ROUNDS = 10;
const DEMO_PASSWORD = 'DemoPass123!';
// Mirrors the destination upload.middleware.js writes real uploads to, and
// the URL shape resumeFileToUrl() produces — so a seeded applicant's resume
// looks and behaves exactly like one uploaded through the real endpoint.
const RESUME_UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'resumes');
const RESUME_FIXTURES = {
  ada: path.join(__dirname, 'fixtures', 'ada-resume.pdf'),
  femi: path.join(__dirname, 'fixtures', 'femi-resume.pdf'),
  sarah: path.join(__dirname, 'fixtures', 'sarah-resume.pdf'),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, SALT_ROUNDS);
    const now = new Date();

    // --- Users (3 applicants, 3 employers) ---
    const users = [
      { id: randomUUID(), email: 'ada.applicant@example.com', role: 'applicant', phone: '08010000001' },
      { id: randomUUID(), email: 'femi.applicant@example.com', role: 'applicant', phone: '08010000002' },
      { id: randomUUID(), email: 'sarah.applicant@example.com', role: 'applicant', phone: '08010000003' },
      { id: randomUUID(), email: 'john.employer@example.com', role: 'employer' },
      { id: randomUUID(), email: 'hr@brightgrid.example.com', role: 'employer' },
      { id: randomUUID(), email: 'hr@lumenworks.example.com', role: 'employer' },
    ];

    for (const user of users) {
      const [row] = await queryInterface.sequelize.query(
        `SELECT id FROM "users" WHERE email = :email LIMIT 1`,
        {
          replacements: { email: user.email },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (row) {
        user.id = row.id; // if user already exists, use existing id
        continue; // jumps straight to next loop iteration, skips if user already exists
      }
      await queryInterface.bulkInsert('users', [{
        id: user.id,
        email: user.email,
        passwordHash,
        role: user.role,
        phone: user.phone,
        createdAt: now,
        updatedAt: now,
      }]);
    }
    const [ada, femi, sarah, john, brightgrid, lumenworks] = users;


    // Make sure the destination exists — same guard upload.middleware.js
    // does before multer's diskStorage writes into it, since neither
    // multer nor fs.copyFileSync will create missing parent folders.
    fs.mkdirSync(RESUME_UPLOAD_DIR, { recursive: true });

    // Copies the matching fixture PDF into the (gitignored) uploads/
    // folder under a unique filename, then returns the exact URL shape
    // resumeFileToUrl() would return for a real upload — so a seeded
    // applicant's resume is a real file on disk, not just a string that
    // happens to look like a path.
    const seedResumeFile = (userId, fixtureKey) => {
      const filename = `${userId}-${Date.now()}.pdf`;
      fs.copyFileSync(RESUME_FIXTURES[fixtureKey], path.join(RESUME_UPLOAD_DIR, filename));
      return `/uploads/resumes/${filename}`;
    };


    // --- Applicant Profiles ---
    const applicantProfiles = [
      {
        id: randomUUID(),
        userId: ada.id,
        firstName: 'Ada',
        lastName: 'Okoro',
        techstack: ['JavaScript', 'React', 'MongoDB'],
        yearOfExperience: 3,
        linkedinURL: 'https://www.linkedin.com/in/ada-okoro',
        githubURL: 'https://github.com/ada-okoro',
        buildResume: () => seedResumeFile(ada.id, 'ada'),
      },
      {
        id: randomUUID(),
        userId: femi.id,
        firstName: 'Femi',
        lastName: 'Adeyemi',
        techstack: ['Python', 'Django', 'PostgreSQL'],
        yearOfExperience: 5,
        linkedinURL: 'https://www.linkedin.com/in/femi-adeyemi',
        githubURL: 'https://github.com/femi-adeyemi',
        buildResume: () => seedResumeFile(femi.id, 'femi'),
      },
      {
        id: randomUUID(),
        userId: sarah.id,
        firstName: 'Sarah',
        lastName: 'Lawson',
        techstack: ['TypeScript', 'Angular', 'MySQL'],
        yearOfExperience: 2,
        linkedinURL: 'https://www.linkedin.com/in/sarah-lawson',
        githubURL: 'https://github.com/sarah-lawson',
        buildResume: () => seedResumeFile(sarah.id, 'sarah'),
      },
    ];

    const applicantIds = {};
    for (const profile of applicantProfiles) {
      const [row] = await queryInterface.sequelize.query(
        `SELECT id FROM "applicantProfiles" WHERE "userId" = :userId LIMIT 1`,
        { replacements: { userId: profile.userId }, type: Sequelize.QueryTypes.SELECT }
      );
      if (row) {
        applicantIds[profile.userId] = row.id;
        continue;
      }

      // Only copy a resume file into uploads/resumes/ when we're actually
      // about to insert this profile — otherwise re-running the seeder
      // against an already-seeded database would silently pile up orphan
      // PDFs on disk every time, one per run, for profiles that already exist.
      const { buildResume, ...rest } = profile;

      await queryInterface.bulkInsert('applicantProfiles', [{
        ...rest,
        resume: buildResume(),
        createdAt: now,
        updatedAt: now,
      }]);
      applicantIds[profile.userId] = profile.id;
    }

    // --- Employer Profiles ---
    const employerProfiles = [
      {
        id: randomUUID(),
        userId: john.id,
        companyName: 'JohnTech',
        companyDescription: 'Innovative solutions for modern businesses.',
        companyWebsite: 'https://lively.example.com',
      },
      {
        id: randomUUID(),
        userId: brightgrid.id,
        companyName: 'BrightGrid',
        companyDescription: 'Cloud infrastructure tooling for small teams.',
        companyWebsite: 'https://brightgrid.example.com',
      },
      {
        id: randomUUID(),
        userId: lumenworks.id,
        companyName: 'LumenWorks',
        companyDescription: 'Developer productivity SaaS.',
        companyWebsite: 'https://lumenworks.example.com',
      },
    ];

    const employerIds = {};
    for (const profile of employerProfiles) {
      const [row] = await queryInterface.sequelize.query(
        `SELECT id FROM "employerProfiles" WHERE "userId" = :userId LIMIT 1`,
        { replacements: { userId: profile.userId }, type: Sequelize.QueryTypes.SELECT }
      );
      if (row) {
        employerIds[profile.userId] = row.id;
        continue;
      }
      await queryInterface.bulkInsert('employerProfiles', [{
        ...profile,
        createdAt: now,
        updatedAt: now,
      }]);
      employerIds[profile.userId] = profile.id;
    }

    // --- Job Listings (1 per employer) ---
    const jobListings = [
      {
        id: randomUUID(),
        employerId: employerIds[john.id],
        title: 'Frontend Developer',
        description: 'Build and maintain our React frontend.',
        techRole: 'Frontend',
        workPreference: 'on-site',
        location: 'Lagos, Nigeria',
        status: 'open',
      },
      {
        id: randomUUID(),
        employerId: employerIds[brightgrid.id],
        title: 'Backend Engineer',
        description: 'Own our Node.js/Express API and PostgreSQL schema.',
        techRole: 'Backend',
        workPreference: 'remote',
        location: 'Remote',
        status: 'open',
      },
      {
        id: randomUUID(),
        employerId: employerIds[lumenworks.id],
        title: 'Full-Stack Developer',
        description: 'Work across a React frontend and a Django backend.',
        techRole: 'Full-Stack',
        workPreference: 'hybrid',
        location: 'Lagos, Nigeria',
        status: 'open',
      },
    ];

    const jobListingIds = [];
    for (const listing of jobListings) {
      const [row] = await queryInterface.sequelize.query(
        `SELECT id FROM "jobListings" WHERE title = :title AND "employerId" = :employerId LIMIT 1`,
        { replacements: { title: listing.title, employerId: listing.employerId }, type: Sequelize.QueryTypes.SELECT }
      );
      if (row) {
        jobListingIds.push(row.id);
        continue;
      }
      await queryInterface.bulkInsert('jobListings', [{
        ...listing,
        createdAt: now,
        updatedAt: now,
      }]);
      jobListingIds.push(listing.id);
    }

    // --- One sample application: Ada applies to the BrightGrid listing ---
    const [existingApplication] = await queryInterface.sequelize.query(
      `SELECT id FROM "applications" WHERE "applicantId" = :applicantId AND "jobListingId" = :jobListingId LIMIT 1`,
      {
        replacements: { applicantId: applicantIds[ada.id], jobListingId: jobListingIds[0] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    if (!existingApplication) {
      await queryInterface.bulkInsert('applications', [{
        id: randomUUID(),
        applicantId: applicantIds[ada.id],
        jobListingId: jobListingIds[0],
        status: 'applied',
        coverNote: 'Excited about the backend role — happy to walk through my Node.js projects.',
        cancelledAt: null,
        appliedAt: now,
        updatedAt: now,
      }]);
    }
  },

async down(queryInterface, Sequelize) {
    const seededEmails = [
      'ada.applicant@example.com',
      'femi.applicant@example.com',
      'sarah.applicant@example.com',
      'john.employer@example.com',
      'hr@brightgrid.example.com',
      'hr@lumenworks.example.com',
    ];

    // Look up exactly which user IDs, applicant profile IDs, employer
    // profile IDs, and job listing IDs belong to THIS seeder's data —
    // every delete below is scoped to these specific IDs, never a blanket
    // delete on the whole table. This is the fix: the previous version of
    // this function used bulkDelete(table, null, {}) on four tables, which
    // deletes every row in that table regardless of who created it.
    const seededUserRows = await queryInterface.sequelize.query(
      `SELECT id FROM "users" WHERE email IN (:emails)`,
      { replacements: { emails: seededEmails }, type: Sequelize.QueryTypes.SELECT }
    );
    const seededUserIds = seededUserRows.map(r => r.id);
    if (seededUserIds.length === 0) return; // nothing to undo

    const applicantProfileRows = await queryInterface.sequelize.query(
      `SELECT id, resume FROM "applicantProfiles" WHERE "userId" IN (:userIds)`,
      { replacements: { userIds: seededUserIds }, type: Sequelize.QueryTypes.SELECT }
    );
    const applicantProfileIds = applicantProfileRows.map(r => r.id);

    const employerProfileRows = await queryInterface.sequelize.query(
      `SELECT id FROM "employerProfiles" WHERE "userId" IN (:userIds)`,
      { replacements: { userIds: seededUserIds }, type: Sequelize.QueryTypes.SELECT }
    );
    const employerProfileIds = employerProfileRows.map(r => r.id);

    const jobListingRows = employerProfileIds.length
      ? await queryInterface.sequelize.query(
          `SELECT id FROM "jobListings" WHERE "employerId" IN (:employerIds)`,
          { replacements: { employerIds: employerProfileIds }, type: Sequelize.QueryTypes.SELECT }
        )
      : [];
    const jobListingIds = jobListingRows.map(r => r.id);

    // Delete the resume files belonging to these specific applicant
    // profiles before removing the rows that reference them.
    const fs = require('fs');
    const path = require('path');
    for (const { resume } of applicantProfileRows) {
      if (!resume) continue;
      const filePath = path.join(process.cwd(), resume.replace(/^\//, ''));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    // Delete in FK-dependency order, each scoped to exactly the IDs
    // gathered above — never table-wide.
    if (applicantProfileIds.length || jobListingIds.length) {
      await queryInterface.sequelize.query(
        `DELETE FROM "applications" WHERE "applicantId" IN (:applicantIds) OR "jobListingId" IN (:jobListingIds)`,
        { replacements: {
            applicantIds: applicantProfileIds.length ? applicantProfileIds : [null],
            jobListingIds: jobListingIds.length ? jobListingIds : [null],
          } }
      );
    }
    if (jobListingIds.length) {
      await queryInterface.bulkDelete('jobListings', { id: jobListingIds }, {});
    }
    if (applicantProfileIds.length) {
      await queryInterface.bulkDelete('applicantProfiles', { id: applicantProfileIds }, {});
    }
    if (employerProfileIds.length) {
      await queryInterface.bulkDelete('employerProfiles', { id: employerProfileIds }, {});
    }
    await queryInterface.bulkDelete('users', { email: seededEmails }, {});
},
};