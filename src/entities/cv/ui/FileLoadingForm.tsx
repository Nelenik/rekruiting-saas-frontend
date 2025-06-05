'use client'
import { FormEventHandler, useCallback, useRef, useState, useTransition } from "react";
import { parseCvFromFile } from "@/shared/api/actions";
import { TResume } from "@/shared/api/types";
import { useMutateForm } from "@/shared/model/hooks/useMutateForm";
import { FileUploadField, FileUploadRef } from "@/shared/ui/FileUploadField";
import { Button } from "@/shared/ui/shadcn/button";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import { toast } from "@/shared/model/hooks/use-toast";
import { TMutationState } from "@/shared/api/common/api";


type TProps = {
  setInitialData: (data: TResume) => void
}
export const FileLoadingForm = ({
  setInitialData
}: TProps) => {
  const fileUploadRef = useRef<FileUploadRef>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const [isPending, startTransition] = useTransition()

  //Actions on successful form submitting
  const handleSucces = useCallback((state: TMutationState) => {
    setInitialData(state.payload as TResume)
    fileUploadRef.current?.clearFiles()
  }, [setInitialData])

  const { formAction, errors, removeError } =
    useMutateForm({
      mutationAction: parseCvFromFile,
      onSuccess: handleSucces
    });

  const handleSumbmit: FormEventHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    selectedFiles.forEach(file => {
      formData.append('file', file)
    })
    startTransition(() => formAction(formData))

  }

  //on files change remove error if it exists and changed selectedFiles
  const handleFilesChange = useCallback((files: File[]) => {
    removeError('file')
    setSelectedFiles(files)
  }, [removeError])

  // If there are rejected files (e.g., unsupported formats), show a warning toast
  const handleFilesReject = useCallback((rejectedFiles: File[]) => toast({ variant: 'warn', title: `Отклонено файлов: ${rejectedFiles?.length}. Допустимые форматы: pdf` }), [])

  return (
    <form
      className="flex flex-col sm:grid sm:grid-cols-2 gap-y-2.5 ring-1 p-4 ring-input rounded-md"
      onSubmit={handleSumbmit}
    >
      <h3 className="font-medium sm:col-span-2">Заполнить из файла</h3>
      <FileUploadField
        ref={fileUploadRef}
        rootStyles=""
        error={errors.file}
        accept="application/pdf"
        onFilesChange={handleFilesChange}
        onRejectedFiles={handleFilesReject}
      />
      <ul>
        {selectedFiles.map(file => (
          <li
            key={file.name}
            className="flex gap-2"
          >
            <Button
              className="justify-start"
              asChild
              variant={'ghost'}
            >
              <a
                className="grow block max-w-[285px] text-ellipsis whitespace-nowrap overflow-hidden "
                href={URL.createObjectURL(file)} target="_blanc"
              >
                {file.name}
              </a>
            </Button>
            <CancelButton
              type="button"
              onClick={() => {
                const newFiles = selectedFiles.filter(item => item.name !== file.name)
                setSelectedFiles(newFiles)
              }}
            />
          </li>
        ))}
      </ul>
      <Button type="submit" className="sm:col-span-2 justify-self-start">
        {isPending ? 'Обработка...' : 'Заполнить'}
      </Button>
    </form>
  );
}

