'use client'

import { cn } from "@/lib/utils";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import Link from "next/link";
import { COMPANIES_PER_PAGE } from "@/actions/constants";
import { useSearchParams } from "next/navigation";
import { updateQueryString } from "@/shared/helpers/updateQueryString";
import { Suspense } from "react";

interface IPaginateProps {
  currentPage: number,
  totalItems: number | null,
  itemsPerPage?: number,
  className?: string
}
const Paginate = ({ currentPage, totalItems, itemsPerPage = COMPANIES_PER_PAGE, className }: IPaginateProps) => {
  const searchParams = useSearchParams()
  const pagesCount = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1
  let prev = currentPage - 1
  let next = currentPage + 1;
  if (prev < 1) prev = 1
  if (next > pagesCount) next -= 1

  const getHref = (pageNum: number): string => {
    return pageNum === 1 ? `${updateQueryString(searchParams, 'page')}` : `${updateQueryString(searchParams, 'page', pageNum)}`
  }

  if (pagesCount === 1) {
    return null
  }
  return (
    <Suspense>
      <Pagination className={className}>
        <PaginationContent>
          <PaginationItem>
            <Link href={`?${getHref(prev)}`} passHref legacyBehavior>
              <PaginationPrevious className="[&_span]:hidden" />
            </Link>
          </PaginationItem>
          {Array.from({ length: pagesCount }, (_, i) => {
            const pageNum = i + 1
            const isActive = currentPage === pageNum
            return (<PaginationItem key={pageNum}>
              <Link href={`?${getHref(pageNum)}`} passHref legacyBehavior >
                <PaginationLink
                  isActive={isActive}
                  className={cn(isActive ? 'border-primary' : 'border')}
                >
                  {pageNum}
                </PaginationLink>
              </Link>
            </PaginationItem>)
          })}
          <PaginationItem>
            <Link href={`?${getHref(next)}`} passHref legacyBehavior>
              <PaginationNext className="[&_span]:hidden" />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Suspense>
  );
}

export default Paginate