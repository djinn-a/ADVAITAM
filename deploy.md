# One-Command Deployment Setup (`npm run deploy`)

The absolute fastest way to deploy a Next.js project is by setting up a single custom script in your `package.json` that uses the Vercel CLI. This allows you to simply type `npm run deploy` to push your site live to production.

Here is how this setup works so you can instantly replicate it on your next project.

## 1. How it works in this project

We have configured `package.json` with the following:

1. **Vercel CLI installed locally:** `"vercel": "^59.3.0"` is in our `devDependencies`.
2. **Deploy Script added:** `"deploy": "vercel --prod"` is in our `scripts`.

To deploy this project to production right now, simply run:
```bash
npm run deploy
```

*(Note: The first time you run this, it will prompt you to log in to Vercel and confirm the project settings. After that, it's completely seamless.)*

---

## 2. How to replicate this on your NEXT project

Follow these 3 simple steps to add this to any new Next.js project:

### Step 1: Install the Vercel CLI locally
Run this command in your project terminal:
```bash
npm install vercel --save-dev
```
*Why locally? Because it ensures everyone on your team (or your future self) has the exact same version of the CLI without needing a global installation.*

### Step 2: Add the deploy script
Open your `package.json` and add the following line to your `"scripts"` block:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "deploy": "vercel --prod"
  }
```

### Step 3: Deploy!
From your terminal, simply run:
```bash
npm run deploy
```

The first time you run this command on a new project, Vercel will ask you a few questions:
- **Set up and deploy?** -> `Y`
- **Which scope do you want to deploy to?** -> `[Select your personal account]`
- **Link to existing project?** -> `N`
- **What's your project's name?** -> `[Press Enter to accept the default]`
- **In which directory is your code located?** -> `[Press Enter for ./]`
- **Want to override the settings?** -> `N` (Vercel automatically detects Next.js)

After answering these once, Vercel saves the configuration in a `.vercel` folder (which is automatically ignored by Git).

For all future deployments, `npm run deploy` will skip the questions and push directly to production!

## Summary of our Deployment Strategy
Our current strategy is a **Manual CLI Deployment**. 

* **Why we use it:** It provides absolute control over *when* the site updates. Unlike automated Git deployments (where every `git push` triggers a build), the `npm run deploy` approach ensures that production is only updated when you explicitly want it to be. 
* **When to use it:** Perfect for early-stage projects, rapid prototyping, and scenarios where you are pushing directly from your local machine to production.
