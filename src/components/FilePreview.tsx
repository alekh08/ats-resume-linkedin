import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { FileText, CheckCircle, XCircle, Eye } from '@phosphor-icons/react'
import { Separator } from '@/components/ui/separator'

type FilePreviewProps = {
  fileName: string
  fileSize: number
  parsedText: string
  onConfirm: () => void
  onReject: () => void
  isLoading?: boolean
}

export function FilePreview({
  fileName,
  fileSize,
  parsedText,
  onConfirm,
  onReject,
  isLoading = false,
}: FilePreviewProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const wordCount = parsedText.trim().split(/\s+/).length
  const charCount = parsedText.length

  return (
    <Card className="p-6 space-y-4 border-primary/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <Eye size={24} weight="duotone" className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1">File Preview</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Review the parsed content before analysis
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                <FileText size={14} weight="bold" className="mr-1" />
                {fileName}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {formatFileSize(fileSize)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {wordCount} words
              </Badge>
              <Badge variant="outline" className="text-xs">
                {charCount} characters
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Parsed Content</Label>
          <span className="text-xs text-muted-foreground">
            Scroll to review all content
          </span>
        </div>
        
        <ScrollArea className="h-[300px] w-full rounded-md border bg-muted/30 p-4">
          <pre className="text-sm font-mono whitespace-pre-wrap break-words text-foreground leading-relaxed">
            {parsedText}
          </pre>
        </ScrollArea>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 sm:flex-initial sm:min-w-[140px]"
          size="lg"
        >
          <CheckCircle size={20} weight="bold" className="mr-2" />
          Use This Content
        </Button>
        <Button
          onClick={onReject}
          disabled={isLoading}
          variant="outline"
          className="flex-1 sm:flex-initial"
          size="lg"
        >
          <XCircle size={20} weight="bold" className="mr-2" />
          Try Another File
        </Button>
      </div>
    </Card>
  )
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>
}
