# Environment Parity Testing Guide

Ensure your Next.js portfolio renders identically across development, preview, and production environments.

---

## Environment Configurations

### Development Environment
```
NODE_ENV: development
basePath: "" (empty)
URL: http://localhost:3000
Type Checking: Enabled
HMR (Hot Module Reload): Enabled
```

### Production Build (Local)
```
NODE_ENV: production
basePath: /rohit-portfolio
URL: http://localhost:8080/rohit-portfolio/
Type Checking: Enforced
Bundle Size: Optimized
```

### Published Environment (GitHub Pages)
```
NODE_ENV: production (during build)
basePath: /rohit-portfolio
URL: https://rohitsurya2809.github.io/rohit-portfolio/
Type Checking: Already passed
Bundle Size: Optimized
```

---

## Pre-Deployment Testing Matrix

| Test Case | Dev | Local Prod | Published | Status |
|-----------|-----|-----------|-----------|--------|
| Homepage loads | YES | YES | YES | ✓ |
| CSS loads | YES | YES | YES | ✓ |
| Images render | YES | YES | YES | ✓ |
| Navigation works | YES | YES | YES | ✓ |
| Gallery opens | YES | YES | YES | ✓ |
| Contact form works | YES | YES | YES | ✓ |
| No console errors | YES | YES | YES | ✓ |
| Mobile responsive | YES | YES | YES | ✓ |

---

## Step-by-Step Testing Process

### Phase 1: Local Development Testing (5 minutes)

```bash
# Start development server
npm run dev
```

**Testing Checklist:**
1. [ ] Open http://localhost:3000
2. [ ] Verify full page loads
3. [ ] Check for console errors: F12 → Console
4. [ ] Test all navigation clicks
5. [ ] Verify images display
6. [ ] Test gallery filter buttons
7. [ ] Fill and submit contact form
8. [ ] Test on mobile: DevTools → Toggle device toolbar
9. [ ] Verify smooth scrolling works
10. [ ] Check all external links (GitHub, LinkedIn)

**Pass Criteria:**
- No errors in console
- All content visible
- Navigation responds smoothly
- Responsive layout works

---

### Phase 2: Type & Lint Checking (2 minutes)

```bash
# Check for type errors
npm run type-check

# Run ESLint
npm run lint
```

**Expected Output:**
```
✓ Successfully compiled
✓ No errors
```

**If Errors Found:**
```bash
# Fix automatically where possible
npx eslint . --fix

# Review remaining issues
npm run lint

# Fix type errors manually
npm run type-check
```

---

### Phase 3: Production Build Testing (10 minutes)

```bash
# Build exactly like production
NODE_ENV=production npm run build

# Verify no build errors
echo $? # Should output 0
```

**Check Build Output:**
```bash
# List generated files
ls -la out/

# Expected structure:
# out/index.html
# out/_next/
# out/rohit-portfolio/ (if basePath applied)

# Count files
find out -type f | wc -l # Should be 100+
```

**Verify Critical Files:**
```bash
# Check if HTML was generated
find out -name "*.html" -exec wc -l {} + | tail -1

# Check CSS bundle size
ls -lh out/_next/static/css/*.css

# Check JavaScript bundle
ls -lh out/_next/static/chunks/*.js | head -5
```

---

### Phase 4: Local Production URL Testing (15 minutes)

```bash
# Serve the production build locally
npx http-server out -p 8080

# Keep this terminal running and open another
```

**In Browser:**
```
Visit: http://localhost:8080/rohit-portfolio/
```

**Visual Inspection Checklist:**
- [ ] Page loads without white screen
- [ ] No unstyled content (FOUC)
- [ ] All colors and fonts correct
- [ ] Logo/header displays
- [ ] Navigation bar visible
- [ ] Hero section styled properly
- [ ] Images load
- [ ] Gallery displays correctly
- [ ] Footer visible

