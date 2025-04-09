'use client'
import Link from "next/link";
import React from "react";
import useBreadcrumbs from "../model/useBreadcrumbs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/shared/ui/shadcn/breadcrumb";
import { cn } from "@/shared/lib/utils";


export const Breadcrumbs = () => {
  const breadcrumbPaths = useBreadcrumbs()
  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-2 sm:gap-2">
        {breadcrumbPaths.map(({ href, label }, i) => (
          (
            <React.Fragment key={i}>

              <BreadcrumbItem >
                {
                  i == 1 ?
                    label
                    : <Link
                      href={`${href}`}
                      className={cn((i === breadcrumbPaths.length - 1) && 'pointer-events-none')}
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
