export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type StatusFilter = 'all' | 'completed' | 'pending';

export type TodosState = {
    todos: Todo[];
    filteredTodos: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}