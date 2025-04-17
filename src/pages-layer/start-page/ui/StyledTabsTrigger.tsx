import { cn } from "@/shared/lib/utils";
import { TabsTrigger, TabsTriggerProps } from "@radix-ui/react-tabs";

type Props = TabsTriggerProps
export const StyledTabsTrigger = ({
  value, children, className, ...props
}: Props) => {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "data-[state=active]:bg-gradient-to-tr data-[state=active]:from-blue-900 data-[state=active]:from-0% data-[state=active]:via-blue-700 data-[state=active]:via-50% data-[state=active]:to-blue-400 data-[state=active]:to-100% data-[state=active]:rounded-full data-[state=active]:text-white py-2", className
      )}
      {...props}
    >
      {children}
    </TabsTrigger>
  );
}