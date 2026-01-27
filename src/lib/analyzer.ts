import type { AnalysisInput, AnalysisResult } from './types'

export async function analyzeResume(input: AnalysisInput): Promise<AnalysisResult> {
  const prompt = spark.llmPrompt`You are an expert ATS optimization consultant, resume reviewer, and career strategist with deep knowledge of:
- Indian job market hiring practices
- ATS systems used by Indian and global companies
- Campus hiring, fresher roles, and lateral roles (0–5 years)
- LinkedIn recruiter search behavior

Analyze the following resume and job description:

RESUME TEXT:
${input.resumeText}

JOB DESCRIPTION:
${input.jobDescription}

CANDIDATE DETAILS:
- Experience Level: ${input.experienceLevel}
- Target Role: ${input.targetRole}
- Target Location: ${input.targetLocation}

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
  }
}

IMPORTANT RULES:
- Be specific and actionable
- Use Indian job market context
- Do NOT fabricate experience
- Provide realistic examples based on the resume content
- Keep tone professional and India-appropriate
- Ensure all keyword analysis is relevant to the job description
- Rewrite up to 5 bullet points maximum
- If a section is missing from the resume, note it in the problem field`

  const response = await spark.llm(prompt, 'gpt-4o', true)
  const result = JSON.parse(response) as AnalysisResult

  return result
}
