import StartupSvg from '@/assets/startup.svg?rc';

export const NothingYet = () => {
  return (
    <div
      className='flex flex-col items-center justify center gap-20'
    >
      <StartupSvg
        className='w-[50%]'
      />
      <div>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          Здесь пока ничего нет
        </h2>
        <p className='text-muted-foreground text-center'>
          Но мы скоро что-то придумаем!
        </p>
      </div>
    </div>
  );
}