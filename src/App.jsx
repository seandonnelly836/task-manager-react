import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'task-manager-tasks'
const FILTERS = ['all', 'active', 'completed']

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // storage may be unavailable; app still works in memory
    }
  }, [tasks])

  function addTask(e) {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks([...tasks, { id: Date.now(), title, completed: false }])
    setText('')
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  function startEdit(task) {
    setEditingId(task.id)
    setEditText(task.title)
  }

  function saveEdit(id) {
    const title = editText.trim()
    if (title) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, title } : t)))
    }
    setEditingId(null)
  }

  function clearCompleted() {
    setTasks(tasks.filter((t) => !t.completed))
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })
  const remaining = tasks.filter((t) => !t.completed).length

  return (
    <main className="app">
      <h1>Task Manager</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {visibleTasks.length === 0 && <li className="empty">No tasks to show.</li>}
        {visibleTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              aria-label={`Mark "${task.title}" as completed`}
            />
            {editingId === task.id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(task.id)
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className="title">{task.title}</span>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button className="danger" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <footer>
        <span>
          {remaining} {remaining === 1 ? 'task' : 'tasks'} left
        </span>
        <button onClick={clearCompleted} disabled={tasks.length === remaining}>
          Clear completed
        </button>
      </footer>
    </main>
  )
}

export default App
