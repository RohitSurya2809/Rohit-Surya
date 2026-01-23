# Next.js Deployment Process & Troubleshooting Guide

## Executive Summary

This guide addresses rendering discrepancies between preview (development) and published (production) URLs. Your portfolio uses **static export** to GitHub Pages, which requires careful configuration to ensure parity between environments.

---

## Section 1: Critical Issues Identified

### Issue 1: Environment-Based Path Configuration
**Problem:** Your `next.config.js` uses `NODE_ENV` to conditionally set `basePath` and `assetPrefix`:

```javascript
basePath: process.env.NODE_ENV === "production" ? "/rohit-portfolio" : "",
assetPrefix: process.env.NODE_ENV === "production" ? "/rohit-portfolio/" : "",
```

**Why This Causes Issues:**
- **Development Preview:** Uses empty `basePath` → URLs like `/projects`
- **Production Build:** Uses `/rohit-portfolio` → URLs like `/rohit-portfolio/projects`
- **Result:** Content renders correctly in dev but paths break in production if not properly handled

**Impact on Rendering:**
- CSS/JS assets may fail to load (404 errors) on published URL
- Internal links break if not prefixed with `basePath`
- Images and static assets won't display

### Issue 2: Conflicting Next.js Config Files
**Problem:** Two configuration files exist:
- `next.config.js` (primary, comprehensive)
- `next.config.mjs` (secondary, minimal)

**Resolution:** Remove duplicate config to prevent unpredictable behavior.

### Issue 3: Client-Side Rendering Dominance
**Problem:** Most components use `"use client"` directive:
- Increases JavaScript bundle size
- Delays content rendering (requires hydration)
- May cause flash of unstyled content (FOUC)
- Reduces SEO effectiveness

**Result:** Content may not be immediately visible in preview or production until JavaScript loads.

### Issue 4: Disabled Type Checking & Linting
**Problem:** Configuration bypasses build safeguards:
```javascript
typescript: {
  ignoreBuildErrors: true,
},
eslint: {
  ignoreDuringBuilds: true,
},
```

**Consequence:** Errors silently pass through, causing runtime issues invisible during builds.

---

## Section 2: Root Causes of Rendering Discrepancies

### 1. Build Environment Differences

| Aspect | Dev Environment | Production Build |
|--------|-----------------|------------------|
| `NODE_ENV` | `development` | `production` |
| `basePath` | `` (empty) | `/rohit-portfolio` |
| `assetPrefix` | `` (empty) | `/rohit-portfolio/` |
| Build Target | `dev` | `export` (static) |
| Type Checking | Enabled | **Bypassed** |

### 2. Static Export Specifics

Your config uses `output: "export"`, which:
- Generates purely static HTML/CSS/JS (no server needed)
- Disables dynamic features (API routes, ISR, dynamic imports)
- Requires ALL content available at build time
- Means no runtime environment variables possible

### 3. Data Fetching Strategy

**Current:** All data is hardcoded in components (projects.tsx, contact.tsx, etc.)
- No external API calls
- Content identical in dev and production
- No data freshness issues

**Potential Issue:** If you added API calls later, they'd only work in server context (not available in static export).

### 4. Hydration Issues

**Problem:** Client components expect server-rendered HTML to match client-rendered output.

**Your Situation:** Since ALL components are `"use client"`:
- Root layout is static (good)
- Individual sections render on client (less good)
- Hydration mismatch possible if data differs between SSR and CSR

---

## Section 3: Troubleshooting Checklist

### Before Deployment

- [ ] **Verify Configuration Consistency**
  ```bash
  # Check if NODE_ENV is set correctly during build
  echo $NODE_ENV
  
  # Verify next.config.js has correct basePath
  grep -n "basePath" next.config.js
  ```

- [ ] **Remove Duplicate Config**
  ```bash
  # Delete conflicting config
  rm next.config.mjs
  ```

