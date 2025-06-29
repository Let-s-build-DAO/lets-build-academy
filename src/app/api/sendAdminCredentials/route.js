import nodemailer from 'nodemailer';

export const POST = async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
  }

  const { email, username, password } = await req.json();

  const smtpUser = process.env.NEXT_PUBLIC_EMAIL_USER;
  const smtpPass = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

  if (!smtpUser || !smtpPass) {
    console.error("Missing SMTP credentials in environment variables");
    return new Response(JSON.stringify({ error: "Email service not configured properly." }), { status: 500 });
  }

  try {
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Let's Build Academy" <${smtpUser}>`, // ✅ must match SMTP user
      to: email,
      subject: "Your Admin Account Credentials - Let's Build Academy",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>Welcome to Let's Build Academy!</h1>
            <p>Your admin account has been created successfully</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Your Login Credentials</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> <span style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">${password}</span></p>
            </div>
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p><strong>Important:</strong> Please change your password after your first login.</p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://academy.letsbuilddao.org/auth/login" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Login to Your Account
              </a>
            </div>
            <div style="margin-top: 30px; text-align: center; color: #6c757d; font-size: 14px;">
              <p>If you have any questions, contact our support team.</p>
              <p>Thanks for joining Let's Build Academy!</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Admin credentials sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending admin credentials email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send admin credentials email' }), { status: 500 });
  }
};
