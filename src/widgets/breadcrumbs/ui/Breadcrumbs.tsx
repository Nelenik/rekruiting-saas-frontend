'use client'
import Link from "next/link";
import React from "react";
import useBreadcrumbs from "../model/useBreadcrumbs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/shared/ui/shadcn/breadcrumb";
import { cn } from "@/shared/lib/utils";
import { useTenat } from "@/shared/providers/TenatProvider";

type TProps = {
  className?: string
}

export const Breadcrumbs = ({ className }: TProps) => {
  const { tenat } = useTenat()
  const breadcrumbPaths = useBreadcrumbs(tenat)
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="gap-2 sm:gap-2">
        {breadcrumbPaths.map(({ href, label, isLink }, i) => (
          (
            <React.Fragment key={i}>

              <BreadcrumbItem className="">
                {
                  !isLink ?
                    label
                    : <Link
                      href={`${href}`}
                      className={cn(
                        (i === breadcrumbPaths.length - 1) && 'pointer-events-none ',
                        'text-ellipsis whitespace-nowrap overflow-hidden max-w-44')}
                    >
                      {label}
                    </Link>
                }


              </BreadcrumbItem>
              {i !== breadcrumbPaths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
