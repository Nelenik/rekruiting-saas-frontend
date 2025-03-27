import SpinnerOne from '@/assets/icons/spinner2.svg?rc'

const Loader = () => {
  return (
    <div className='w-full h-full flex items-center justify-center p-4 '>
      <SpinnerOne className='text-primary' />
    </div>
  );
}

export default Loader;