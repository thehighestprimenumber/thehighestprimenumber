# Marina Olivella - Interactive Resume Website

An interactive resume website showcasing professional experience, technologies, and achievements with a modern, sleek design.

## Features

- 📋 **Unified Resume View**: Single-page Resume View\*\*: Single-page layout with smooth scrolling between sections
- 🎯 **Professional Summary**: Overview of experience and expertise
- 💻 **Technology Experience**: Progress bars showing years of experience with each technology, sorted alphabetically
- 📅 **Chronological Timeline**: Detailed work experience with achievements, technologies, and time periods
- 🔍 **Interactive Technology Details**: Click on any technology to see all roles where it was used
- 📄 **Job Details Modal**: Click on any role to see full details including all achievements and technologies
- 📥 **ATS-Friendly PDF Download**: Generate and download a clean, ATS-compatible PDF resume from JSON data
- 📧 **Contact Section**: Quick access to email, LinkedIn, and GitHub
- 🎨 **Modern Dark Theme**: Sleek dark mode design using Material-UI
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 🧭 **Sticky Navigation**: Left sidebar navigation for easy section access

## Tech Stack

- React 18
- TypeScript
- Vite
- Material-UI (MUI) v5
- Lucide React (Icons)
- jsPDF & marked (PDF generation)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google reCAPTCHA v3 Site Key (for email protection)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your reCAPTCHA site key:
# VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:5173`

### Setting up reCAPTCHA

**For GitHub Pages deployment**, see [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions on adding the reCAPTCHA secret to GitHub.

**For local development**:

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Create a new site with **reCAPTCHA v3**
3. Add `localhost` to the domains
4. Copy the Site Key
5. Create a `.env` file and add: `VITE_RECAPTCHA_SITE_KEY=your_site_key_here`

**Note**: The email address is protected with reCAPTCHA and obfuscated in the code. Users must verify they're human before the email is revealed.

## Project Structure

```
data/
  └── resume.json          # All resume data (single source of truth)
src/
  ├── components/          # React components
  │   ├── ResumeView.tsx  # Main unified view component
  │   ├── TechnologyCloud.tsx  # Technology progress bars list
  │   ├── TimelineView.tsx # Chronological career timeline
  │   ├── TechJobsModal.tsx   # Technology details modal
  │   └── JobDetailsModal.tsx # Job details modal
  ├── utils/               # Utility functions
  │   ├── resumeData.ts   # JSON data loader
  │   ├── techExperience.ts # Technology experience calculator
  │   ├── jsonToMarkdown.ts # JSON to Markdown converter
  │   ├── markdownToPDF.ts  # Markdown to PDF converter
  │   └── pdfGenerator.ts   # PDF generation entry point
  ├── theme.ts            # MUI theme configuration
  └── App.tsx             # Main application component
```

## Customization

All resume content is stored in `data/resume.json`. You can easily update:

- Personal information (name, email, LinkedIn, summary)
- Work experience (roles, companies, periods, achievements, technologies)
- Skills are automatically generated from technologies used in work experience

### Adding Technologies

Technologies are automatically extracted from the `technologies` array in each work experience entry. Simply add technology names to the `technologies` array for each role, and they will:

- Appear in the Technologies section with calculated years of experience
- Be clickable to show all roles where they were used
- Appear in the Timeline view with experience badges

## PDF Resume Features

### ATS-Friendly PDF Generation

The site uses **JSON → Markdown → PDF conversion** - it reads your resume data from `data/resume.json`, converts it to Markdown, and then generates a PDF. This ensures:

✅ **Single source of truth** - Your JSON file is the master document  
✅ **Consistency** - PDF always matches your website  
✅ **Easy updates** - Just edit the JSON file  
✅ **ATS-friendly** - Clean, text-based PDF with proper structure

### How It Works

1. **Download PDF Button**: Click "Download PDF" in the header
   - Reads your JSON file directly
   - Converts JSON to Markdown format
   - Generates HTML from Markdown using `marked`
   - Creates PDF using `html2pdf.js`
   - Optimized for ATS parsing with proper semantic structure

2. **ATS Compatibility Features**:
   - Simple, clean formatting
   - Standard fonts
   - Proper heading hierarchy (H1, H2, H3)
   - Text-based content (not images)
   - All keywords and skills preserved
   - No complex layouts or graphics that confuse ATS
   - Proper page breaks and formatting

### Updating Your Resume

Simply edit `data/resume.json` to update both the website and PDF. All changes are reflected immediately.

## Deployment

Build the project and deploy the `dist` folder to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## License

Personal project - All rights reserved
