'use client'
import { ChangeEvent, DragEventHandler, InputHTMLAttributes, Ref, useImperativeHandle, useRef, useState } from "react";
import { Input } from "./shadcn/input";
import { cn } from "../lib/utils";
import UploadIcon from '@/assets/icons/upload-svg.svg?rc'
import BorderSvg from '@/assets/icons/border-svg.svg?rc'
import { ErrorMessage } from "./FormItem";

/**
 * Parses the accept attribute string into an array of file types
 * @param accept - Accept string like ".pdf,.jpg,image/*"
 * @returns Array of trimmed file types
 */
const parseAcceptString = (accept: string): string[] => {
  return accept.split(',').map(type => type.trim())
}

/**
 * Filters files based on the accept criteria
 * Supports both file extensions (.pdf) and MIME types (image/png)
 * @param accept - Accept string from input element
 * @param files - Array of files to filter
 * @returns Filtered array of accepted files
 */
// const filterFiles = (accept: string | undefined, files: File[]) => {
//   const acceptedTypes = accept ? parseAcceptString(accept) : null
//   if (!acceptedTypes) return files

//   return files.filter(file => {
//     return acceptedTypes.some(type => {
//       if (type.startsWith('.')) {
//         return file.name.endsWith(type);
//       } else {
//         return file.type === type;
//       }
//     });
//   })
// }

type FileSplitResult = {
  accepted: File[];
  rejected: File[];
};
/**
 * Filters files into accepted and rejected based on the accept criteria
 * @param accept - Accept string from input element
 * @param files - Array of files to filter
 * @returns Object with accepted and rejected files
 */
const splitFilesByAccept = (
  accept: string | undefined,
  files: File[]
): FileSplitResult => {
  const acceptedTypes = accept ? parseAcceptString(accept) : null;
  if (!acceptedTypes) {
    return { accepted: files, rejected: [] };
  }

  return files.reduce<FileSplitResult>(
    (acc, file) => {
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.endsWith(type);
        } else {
          return file.type === type;
        }
      });

      if (isAccepted) {
        acc.accepted.push(file);
      } else {
        acc.rejected.push(file);
      }

      return acc;
    },
    { accepted: [], rejected: [] }
  );
};

/**
 * Reference interface exposed to parent components
 * Allows external control of the file upload component
 */
export type FileUploadRef = {
  getFiles: () => File[],      // Get current files
  clearFiles: () => void,      // Clear all files
  addFiles: (files: File[]) => void  // Add files programmatically
}

type Props = {
  rootStyles?: string
  inputStyles?: string
  ref?: Ref<FileUploadRef>
  error?: string | null
  onFilesChange?: (files: File[]) => void
  onRejectedFiles?: (rejectedFiles: File[]) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange'>

/**
 * A drag-and-drop file upload component with visual feedback and imperative API.
 *
 * Features:
 * - Drag and drop file upload
 * - Click to select files
 * - File type filtering based on accept attribute
 * - Visual feedback during drag operations
 * - Animated border effects
 * - Imperative API for external control (via ref)
 * - Optional reactive API (via onFilesChange callback)
 *
 * @param props - Component props extending HTML input attributes
 * @param props.rootStyles - Custom CSS classes for root container
 * @param props.inputStyles - Reserved for custom CSS classes for input
 * @param props.ref - Reference for imperative API access (getFiles, clearFiles, addFiles)
 * @param props.error - Error message to display under the field
 * @param props.multiple - Allow multiple file selection
 * @param props.accept - File type restrictions (extensions or MIME types)
 * @param props.onFilesChange - Optional callback called whenever selected files change
 *
 * @example Imperative usage
 * ```tsx
 * const fileUploadRef = useRef<FileUploadRef>(null)
 *
 * <FileUploadField
 *   ref={fileUploadRef}
 *   multiple
 *   accept=".pdf,.jpg,.png,image/*"
 * />
 *
 * const files = fileUploadRef.current?.getFiles()
 * fileUploadRef.current?.clearFiles()
 * ```
 *
 * @example Reactive usage
 * ```tsx
 * const [files, setFiles] = useState<File[]>([])
 *
 * <FileUploadField
 *   multiple
 *   onFilesChange={setFiles}
 * />
 * ```
 */
export const FileUploadField = ({
  rootStyles,
  ref,
  error = null,
  multiple,
  accept,
  onFilesChange = () => { },
  onRejectedFiles = () => { },
  ...props
}: Props) => {
  // Ref to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  // State to track selected files
  const [files, setFiles] = useState<File[]>([])
  // State to track drag over status for visual feedback
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  /**
  * Expose imperative API to parent components
  * This allows parent to programmatically interact with the file upload
  */
  useImperativeHandle(ref, () => ({
    getFiles: () => files,
    clearFiles: () => {
      setFiles([])
      onFilesChange([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    addFiles: (files: File[]) => {
      setFiles(prev => {
        const newFiles = [...prev, ...files]
        onFilesChange(newFiles)
        return newFiles
      })
    }
  }), [files, onFilesChange])

  /**
   * Update files state - centralized method for consistency
   */
  const updateFiles = (newFiles: File[]) => {
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  /**
   * Handle file selection via the file input dialog
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return
    const newFiles = Array.from(e.target.files)
    //Split files into accepted and rejected ones based on the accept attribute.
    const { accepted, rejected } = splitFilesByAccept(accept, newFiles)

    if (rejected.length) onRejectedFiles(rejected)
    // if (!accepted.length) return
    updateFiles(accepted)
  }

  /**
   * Handle file drop event
   * Processes dropped files and applies accept filtering
   */
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (!files) return;

    //Split files into accepted and rejected ones based on the accept attribute.
    const { accepted, rejected } = splitFilesByAccept(accept, Array.from(files))

    if (rejected.length) onRejectedFiles(rejected)
    if (!accepted.length) return

    // Handle multiple vs single file selection
    const newFiles = multiple ? accepted : [accepted[0]]

    // Clear the input value to ensure change events fire correctly
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    updateFiles(newFiles)
  }

  /**
   * Handle drag enter - show visual feedback
   */
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  /**
  * Handle drag leave - remove visual feedback
  */
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={cn(
        'h-14 relative',
        'hover:opacity-65 group/file-field',
        isDragOver && 'opacity-65',
        rootStyles
      )}
    >
      <Input
        onChange={handleChange}
        ref={fileInputRef}
        className={cn(
          'absolute w-full h-full left-0 top-0 appearance-none opacity-0 z-10 cursor-pointer',
        )}
        type="file"
        multiple={multiple}
        accept={accept}
        {...props}
      />
      <UploadIcon
        className={cn(
          'h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/65',

        )}
      />
      <BorderSvg
        className={cn(
          'w-full h-full text-primary/65',
          '[stroke-dasharray:5] group-hover/file-field:animate-move-border',
          isDragOver && 'animate-move-border',
          error && 'text-destructive',
        )}
      />
      {error && <ErrorMessage
        message={error}
        className="-top-[1.5rem]"
      />}
    </div>


  )
}