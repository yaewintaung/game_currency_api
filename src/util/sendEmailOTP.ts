import transporter from "../config/transporter";

export default async function sendEmailOTP(email: string, code: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: "Your verification code is " + code,
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  });
}