**Functional Testing Checklist:**
- [ ] Click "Get In Touch" → scrolls to contact section
- [ ] Click "View My Work" → scrolls to projects
- [ ] Click GitHub link → opens in new tab
- [ ] Click LinkedIn link → opens in new tab
- [ ] Gallery: Click category filter buttons
- [ ] Gallery: Click image → opens lightbox
- [ ] Gallery: Lightbox close button works
- [ ] Contact form: Fill all fields
- [ ] Contact form: Submit → opens mailto

**Performance Check:**
```bash
# Open DevTools → Network tab
# Reload: Ctrl+Shift+R (hard refresh)
# Verify:
# - All files load (green 200 status)
# - No 404 errors (red)
# - Total size < 5MB
# - No failed requests
```

**Console Error Check:**
```bash
# Open DevTools: F12
# Go to Console tab
# Should see:
# - No errors (red text)
# - No warnings (yellow text)
# - Optionally: [v0] debug messages
```

---

### Phase 5: Responsive Design Testing (5 minutes)

**Desktop (1920px):**
```bash
# Keep DevTools open: F12
# Press Ctrl+Shift+M (device toolbar)
# Select: Responsive
# Set width: 1920
```

**Tablet (768px):**
```bash
# In device toolbar
# Dropdown: iPad
# Verify:
# - Layout adjusts
# - Typography readable
# - Images scale
# - Navigation responsive
```

**Mobile (375px):**
```bash
# In device toolbar
# Dropdown: iPhone SE
# Verify:
# - Single column layout
# - Hamburger menu works (if applicable)
# - Touch targets large enough
# - Text readable
# - No horizontal scroll
```

---

### Phase 6: Compare Dev vs Production

**Terminal Setup:**
```bash
# Terminal 1: Development
npm run dev
# Runs on http://localhost:3000

# Terminal 2: Production (open new)
cd out && npx http-server -p 8081
# Runs on http://localhost:8081/rohit-portfolio/
```

**Visual Comparison:**
```bash
# Open two browser windows side by side
# Left: http://localhost:3000 (Dev)
# Right: http://localhost:8081/rohit-portfolio/ (Production)

# Compare:
# - Font sizes
# - Colors (should be identical)
# - Spacing/padding
# - Images
# - Layout
# - Animations
```

**Difference Detection Checklist:**
- [ ] Fonts identical
- [ ] Colors identical
- [ ] Spacing identical
- [ ] Images same size
- [ ] Layout same
- [ ] Animations same timing
- [ ] Hover effects identical
- [ ] Mobile view identical

**If Differences Found:**
```bash
# Most likely cause: basePath asset loading
# Check:
grep -r "basePath" next.config.js
grep -r "assetPrefix" next.config.js

# Rebuild and retest
rm -rf .next out
NODE_ENV=production npm run build
```

---

## Automated Testing Script

```bash
# Run all tests at once
chmod +x scripts/verify-build.sh
bash scripts/verify-build.sh
```

**Expected Output:**
```
==========================================
Next.js Portfolio Build Verification
==========================================

Checking Node.js version...
Using Node.js: v18.x.x

Cleaning previous builds...
✓ Cleaned

Installing dependencies...
✓ Dependencies installed

Running TypeScript type check...
✓ Type checking passed

Running ESLint...
✓ Linting passed

Building for production (NODE_ENV=production)...
✓ Production build successful

Verifying build output...
Build artifacts generated:
  - HTML files: 2
  - JavaScript files: 50+
  - CSS files: 1
  - Total files: 150+

Checking critical files...
  ✓ out/index.html
  ✓ out/.nojekyll

Build size analysis:
  Total size: 5.2M
  JavaScript bundle size: 2.1M

✓ Build verification complete!

Next steps to test production rendering:
1. Start a local HTTP server:
   npx http-server out -p 8080
2. Visit: http://localhost:8080/rohit-portfolio/
3. Verify all assets load and functionality works
```

---

## Deployment Checklist

### Before Pushing to GitHub

```bash
# 1. Type check
npm run type-check ✓

# 2. Lint
npm run lint ✓

# 3. Full verification
bash scripts/verify-build.sh ✓

# 4. Manual testing
# Terminal 1: npx http-server out -p 8080
# Browser: http://localhost:8080/rohit-portfolio/
# Test all functionality ✓

# 5. Compare with dev
# Terminal 2: npm run dev
# Side-by-side comparison ✓

# 6. Ready to deploy
git add .
git commit -m "Update: [description]"
git push origin main ✓
```

