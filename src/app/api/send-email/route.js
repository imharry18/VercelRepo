import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, message, fileUrl } = body;

    // IMPORTANT: 'from' must be a domain you have verified in Resend.
    // Use onboarding@resend.dev for testing, or your verified domain.
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', 
      to: ['hello@14ucapital.in'], // Replace with the inbox where you want to receive emails
      reply_to: email,
      subject: `New Pitch Deck from ${name} at ${company}`,
      html: `
        <div style="font-family: sans-serif; max-w-xl; margin: auto;">
          <h2 style="color: #0B132B;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #fbf6f3; padding: 16px; border-radius: 8px;">${message || "No message provided."}</p>
          ${fileUrl ? `<div style="margin-top: 24px; padding: 16px; background: #b77380; border-radius: 8px; text-align: center;"><a href="${fileUrl}" style="color: white; font-weight: bold; text-decoration: none;">Download Pitch Deck</a></div>` : ''}
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
