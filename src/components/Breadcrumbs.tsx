'use client'

// import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";
import React from "react";

// import HomeIcon from '@/assets/icons/home.svg?rc';
import useBreadcrumbs from "@/hooks/useBreadcrumbs";


// const Breadcrumbs = () => {
//   const pathname = usePathname()

//   //break pathname into parts for breadcrumbs
//   const splittedParts = pathname.split('/').slice(1)

//   //path segment mapping for breadcrumbs in russian
//   const segmentMap: Record<string, string> = {
//     resume: 'Резюме',
//     vacancies: 'Вакансии',
//     reports: 'Отчеты',
//     settings: 'Настройки',
//   }
//   //define link inner
//   const defineLinkInner = (item: string) => {
//     const decodedItem = decodeURIComponent(item)
//     if (decodedItem === 'dashboard') {
//       return <HomeIcon width={16} height={16} className="-translate-y-0.5" />
//     } else if (segmentMap.hasOwnProperty(decodedItem)) {
//       return segmentMap[decodedItem]
//     } else {
//       return decodedItem
//     }
//   }
//   return (
//     <div className="bg-card p-5 rounded-md">
//       <Breadcrumb>
//         <BreadcrumbList className="gap-1.5 sm:gap-1.5">
//           {splittedParts.map((item: string, i: number) => {
//             const href = `${splittedParts.slice(0, i + 1).join('/')}`
//             return (
//               <React.Fragment key={i}>

//                 <BreadcrumbItem >
//                   <BreadcrumbLink asChild className="inline-flex items-center gap-1">
//                     <Link href={`/${href}`}>
//                       {defineLinkInner(item)}
//                     </Link>
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 {i !== splittedParts.length - 1 && <BreadcrumbSeparator />}
//               </React.Fragment>
//             )
//           })}
//         </BreadcrumbList>
//       </Breadcrumb>
//     </div>
//   );
// }

// export default Breadcrumbs;

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