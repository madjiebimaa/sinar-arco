'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

interface UserTablePaginationProps {
  totalPages: number;
}

export default function UserTablePagination({
  totalPages,
}: UserTablePaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    totalPages > 1 && (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationArrow
              href={createPageURL(page - 1)}
              type="previous"
              isDisable={page <= 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(0, totalPages > 3 ? 3 : totalPages)
            .map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={createPageURL(pageNumber)}
                  scroll={false}
                  isActive={page === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
          {totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationArrow
              href={createPageURL(page + 1)}
              type="next"
              isDisable={page >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}

interface PaginationArrowProps {
  href: string;
  type: 'previous' | 'next';
  isDisable: boolean;
}

function PaginationArrow({ href, type, isDisable }: PaginationArrowProps) {
  const Comp = type === 'previous' ? PaginationPrevious : PaginationNext;

  return isDisable ? (
    <Button variant="ghost" disabled={true} className="h-fit w-fit p-0">
      <Comp href={href} scroll={false} />
    </Button>
  ) : (
    <Comp href={href} scroll={false} />
  );
}
