# Development Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn**
- **Git**
- **VS Code** (recommended)

## Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/RohitSurya2809/rohit-portfolio.git
cd rohit-portfolio
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

Or if you prefer yarn:

\`\`\`bash
yarn install
\`\`\`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

## VS Code Setup

### Recommended Extensions

The project includes a `.vscode/extensions.json` file with recommended extensions:

- **Prettier** - Code formatter
- **ESLint** - JavaScript/TypeScript linter
- **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
- **TypeScript Importer** - Auto import for TypeScript
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Path Intellisense** - File path autocomplete

### VS Code will automatically:
- Suggest installing recommended extensions
- Format code on save
- Show Tailwind CSS class suggestions
- Provide TypeScript intellisense
- Enable debugging capabilities

## Available Scripts

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm run start

# Run ESLint
npm run lint

# Type check without emitting files
npm run type-check

# Export static files for GitHub Pages
npm run export

# Deploy to GitHub Pages
npm run deploy
\`\`\`

## Project Structure

\`\`\`
rohit-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── .vscode/                    # VS Code configuration
├── app/
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── about.tsx              # About section
│   ├── achievements.tsx       # Achievements section
│   ├── contact.tsx            # Contact section
│   ├── education.tsx          # Education section
│   ├── experience.tsx         # Experience section
│   ├── hero.tsx               # Hero section
│   ├── navigation.tsx         # Navigation component
│   ├── projects.tsx           # Projects section
│   └── skills.tsx             # Skills section
├── lib/
│   └── utils.ts               # Utility functions
├── public/
│   ├── CNAME                  # Custom domain configuration
│   ├── robots.txt             # SEO robots file
│   └── resume.pdf             # Resume file
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
\`\`\`

## Development Workflow

### 1. Making Changes
- Edit components in the `components/` directory
- Update styles using Tailwind CSS classes
- Add new pages in the `app/` directory

### 2. Testing Changes
- The development server auto-reloads on file changes
- Check the browser at `http://localhost:3000`
- Use VS Code's integrated terminal for commands

### 3. Building for Production
\`\`\`bash
npm run build
\`\`\`

### 4. Deploying
- Push changes to the main branch
- GitHub Actions will automatically deploy to GitHub Pages
- Or use manual deployment: `npm run deploy`

## Customization

### Personal Information
Update the following files with your information:
- `components/hero.tsx` - Name, title, contact info
- `components/about.tsx` - Career objective
- `components/projects.tsx` - Your projects
- `components/experience.tsx` - Work experience
- `components/education.tsx` - Educational background
- `components/skills.tsx` - Technical skills
- `components/achievements.tsx` - Awards and achievements

### Styling
- Colors: Edit `tailwind.config.ts`
- Fonts: Update `app/globals.css`
- Components: Modify individual component files

### Resume
Replace `public/resume.pdf` with your actual resume file.

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   \`\`\`bash
   # Kill process on port 3000
   npx kill-port 3000
   # Or use a different port
   npm run dev -- -p 3001
   \`\`\`

2. **Node modules issues**
   \`\`\`bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

3. **TypeScript errors**
   \`\`\`bash
   # Run type check
   npm run type-check
   \`\`\`

4. **Build errors**
   \`\`\`bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   \`\`\`

## Support

If you encounter any issues:
1. Check this setup guide
2. Review the project's README.md
3. Check GitHub Issues
4. Contact: sankarirohitsurya@gmail.com

## License

This project is open source and available under the MIT License.
\`\`\`
