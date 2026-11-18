# Task Manager (React + Vite)

A simple task manager built with React. Tasks are saved in the browser, so they are still there after a refresh.

Planning documents: [PRD.md](./PRD.md) (requirements) and [tasks.md](./tasks.md) (implementation plan).

## Features

- Add tasks (empty input is ignored)
- Edit a task inline (Enter to save, Escape to cancel)
- Delete tasks
- Mark tasks as completed
- Filter by All / Active / Completed
- Live count of remaining tasks and a "Clear completed" button
- Persistence with `localStorage`

## Tech stack

- React 19 (hooks: `useState`, `useEffect`)
- Vite
- Vitest + React Testing Library (tests)
- ESLint (linting)
- Plain CSS

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually http://localhost:5173).

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |

## Components

| Component | File | What it does |
|-----------|------|--------------|
| `App` | `src/App.jsx` | Root component. Holds the tasks and the selected filter, defines the add / toggle / edit / delete / clear actions, and composes the other components. |
| `TaskForm` | `src/components/TaskForm.jsx` | Text input and Add button. Trims the text, ignores empty input, calls `onAdd` and clears the field. |
| `FilterBar` | `src/components/FilterBar.jsx` | The All / Active / Completed buttons. Highlights the selected filter and calls `onChange`. |
| `TaskList` | `src/components/TaskList.jsx` | Renders one `TaskItem` per task, or "No tasks to show." when the list is empty. |
| `TaskItem` | `src/components/TaskItem.jsx` | A single task: completion checkbox, title, Edit (inline, with Save / Cancel, Enter / Escape) and Delete. Manages its own edit mode. |
| `TaskFooter` | `src/components/TaskFooter.jsx` | Shows how many tasks are left and the "Clear completed" button. |

### Hook and helpers

| Module | File | What it does |
|--------|------|--------------|
| `useLocalStorage` | `src/hooks/useLocalStorage.js` | Custom hook. Works like `useState` but saves the value to `localStorage` and restores it on load. |
| `tasks` helpers | `src/utils/tasks.js` | Pure functions: `createTask`, `filterTasks`, `countRemaining`, and the `FILTERS` list. |

## Project structure

```
src/
  App.jsx
  App.css
  main.jsx
  components/
    TaskForm.jsx
    FilterBar.jsx
    TaskList.jsx
    TaskItem.jsx
    TaskFooter.jsx
  hooks/
    useLocalStorage.js
  utils/
    tasks.js
  test/
    setup.js          # test setup (jest-dom matchers, cleanup)
```

Test files sit next to the code they test (`*.test.js` / `*.test.jsx`).

## Testing

Tests use Vitest and React Testing Library and cover the helper functions, the `TaskForm`, `FilterBar` and `TaskItem` components, and the main user flows in `App` (add, edit, delete, filter, clear completed, persistence).

```bash
npm test
```

## Possible improvements

- Due dates and priorities
- Drag-and-drop reordering
- Export / import as JSON
- Deploy a live demo
