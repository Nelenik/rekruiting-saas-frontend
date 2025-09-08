'use client'

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { Command, CommandItem, CommandList } from "../shadcn/command"
import { Popover, PopoverAnchor, PopoverContent } from "../shadcn/popover"
import { Input } from "../shadcn/input"
import { cn } from "@/shared/lib/utils"
import { Badge } from "../shadcn/badge"

/**
 * useTagSelect hook
 *
 * Encapsulates the state and behavior for the TagSelect component:
 * - Manages tags, suggestions, active index, input value, and popover state.
 * - Provides handlers for input change, keyboard navigation, selection, and tag removal.
 *
 * @param {string[]} defaultValue - Initial tags.
 * @param {string[]} suggestionsList - Base list of suggestions for filtering.
 *
 * @returns {object} An object containing state and handlers for TagSelect.
 */
function useTagSelect(defaultValue: string[], suggestionsList: string[]) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState(suggestionsList)
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState<string[]>(defaultValue)

  const delayRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  //manage input value change
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
    if (delayRef.current) clearTimeout(delayRef.current)

    delayRef.current = setTimeout(() => {
      const filtered = suggestionsList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )

      setSuggestions(filtered)
      setActiveIndex(0)
      setOpen(value.trim().length > 0 && filtered.length > 0)
    }, 300)

  }

  //clear timer on unmount
  useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current)
    }
  }, [])

  //manage navigation in content using arrows
  const handleKeyDown = (e: KeyboardEvent) => {
    if (open) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => {
          if (i === null) return 0
          return (i + 1) % suggestions.length;
        })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => ((i !== null ? i : 0) - 1 + suggestions.length) % suggestions.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (activeIndex !== null) {
          handleSelect(suggestions[activeIndex])
        }
      }
    } else {
      if (e.key === "Enter") {
        e.preventDefault()
        updateTags(inputValue)
      }
    }
  }
  //manage select from autocomplete popover
  const handleSelect = (value: string) => {
    updateTags(value)
    // setInputValue(value)
    setOpen(false)
    setActiveIndex(null)
  }

  const updateTags = (value: string) => {
    console.log('udate tags')
    //split skills by comma or line breaks
    const newSkills = value
      .split(/,|\n/)
      .map((skill) => skill.trim())
      .filter(Boolean)

    if (newSkills.length > 0) {
      const result = [...new Set([...tags, ...newSkills])];
      setTags(result)
    }
    setInputValue('')
  }

  const removeTag = (skillToDel: string) => {
    const tagsSet = new Set(tags)
    tagsSet.delete(skillToDel)
    setTags([...tagsSet])
  }

  return {
    tags,
    suggestions,
    inputValue,
    open,
    setOpen,
    activeIndex,
    inputRef,
    handleKeyDown,
    handleSelect,
    handleChange,
    removeTag,
    setActiveIndex
  }
}


type TProps = {
  name?: string;
  defaultValue?: string[];
  suggestionsList?: string[]

}
/**
 * TagSelect Component
 *
 * A controlled multi-select input with autocomplete suggestions.
 * Users can type in skills (or any text), select suggestions from a popover,
 * and manage their selection as removable tags. The component integrates
 * with forms by rendering hidden inputs for each selected tag.
 *
 * @component
 * @example
 * ```tsx
 * <form>
 *   <TagSelect
 *     name="skills[]"
 *     defaultValue={["React", "Next.js"]}
 *     suggestionsList={["React", "Next.js", "Vue", "Angular"]}
 *   />
 *   <button type="submit">Submit</button>
 * </form>
 * ```
 *
 * @prop {string} [name] - The name attribute for hidden inputs, useful when submitting in a form.
 * @prop {string[]} [defaultValue=[]] - Initial tags to prepopulate the component with.
 * @prop {string[]} [suggestionsList=[]] - A list of available suggestions for autocomplete.
 *
 * @remarks
 * - Tags can be added by selecting from suggestions or by typing and pressing Enter.
 * - Tags can be removed by clicking on them.
 * - The component uses a popover with keyboard navigation (ArrowUp, ArrowDown, Enter).
 *
 * @returns {JSX.Element} The rendered TagSelect component.
 */
export const TagSelect = ({ name, defaultValue = [], suggestionsList = [] }: TProps) => {
  const {
    tags,
    suggestions,
    inputValue,
    open,
    setOpen,
    activeIndex,
    inputRef,
    handleKeyDown,
    handleSelect,
    handleChange,
    removeTag,
    setActiveIndex
  } = useTagSelect(defaultValue, suggestionsList);

  return (
    <div className={cn("flex flex-col", tags.length && ' gap-4')}>
      <div className="flex gap-2 flex-wrap">
        {tags.map(item => (
          <Badge
            key={item}
            onClick={() => removeTag(item)}
            className=" w-max py-1 px-3 cursor-pointer"
            role="button"
          >
            {item}
            <Input
              type="hidden"
              value={item}
              name={name}
              aria-hidden="true"
              tabIndex={-1}
            />
          </Badge>

        ))}
      </div>
      <Popover open={open} onOpenChange={(state) => { if (!state) setActiveIndex(null) }}>
        <PopoverAnchor asChild>
          <Input
            placeholder="Next.js, React, Vue"
            ref={inputRef}
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            id="skillsInput"
            value={inputValue}
            autoComplete="off"
          />
        </PopoverAnchor>

        <PopoverContent
          className="w-full p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onEscapeKeyDown={() => { setOpen(false) }}
          onPointerDownOutside={() => { setOpen(false) }}
        >
          <Command shouldFilter={false}>
            <CommandList>
              {suggestions.map((item, idx) => (
                <CommandItem
                  key={item}
                  value={item}
                  className={idx === activeIndex ? "bg-accent text-accent-foreground" : ""}
                  onSelect={(value) => {
                    handleSelect(value)
                    inputRef.current?.focus()
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}