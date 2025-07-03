import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
    try {
        const {  message} = await req.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
      const to ="ashutosh.narayan3834@gmail.com";
        const info = await transporter.sendMail({
           
            from: process.env.SMTP_USER,
            to,
            subject:"New Inquiry from Virtual Remote Book Keeper",
            html: message,
            
        });

        return NextResponse.json({ message: 'Email sent successfully', info });
    } catch (error: unknown) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Email not send successfully', error });
      //  return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
    }
}