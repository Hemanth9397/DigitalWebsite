import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends an email to admin notifying about a new user signup.
 * @param {Object} user
 * @param {string} user.name - Name of the new user
 * @param {string} user.email - Email of the new user
 * @param {string} user.imageUrl - Profile image URL of the user
 * @param {string} user.id - User ID (used in approval link)
 */
export const sendAdminNotification = async ({ name, email, imageUrl, id }) => {
  const adminRedirectUrl = `${process.env.ADMIN_URL}/admin/users/approve/${id}`;

  const html = `
    <h2>New User Registration Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <img src="${imageUrl}" alt="Profile Image" width="120" style="border-radius:8px;" />
    <p style="margin-top: 20px;">
      <a href="${adminRedirectUrl}" 
         style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">
        Review & Approve
      </a>
    </p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: "New User Signup - Approval Required",
    html,
  });
};
