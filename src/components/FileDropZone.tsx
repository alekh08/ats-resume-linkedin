import { useState, useRef, DragEvent } from 'react'
import { Button } from '@/components/ui/button'
import { UploadSimple, FileText, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

type FileDropZoneProps = {
  onFileSelect: (file: File) => void
  disabled?: boolean
  isProcessing?: boolean
  uploadedFileName?: string | null
  onClear?: () => void
}

export function FileDropZone({
  onFileSelect,
  disabled = false,
  isProcessing = false,
  uploadedFileName,
  onClear,
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled && !isProcessing) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (disabled || isProcessing) return

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        'relative border-2 border-dashed rounded-lg transition-colors',
        isDragging && !disabled && !isProcessing
          ? 'border-primary bg-primary/5'
          : 'border-border bg-muted/30',
        disabled || isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isProcessing}
      />

      {uploadedFileName ? (
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              <FileText size={24} weight="fill" className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{uploadedFileName}</p>
              <p className="text-xs text-muted-foreground">File uploaded successfully</p>
            </div>
          </div>
          {onClear && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              disabled={disabled || isProcessing}
            >
              <X size={18} weight="bold" />
            </Button>
          )}
        </div>
      ) : (
        <div className="p-8 text-center" onClick={handleUploadClick}>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <UploadSimple size={32} weight="duotone" className="text-primary" />
            </div>
          </div>
          <h4 className="font-semibold mb-2">
            {isProcessing ? 'Processing file...' : 'Drop your resume here'}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse (PDF, DOC, DOCX)
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled || isProcessing}
            onClick={(e) => {
              e.stopPropagation()
              handleUploadClick()
            }}
          >
            {isProcessing ? 'Processing...' : 'Select File'}
          </Button>
        </div>
      )}
    </div>
  )
}
