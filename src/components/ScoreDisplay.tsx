import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import type { ATSScore } from '@/lib/types'

type ScoreDisplayProps = {
  atsScore: ATSScore
}

export function ScoreDisplay({ atsScore }: ScoreDisplayProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = atsScore.score
    const duration = 1500
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [atsScore.score])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-accent'
    if (score >= 40) return 'text-orange-500'
    return 'text-destructive'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  }

  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (count / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative flex items-center justify-center">
            <svg width="200" height="200" className="transform -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={getScoreColor(atsScore.score)}
                style={{ transition: 'stroke-dashoffset 0.3s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getScoreColor(atsScore.score)}`}>
                {count}
              </span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {getScoreLabel(atsScore.score)}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-2xl font-bold mb-1">ATS Compatibility Score</h2>
              <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
                Analysis Complete
              </p>
            </div>
            <p className="text-base leading-relaxed text-foreground">
              {atsScore.explanation}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
