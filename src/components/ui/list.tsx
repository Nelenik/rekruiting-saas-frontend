import { cn } from "@/lib/utils";

interface IListProps {
  children: React.ReactNode,
  className?: string,
  [key: string]: unknown
}

const List = ({ children, className, ...props }: IListProps) => {
  return (
    <ul className={cn('m-0 p-0 list-none', className)} {...props}>
      {children}
    </ul>
  );
}

export default List;