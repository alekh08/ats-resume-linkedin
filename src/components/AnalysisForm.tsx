import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FileText, Target } from '@phosphor-icons/react'
import { FileDropZone } from '@/components/FileDropZone'
import { parseResumeFile, validateResumeFile } from '@/lib/fileParser'
import { toast } from 'sonner'
import type { AnalysisInput, ExperienceLevel } from '@/lib/types'

type AnalysisFormProps = {
  onSubmit: (input: AnalysisInput) => void
  isAnalyzing: boolean
}

export function AnalysisForm({ onSubmit, isAnalyzing }: AnalysisFormProps) {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('fresher')
  const [targetRole, setTargetRole] = useState('')
  const [targetLocation, setTargetLocation] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [isProcessingFile, setIsProcessingFile] = useState(false)

  const isValid = resumeText.trim() && jobDescription.trim() && targetRole.trim() && targetLocation.trim()

  const handleFileSelect = async (file: File) => {
    const validation = validateResumeFile(file)
    if (!validation.valid) {
      toast.error(validation.error)
      return
    }

    setIsProcessingFile(true)
    try {
      const text = await parseResumeFile(file)
      setResumeText(text)
      setUploadedFileName(file.name)
      toast.success('Resume parsed successfully!')
    } catch (error) {
      console.error('File parsing error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to parse file')
    } finally {
      setIsProcessingFile(false)
    }
  }

  const handleClearFile = () => {
    setResumeText('')
    setUploadedFileName(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    onSubmit({
      resumeText: resumeText.trim(),
      jobDescription: jobDescription.trim(),
      experienceLevel,
      targetRole: targetRole.trim(),
      targetLocation: targetLocation.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3 pb-2">
          <FileText className="text-primary" size={24} weight="duotone" />
          <div>
            <h3 className="font-semibold text-lg">Resume</h3>
            <p className="text-sm text-muted-foreground">Upload a file or paste your resume content</p>
          </div>
        </div>

        <FileDropZone
          onFileSelect={handleFileSelect}
          disabled={isAnalyzing}
          isProcessing={isProcessingFile}
          uploadedFileName={uploadedFileName}
          onClear={handleClearFile}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or paste text</span>
          </div>
        </div>

        <Textarea
          id="resume-text"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text here..."
          className="min-h-[150px] font-mono text-sm"
          disabled={isAnalyzing || isProcessingFile}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3 pb-2">
          <Target className="text-primary" size={24} weight="duotone" />
          <div>
            <h3 className="font-semibold text-lg">Job Description</h3>
            <p className="text-sm text-muted-foreground">Paste the target job posting</p>
          </div>
        </div>
        <Textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="min-h-[200px] font-mono text-sm"
          disabled={isAnalyzing}
        />
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="experience-level" className="text-sm font-medium">
            Experience Level
          </Label>
          <Select
            value={experienceLevel}
            onValueChange={(value) => setExperienceLevel(value as ExperienceLevel)}
            disabled={isAnalyzing}
          >
            <SelectTrigger id="experience-level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fresher">Fresher</SelectItem>
              <SelectItem value="1-3-years">1-3 Years</SelectItem>
              <SelectItem value="3-5-years">3-5 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-role" className="text-sm font-medium">
            Target Role
          </Label>
          <Input
            id="target-role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g., Software Engineer"
            disabled={isAnalyzing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-location" className="text-sm font-medium">
            Target Location
          </Label>
          <Input
            id="target-location"
            value={targetLocation}
            onChange={(e) => setTargetLocation(e.target.value)}
            placeholder="e.g., Bangalore, India"
            disabled={isAnalyzing}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid || isAnalyzing}
        className="w-full md:w-auto px-8"
        size="lg"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
      </Button>
    </form>
  )
}
