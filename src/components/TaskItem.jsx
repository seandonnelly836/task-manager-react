import { useState } from 'react'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.title)

  function startEdit() {
    setEditText(task.title)
    setIsEditing(true)
  }

  function saveEdit() {
    const title = editText.trim()
    if (title) onEdit(task.id, title)
    setIsEditing(false)
  }

  return (
    <li className={task.completed ? 'done' : ''}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as completed`}
      />
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={editText}
            autoFocus
            aria-label="Edit task"
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') setIsEditing(false)
            }}
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span className="title">{task.title}</span>
          <button onClick={startEdit}>Edit</button>
          <button className="danger" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  )
}

export default TaskItem
