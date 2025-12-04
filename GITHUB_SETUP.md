# Setting up reCAPTCHA in GitHub

## Step 1: Get your reCAPTCHA Site Key

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Click **"Create"** to create a new site
3. Fill in the form:
   - **Label**: Your resume site (e.g., "Marina's Resume")
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your GitHub Pages domain:
     - `thehighestprimenumber.github.io`
     - `localhost` (for local development)
   - Accept the reCAPTCHA Terms of Service
4. Click **"Submit"**
5. Copy your **Site Key** (starts with something like `6Lc...`)

## Step 2: Add the Secret to GitHub

1. Go to your GitHub repository: `https://github.com/thehighestprimenumber/thehighestprimenumber.github.io`
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Fill in:
   - **Name**: `VITE_RECAPTCHA_SITE_KEY`
   - **Secret**: Paste your reCAPTCHA Site Key
6. Click **Add secret**

## Step 3: Verify Setup

1. Push your changes to GitHub
2. The GitHub Actions workflow will automatically use the secret during build
3. Your site will be deployed with reCAPTCHA protection enabled

## For Local Development

Create a `.env` file in the root directory:

```bash
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

**Note**: The `.env` file is already in `.gitignore`, so it won't be committed to the repository.

## Troubleshooting

- If reCAPTCHA doesn't work, check the browser console for errors
- Make sure your domain is added to the reCAPTCHA site settings
- Verify the secret name matches exactly: `VITE_RECAPTCHA_SITE_KEY`
- The site key is public and safe to expose (it's different from the secret key)

