import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from './TaskItem'

const task = { id: 't1', title: 'Learn React', completed: false }

function setup(overrides = {}) {
  const handlers = { onToggle: vi.fn(), onDelete: vi.fn(), onEdit: vi.fn() }
  render(
    <ul>
      <TaskItem task={{ ...task, ...overrides }} {...handlers} />
    </ul>,
  )
  return handlers
}

describe('TaskItem', () => {
  it('shows the task title', () => {
    setup()
    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  it('calls onToggle when the checkbox is clicked', async () => {
    const { onToggle } = setup()
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('t1')
  })

  it('calls onDelete when Delete is clicked', async () => {
    const { onDelete } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onDelete).toHaveBeenCalledWith('t1')
  })

  it('edits the title and saves with Enter', async () => {
    const { onEdit } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
    const input = screen.getByLabelText('Edit task')
    await userEvent.clear(input)
    await userEvent.type(input, 'Learn Vitest{Enter}')
    expect(onEdit).toHaveBeenCalledWith('t1', 'Learn Vitest')
  })

  it('cancels editing with Escape without saving', async () => {
    const { onEdit } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
    await userEvent.type(screen.getByLabelText('Edit task'), 'xyz{Escape}')
    expect(onEdit).not.toHaveBeenCalled()
    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  it('does not save an empty title', async () => {
    const { onEdit } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
    await userEvent.clear(screen.getByLabelText('Edit task'))
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onEdit).not.toHaveBeenCalled()
  })
})
