import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import './App.css';
import Search from '@/components/SearchBar';
import TodoList from '@/components/TodoList';
import type { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data: Todo[] = await res.json();
      setTodos(data);
      setFilteredTodos(data);
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const fuse = new Fuse<Todo>(todos, {
      keys: ['title', 'id'],
      threshold: 0.3,
    });

    if (query.trim() === '') {
      setFilteredTodos(todos);
    } else {
      const results = fuse.search(query);
      setFilteredTodos(results.map((res) => res.item));
    }
  }, [query, todos]);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Search query={query} setQuery={setQuery} />
      <TodoList todos={filteredTodos} />
    </div>
  );
}

export default App;
