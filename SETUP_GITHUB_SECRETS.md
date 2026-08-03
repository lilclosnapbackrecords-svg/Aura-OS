# GitHub Secrets Setup Guide

This guide will help you securely add API keys to your Aura OS repository for CI/CD deployment.

## Step 1: Navigate to GitHub Secrets

1. Go to your repository: `https://github.com/lilclosnapbackrecords-svg/Aura-OS`
2. Click **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**

## Step 2: Add Repository Secrets

### Secret 1: VITE_GEMINI_API_KEY

1. Click **New repository secret**
2. **Name:** `VITE_GEMINI_API_KEY`
3. **Value:** Paste your actual Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. Click **Add secret**

### Secret 2: VITE_SUNO_STREAM_GATEWAY

1. Click **New repository secret**
2. **Name:** `VITE_SUNO_STREAM_GATEWAY`
3. **Value:** Paste your Suno API gateway URL from [Suno Dashboard](https://app.suno.ai/api)
4. Click **Add secret**

## Step 3: Verify Secrets Are Added

- Both secrets should now appear in the **Secrets and variables** section
- They will be automatically injected into your CI/CD workflows
- The workflows will use them during builds and deployments

## Step 4: Local Development

For local development, create a `.env.local` file (already in `.gitignore`):

```
VITE_GEMINI_API_KEY=your_real_gemini_key_here
VITE_SUNO_STREAM_GATEWAY=https://api.suno.ai/v1/stream
```

**Important:** Never commit this file to the repository.

## How Secrets Are Used

Your CI/CD workflows automatically inject these secrets:

```yaml
env:
  VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
  VITE_SUNO_STREAM_GATEWAY: ${{ secrets.VITE_SUNO_STREAM_GATEWAY }}
```

## Security Best Practices

✅ **DO:**
- Keep real API keys in GitHub Secrets only
- Use `.env.local` for local development only
- Rotate keys periodically
- Use environment-specific secrets if needed

❌ **DON'T:**
- Commit `.env.local` to the repository
- Share API keys in issues or pull requests
- Use the same keys across multiple environments
- Paste keys in chat or emails

## Troubleshooting

**Problem:** Build fails with "API key not found"
- **Solution:** Verify secrets are added in GitHub Settings → Secrets

**Problem:** Secrets not appearing in workflow runs
- **Solution:** Push a new commit to trigger the workflow with updated secrets

**Problem:** Need to rotate a key
- **Solution:** Update the secret value in GitHub Settings → Secrets
