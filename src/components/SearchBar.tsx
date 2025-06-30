import { Input } from '@/components/ui/input';

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};

export default function Search({ query, setQuery }: SearchBarProps) {
  return (
    <div className="p-4">
      <Input
        placeholder="Search through tasks by title or id..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
    </div>
  );
}