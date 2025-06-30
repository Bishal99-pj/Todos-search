import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { StatusFilter } from '@/types';

type SearchBarProps = {
  onSearch: (value: string) => void;
  filter: StatusFilter;
  onFilterChange: (value: StatusFilter) => void;
};

export default function Search({ onSearch, filter, onFilterChange }: SearchBarProps) {
  return (
    <div className="p-4 flex items-center justify-between space-x-2.5">
      <Input
        placeholder="Search through tasks by title or id..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full"
      />
      <Select value={filter} onValueChange={(val: StatusFilter) => onFilterChange(val)} key={filter}>
        <SelectTrigger className="w-[180px] cursor-pointer bg-amber-50">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
