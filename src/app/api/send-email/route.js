import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, company, email, message, fileUrl } = body;

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: '14U Capital <portal@14ucapital.in>', 
      to: ['Hello@14ucapital.in', 'Investments@14ucapital.in'], 
      reply_to: email,
      subject: `[Pitch Deck] ${company} - ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-w-2xl; margin: auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="margin-bottom: 32px;">
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 8px; tracking: -0.025em;">New Pitch Deck Submission</h2>
            <p style="color: #64748b; font-size: 16px; margin: 0;">A new founder has reached out via the 14U Capital portal.</p>
          </div>

          <div style="display: grid; gap: 24px; margin-bottom: 32px;">
            <div style="padding: 16px; background: #f8fafc; border-radius: 8px;">
              <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #94a3b8; margin: 0 0 4px 0; letter-spacing: 0.05em;">Founder Name</p>
              <p style="font-size: 16px; font-weight: 600; color: #1e293b; margin: 0;">${name}</p>
            </div>
            
            <div style="padding: 16px; background: #f8fafc; border-radius: 8px;">
              <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #94a3b8; margin: 0 0 4px 0; letter-spacing: 0.05em;">Company</p>
              <p style="font-size: 16px; font-weight: 600; color: #1e293b; margin: 0;">${company}</p>
            </div>

            <div style="padding: 16px; background: #f8fafc; border-radius: 8px;">
              <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #94a3b8; margin: 0 0 4px 0; letter-spacing: 0.05em;">Email Address</p>
              <p style="font-size: 16px; font-weight: 600; color: #1e293b; margin: 0;">${email}</p>
            </div>
          </div>

          <div style="margin-bottom: 32px;">
            <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #94a3b8; margin: 0 0 8px 0; letter-spacing: 0.05em;">Message</p>
            <div style="padding: 20px; background: #fdf2f8; border-left: 4px solid #b77380; border-radius: 4px; color: #475569; line-height: 1.6; font-size: 15px;">
              ${message.replace(/\n/g, '<br/>') || "No additional message provided."}
            </div>
          </div>

          ${fileUrl ? `
          <div style="margin-top: 40px; text-align: center;">
            <a href="${fileUrl}" style="display: inline-block; padding: 14px 28px; background-color: #b77380; color: #ffffff; font-weight: 700; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(183, 115, 128, 0.2);">
              Review Pitch Deck
            </a>
            <p style="margin-top: 12px; font-size: 12px; color: #94a3b8;">Click to download the attached presentation</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">Sent via 14U Capital Automated Portal</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
