import { FILTERS } from '../utils/tasks'

function FilterBar({ filter, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          aria-pressed={filter === f}
          onClick={() => onChange(f)}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
