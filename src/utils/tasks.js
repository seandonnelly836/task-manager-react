export const FILTERS = ['all', 'active', 'completed']

/** Create a new task object. */
export function createTask(title) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    completed: false,
  }
}

/** Return the tasks that match the selected filter. */
export function filterTasks(tasks, filter) {
  if (filter === 'active') return tasks.filter((t) => !t.completed)
  if (filter === 'completed') return tasks.filter((t) => t.completed)
  return tasks
}

/** Count tasks that are not completed yet. */
export function countRemaining(tasks) {
  return tasks.filter((t) => !t.completed).length
}
