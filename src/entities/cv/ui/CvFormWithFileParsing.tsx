'use client'

import { TResume } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { FileLoadingForm } from "./FileLoadingForm";
import { ReactNode, useState } from "react";
import { filterFalsyFields, NonNullableFields } from "@/shared/lib/object_manipulations/filterFalsyFields";

type TProps = {
  className?: string,
  renderCvForm: (props: {
    initialData?: NonNullableFields<TResume>
  }) => ReactNode
}
export const CvFormWithFileParsing = ({
  className,
  renderCvForm
}: TProps) => {

  const [initialData, setInitialData] = useState<undefined | TResume>(undefined)

  const clearedInitialData = initialData ? filterFalsyFields(initialData) : undefined


  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        className
      )}
    >
      <FileLoadingForm
        setInitialData={setInitialData}
      />
      {renderCvForm({ initialData: clearedInitialData })}
    </div>
  );
}