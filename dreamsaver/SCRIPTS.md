# DreamSaver - NPM Scripts Guide

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server on http://localhost:3000 with hot-reloading.

### Production Build

```bash
npm run build
```
Creates an optimized production build of the application.

```bash
npm start
```
Starts the production server (requires `npm run build` first).

### Code Quality

```bash
npm run lint
```
Runs ESLint to check for code quality issues and potential bugs.

## Quick Start Checklist

Before running the app for the first time:

1. ✅ Install dependencies: `npm install`
2. ✅ Set up Supabase project and run schema
3. ✅ Get Gemini API key
4. ✅ Set up Stripe account and products
5. ✅ Configure `.env.local` with all keys
6. ✅ Run `npm run dev`

## Common Development Tasks

### Start Local Development
```bash
npm run dev
```

### Test Stripe Webhooks Locally
In a separate terminal:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Check for Errors
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

## Environment-Specific Notes

### Development Mode
- Uses `.env.local` for environment variables
- Hot-reloading enabled
- Detailed error messages
- Source maps enabled

### Production Mode
- Uses environment variables from hosting platform
- Optimized bundle
- Minified code
- Error logging to console

## Testing Checklist

### Before Deploying
1. ✅ Run `npm run build` successfully
2. ✅ Test signup flow
3. ✅ Test login flow
4. ✅ Test dream creation
5. ✅ Test AI insight generation
6. ✅ Test Stripe checkout (test mode)
7. ✅ Verify all environment variables are set
8. ✅ Check that webhook endpoint is configured

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

### Development Server Issues
- Kill port 3000: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)
- Try different port: `PORT=3001 npm run dev`

### Dependency Issues
- Clear npm cache: `npm cache clean --force`
- Delete lock file: `rm package-lock.json`
- Reinstall: `npm install`
