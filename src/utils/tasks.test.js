import { describe, it, expect } from 'vitest'
import { createTask, filterTasks, countRemaining } from './tasks'

const sample = [
  { id: '1', title: 'A', completed: false },
  { id: '2', title: 'B', completed: true },
  { id: '3', title: 'C', completed: false },
]

describe('createTask', () => {
  it('creates an uncompleted task with the given title', () => {
    const task = createTask('Buy milk')
    expect(task.title).toBe('Buy milk')
    expect(task.completed).toBe(false)
  })

  it('creates unique ids', () => {
    expect(createTask('x').id).not.toBe(createTask('x').id)
  })
})

describe('filterTasks', () => {
  it('returns all tasks for "all"', () => {
    expect(filterTasks(sample, 'all')).toHaveLength(3)
  })

  it('returns only active tasks for "active"', () => {
    expect(filterTasks(sample, 'active').map((t) => t.id)).toEqual(['1', '3'])
  })

  it('returns only completed tasks for "completed"', () => {
    expect(filterTasks(sample, 'completed').map((t) => t.id)).toEqual(['2'])
  })
})

describe('countRemaining', () => {
  it('counts tasks that are not completed', () => {
    expect(countRemaining(sample)).toBe(2)
  })

  it('returns 0 for an empty list', () => {
    expect(countRemaining([])).toBe(0)
  })
})
