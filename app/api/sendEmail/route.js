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
        user: 'letsbuilddao@gmail.com',
        pass: 'nuci xapl daao oibl',
      },
    });

    // Email content
    const mailOptions = {
      from: `Let's Build Academy <letsbuilddao@gmail.com>`,
      to: email, // Sending the email to yourself
      // bcc: subscribers.join(','), // Blind Carbon Copy to all subscribers
      subject: `Update on Let's build Blockchain Academy Bootcamp - Sponsored by Lisk Network`,
      html: `
       <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Let's Build Academy Bootcamp</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header img {
                    max-width: 100%;
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666666;
                    text-align: center;
                }
                .footer a {
                    color: #007BFF;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3xoA6-4j81ywha8oFgTuiErefpJgcX08rlg&s" alt="Let's Build Academy">
                </div>
                <p>GM GM,</p>
                <p>We hope this email finds you well. We are excited to inform you that the <strong>Let's Build Academy Bootcamp</strong>, sponsored by <strong>Lisk Network</strong>, is scheduled to start on <strong>January 23rd</strong> and will run for <strong>8 weeks</strong>.</p>
                <p>During the 8-week bootcamp, you will have the opportunity to learn from industry experts and gain hands-on experience in blockchain development, smart contracts, and more.</p>
                <p>In addition to the bootcamp, we will also be hosting <strong>Twitter Spaces</strong> sessions every week, starting from January 23rd, to discuss a topic of the week.</p>
                <h3>Bootcamp and Twitter Spaces Details:</h3>
                <ul>
                    <li><strong>Bootcamp start date:</strong> January 23rd</li>
                    <li><strong>Bootcamp duration:</strong> 8 weeks</li>
                    <li><strong>Twitter Spaces sessions:</strong> Once every week, starting from January 23rd, on a topic of the week @letsbuild_dao</li>
                    <li><strong>Join the Bootcamp Channel:</strong> <a href="https://t.me/letsbuilddaocommunity/2" target="_blank">https://t.me/letsbuilddaocommunity/2</a></li>
                </ul>
                <p>We will be sharing more information about the bootcamp, including the curriculum, schedule, and instructors, in the coming days. In the meantime, we encourage you to follow us on Twitter and join our community to stay updated on the latest news and announcements.</p>
                <p>If you have any questions or concerns, please do not hesitate to reach out to us. We are always here to help.</p>
                <p>Thank you for your interest in the <strong>Let's Build Academy Bootcamp</strong>, and we look forward to seeing you in the Telegram Community!</p>
                <p>Best regards,</p>
                <p><strong>Letsbuild Academy Team</strong></p>
                <p><em>P.S. Don't forget to follow us on Twitter and join our community to stay updated on the latest news and announcements: <a href="https://twitter.com/letsbuild_dao" target="_blank">@letsbuild_dao</a></em></p>
                <p><a href="https://t.me/letsbuilddaocommunity/2" target="_blank">Join the Telegram Community</a></p>
            </div>
            <div class="footer">
                <p>If you no longer wish to receive emails, you can <a href="*|UNSUB|*">unsubscribe here</a>.</p>
            </div>
        </body>
        </html>
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