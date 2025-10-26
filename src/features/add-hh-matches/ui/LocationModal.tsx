'use client'

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/shadcn/dialog";
import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getAreas, searchAreasByName } from "../api/areasActions";
import { Area } from "../api/getAreasCached";
import { Input } from "@/shared/ui/shadcn/input";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import type { ChangeEvent } from "react";
import { MapPinPlus } from "lucide-react";
import { wait } from "@/shared/lib/wait";
import SpinnerBulletSvg from '@/assets/icons/spinner1.svg?rc'

type TProps = {
  className?: string,
  selectedLocations: Area[],
  updateSelectedLocations: Dispatch<SetStateAction<Area[]>>
}
export const LocationModal = ({
  className,
  selectedLocations,
  updateSelectedLocations,
}: TProps) => {

  const [open, setOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')

  const [parentId, setParentId] = useState<(string)[]>([])

  //Set parent ids with default selected locations or when selected locations change
  useEffect(() => {
    const parentIds = selectedLocations.filter(location => location.areas?.length).map(location => location.id)
    setParentId(parentIds)
  }, [selectedLocations])

  // Get areas data based on paren ids (2 level only depth, cities can be received using search input if needed)
  const { data: areaQueries, isPending } = useQueries({
    queries: parentId.length ? parentId.map(id => ({
      queryKey: ['areas-by-parentid', id],
      queryFn: () => getAreas(id),
    })) : [
      {
        queryKey: ['root-areas'],
        queryFn: () => getAreas(null),
      }
    ],
    combine: (results) => {
      return {
        data: results.flatMap((result) => result.data || []),
        isPending: results.some((result) => result.isPending),
      }
    },

  });

  // Get areas based on search text
  const { data: searchAreas, isFetching } = useQuery({
    queryKey: ['search-areas', searchText],
    queryFn: () => searchAreasByName(searchText),
    enabled: searchText.length >= 3
  })

  // Handle checkbox change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked
    const processedArea = [...selectedLocations, ...(searchText ? searchList : actualList)].find(area => area.id === e.target.value)

    if (!processedArea) return;
    wait(150).then(() => {
      if (isChecked) {
        updateSelectedLocations(prev => [...prev, processedArea])
      } else {
        updateSelectedLocations(prev => prev.filter(area => area.id !== processedArea.id))
      }
    })
  }

  const handleReset = () => {
    updateSelectedLocations([])
  }

  // Areas list calculated from queries excluding already selected locations
  const actualList = useMemo(() => (areaQueries || []).filter(area => !selectedLocations.some(selected => selected.id === area.id)), [areaQueries, selectedLocations])

  const searchList = useMemo(() => (searchAreas || []).filter(area => !selectedLocations.some(selected => selected.id === area.id)), [searchAreas, selectedLocations])

  //Visible list based on search or on actual list
  const visibleList = searchText ? searchList : actualList

  //Trigger text based on selected locations names
  const triggerText = selectedLocations.length ? selectedLocations.reduce((acc, item) => {
    return acc ? acc + ', ' + item.name : item.name
  }, '') : 'Все регионы'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn('flex gap-3 items-center w-full justify-start [&_svg]:size-6', className)}
        >
          <MapPinPlus />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        overlayStyles="bg-transparent"
        className="flex flex-col h-[82vh] rounded-4xl bg-card pb-16"
      >
        <DialogTitle className="text-2xl ">
          Где искать
        </DialogTitle>

        {/* Search field */}
        <Input
          placeholder="Страна, регион, город"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <ScrollArea className="grow pr-4 " type="auto">
          <div className="flex flex-col gap-3 py-2">
            {selectedLocations.map(location => (
              <label
                key={location.id}
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer has-[:checked]:border-primary"
              >
                <Input
                  type="checkbox"
                  value={location.id}
                  className="inline w-5 h-5 accent-primary"
                  onChange={handleChange}
                  defaultChecked={true}
                />
                <span>{capitalizeSentences(location.name)}</span>
              </label>)
            )}
            {isPending || isFetching
              ? <div>
                <SpinnerBulletSvg
                  className="mx-auto fill-primary"
                />
              </div>
              : visibleList.map(location => (
                <label
                  key={location.id}
                  className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer has-[:checked]:border-primary"
                >
                  <Input
                    type="checkbox"
                    value={location.id}
                    className="inline w-5 h-5 accent-primary"
                    onChange={handleChange}
                  />
                  <span>{capitalizeSentences(location.name)}</span>
                </label>
              ))}
          </div>
          <ScrollBar />
        </ScrollArea>

        <div className={cn("absolute left-0 right-0 bottom-0 ", "px-10 py-2.5 bg-white shadow-[0px_-2px_3px_-2px_rgba(0,_0,_0,_0.35)] flex justify-end gap-4")}>
          <Button
            type="button"
            variant="outline"
            // className="mr-2"
            onClick={handleReset}
          >
            Сбросить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}