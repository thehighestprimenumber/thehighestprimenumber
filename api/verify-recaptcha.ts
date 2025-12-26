import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  // Get the secret key from environment variable
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Verify the token with Google's reCAPTCHA API
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ 
        success: true,
        score: data.score, // reCAPTCHA v3 returns a score (0.0 to 1.0)
      });
    } else {
      return res.status(400).json({ 
        success: false,
        error: 'reCAPTCHA verification failed',
        'error-codes': data['error-codes'],
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

