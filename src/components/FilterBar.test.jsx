import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from './FilterBar'

describe('FilterBar', () => {
  it('renders the three filter buttons and marks the active one', () => {
    render(<FilterBar filter="active" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Active' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
  })

  it('calls onChange with the clicked filter', async () => {
    const onChange = vi.fn()
    render(<FilterBar filter="all" onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Completed' }))
    expect(onChange).toHaveBeenCalledWith('completed')
  })
})
