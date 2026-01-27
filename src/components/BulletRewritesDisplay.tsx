import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { BulletRewrite } from '@/lib/types'

type BulletRewritesDisplayProps = {
  rewrites: BulletRewrite[]
}

export function BulletRewritesDisplay({ rewrites }: BulletRewritesDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Bullet Point Rewrites</h2>
          <p className="text-sm text-muted-foreground">
            Before and after examples with ATS optimization
          </p>
        </div>

        <div className="space-y-6">
          {rewrites.map((rewrite, index) => (
            <div key={index} className="space-y-3">
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
                    Before
                  </p>
                  <div className="p-4 bg-secondary/50 rounded-md border border-border">
                    <p className="text-sm text-foreground font-mono leading-relaxed">
                      {rewrite.before}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  className="text-primary hidden md:block"
                  size={24}
                  weight="bold"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wide font-medium text-accent-foreground">
                      After
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(rewrite.after, index)}
                      className="h-7 px-2"
                    >
                      {copiedIndex === index ? (
                        <Check size={16} weight="bold" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-md border border-accent/30">
                    <p className="text-sm text-foreground font-mono leading-relaxed">
                      {rewrite.after}
                    </p>
                  </div>
                </div>
              </div>

              {index < rewrites.length - 1 && (
                <div className="border-b border-border" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