- [ ] **Test Local Build**
  ```bash
  # Build locally with production settings
  NODE_ENV=production npm run build
  
  # Verify output folder exists
  ls -la out/
  ```

- [ ] **Test with `next start`**
  ```bash
  # Serve the export locally to test exact production behavior
  npx http-server out -p 8080
  
  # Visit http://localhost:8080/rohit-portfolio/
  ```

### Common Rendering Issues & Solutions

#### Issue: CSS Not Loading in Production
**Symptom:** Styled site in dev, unstyled in production

**Root Cause:** Asset prefix mismatch

**Solution:**
```javascript
// next.config.js
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/rohit-portfolio' : '';

module.exports = {
  output: 'export',
  basePath,
  assetPrefix: `${basePath}/`, // Ensure trailing slash
  trailingSlash: true,
};
```

#### Issue: Internal Links Don't Work
**Symptom:** Navigation links fail in published URL

**Root Cause:** Links don't account for basePath

**Solution:** Use Next.js `<Link>` component (handles basePath automatically)
```jsx
import Link from 'next/link'

// Correct - Next.js handles basePath
<Link href="/projects">View Projects</Link>

// Incorrect - manual paths
<a href="/projects">View Projects</a>
```

**Your Current Fix:** You're using anchor links with `#id` selectors and client-side scrolling - this should work regardless of basePath.

#### Issue: Images Not Displaying
**Symptom:** Missing images in production

**Root Cause:** Image paths don't include basePath

**Solution:**
```jsx
// For next/image
<Image
  src="/image.png" // Next.js handles basePath
  alt="Description"
/>

// For regular img tags
<img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/image.png`} />
```

#### Issue: Static Assets (Resume.pdf) Not Found
**Symptom:** Download button works in dev, fails in production

**Solution:**
```jsx
// In public/resume.pdf
// Correct href
<a href="/resume.pdf">Download Resume</a>

// Why it works: public folder is copied to out/ and basePath is handled by Next.js
```

---

## Section 4: Implementation Strategy

### Phase 1: Configuration Fixes (Required)

**1. Update next.config.js**
```javascript
// Remove duplicate file
rm next.config.mjs

// Update next.config.js with explicit configuration
module.exports = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/rohit-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/rohit-portfolio/' : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable linting
  },
  typescript: {
    ignoreBuildErrors: false, // Enable type checking
  },
}
```

**2. Update .github/workflows/deploy.yml**
```yaml
env:
  NODE_ENV: production
```

### Phase 2: Component Optimization (Recommended)

**1. Convert Appropriate Components to SSR**
```jsx
// Before: Client-side
export function Hero() {
  "use client"
  // ...
}

// After: Server-side (content doesn't need interactivity)
export function About() {
  // Server component by default
  return (
    // Static content
  )
}
```

**2. Metadata Optimization**
```jsx
// app/layout.tsx
export const metadata: Metadata = {
  title: "Rohit Surya A T - Portfolio",
  description: "...",
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://rohitsurya2809.github.io/rohit-portfolio'
      : 'http://localhost:3000'
  ),
}
```

### Phase 3: Testing Strategy

**1. Local Verification**
```bash
# Test exact production build
NODE_ENV=production npm run build

# Verify output structure
find out -type f | head -20

