import type { Todo, TodosState } from '@/types';
import { configureStore } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodosAsync = createAsyncThunk<Todo[]>(
    'todos/fetchTodosAsync',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        return response.json();
    }
);

const initialState: TodosState = {
    todos: [],
    filteredTodos: [],
    status: 'idle',
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setFilteredTodos(state, action) {
            state.filteredTodos = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
                state.filteredTodos = action.payload;
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setFilteredTodos } = todoSlice.actions;

export const todoStore = configureStore({
    reducer: {
        todoStoreProperties: todoSlice.reducer,
    },
});