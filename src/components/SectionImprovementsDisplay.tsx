import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Lightbulb } from '@phosphor-icons/react'
import type { SectionImprovement } from '@/lib/types'

type SectionImprovementsDisplayProps = {
  improvements: SectionImprovement[]
}

export function SectionImprovementsDisplay({ improvements }: SectionImprovementsDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Section-by-Section Improvements</h2>
          <p className="text-sm text-muted-foreground">
            Targeted feedback for each resume section
          </p>
        </div>

        <div className="space-y-6">
          {improvements.map((improvement, index) => (
            <div key={index} className="space-y-3 pb-6 border-b last:border-b-0 last:pb-0">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-primary" size={20} weight="fill" />
                <h3 className="font-semibold text-lg">{improvement.section}</h3>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground mb-1">
                    Problem
                  </p>
                  <p className="text-sm text-destructive">{improvement.problem}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground mb-1">
                    How to Improve
                  </p>
                  <p className="text-sm text-foreground">{improvement.improvement}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground mb-1">
                    Example
                  </p>
                  <div className="p-4 bg-secondary rounded-md">
                    <p className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                      {improvement.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