# Test with actual basePath
npx http-server out -p 8080
# Visit: http://localhost:8080/rohit-portfolio/
```

**2. GitHub Pages Testing**
- Deploy to staging branch first
- Test on actual GitHub Pages URL
- Verify all assets load (check DevTools Network tab)
- Test all internal links and navigation

**3. Production Testing Checklist**
- [ ] All CSS loads (no unstyled content)
- [ ] All images display
- [ ] Navigation works
- [ ] Links to GitHub/LinkedIn open correctly
- [ ] Contact form functions
- [ ] Mobile responsive design works
- [ ] No console errors

---

## Section 5: Build vs Runtime Differences

### Static Export Behavior

Your configuration uses `output: "export"`, which means:

| Feature | Available | Reason |
|---------|-----------|--------|
| Static pages | YES | Generated at build time |
| CSS/Images | YES | Copied from public/ |
| Client JS | YES | React hydration works |
| API routes | NO | Requires server |
| Server components data | NO | No runtime server |
| Environment variables | Partial | Only NEXT_PUBLIC_* |
| ISR (Revalidate) | NO | Static export only |

### Your Setup Implications

**What Works:**
- Hardcoded portfolio content (all components)
- Static assets (CSS, images, fonts)
- Client-side interactivity (gallery filtering, form handling)
- Markdown files (if added)

**What Doesn't Work:**
- Fetching from external APIs at runtime
- Dynamic content generation
- Server-side session management
- Database queries

**Solution:** Keep current static approach OR migrate to dynamic platform (Vercel, Netlify) if you need server capabilities.

---

## Section 6: Deployment Workflow

### Recommended Process

```bash
# 1. Local development
npm run dev
# Test at http://localhost:3000

# 2. Pre-deployment checks
npm run type-check
npm run lint

# 3. Production build
NODE_ENV=production npm run build

# 4. Local production test
npx http-server out -p 8080
# Test at http://localhost:8080/rohit-portfolio/

# 5. Deploy to GitHub Pages
git add .
git commit -m "Deploy: [description]"
git push origin main
# GitHub Actions automatically runs deploy workflow

# 6. Post-deployment verification
# Visit https://rohitsurya2809.github.io/rohit-portfolio/
# Test all functionality
```

### GitHub Actions Workflow Best Practices

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run type-check
    
    - name: Lint
      run: npm run lint
    
    - name: Build
      run: npm run build
      env:
        NODE_ENV: production
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
        cname: rohit-portfolio.dev # Optional: for custom domain
```

---

## Section 7: Prevention & Maintenance

### Monitoring for Discrepancies

**1. Set Up Automated Testing**
```bash
# Create test script
cat > scripts/test-production.sh << 'EOF'
#!/bin/bash
NODE_ENV=production npm run build
npx http-server out -p 8080 &
sleep 2
# Run smoke tests
curl http://localhost:8080/rohit-portfolio/ | grep -q "Rohit"
echo "✓ Homepage renders"
EOF
```

**2. Use Error Tracking**
- Install Sentry or similar service
- Monitor production errors
- Get alerted to rendering issues

**3. Version Control**
- Track `package-lock.json` (ensure reproducible builds)
- Tag releases: `git tag v1.0.0`
- Maintain changelog

---

## Section 8: Advanced Troubleshooting

### Issue: Hydration Mismatch

**Error:** "Warning: Expected server HTML to contain..."

**Cause:** Server-rendered output differs from client-rendered output

**Debug:**
```jsx
// Add debugging
if (typeof window !== 'undefined') {
  console.log("[v0] Client-side hydration starting")
}

// Check if component renders identically on server and client
const [isMounted, setIsMounted] = useState(false)
useEffect(() => setIsMounted(true), [])

if (!isMounted) return null // Prevents hydration mismatch
```

### Issue: Asset Paths in CSS

**Problem:** CSS references to fonts/images fail

**Debug:**
```css
/* Broken */
background: url('/fonts/font.woff2');

/* Fixed - use basePath */
background: url('/rohit-portfolio/fonts/font.woff2');
```

**Solution:** Use CSS custom properties set in JavaScript:
```jsx
<style>{`
  :root {
    --base-path: '${basePath}';
  }
`}</style>
```

---

## Conclusion

Your portfolio's rendering discrepancies likely stem from:
1. **basePath/assetPrefix mismatch** between dev and production
2. **Conflicting configuration files**
3. **Excessive client-side rendering** causing hydration delays
4. **Type checking disabled**, allowing errors to pass silently

Implementing the fixes in Section 4 will ensure consistent rendering across all environments. Regular testing using the workflow in Section 6 will prevent future issues.
