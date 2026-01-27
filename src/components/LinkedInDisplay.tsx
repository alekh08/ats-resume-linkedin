import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { LinkedinLogo, Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { LinkedInOptimization } from '@/lib/types'

type LinkedInDisplayProps = {
  linkedIn: LinkedInOptimization
}

export function LinkedInDisplay({ linkedIn }: LinkedInDisplayProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(label)
    toast.success(`${label} copied to clipboard`)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <LinkedinLogo className="text-primary" size={28} weight="fill" />
          <div>
            <h2 className="text-2xl font-bold mb-1">LinkedIn Optimization</h2>
            <p className="text-sm text-muted-foreground">
              Profile content optimized for recruiter searches
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">Headline (220 chars max)</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(linkedIn.headline, 'Headline')}
                className="h-8 px-3"
              >
                {copiedItem === 'Headline' ? (
                  <>
                    <Check size={16} weight="bold" />
                    <span className="ml-1.5 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="ml-1.5 text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div className="p-4 bg-secondary rounded-md">
              <p className="text-sm text-foreground leading-relaxed">
                {linkedIn.headline}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">About Section</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(linkedIn.aboutSection.join('\n\n'), 'About Section')}
                className="h-8 px-3"
              >
                {copiedItem === 'About Section' ? (
                  <>
                    <Check size={16} weight="bold" />
                    <span className="ml-1.5 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="ml-1.5 text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div className="p-4 bg-secondary rounded-md space-y-4">
              {linkedIn.aboutSection.map((paragraph, index) => (
                <p key={index} className="text-sm text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-base">Top Recruiter-Search Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {linkedIn.topKeywords.map((keyword, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">Networking Message Template</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(linkedIn.networkingTemplate, 'Message Template')}
                className="h-8 px-3"
              >
                {copiedItem === 'Message Template' ? (
                  <>
                    <Check size={16} weight="bold" />
                    <span className="ml-1.5 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="ml-1.5 text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div className="p-4 bg-secondary rounded-md">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {linkedIn.networkingTemplate}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
