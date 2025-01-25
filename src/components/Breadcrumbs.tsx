'use client'

// import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";
import React from "react";

// import HomeIcon from '@/assets/icons/home.svg?rc';
import useBreadcrumbs from "@/hooks/useBreadcrumbs";

const Breadcrumbs = () => {
  const breadcrumbPaths = useBreadcrumbs()
  return (
    <div className="bg-card p-5 rounded-md">
      <Breadcrumb>
        <BreadcrumbList className="gap-1.5 sm:gap-1.5">
          {breadcrumbPaths.map(({ href, label }, i) => (
            (
              <React.Fragment key={i}>

                <BreadcrumbItem >
                  <BreadcrumbLink asChild className="inline-flex items-center gap-1">
                    <Link href={`${href}`}>
                      {label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i !== breadcrumbPaths.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumbs;