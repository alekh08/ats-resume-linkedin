# ATS Resume Analyzer - Indian Job Market

An intelligent resume analysis tool that helps job seekers optimize their resumes for ATS systems, tailored specifically for the Indian job market (freshers to 5 years experience).

**Experience Qualities**:
1. **Professional** - The interface should feel credible and trustworthy, like consulting with a career expert
2. **Clarity-focused** - Information should be scannable, organized, and immediately actionable without cognitive overload
3. **Empowering** - Users should feel confident and equipped with clear next steps, not overwhelmed by criticism

**Complexity Level**: Light Application (multiple features with basic state)
The app accepts user inputs (resume text, job description, role details), processes them through LLM analysis, and presents structured feedback across multiple sections with clear actionable insights.

## Essential Features

### Resume Input Form
- **Functionality**: Multi-field form accepting resume text (via file upload or paste), job description, experience level, target role, and location. Supports PDF, DOC, and DOCX file uploads with automatic text extraction.
- **Purpose**: Gather necessary context for accurate ATS analysis tailored to Indian market
- **Trigger**: User lands on app or clicks "New Analysis"
- **Progression**: Empty form → User uploads file or pastes text → File parsing (if uploaded) → All fields filled → Validation checks → Submit enabled → Analysis starts
- **Success criteria**: All required fields validated, file parsing completes successfully, smooth transition to analysis view

### File Upload & Parsing
- **Functionality**: Drag-and-drop or click-to-browse file upload with support for PDF (.pdf) and Word documents (.doc, .docx). Automatically extracts text content using pdfjs-dist and mammoth libraries.
- **Purpose**: Make it easier for users to input their resume without manual copy-paste
- **Trigger**: User drags file to drop zone or clicks upload button
- **Progression**: File selection → Validation (file type, size) → Parsing → Text extraction → Auto-populate textarea → Success notification
- **Success criteria**: Files under 10MB parse successfully, extracted text appears in textarea, clear error messages for unsupported formats

### ATS Score Calculator
- **Functionality**: Uses LLM to analyze resume against job description and generate 0-100 compatibility score
- **Purpose**: Provide immediate quantifiable feedback on resume's ATS performance
- **Trigger**: User submits completed form
- **Progression**: Submission → LLM processing → Score display with explanation → Sections reveal below
- **Success criteria**: Score displays within 3-5 seconds with clear 2-line rationale

### Keyword Gap Analysis
- **Functionality**: Identifies missing critical keywords, optional keywords, and overused terms
- **Purpose**: Help users understand exactly which terms to add/remove for better ATS matching
- **Trigger**: Displayed as second section after score
- **Progression**: Auto-generated → Categorized lists (Critical/Optional/Overused) → Scannable format
- **Success criteria**: Keywords clearly categorized and immediately actionable

### Section-by-Section Improvements
- **Functionality**: Breaks down resume into sections (Summary, Skills, Experience, Education, Certifications) with specific feedback
- **Purpose**: Provide targeted, actionable improvements for each resume component
- **Trigger**: Displayed after keyword analysis
- **Progression**: Section cards → Problem statement → Improvement instruction → Example rewrite
- **Success criteria**: Each section has clear "what's wrong" + "how to fix" + "example"

### Bullet Point Rewrites
- **Functionality**: Takes existing bullet points and rewrites them with action verbs, quantification, and ATS keywords
- **Purpose**: Show practical before/after examples of ATS-optimized content
- **Trigger**: Displayed after section improvements
- **Progression**: Original bullets → LLM rewrite → Side-by-side comparison → Copy functionality
- **Success criteria**: Up to 5 bullets rewritten in scannable before/after format

### Side-by-Side Resume Comparison
- **Functionality**: Displays original resume text next to a fully ATS-optimized version incorporating all improvements, keyword additions, and bullet rewrites. Desktop shows true side-by-side view; mobile uses tabbed navigation.
- **Purpose**: Provide a comprehensive before/after view showing the full transformation, allowing users to see exactly how their resume improves
- **Trigger**: Displayed prominently after score display, before detailed sections
- **Progression**: Score revealed → Comparison view loads → Users can scroll both versions → Copy buttons for each version → Navigate to detailed breakdowns
- **Success criteria**: Both resumes render clearly in scrollable panels, copy functionality works, improved version includes all analysis recommendations without fabricating experience

### LinkedIn Optimization Guide
- **Functionality**: Generates optimized LinkedIn headline, about section, top keywords, and networking template
- **Purpose**: Extend optimization beyond resume to full job search presence
- **Trigger**: Final section of analysis results
- **Progression**: Auto-generated content → Formatted for direct copy-paste → India-appropriate tone
- **Success criteria**: All LinkedIn components ready to use, culturally appropriate

### Save & Export Analysis
- **Functionality**: Persist analysis results for future reference and allow re-analysis with different inputs
- **Purpose**: Let users iterate on improvements without re-entering data
- **Trigger**: User completes analysis or clicks save
- **Progression**: Analysis complete → Auto-saved to KV → Accessible from history → Can start new analysis
- **Success criteria**: Analyses persist across sessions, accessible anytime

## Edge Case Handling

