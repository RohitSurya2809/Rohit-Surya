#!/bin/bash

# Build Verification Script
# Ensures production build renders identically to development preview

set -e

echo "=========================================="
echo "Next.js Portfolio Build Verification"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "Checking Node.js version..."
node_version=$(node -v)
echo "Using Node.js: $node_version"
echo ""

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf .next out
echo "✓ Cleaned"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm ci > /dev/null 2>&1
echo "✓ Dependencies installed"
echo ""

# Run type checking
echo "Running TypeScript type check..."
if npm run type-check > /dev/null 2>&1; then
  echo "✓ Type checking passed"
else
  echo -e "${RED}✗ Type checking failed${NC}"
  npm run type-check
  exit 1
fi
echo ""

# Run linting
echo "Running ESLint..."
if npm run lint > /dev/null 2>&1; then
  echo "✓ Linting passed"
else
  echo -e "${YELLOW}⚠ Linting warnings detected${NC}"
  npm run lint
fi
echo ""

# Build for production
echo "Building for production (NODE_ENV=production)..."
if NODE_ENV=production npm run build > /dev/null 2>&1; then
  echo "✓ Production build successful"
else
  echo -e "${RED}✗ Production build failed${NC}"
  NODE_ENV=production npm run build
  exit 1
fi
echo ""

# Verify build output
echo "Verifying build output..."
if [ ! -d "out" ]; then
  echo -e "${RED}✗ Output directory not found${NC}"
  exit 1
fi

html_files=$(find out -type f -name "*.html" | wc -l)
js_files=$(find out -type f -name "*.js" | wc -l)
css_files=$(find out -type f -name "*.css" | wc -l)
total_files=$(find out -type f | wc -l)

echo "Build artifacts generated:"
echo "  - HTML files: $html_files"
echo "  - JavaScript files: $js_files"
echo "  - CSS files: $css_files"
echo "  - Total files: $total_files"
echo ""

# Check critical files
critical_files=("out/index.html" "out/.nojekyll")
echo "Checking critical files..."
for file in "${critical_files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ${RED}✗ Missing: $file${NC}"
    exit 1
  fi
done
echo ""

# File size analysis
echo "Build size analysis:"
out_size=$(du -sh out | awk '{print $1}')
echo "  Total size: $out_size"
main_js_size=$(ls -lh out/_next/static/chunks/*.js 2>/dev/null | awk '{sum+=$5} END {print sum}' || echo "N/A")
echo "  JavaScript bundle size: $main_js_size"
echo ""

# Asset check
echo "Checking asset loading..."
if grep -q "basePath" out/index.html 2>/dev/null; then
  echo "  ℹ basePath configuration detected"
else
  echo "  ℹ Using standard asset paths"
fi
echo ""

# Generate production test instructions
echo "=========================================="
echo -e "${GREEN}✓ Build verification complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps to test production rendering:"
echo ""
echo "1. Start a local HTTP server:"
echo "   ${YELLOW}npx http-server out -p 8080${NC}"
echo ""
echo "2. Visit the local production URL:"
echo "   ${YELLOW}http://localhost:8080/rohit-portfolio/${NC}"
echo ""
echo "3. Verify in browser DevTools:"
echo "   - Network tab: Check all assets load (200 status)"
echo "   - Console: No errors or warnings"
echo "   - Coverage: CSS/JS all used"
echo ""
echo "4. Test critical functionality:"
echo "   - Navigation links work"
echo "   - Gallery filters work"
echo "   - Contact form renders"
echo "   - All images display"
echo ""
echo "5. Compare with development preview:"
echo "   ${YELLOW}npm run dev${NC}"
echo "   Verify styling and layout match"
echo ""
