import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { Copy, Check, FileText, Sparkle } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'

type ResumeComparisonDisplayProps = {
  originalResume: string
  improvedResume: string
}

export function ResumeComparisonDisplay({ originalResume, improvedResume }: ResumeComparisonDisplayProps) {
  const [copiedOriginal, setCopiedOriginal] = useState(false)
  const [copiedImproved, setCopiedImproved] = useState(false)
  const isMobile = useIsMobile()

  const handleCopyOriginal = () => {
    navigator.clipboard.writeText(originalResume)
    setCopiedOriginal(true)
    toast.success('Original resume copied to clipboard')
    setTimeout(() => setCopiedOriginal(false), 2000)
  }

  const handleCopyImproved = () => {
    navigator.clipboard.writeText(improvedResume)
    setCopiedImproved(true)
    toast.success('Improved resume copied to clipboard')
    setTimeout(() => setCopiedImproved(false), 2000)
  }

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Resume Comparison</h2>
            <p className="text-sm text-muted-foreground">
              View your original resume alongside the ATS-optimized version
            </p>
          </div>

          <Tabs defaultValue="improved" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="original">
                <FileText size={16} className="mr-2" />
                Original
              </TabsTrigger>
              <TabsTrigger value="improved">
                <Sparkle size={16} className="mr-2" weight="fill" />
                Improved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="original" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
                  Original Resume
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyOriginal}
                  className="h-8"
                >
                  {copiedOriginal ? (
                    <>
                      <Check size={16} weight="bold" className="mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <ScrollArea className="h-[500px] w-full rounded-md border border-border bg-secondary/30 p-4">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {originalResume}
                </pre>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="improved" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide font-medium text-accent-foreground">
                  ATS-Optimized Resume
                </p>
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleCopyImproved}
                  className="h-8"
                >
                  {copiedImproved ? (
                    <>
                      <Check size={16} weight="bold" className="mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <ScrollArea className="h-[500px] w-full rounded-md border border-accent/30 bg-accent/5 p-4">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {improvedResume}
                </pre>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Resume Comparison</h2>
          <p className="text-sm text-muted-foreground">
            View your original resume alongside the ATS-optimized version
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-muted-foreground" />
                <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
                  Original Resume
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyOriginal}
                className="h-8"
              >
                {copiedOriginal ? (
                  <>
                    <Check size={16} weight="bold" className="mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <ScrollArea className="h-[600px] w-full rounded-md border border-border bg-secondary/30 p-4">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {originalResume}
              </pre>
            </ScrollArea>
          </div>

          <Separator orientation="vertical" className="h-[640px]" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkle size={18} className="text-accent" weight="fill" />
                <p className="text-xs uppercase tracking-wide font-medium text-accent-foreground">
                  ATS-Optimized Resume
                </p>
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={handleCopyImproved}
                className="h-8"
              >
                {copiedImproved ? (
                  <>
                    <Check size={16} weight="bold" className="mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <ScrollArea className="h-[600px] w-full rounded-md border border-accent/30 bg-accent/5 p-4">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {improvedResume}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