- **Empty fields**: Disable submit until all required fields are filled, show validation hints
- **Unsupported file format**: Show error toast with supported formats (PDF, DOC, DOCX)
- **File too large**: Reject files over 10MB with clear error message
- **File parsing failure**: Show friendly error, preserve upload option, allow manual paste fallback
- **Corrupted or encrypted PDF**: Display parsing error with suggestion to save as plain PDF or paste text manually
- **Very short resume**: Show warning that analysis may be limited, proceed anyway
- **Very long text**: Truncate intelligently for LLM, inform user of character limits
- **Identical resume/JD**: Warn about circular analysis, suggest providing actual JD
- **LLM failure**: Show friendly error with retry option, preserve user input
- **No keywords found**: Indicate fundamental mismatch between resume and role, suggest role clarity
- **Missing sections**: Analyze only available sections, note missing ones as gaps

## Design Direction

The design should evoke professionalism, trust, and focus—like working with a knowledgeable career consultant. It should feel sophisticated but approachable, data-driven yet human, with clear visual hierarchy that guides users through complex information without overwhelming them.

## Color Selection

A professional palette that balances authority with approachability, using deep blue for trust and warm accents for encouragement.

- **Primary Color**: Deep professional blue (oklch(0.45 0.15 250)) - Communicates expertise, trust, and corporate credibility
- **Secondary Colors**: Soft slate backgrounds (oklch(0.96 0.01 250)) for content cards; charcoal text (oklch(0.25 0 0)) for readability
- **Accent Color**: Warm amber (oklch(0.68 0.15 65)) for scores, highlights, and success indicators—encouraging without being playful
- **Foreground/Background Pairings**: 
  - Primary Blue (oklch(0.45 0.15 250)): White text (oklch(1 0 0)) - Ratio 8.5:1 ✓
  - Background (oklch(0.98 0 0)): Charcoal text (oklch(0.25 0 0)) - Ratio 13.2:1 ✓
  - Accent Amber (oklch(0.68 0.15 65)): Dark text (oklch(0.2 0 0)) - Ratio 8.1:1 ✓

## Font Selection

Professional, scannable typography that reflects the data-driven nature of ATS analysis while remaining highly readable for dense content.

- **Typographic Hierarchy**:
  - H1 (Page Title): Space Grotesk Bold / 32px / tight tracking - Technical precision
  - H2 (Section Headers): Space Grotesk SemiBold / 24px / normal tracking
  - H3 (Subsection): Space Grotesk Medium / 18px / normal tracking
  - Body Text: Inter Regular / 15px / 1.6 line-height - Optimal for long-form content
  - Labels/Metadata: Inter Medium / 13px / wide tracking / uppercase
  - Code/Examples: JetBrains Mono / 14px / 1.5 line-height - For bullet comparisons

## Animations

Animations should reinforce the sense of progression and analysis happening, creating confidence without distraction. Use subtle motion to guide attention through complex multi-section results.

**Key moments**:
- Form submission: Smooth fade-out with subtle scale
- Score reveal: Count-up animation for numerical score (0 to final)
- Section appearance: Staggered fade-in cascade as analysis loads
- Copy buttons: Micro-interaction scale + checkmark confirmation
- Card hover: Gentle lift with shadow deepening (2px transform)
- All transitions: 250-300ms with ease-out curves

## Component Selection

- **Components**: 
  - Form: Textarea (resume/JD), Input (role), Select (experience level, location), File input with drag-and-drop zone
  - Card: For each analysis section with subtle borders and hover states
  - Badge: For keyword categories, experience level indicators
  - Separator: Between major sections and between upload/paste options
  - Button: Primary for submit, outline for upload, ghost for secondary actions (copy, new analysis)
  - ScrollArea: For long analysis results to maintain layout
  - Accordion: For collapsible section improvements (optional progressive disclosure)

- **Customizations**: 
  - FileDropZone component with drag-and-drop, file type validation, and visual feedback
  - Score display as large circular progress indicator (not standard shadcn)
  - Before/After comparison cards with vertical separator
  - Copy-to-clipboard buttons with success feedback
  - Keyword pills with color-coded categories
  - File upload progress indicator during parsing

- **States**: 
  - Buttons: Default → Hover (slight bg darken) → Active (scale 0.98) → Disabled (reduced opacity)
  - Inputs: Default border → Focus (ring + border accent) → Error (red ring) → Filled (subtle bg)
  - Cards: Rest → Hover (shadow elevation) → Selected (accent border)

- **Icon Selection**: 
  - FileText for resume input and uploaded file indicator
  - UploadSimple for file upload action
  - X for clearing uploaded files
  - Target for job description
  - ChartBar for ATS score
  - Lightbulb for improvements
  - Copy for clipboard actions
  - Check for success states
  - LinkedinLogo for LinkedIn section
  - Sparkle for improved/optimized content indicator
  - ArrowRight for before/after comparisons

- **Spacing**: 
  - Page padding: px-6 md:px-12 py-8
  - Section gaps: space-y-8
  - Card padding: p-6
  - Form field gaps: space-y-4
  - Inline elements: gap-3

- **Mobile**: 
  - Single column layout, full-width cards
  - Sticky score summary at top after scroll
  - Form fields stack vertically with comfortable touch targets (min 44px)
  - Reduced text sizes: H1 24px → 28px, Body 14px → 15px
  - Collapsible sections via accordion for easier navigation
