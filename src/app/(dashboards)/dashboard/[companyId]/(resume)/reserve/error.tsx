'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function Error(
  {
    error,
  }: {
    error: Error & { digest?: string }
  }
) {
  const pathname = usePathname();
  console.log(error)
  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <Button
        onClick={() => window.location.href = pathname}
      >
        Вернуться
      </Button>
    </div>
  )
}