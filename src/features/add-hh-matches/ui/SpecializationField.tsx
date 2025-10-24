'use client'

import { TCheckboxItem, TStaticCheckboxItem } from "@/shared/ui/form-elements/multilevel-checkbox"
import { useMemo, useState } from "react"
import { SpecializationModal } from "./SpecializationModal"
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence"
import { Input } from "@/shared/ui/shadcn/input"
import { useQuery } from "@tanstack/react-query"
import { getSpecialization } from "../api/getSpecialization"

/**
 * A predefined list of initial, static checkboxes.
 * These are displayed if the user has not yet selected any specializations.
 * They act as uncontrolled inputs inside the form.
 */
const initCheckboxes = [
  {
    id: "160",
    label: "DevOps-инженер",
  },
  {
    id: "10",
    label: "Аналитик",
  },
  {
    id: "25",
    label: "Гейм-дизайнер",
  },
  {
    id: "165",
    label: "Дата-сайентист",
  },
  {
    id: "73",
    label: "Менеджер продукта",
  },
  {
    id: "96",
    label: "Программист, разработчик",
  },
  {
    id: "124",
    label: "Тестировщик",
  },
]
/**
 * Recursively flattens a tree of specialization items into a Map for O(1) lookup by ID.
 * 
 * @param items - Hierarchical list of specialization checkbox items.
 * @returns A Map where each key is the specialization ID and value is the full item object.
 */
const flattenToMap = (items: TStaticCheckboxItem[]) => {
  const map: Map<string, TStaticCheckboxItem> = new Map()
  const traverse = (nodes: TStaticCheckboxItem[]) => {
    nodes.forEach(node => {
      if (!node.children) {
        map.set(node.id, node)
        return
      }
      traverse(node.children || [])
    })
  }
  traverse(items)
  return map
}

/**
 * Extracts the full item objects from a map by their selected IDs.
 * 
 * @param selectedIds - The list of selected item IDs.
 * @param map - A flattened map of all specialization items.
 * @returns An array of items corresponding to the provided IDs.
 */
const extractSelectedItems = (selectedIds: string[], map: Map<string, TStaticCheckboxItem>): TStaticCheckboxItem[] => {
  const selectedItems: TStaticCheckboxItem[] = []
  selectedIds.forEach(id => {
    const item = map.get(id)
    if (item) {
      selectedItems.push(item)
    }
  })
  return selectedItems
}

type TProps = {
  name?: string
  /**
  * List of specialization IDs that were previously selected (e.g., from server defaults).
  * If not provided, the component will render a predefined static list of checkboxes.
  */
  defaultValues?: string[]

  /**
   * A ref to the parent form element.
   * Used to extract current checked values from uncontrolled checkboxes when opening the modal.
   */
  formRef?: React.RefObject<HTMLFormElement | null>
}

/**
 * `SpecializationField` — renders a specialization selector integrated into a form.
 *
 * - Initially, displays a **static, uncontrolled** list of popular checkboxes (`initCheckboxes`).
 * - If `defaultValues` exist, it switches to a **controlled mode** where values come from state.
 * - Includes a modal (`SpecializationModal`) for selecting specializations from a hierarchical list.
 *
 * ### Controlled vs Uncontrolled Logic
 *
 * - **Uncontrolled phase:**  
 *   The user interacts with plain checkboxes in the form. They are not managed by React state, so the component doesn’t re-render when toggled.  
 *   When the form is submitted, their values are included via the DOM’s default behavior.
 *
 * - **Transition phase (on modal open):**  
 *   When the modal opens, it uses `formRef` to read the *current checked inputs* via `FormData`.  
 *   This ensures even the uncontrolled selections are passed into the modal’s state.
 *
 * - **Controlled phase:**  
 *   After the user selects values in the modal and clicks “Save”,  
 *   the new list of selected IDs is saved into local state (`values`),  
 *   switching the component into controlled mode where selected items are rendered from React state.
 */

export const SpecializationField = ({
  defaultValues = [],
  formRef,
  name
}: TProps) => {
  const [values, setValues] = useState<string[]>(defaultValues)

  console.log('render')
  const { data = [] } = useQuery({
    queryKey: ['hh', 'specializations'],
    queryFn: getSpecialization,
  })

  const specializationMap = useMemo(() => flattenToMap(data), [data])

  const selectedItems = useMemo(() => {
    console.log('values', values)
    if (values.length) return extractSelectedItems(values, specializationMap)
    return initCheckboxes
  }, [specializationMap, values])

  // Function to extract selected IDs from the form's initial state, the component should be used within a form.
  const extractIdsFromInitialItems = () => {
    if (!formRef?.current || !name) return []
    const fd = new FormData(formRef.current)
    return fd.getAll(name).map(String)
  }

  // console.log('selectedItems', selectedItems)
  return (
    <>
      {selectedItems.map((role: TCheckboxItem) => {
        const isChecked = (values).includes(String(role.id))
        return (
          <label
            key={role.id}
            className="flex items-center gap-2"
          >
            <Input
              type="checkbox"
              name={name}
              value={role.id}
              className="inline w-5 h-5 accent-primary shrink-0"
              defaultChecked={isChecked}
            />
            <span>{capitalizeSentences(role.label)}</span>
          </label>
        )
      })}
      <SpecializationModal
        values={values}
        items={data}
        getInitialValues={extractIdsFromInitialItems}
        onSave={setValues}
      />
    </>
  );
}