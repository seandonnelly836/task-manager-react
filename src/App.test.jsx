import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

async function addTask(title) {
  await userEvent.type(screen.getByLabelText('New task'), title)
  await userEvent.click(screen.getByRole('button', { name: 'Add' }))
}

describe('App', () => {
  it('shows an empty state at first', () => {
    render(<App />)
    expect(screen.getByText('No tasks to show.')).toBeInTheDocument()
    expect(screen.getByText('0 tasks left')).toBeInTheDocument()
  })

  it('adds, edits and deletes a task', async () => {
    render(<App />)
    await addTask('First task')
    expect(screen.getByText('First task')).toBeInTheDocument()
    expect(screen.getByText('1 task left')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
    const input = screen.getByLabelText('Edit task')
    await userEvent.clear(input)
    await userEvent.type(input, 'Renamed{Enter}')
    expect(screen.getByText('Renamed')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(screen.queryByText('Renamed')).not.toBeInTheDocument()
  })

  it('filters active and completed tasks', async () => {
    render(<App />)
    await addTask('Open task')
    await addTask('Done task')
    await userEvent.click(screen.getByLabelText('Mark "Done task" as completed'))

    await userEvent.click(screen.getByRole('button', { name: 'Active' }))
    expect(screen.getByText('Open task')).toBeInTheDocument()
    expect(screen.queryByText('Done task')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Completed' }))
    expect(screen.getByText('Done task')).toBeInTheDocument()
    expect(screen.queryByText('Open task')).not.toBeInTheDocument()
  })

  it('clears completed tasks', async () => {
    render(<App />)
    await addTask('Keep me')
    await addTask('Remove me')
    await userEvent.click(screen.getByLabelText('Mark "Remove me" as completed'))
    await userEvent.click(screen.getByRole('button', { name: 'Clear completed' }))

    const list = screen.getByRole('list')
    expect(within(list).getByText('Keep me')).toBeInTheDocument()
    expect(within(list).queryByText('Remove me')).not.toBeInTheDocument()
  })

  it('keeps tasks after a re-render (localStorage persistence)', async () => {
    const { unmount } = render(<App />)
    await addTask('Persistent task')
    unmount()

    render(<App />)
    expect(screen.getByText('Persistent task')).toBeInTheDocument()
  })
})
