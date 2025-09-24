# Vercel Environment Variables Setup

To deploy the Chess Learning Platform to Vercel with full functionality, you need to configure the following environment variables:

## Required Environment Variables

### 1. Stytch Configuration
```
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=your_stytch_public_token_here
STYTCH_PROJECT_ID=your_stytch_project_id_here
STYTCH_SECRET=your_stytch_secret_here
```

### 2. Database Configuration
```
DATABASE_URL=your_database_url_here
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project: `chess-learning-platform`
3. Go to **Settings** → **Environment Variables**
4. Add each variable with the appropriate value
5. Make sure to set them for **Production**, **Preview**, and **Development** environments
6. Redeploy your application

## Getting Stytch Credentials

1. Go to [Stytch Dashboard](https://stytch.com/dashboard)
2. Create a new project or select existing one
3. Go to **API Keys** section
4. Copy the **Public token** for `NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN`
5. Copy the **Project ID** for `STYTCH_PROJECT_ID`
6. Copy the **Secret** for `STYTCH_SECRET`

## Database Setup

For production, you'll need a PostgreSQL database. You can use:
- Vercel Postgres
- Supabase
- PlanetScale
- Railway
- Or any other PostgreSQL provider

## Current Status

Without these environment variables:
- ✅ Application will build and deploy successfully
- ✅ Responsive design will work perfectly
- ❌ Authentication will show configuration error
- ❌ Database operations will fail

## Testing

After setting up environment variables:
1. Redeploy the application
2. Visit the login page
3. Authentication should work properly
4. You can test the full user flow