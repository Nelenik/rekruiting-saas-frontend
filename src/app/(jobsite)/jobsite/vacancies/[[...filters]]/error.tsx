'use client' // Error boundaries must be Client Components
import { Button } from '@/shared/ui/shadcn/button'
import { Card } from '@/shared/ui/shadcn/card'
import { useRouter } from 'next/navigation'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string, cause?: string }
  reset: () => void
}) {
  const router = useRouter()
  return (
    <div className='w-full h-full flex flex-col items-center justify-center overflow-hidden'>
      <Card className='p-8 w-full max-w-xl flex flex-col items-center justify-center gap-10'>
        <h1 className='text-center text-xl font-semibold'>{error.message} </h1>
        <div className='flex gap-6'>

          <Button
            onClick={() => {
              const redirectTo = '/'
              // Attempt to recover by navigating to the root page
              router.push(redirectTo)
            }}
          >
            Вернуться на главную
          </Button>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Попробовать снова
          </Button>

        </div>
      </Card>
    </div>
  )
}