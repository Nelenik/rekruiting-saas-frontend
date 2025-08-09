import Link from 'next/link'
import SadNotFoundSvg from '@/assets/sad_404.svg'
import { Button } from '@/shared/ui/shadcn/button'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center gap-8 py-20'>
      <Image
        width="937"
        height={668}
        src={SadNotFoundSvg}
        alt='Sad cat'
        className='w-1/2'
        priority
      />

      <Button asChild >
        <Link href="/vacancies">На главную</Link>
      </Button>
    </div>
  )
}