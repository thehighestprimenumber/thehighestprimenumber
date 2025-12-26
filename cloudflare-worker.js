/**
 * Cloudflare Worker to verify reCAPTCHA tokens
 * 
 * Deploy this to Cloudflare Workers (free tier available)
 * Instructions in RECAPTCHA_SETUP.md
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    try {
      const { token } = await request.json();

      if (!token) {
        return new Response(
          JSON.stringify({ error: 'Token is required' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Get the secret key from environment variable (set via wrangler secret put)
      const secretKey = env.RECAPTCHA_SECRET_KEY;

      if (!secretKey) {
        return new Response(
          JSON.stringify({ error: 'Server configuration error' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Verify the token with Google's reCAPTCHA API
      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      
      // Properly encode the form data
      // Note: remoteip is optional for v3 and can sometimes cause browser-error
      const formData = new URLSearchParams();
      formData.append('secret', secretKey);
      formData.append('response', token);
      // Don't include remoteip for v3 - it's optional and can cause browser-error
      
      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const data = await response.json();
      
      // Enhanced error logging
      if (!data.success) {
        // Include full response in error for debugging
        const errorInfo = {
          success: data.success,
          'error-codes': data['error-codes'],
          hasSecretKey: !!secretKey,
          secretKeyPrefix: secretKey ? secretKey.substring(0, 10) + '...' : 'none',
          tokenLength: token ? token.length : 0,
          tokenPrefix: token ? token.substring(0, 20) + '...' : 'none',
        };
        
        // Return detailed error info in response for debugging
        return new Response(
          JSON.stringify({
            success: false,
            error: 'reCAPTCHA verification failed',
            'error-codes': data['error-codes'],
            debug: errorInfo,
            message: data['error-codes']?.includes('browser-error') 
              ? 'Possible causes: 1) Secret Key doesn\'t match Site Key, 2) Domain not authorized in reCAPTCHA settings, 3) Keys from different reCAPTCHA sites'
              : null,
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: data.success,
          score: data.score,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};

