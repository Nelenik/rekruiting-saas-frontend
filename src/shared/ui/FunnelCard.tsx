import { FC, ReactNode } from 'react';
import SpinnerOne from '@/assets/icons/spinner1.svg?rc'
import { cn } from '@/shared/lib/utils';
import { Card, CardDescription, CardTitle } from './shadcn/card';



type TProps = {
  name: string;
  count: number;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
  color?: string
};

export const FunnelCard: FC<TProps> = ({ color, className, children, name, count, isLoading = false }) => {
  return (
    <Card
      className={cn("w-full  py-4 px-6 flex flex-col items-center", className)}
      style={{ borderColor: color ? `${color}59` : '#ffffff', borderWidth: 2 }}
    >
      {children}
      <CardTitle className="mb text-lg lg:text-2xl">{name}</CardTitle>
      {
        isLoading
          ? <SpinnerOne className='fill-primary/10' />
          : <CardDescription>{count}</CardDescription>
      }

    </Card>
  );
};


