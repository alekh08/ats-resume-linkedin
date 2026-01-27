export type ExperienceLevel = 'fresher' | '1-3-years' | '3-5-years'

export type AnalysisInput = {
  resumeText: string
  jobDescription: string
  experienceLevel: ExperienceLevel
  targetRole: string
  targetLocation: string
}

export type ATSScore = {
  score: number
  explanation: string
}

export type KeywordAnalysis = {
  criticalMissing: string[]
  optionalMissing: string[]
  overused: string[]
}

export type SectionImprovement = {
  section: string
  problem: string
  improvement: string
  example: string
}

export type BulletRewrite = {
  before: string
  after: string
}

export type LinkedInOptimization = {
  headline: string
  aboutSection: string[]
  topKeywords: string[]
  networkingTemplate: string
}

export type AnalysisResult = {
  atsScore: ATSScore
  keywords: KeywordAnalysis
  sectionImprovements: SectionImprovement[]
  bulletRewrites: BulletRewrite[]
  linkedIn: LinkedInOptimization
}

export type SavedAnalysis = {
  id: string
  input: AnalysisInput
  result: AnalysisResult
  createdAt: number
}
