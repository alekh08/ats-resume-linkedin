import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Warning, CheckCircle, Info } from '@phosphor-icons/react'
import type { KeywordAnalysis } from '@/lib/types'

type KeywordAnalysisDisplayProps = {
  keywords: KeywordAnalysis
}

export function KeywordAnalysisDisplay({ keywords }: KeywordAnalysisDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Keyword Gap Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Missing and overused keywords compared to the job description
          </p>
        </div>

        <div className="space-y-5">
          {keywords.criticalMissing.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Warning className="text-destructive" size={20} weight="fill" />
                <h3 className="font-semibold text-base">Critical Missing Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.criticalMissing.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="destructive"
                    className="px-3 py-1.5 text-sm font-medium"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {keywords.optionalMissing.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="text-accent" size={20} weight="fill" />
                <h3 className="font-semibold text-base">Optional Keywords (Nice to Have)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.optionalMissing.map((keyword, index) => (
                  <Badge
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium bg-accent/10 text-accent-foreground hover:bg-accent/20"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {keywords.overused.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-muted-foreground" size={20} weight="fill" />
                <h3 className="font-semibold text-base">Overused or Irrelevant Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.overused.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
