import type { Todo } from "@/types";
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleCheckBig, Clock } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useState } from 'react';

type ListProps = {
  todos: Todo[];
};

const ITEMS_PER_PAGE = 10;
const MAX_PAGE_BUTTONS = 5;

export default function TodoList({ todos }: ListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentTodos = todos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const half = Math.floor(MAX_PAGE_BUTTONS / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    if (start === 1) {
      end = Math.min(totalPages, MAX_PAGE_BUTTONS);
    }
    if (end === totalPages) {
      start = Math.max(1, totalPages - MAX_PAGE_BUTTONS + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();
  const showLeftEllipsis = pageNumbers[0]! > 2;
  const showRightEllipsis = pageNumbers[pageNumbers.length - 1]! < totalPages - 1;

  return (
    <div className="p-4 space-y-4">
      {currentTodos.map((todo) => (
        <Card key={todo.id} className="p-4 space-y-2 text-left">
          <div className="flex items-center justify-between">
            <p><strong>ID:</strong> {todo.id}</p>
            <Badge
              variant={todo.completed ? 'default' : 'destructive'}
              className={`flex items-center gap-1 ${todo.completed ? 'bg-green-600' : ''}`}
            >
              {todo.completed ? <CircleCheckBig strokeWidth={3} /> : <Clock strokeWidth={3} />}
              {todo.completed ? 'Completed' : 'Pending'}
            </Badge>
          </div>
          <p><strong>Title:</strong> {todo.title}</p>
        </Card>
      ))}

      <Pagination>
        <PaginationContent className="justify-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              aria-disabled={page === 1}
              className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {pageNumbers[0]! > 1 && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {showLeftEllipsis && <PaginationItem><PaginationEllipsis /></PaginationItem>}

          {pageNumbers.map((num) => (
            <PaginationItem key={num}>
              <PaginationLink
                href="#"
                onClick={() => setPage(num)}
                isActive={num === page}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showRightEllipsis && <PaginationItem><PaginationEllipsis /></PaginationItem>}
          {pageNumbers[pageNumbers.length - 1]! < totalPages && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              aria-disabled={page === totalPages}
              className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
