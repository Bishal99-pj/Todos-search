import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import './App.css';
import Search from '@/components/SearchBar';
import TodoList from '@/components/TodoList';
import type { StatusFilter, Todo } from './types';
import { debounce } from 'throttle-debounce';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');

  const fuse = new Fuse<Todo>(todos, {
    keys: ['title', 'id'],
    threshold: 0.3,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data: Todo[] = await res.json();
      setTodos(data);
      setFilteredTodos(data);
    };

    fetchTodos();
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredTodos(todos);
    } else {
      const results = fuse.search(query);
      setFilteredTodos(results.map((res) => res.item));
    }
  };

  const handleFilterChange = (filter: StatusFilter) => {
    setSelectedFilter(filter);

    let result = todos;

    if (filter === 'completed') {
      result = todos.filter((todo) => todo.completed);
    } else if (filter === 'pending') {
      result = todos.filter((todo) => !todo.completed);
    }

    setFilteredTodos(result);
  };

  return (
    <div className="w-xl mx-auto mt-6 *:w-full">
      <Search filter={selectedFilter} onSearch={debounce(300, handleSearch)} onFilterChange={handleFilterChange} />
      <TodoList todos={filteredTodos} />
    </div>
  );
}

export default App;
