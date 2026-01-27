import type { AnalysisInput, AnalysisResult } from './types'

const IMPROVEMENT_LEVEL_GUIDANCE = {
  conservative: `
CONSERVATIVE MODE:
- Focus on minimal, safe changes that preserve the original voice and content
- Only suggest changes that are clearly beneficial and low-risk
- Keep most of the original phrasing intact
- Add only the most critical missing keywords
- Suggest subtle improvements to formatting and structure
- Do not rewrite extensively - polish what exists
- Ideal for candidates who are already strong matches`,
  
  moderate: `
MODERATE MODE:
- Balance between preserving original content and making meaningful improvements
- Rewrite bullets to be more impactful while maintaining authenticity
- Add important keywords naturally throughout
- Restructure sections for better ATS performance
- Enhance quantification where possible
- Make noticeable improvements without dramatic changes
- Ideal for most candidates seeking solid optimization`,
  
  aggressive: `
AGGRESSIVE MODE:
- Maximize ATS score with comprehensive rewrites
- Transform all bullets with strong action verbs and quantification
- Strategically inject all relevant keywords from job description
- Restructure entire sections for optimal ATS parsing
- Add industry buzzwords and trending skills where relevant
- Push boundaries while staying truthful
- Ideal for candidates needing significant improvement or highly competitive roles`
}

export async function analyzeResume(input: AnalysisInput): Promise<AnalysisResult> {
  const levelGuidance = IMPROVEMENT_LEVEL_GUIDANCE[input.improvementLevel]
  
  const prompt = spark.llmPrompt`You are an expert ATS optimization consultant, resume reviewer, and career strategist with deep knowledge of:
- Indian job market hiring practices
- ATS systems used by Indian and global companies
- Campus hiring, fresher roles, and lateral roles (0–5 years)
- LinkedIn recruiter search behavior

${levelGuidance}

Analyze the following resume and job description:

RESUME TEXT:
${input.resumeText}

JOB DESCRIPTION:
${input.jobDescription}

CANDIDATE DETAILS:
- Experience Level: ${input.experienceLevel}
- Target Role: ${input.targetRole}
- Target Location: ${input.targetLocation}
- Improvement Level: ${input.improvementLevel.toUpperCase()}

Apply the improvement level guidance above to all recommendations, rewrites, and the improved resume.

Provide a comprehensive analysis in the following JSON structure:

{
  "atsScore": {
    "score": <number 0-100>,
    "explanation": "<2 line explanation of the score>"
  },
  "keywords": {
    "criticalMissing": ["keyword1", "keyword2", ...],
    "optionalMissing": ["keyword1", "keyword2", ...],
    "overused": ["keyword1", "keyword2", ...]
  },
  "sectionImprovements": [
    {
      "section": "Resume Summary",
      "problem": "<1 line what is wrong>",
      "improvement": "<clear instruction how to improve>",
      "example": "<ATS-optimized example rewrite>"
    },
    {
      "section": "Skills",
      "problem": "<1 line what is wrong>",
      "improvement": "<clear instruction how to improve>",
      "example": "<ATS-optimized example>"
    },
    {
      "section": "Experience",
      "problem": "<1 line what is wrong>",
      "improvement": "<clear instruction how to improve>",
      "example": "<ATS-optimized example>"
    },
    {
      "section": "Education",
      "problem": "<1 line what is wrong>",
      "improvement": "<clear instruction how to improve>",
      "example": "<ATS-optimized example>"
    }
  ],
  "bulletRewrites": [
    {
      "before": "<original bullet from resume>",
      "after": "<rewritten with action verbs, quantification, ATS keywords>"
    }
  ],
  "linkedIn": {
    "headline": "<220 chars max ATS-optimized headline>",
    "aboutSection": ["<paragraph 1>", "<paragraph 2>", "<paragraph 3>"],
    "topKeywords": ["keyword1", "keyword2", ... up to 10],
    "networkingTemplate": "<India-appropriate networking message>"
  },
  "improvedResume": "<complete ATS-optimized resume incorporating all improvements, bullet rewrites, and critical keywords. Format professionally with clear sections. Keep all real achievements and dates. Do NOT fabricate information.>"
}

IMPORTANT RULES:
- Be specific and actionable
- Use Indian job market context
- Do NOT fabricate experience
- Provide realistic examples based on the resume content
- Keep tone professional and India-appropriate
- Ensure all keyword analysis is relevant to the job description
- Rewrite up to 5 bullet points maximum
- If a section is missing from the resume, note it in the problem field
- The improvedResume field should be a complete, properly formatted resume text with all improvements applied`

  const response = await spark.llm(prompt, 'gpt-4o', true)
  const result = JSON.parse(response) as AnalysisResult

  return result
}
