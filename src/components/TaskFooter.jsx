function TaskFooter({ remaining, hasCompleted, onClearCompleted }) {
  return (
    <footer>
      <span>
        {remaining} {remaining === 1 ? 'task' : 'tasks'} left
      </span>
      <button onClick={onClearCompleted} disabled={!hasCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default TaskFooter
