"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IMoviePaginationProps {
  currentPage: number;
}

export default function MoviePagination({
  currentPage,
}: IMoviePaginationProps): JSX.Element {
  const isAtEnd = currentPage >= 498;
  const isAtStart = currentPage <= 1;

  return (
    <Pagination className="mb-10 w-min">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/?page=${isAtStart ? currentPage : currentPage - 1}`}
          />
        </PaginationItem>
        {isAtEnd && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {[...Array(3)].map((_, index) => {
          const pageNumber = currentPage + index - 1;
          if (pageNumber < 1 || pageNumber > 500) return null;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`/?page=${pageNumber}`}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {!isAtEnd && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={`/?page=${currentPage === 500 ? currentPage : currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
