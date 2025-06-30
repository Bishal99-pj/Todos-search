import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import { Provider } from 'react-redux'
import { todoStore } from '@/stores/todo.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={todoStore}>
    <App />
  </Provider>,
)
