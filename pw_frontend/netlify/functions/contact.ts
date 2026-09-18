interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  company?: string;
  projectType?: string;
  message?: string;
  honeypot?: string;
}

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? 'willglickman@gmail.com';
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const handler = async (event: { httpMethod?: string; body?: string | null }) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service is not configured' }),
    };
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body ?? '{}') as ContactPayload;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  // Honeypot filled — pretend success for bots.
  if (payload.honeypot?.trim()) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const name = payload.name?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const subject = payload.subject?.trim() || 'New contact form message';
  const company = payload.company?.trim() ?? '';
  const projectType = payload.projectType?.trim() ?? '';
  const message = payload.message?.trim() ?? '';

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name, email, and message are required' }),
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) };
  }

  const html = `
    <h2>New message from wglickman.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
    ${projectType ? `<p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>` : ''}
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `.trim();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `[Contact] ${subject}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Resend API error:', response.status, errorBody);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    console.error('Contact function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
