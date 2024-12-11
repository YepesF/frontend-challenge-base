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
import useParams from "@/hooks/useParams";

interface IMoviePaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function MoviePagination({
  currentPage,
  totalPages,
}: IMoviePaginationProps): JSX.Element {
  const { getParam } = useParams();
  const query = getParam("query");
  const maxPages = Math.min(totalPages, 500);
  const isAtStart = currentPage <= 1;
  const isAtEnd = currentPage >= maxPages;

  const renderPageLinks = (): JSX.Element | JSX.Element[] => {
    if (maxPages <= 3) {
      return [...Array(maxPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={
                query
                  ? `/?query=${query}&page=${pageNumber}`
                  : `/?page=${pageNumber}`
              }
              isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        );
      });
    }

    return (
      <>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {[...Array(3)].map((_, index) => {
          const pageNumber = currentPage + index - 1;
          if (pageNumber < 1 || pageNumber > maxPages) return null;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={
                  query
                    ? `/?query=${query}&page=${pageNumber}`
                    : `/?page=${pageNumber}`
                }
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {currentPage < maxPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
      </>
    );
  };

  return (
    <Pagination className="mb-10 w-min">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              query
                ? `/?query=${query}&page=${isAtStart ? currentPage : currentPage - 1}`
                : `/?page=${isAtStart ? currentPage : currentPage - 1}`
            }
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            href={
              query
                ? `/?query=${query}&page=${isAtEnd ? currentPage : currentPage + 1}`
                : `/?page=${isAtEnd ? currentPage : currentPage + 1}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
