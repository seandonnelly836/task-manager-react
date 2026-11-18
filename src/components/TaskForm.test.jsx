import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from './TaskForm'

describe('TaskForm', () => {
  it('calls onAdd with the trimmed title and clears the input', async () => {
    const onAdd = vi.fn()
    render(<TaskForm onAdd={onAdd} />)
    const input = screen.getByLabelText('New task')

    await userEvent.type(input, '  Write tests  ')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(onAdd).toHaveBeenCalledWith('Write tests')
    expect(input).toHaveValue('')
  })

  it('ignores empty or whitespace-only input', async () => {
    const onAdd = vi.fn()
    render(<TaskForm onAdd={onAdd} />)

    await userEvent.type(screen.getByLabelText('New task'), '   ')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(onAdd).not.toHaveBeenCalled()
  })
})
