import { useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import TaskFooter from './components/TaskFooter'
import { useLocalStorage } from './hooks/useLocalStorage'
import { createTask, filterTasks, countRemaining } from './utils/tasks'

const STORAGE_KEY = 'task-manager-tasks'

function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, [])
  const [filter, setFilter] = useState('all')

  function addTask(title) {
    setTasks((prev) => [...prev, createTask(title)])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  function editTask(id, title) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)))
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }

  const remaining = countRemaining(tasks)

  return (
    <main className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList
        tasks={filterTasks(tasks, filter)}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      <TaskFooter
        remaining={remaining}
        hasCompleted={tasks.length > remaining}
        onClearCompleted={clearCompleted}
      />
    </main>
  )
}

export default App
