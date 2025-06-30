import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import '@/App.css';
import Search from '@/components/SearchBar';
import TodoList from '@/components/TodoList';
import type { StatusFilter, Todo } from '@/types';
import { debounce } from 'throttle-debounce';
import { TodoSkeleton } from '@/components/TodoSkeleton';
import { useDispatch } from 'react-redux';
import { fetchTodosAsync, setFilteredTodos, todoStore } from '@/stores/todo';

function App() {
  const dispatch = useDispatch<any>();
  const { todoStoreProperties } = todoStore.getState();
  const { todos, filteredTodos, status } = todoStoreProperties;

  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');

  const fuse = new Fuse<Todo>(todos, {
    keys: ['title', 'id'],
    threshold: 0.3,
  });

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      dispatch(setFilteredTodos(todos));
    } else {
      const results = fuse.search(query);
      dispatch(setFilteredTodos(results.map((res) => res.item)));
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

    dispatch(setFilteredTodos(result));
  };

  return (
    <div className="w-xl mx-auto mt-6 *:w-full">
      <Search filter={selectedFilter} onSearch={debounce(300, handleSearch)} onFilterChange={handleFilterChange} />
      {/* Debug Status: {status} */}
      {status === 'loading' ? (
        <TodoSkeleton />
      ) : status === 'failed' ? (
        <div className="text-red-500">Failed to fetch task list. Please try again.</div>
      ) : (
        <TodoList todos={filteredTodos} />
      )}
    </div>
  );
}

export default App;
