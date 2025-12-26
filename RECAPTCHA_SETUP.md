# Complete reCAPTCHA Setup Guide

This guide will help you complete the reCAPTCHA setup so that tokens are properly verified on the backend.

## The Problem

reCAPTCHA requires **server-side verification** of tokens. Your frontend generates tokens, but they need to be verified with Google's API using your **Secret Key** (not the Site Key). Since GitHub Pages only hosts static files, you need a separate backend service.

## Solution: Deploy a Cloudflare Worker (Simplest & Free)

We've created a Cloudflare Worker that you can deploy for free. This is the simplest solution - no separate hosting account needed, just a free Cloudflare account.

## Step 1: Get Your reCAPTCHA Secret Key

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on your site (the one for `thehighestprimenumber.github.io`)
3. Under "Keys", you'll see:
   - **Site Key** (already configured) - starts with `6Lc...`
   - **Secret Key** (needed for backend) - starts with `6Lc...` (different from Site Key)
4. Copy the **Secret Key** - you'll need this in Step 3

## Step 2: Deploy Cloudflare Worker (Free & Easy - 5 minutes)

### Quick Setup (5 minutes):

1. **Sign up for Cloudflare** (free): Go to [dash.cloudflare.com](https://dash.cloudflare.com/sign-up)
   - Use your GitHub account to sign up (easiest)

2. **Install Wrangler CLI** (Cloudflare's deployment tool):
   ```bash
   npm install -g wrangler
   ```

3. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```
   This will open your browser to authorize.

4. **Deploy the Worker**:
   ```bash
   cd /home/nina/dev/resume
   wrangler deploy
   ```

5. **Set the Secret Key**:
   ```bash
   wrangler secret put RECAPTCHA_SECRET_KEY
   ```
   When prompted, paste your reCAPTCHA Secret Key.

6. **Get your Worker URL**:
   After deployment, you'll see a URL like:
   ```
   https://recaptcha-verifier.your-username.workers.dev
   ```
   Copy this URL - you'll need it in Step 3.

**That's it!** Your backend is now live and free forever (Cloudflare Workers free tier includes 100,000 requests/day).

## Step 3: Configure Frontend to Use Backend

After deploying the Cloudflare Worker, you'll have a URL like `https://recaptcha-verifier.your-username.workers.dev`.

### For Production (GitHub Pages):

1. Go to your GitHub repository: `https://github.com/thehighestprimenumber/thehighestprimenumber.github.io`
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Add a new secret:
   - **Name**: `VITE_RECAPTCHA_VERIFY_URL`
   - **Value**: `https://recaptcha-verifier.your-username.workers.dev` (use YOUR actual URL from Step 2)

### For Local Development:

Create or update your `.env` file:

```bash
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
VITE_RECAPTCHA_VERIFY_URL=https://recaptcha-verifier.your-username.workers.dev
```

**Note**: You can test locally by running `wrangler dev` in a separate terminal, but for simplicity, just use your deployed worker URL.

## Step 4: Update GitHub Actions Workflow

Update `.github/workflows/deploy.yml` to include the verify URL. Add this to the Build step:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_RECAPTCHA_SITE_KEY: ${{ secrets.VITE_RECAPTCHA_SITE_KEY }}
    VITE_RECAPTCHA_VERIFY_URL: ${{ secrets.VITE_RECAPTCHA_VERIFY_URL }}
```

Then push your changes - the next deployment will use the backend verification!

## Testing

1. Deploy your changes
2. Visit your site
3. Click "Reveal Email"
4. Check the browser console - you should see successful verification
5. Check Vercel/your platform logs - you should see verification requests

## Troubleshooting

- **"Token is required"**: Frontend isn't sending the token correctly
- **"Server configuration error"**: `RECAPTCHA_SECRET_KEY` not set in backend
- **"reCAPTCHA verification failed"**: Token is invalid or expired
- **CORS errors**: Make sure your backend allows requests from your domain

## Security Notes

- ✅ **Site Key** is public and safe to expose (already in your frontend)
- 🔒 **Secret Key** must NEVER be exposed in frontend code
- 🔒 Always keep Secret Key in environment variables
- ✅ The serverless function only verifies tokens, it doesn't store any data