### GitHub Actions Workflow Verification

After pushing, GitHub Actions runs automatically:

1. **Check Workflow Status:**
   - Go to: https://github.com/RohitSurya2809/rohit-portfolio/actions
   - Click latest workflow run
   - Verify all steps pass (green checkmarks)

2. **Verify Build Steps:**
   - [ ] Checkout
   - [ ] Setup Node.js
   - [ ] Install dependencies
   - [ ] Type check
   - [ ] Lint
   - [ ] Build
   - [ ] Verify build output
   - [ ] Add .nojekyll
   - [ ] Deploy to GitHub Pages

3. **Common Failure Points:**
   - Type check fails → Fix TypeScript errors
   - Lint fails → Fix ESLint issues
   - Build fails → Check Node.js version, clear node_modules
   - Deploy fails → Check GitHub token permissions

---

## Post-Deployment Verification

### Immediate (Within 5 minutes)

```bash
# Visit published URL
https://rohitsurya2809.github.io/rohit-portfolio/

# Verify:
- Page loads
- No 404 errors
- CSS applied
- Images display
- Navigation works
```

### Thorough (Within 1 hour)

**Run Full Test Suite:**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Hard refresh: Ctrl+Shift+R
4. Filter by "css" and "js"
5. Verify all files have 200 status
6. No 404 errors
7. Check **Console** tab for errors

**Functional Testing:**
- [ ] Click all navigation items
- [ ] Verify smooth scroll to sections
- [ ] Test gallery filters
- [ ] Open lightbox images
- [ ] Verify external links work
- [ ] Test on mobile (resize browser)
- [ ] Check contact form
- [ ] Verify all text readable

**Performance Check:**
```bash
# Open DevTools → Lighthouse tab
# Run: Accessibility audit
# Score: 90+

# Run: Performance audit
# Score: 80+

# Run: Best Practices audit
# Score: 90+
```

---

## Troubleshooting Failed Tests

### Build Fails: Type Errors
```bash
npm run type-check
# Fix errors shown
npm run build
```

### Build Fails: Lint Errors
```bash
npm run lint
# Fix issues shown
npm run build
```

### Production URL Shows Unstyled Content
```bash
# Check basePath in config
grep basePath next.config.js

# Check if CSS loads in DevTools Network tab
# If 404: basePath not applied correctly

# Rebuild:
rm -rf .next out
NODE_ENV=production npm run build
npx http-server out -p 8080
# Reload: http://localhost:8080/rohit-portfolio/
```

### Specific Assets Missing (Images, Files)
```bash
# Check file exists
ls -la public/resume.pdf

# Verify in build output
ls -la out/resume.pdf

# Check URL in DevTools Network tab
# Should be: /rohit-portfolio/resume.pdf
```

---

## Documentation

- **DEPLOYMENT_GUIDE.md** - Comprehensive deployment strategy
- **TROUBLESHOOTING.md** - Issue-specific debugging
- **TESTING_GUIDE.md** - This document

---

## Testing Duration Estimates

| Phase | Duration | Notes |
|-------|----------|-------|
| Phase 1: Dev Testing | 5 min | Quick functionality check |
| Phase 2: Type/Lint | 2 min | Automated checks |
| Phase 3: Build | 3 min | First-time may be slower |
| Phase 4: Local Prod Test | 15 min | Thorough verification |
| Phase 5: Responsive | 5 min | Device testing |
| Phase 6: Compare | 10 min | Visual comparison |
| **Total** | **~40 minutes** | Full test suite |

**Quick Test:** Phase 1, 2, 3 = ~10 minutes
**Complete Test:** All phases = ~40 minutes

---

## Success Criteria

✓ All tests pass
✓ No console errors
✓ All assets load
✓ Dev and production visually identical
✓ Navigation works smoothly
✓ Gallery functions properly
✓ Contact form accessible
✓ Mobile responsive
✓ Lighthouse scores 85+
✓ Ready for production deployment
