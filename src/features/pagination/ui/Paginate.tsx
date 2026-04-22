'use client'

import { DEFAULT_PER_PAGE } from "@/shared/api/constants";
import { updateQueryString } from "@/shared/lib/updateQueryString";
import { cn } from "@/shared/lib/utils";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shared/ui/shadcn/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


interface IPaginateProps {
  currentPage: number,
  totalItems: number | null,
  itemsPerPage?: number,
  className?: string
  paginationButtonStyles?: string
}


export const Paginate = ({ currentPage, totalItems, itemsPerPage = DEFAULT_PER_PAGE, className, paginationButtonStyles }: IPaginateProps) => {
  const searchParams = useSearchParams()
  const pagesCount = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1

  //find prev and next pages
  const prev = Math.max(currentPage - 1, 1)
  const next = Math.min(currentPage + 1, pagesCount)

  //Show two pages on each side of the current button.
  const visibleBtnsCount = 2;
  const leftVisible = Math.max(currentPage - visibleBtnsCount, 1)
  const rightVisible = Math.min(currentPage + visibleBtnsCount, pagesCount)



  const getHref = (pageNum: number): string => {
    return pageNum === 1
      ? `${searchParams ? updateQueryString(searchParams, { 'page': '' }) : ''}`
      : `${searchParams ? updateQueryString(searchParams, { 'page': String(pageNum) }) : ''}`
  }

  if (pagesCount === 1) {
    return null
  }
  return (
    <Suspense>
      <Pagination className={className}>
        <PaginationContent>
          <PaginationItem>
            <Link href={`?${getHref(prev)}`}>
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
              }
              <PaginationPrevious className="[&_span]:hidden" />
            </Link>
          </PaginationItem>
          {
            leftVisible > 1
            && <PaginationItem className="hidden sm:block">
              <PaginationEllipsis />
            </PaginationItem>
          }
          {Array.from({ length: rightVisible - leftVisible + 1 }, (_, i) => {
            const pageNum = i + leftVisible
            const isActive = currentPage === pageNum
            return (
              <PaginationItem key={pageNum}>
                <Link href={`?${getHref(pageNum)}`}>
                  {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
                  }
                  <PaginationLink
                    isActive={isActive}
                    className={cn('border-2', isActive ? 'border-ring' : ' border-accent2/10', paginationButtonStyles)}
                  >
                    {pageNum}
                  </PaginationLink>
                </Link>
              </PaginationItem>
            );
          })}
          {
            rightVisible < pagesCount
            && <PaginationItem className="hidden sm:block">
              <PaginationEllipsis />
            </PaginationItem>
          }
          <PaginationItem>
            <Link href={`?${getHref(next)}`}>
              <PaginationNext className="[&_span]:hidden" />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Suspense>
  );
}
