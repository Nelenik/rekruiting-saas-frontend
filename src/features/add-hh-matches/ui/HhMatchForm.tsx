'use client'
import { cn } from "@/shared/lib/utils";
import FormItem from "@/shared/ui/form-elements/FormItem";
import { Input } from "@/shared/ui/shadcn/input";
import { HH_FIELDS_DICT } from "../lib/dictionary";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { Button } from "@/shared/ui/shadcn/button";
// import { RefObject } from "react";
import { useMutateForm } from "@/shared/model/hooks/useMutateForm";
import { launchMatchFromHh } from "@/shared/api/actions";
import { THhEmployment, THhMatchRequest, THhStatus } from "../api/types";
import { useRef } from "react";
import { SpecializationField } from "./SpecializationField";
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { LocationField } from "./LocationField";

type TProps = {
  className?: string,
  vacancyId: string | number,
  vacancyName: string,
  // ref?: RefObject<HTMLFormElement | null>
  onSuccess?: () => void
}
export const HhMatchForm = ({
  className,
  vacancyId,
  vacancyName,
  // ref,
  onSuccess = () => { }
}: TProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const { formAction, pending, defaultValues, errors, removeError } = useMutateForm<THhMatchRequest>({
    mutationAction: launchMatchFromHh,
    toastMessage: 'Match creation from hh.ru started',
    onSuccess

  })

  return (


    <form
      action={formAction}
      ref={formRef}
      className={cn(
        ' h-full pb-20',
        className
      )}

    >
      <ScrollArea className="h-full px-4" type="always">
        <div className="flex flex-col gap-8">
          {/* Hidden inputs vacancyId and search text = vacancy name */}
          <input type="hidden" name="vacancy_id" defaultValue={vacancyId} />

          {/* Cv name */}
          <FormItem
            labelText="Resume title"
            error={errors.text}
          >
            <Input
              name="text"
              defaultValue={defaultValues?.text || vacancyName}
              className="text-inherit"
            />
          </FormItem>

          {/* Area */}
          <FormItem
            labelText="Location"
            className="gap-1"
            error={errors.area}
          >
            <LocationField
              name='area[]'
              defaultValues={defaultValues?.area?.map(String)}
              formRef={formRef}
            />
          </FormItem>

          {/* Professional_role */}
          <FormItem labelText="Specialization" className="gap-1">
            <SpecializationField
              defaultValues={defaultValues?.professional_role?.map(String)}
              name='professional_role[]'
              formRef={formRef}
            />
          </FormItem>

          {/* Experience */}
          <FormItem
            labelText="Work experience"
            className="gap-1"
            error={errors.experience}
          >
            {HH_FIELDS_DICT.experience.map((variant) => {
              const isChecked = variant.id === defaultValues?.experience
              return (
                <label
                  key={variant.id}
                  className="flex items-center gap-2"
                >
                  <Input
                    type="radio"
                    name="experience"
                    value={variant.id}
                    className="inline w-5 h-5 accent-primary"
                    defaultChecked={isChecked}
                    onChange={(e) => removeError(e.target.name)}
                  />
                  <span>{capitalizeSentences(variant.name)}</span>
                </label>
              )
            })}

          </FormItem>

          {/* Age */}
          <div >
            <p className="mb-[10px] font-medium">Age</p>
            <div className="flex gap-4">
              <FormItem
                error={errors.age_from}
                className="grow"
              >
                <Input
                  type="number"
                  placeholder="from"
                  name="age_from"
                  min={14}
                  max={99}
                  defaultValue={defaultValues?.age_from}
                  onChange={(e) => removeError(e.target.name)}
                />
              </FormItem>
              <FormItem
                error={errors.age_to}
                className="grow"
              >
                <Input
                  type="number"
                  placeholder="to"
                  name="age_to"
                  defaultValue={defaultValues?.age_to}
                  min={14}
                  max={99}
                  onChange={(e) => removeError(e.target.name)}
                />
              </FormItem>
            </div>
          </div>

          {/* Gender */}
          <FormItem
            labelText="Gender"
            className="gap-1"
            error={errors.gender}
          >
            {HH_FIELDS_DICT.gender.map((variant) => {
              const isChecked = variant.id === defaultValues?.gender
              return (
                <label
                  key={variant.id}
                  className="flex items-center gap-2"
                >
                  <Input
                    type="radio"
                    name="gender"
                    value={variant.id}
                    className="inline w-5 h-5 accent-primary"
                    defaultChecked={isChecked}
                    onChange={(e) => removeError(e.target.name)}
                  />
                  <span>{capitalizeSentences(variant.name)}</span>
                </label>
              )
            })}
          </FormItem>

          {/* Status */}
          <FormItem
            labelText="Job search status"
            className="gap-1"
            error={errors.status}
          >
            {HH_FIELDS_DICT.job_search_statuses_employer.map((status) => {
              const isChecked = (defaultValues?.status || []).includes(status.id as THhStatus)
              return (
                <label
                  key={status.id}
                  className="flex items-center gap-2"
                >
                  <Input
                    type="checkbox"
                    // name="status[]"
                    value={status.id}
                    className="inline w-5 h-5 accent-primary shrink-0"
                    onChange={(e) => removeError(e.target.name)}
                    defaultChecked={isChecked}
                  />
                  <span>{capitalizeSentences(status.name)}</span>
                </label>
              )
            })}
          </FormItem>

          {/* Salary */}
          <FormItem
            labelText="Salary"
            className=""
            error={errors.salary}
          >
            <Input
              placeholder="Salary"
              name="salary"
              pattern="[0-9]+"
              title="Enter numbers only"
              defaultValue={defaultValues?.salary}
            />
          </FormItem>
          {/* Employment */}

          <FormItem
            labelText="Employment type"
            className="gap-1"
            error={errors.employment}
          >
            {HH_FIELDS_DICT.employment.map((variant) => {
              const isChecked = (defaultValues?.employment || []).includes(variant.id as THhEmployment)
              return (
                <label
                  key={variant.id}
                  className="flex items-center gap-2"
                >
                  <Input
                    type="checkbox"
                    name="employment[]"
                    value={variant.id}
                    className="inline w-5 h-5 accent-primary"
                    onChange={(e) => removeError(e.target.name)}
                    defaultChecked={isChecked}
                  />
                  <span>{capitalizeSentences(variant.name)}</span>
                </label>
              )
            })}
          </FormItem>


          {/* Search period in days */}
          <FormItem
            labelText="Consider resumes from the last {X} days"
            className=""
            error={errors.search_period}
          >
            <Input
              placeholder="Number of days"
              title="Введите только цифры"
              pattern="[0-9]+"
              name="search_period"
              defaultValue={defaultValues?.search_period}
              onChange={(e) => removeError(e.target.name)}
            />
          </FormItem>
        </div>

        <Scrollbar />
      </ScrollArea>


      <div className={cn("absolute left-0 right-0 bottom-0 ", "px-12 py-2.5 bg-white shadow-[0px_-2px_3px_-2px_rgba(0,_0,_0,_0.35)] flex justify-end gap-4")}>
        <Button type="button" variant="ghost" className="mr-2" onClick={() => formRef?.current?.reset()}>
          Reset
        </Button>
        <Button type="submit">
          {pending ? 'Processing...' : 'Search'}

        </Button>
      </div>
    </form>
  );
}