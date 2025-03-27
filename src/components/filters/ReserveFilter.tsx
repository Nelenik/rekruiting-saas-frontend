'use client'
import { FilterX } from "lucide-react";
import FormItem from "../app_forms/form_elmts/FormItem";
import CancelButton from "../buttons/CancelButton";
import PositionSelect from "../shared/PositionSelect";
import { Button } from "../ui/button";
import Filters from "./filters_elmts/Filters";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const defaultState = {
  position: '',
  salary_from: '',
  salary_to: '',
  location: ''
}

const ReserveFilter = () => {

  return (
    <Filters
      className="flex flex-col gap-6"
      render={({ filters, updateFilter }) => {
        return (
          <>
            <div className="flex flex-wrap @3xl:flex-col gap-6">
              <FormItem labelText="Специализация">
                <CancelButton
                  onClick={() => updateFilter({ position: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <PositionSelect
                  value={filters.position || ''}
                  onValueChange={(value: string) => updateFilter({ 'position': value })}
                  className="bg-white"
                />
              </FormItem>

              <FormItem labelText="Зарплата от">
                <CancelButton
                  onClick={() => updateFilter({ salary_from: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <Input
                  value={filters.salary_from || ''}
                  onChange={(e) => {
                    updateFilter({ salary_from: e.target.value })
                  }}
                  placeholder="Зарплата от"
                />
              </FormItem>

              <FormItem labelText="Зарплата до">
                <CancelButton
                  onClick={() => updateFilter({ salary_to: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <Input
                  value={filters.salary_to || ''}
                  onChange={(e) => updateFilter({ salary_to: e.target.value })}
                  placeholder="Зарплата до"
                />
              </FormItem>

              <FormItem labelText="География">
                <CancelButton
                  onClick={() => updateFilter({ location: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <Input
                  value={filters.location || ''}
                  onChange={(e) => updateFilter({ location: e.target.value })}
                  placeholder="География"

                  className=""
                />
              </FormItem>
            </div>

            <Button
              onClick={() => {
                updateFilter(defaultState)
              }}
              variant={'outline'}
              className={cn(
                'self-end ring-2 ring-input ring-offset-1 border-none',
                "hover:bg-input @3xl:self-stretch"
              )}
            >
              <FilterX /> Сбросить
            </Button>
          </>

        )
      }}
    />
  )
}

export default ReserveFilter;

// const ReserveFilter = () => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const handleResetAll = useCallback(() => {
//     router.push(pathname)
//   }, [pathname, router])
//   return (
//     <div className="flex flex-wrap @3xl:flex-col gap-6">
//       <FilterField
//         enableResetField
//         paramName="position"
//         render={({ value, onValueChange }) => (
//           <FormItem labelText="Специализация">
//             <PositionSelect
//               value={value}
//               onValueChange={onValueChange}
//               className="bg-white"
//             />
//           </FormItem>
//         )} />

//       <FilterField
//         enableResetField
//         paramName="salary_from"
//         render={({ value, onValueChange }) => (
//           <FormItem labelText="Зарплата от">
//             <Input
//               value={value}
//               onChange={(e) => onValueChange?.(e.target.value)}
//               placeholder="Зарплата от"

//               className=""
//             />
//           </FormItem>
//         )} />

//       <FilterField
//         enableResetField
//         paramName="salary_to"
//         render={({ value, onValueChange }) => (
//           <FormItem labelText="Зарплата до">
//             <Input
//               value={value}
//               onChange={(e) => onValueChange?.(e.target.value)}
//               placeholder="Зарплата до"

//               className=""
//             />
//           </FormItem>
//         )} />

//       <FilterField
//         enableResetField
//         paramName="location"
//         render={({ value, onValueChange }) => (
//           <FormItem labelText="География">
//             <Input
//               value={value}
//               onChange={(e) => onValueChange?.(e.target.value)}
//               placeholder="География"

//               className=""
//             />
//           </FormItem>
//         )} />
//       <Button
//         onClick={handleResetAll}
//         variant={'ghost'}
//         className="hover:bg-input"
//       >
//         <FilterX /> Сбросить все
//       </Button>
//     </div>
//   );
// }

// export default ReserveFilter;