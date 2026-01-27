import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AnalysisForm } from '@/components/AnalysisForm'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { KeywordAnalysisDisplay } from '@/components/KeywordAnalysisDisplay'
import { SectionImprovementsDisplay } from '@/components/SectionImprovementsDisplay'
import { BulletRewritesDisplay } from '@/components/BulletRewritesDisplay'
import { LinkedInDisplay } from '@/components/LinkedInDisplay'
import { ResumeComparisonDisplay } from '@/components/ResumeComparisonDisplay'
import { analyzeResume } from '@/lib/analyzer'
import { toast } from 'sonner'
import { ChartBar, ArrowLeft } from '@phosphor-icons/react'
import type { AnalysisInput, AnalysisResult, SavedAnalysis } from '@/lib/types'

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null)
  const [currentInput, setCurrentInput] = useState<AnalysisInput | null>(null)
  const [savedAnalyses, setSavedAnalyses] = useKV<SavedAnalysis[]>('saved-analyses', [])

  const handleAnalyze = async (input: AnalysisInput) => {
    setIsAnalyzing(true)
    setCurrentInput(input)

    try {
      const result = await analyzeResume(input)
      setCurrentResult(result)

      const newAnalysis: SavedAnalysis = {
        id: Date.now().toString(),
        input,
        result,
        createdAt: Date.now(),
      }

      setSavedAnalyses((current) => [newAnalysis, ...(current || [])].slice(0, 10))

      toast.success('Analysis complete!')
    } catch (error) {
      console.error('Analysis failed:', error)
      toast.error('Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNewAnalysis = () => {
    setCurrentResult(null)
    setCurrentInput(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChartBar className="text-primary" size={32} weight="duotone" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">ATS Resume Analyzer</h1>
                <p className="text-sm text-muted-foreground">Indian Job Market Specialist</p>
              </div>
            </div>
            {currentResult && (
              <Button variant="outline" onClick={handleNewAnalysis}>
                <ArrowLeft size={18} />
                <span className="ml-2">New Analysis</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-8">
        {!currentResult ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Get Your ATS Score</h2>
              <p className="text-muted-foreground">
                Analyze your resume against job descriptions and receive actionable feedback
                tailored for the Indian job market.
              </p>
            </div>
            <AnalysisForm onSubmit={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="max-w-5xl mx-auto space-y-8 pb-12">
              <ScoreDisplay atsScore={currentResult.atsScore} />
              <ResumeComparisonDisplay 
                originalResume={currentInput?.resumeText || ''} 
                improvedResume={currentResult.improvedResume} 
              />
              <KeywordAnalysisDisplay keywords={currentResult.keywords} />
              <SectionImprovementsDisplay improvements={currentResult.sectionImprovements} />
              {currentResult.bulletRewrites.length > 0 && (
                <BulletRewritesDisplay rewrites={currentResult.bulletRewrites} />
              )}
              <LinkedInDisplay linkedIn={currentResult.linkedIn} />
            </div>
          </ScrollArea>
        )}
      </main>
    </div>
  )
}

export default App