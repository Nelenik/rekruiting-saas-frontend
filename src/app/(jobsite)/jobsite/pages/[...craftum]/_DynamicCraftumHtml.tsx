'use client'

import { useEffect, useRef } from "react"

type TProps = {
  html: string
}
export const DynamicCraftumHtml = ({ html }: TProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = html
    }
  }, [html])

  return <div ref={ref} data-blocks-wrapper />
}