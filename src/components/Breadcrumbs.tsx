'use client'

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";
import React from "react";

import HomeIcon from '@/assets/icons/home.svg?rc';


interface IBreadcumbsProps {
  name?: string
}

const Breadcrumbs = ({ name = 'Company name' }: IBreadcumbsProps) => {
  const pathname = usePathname()

  //break pathname into parts for breadcrumbs
  const splittedParts = pathname.split('/').slice(1)
  console.log(splittedParts)
  //this is href to main for profile (companies/[id], users/[id]...)
  const mainPagePart = splittedParts.slice(1, 3).join('/')
  const pathParts = [mainPagePart, ...splittedParts.slice(3)]

  //path segment mapping for breadcrumbs in russian
  const segmentMap: Record<string, string> = {
    vacancies: 'Вакансии',
    reports: 'Отчеты',
    settings: 'Настройки',
    companies: 'Компании'
  }
  return (
    <div className="bg-card p-5 rounded-md">
      <Breadcrumb>
        <BreadcrumbList className="gap-1.5 sm:gap-1.5">
          {pathParts.map((item: string, i: number) => {
            const href = `${pathParts.slice(0, i + 1).join('/')}`
            return (
              <React.Fragment key={i}>

                <BreadcrumbItem >
                  <BreadcrumbLink asChild className="inline-flex items-center gap-1">
                    <Link href={`/${href}`}>
                      {i === 0 ? <><HomeIcon width={16} height={16} /> {name}</> : segmentMap[item]}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i !== pathParts.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumbs;