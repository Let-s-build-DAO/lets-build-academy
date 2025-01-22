// pages/api/sendBlogEmail.js
import nodemailer from 'nodemailer';

export const POST = async (req) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = await req.json();

  try {
    // Get the list of subscribers from Firebase

    // Set up Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Use Zoho's SMTP host
      port: 465, // Use port 465 for secure SMTP
      secure: true,
      auth: {
        user: '',
        pass: '',
      },
    });

    // Email content
    const mailOptions = {
      from: ``,
      to: email, // Sending the email to yourself
      // bcc: subscribers.join(','), // Blind Carbon Copy to all subscribers
      subject: ``,
      html: `
      
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Emails sent successfully' }), { status: 200 });
    // return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    // return res.status(500).json({ message: 'Internal Server Error' });
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });

  }
};