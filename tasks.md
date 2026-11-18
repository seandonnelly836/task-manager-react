# Tasks: Task Manager

Implementation plan derived from [PRD.md](./PRD.md). `FR-x` / `US-x` / `AC-x` refer to the requirement, story and acceptance-criteria ids in the PRD.

Legend: `[x]` done, `[ ]` not started.

## Phase 1: Project setup

- [x] **T-1.1** Create the project with Vite (React template)
- [x] **T-1.2** Configure ESLint and verify `npm run lint` passes
- [x] **T-1.3** Replace the template README with a project description
- [x] **T-1.4** Write `PRD.md` and `tasks.md`

## Phase 2: Core logic

- [x] **T-2.1** Add `utils/tasks.js` with `createTask`, `filterTasks`, `countRemaining` and `FILTERS` (FR-1, FR-8, FR-10)
- [x] **T-2.2** Add `hooks/useLocalStorage.js`, a `useState` that persists to `localStorage` with `try/catch` safety (FR-12, FR-13)

## Phase 3: UI components

- [x] **T-3.1** `TaskForm`: input, Add button, trim and ignore empty titles, clear input after adding (FR-1, FR-2, FR-3, US-1)
- [x] **T-3.2** `FilterBar`: All / Active / Completed buttons with highlighted selection (FR-8, US-5)
- [x] **T-3.3** `TaskItem`: checkbox, title, Edit (Enter saves, Escape cancels, empty not saved), Delete (FR-4, FR-5, FR-6, FR-7, US-2, US-3, US-4)
- [x] **T-3.4** `TaskList`: render items and the "No tasks to show." empty state (FR-9)
- [x] **T-3.5** `TaskFooter`: remaining count with singular/plural, Clear completed disabled when nothing to clear (FR-10, FR-11, US-6, US-7)

## Phase 4: Integration

- [x] **T-4.1** Refactor `App.jsx` to own state and compose the components (all FRs)
- [x] **T-4.2** Use functional state updates (`setTasks(prev => ...)`) so actions never use stale state
- [x] **T-4.3** Keep styling in `App.css` (responsive, readable on mobile)

## Phase 5: Testing

- [x] **T-5.1** Set up Vitest, jsdom and React Testing Library; add `npm test` script
- [x] **T-5.2** Unit tests for `utils/tasks.js`
- [x] **T-5.3** Component tests for `TaskForm`, `FilterBar`, `TaskItem`
- [x] **T-5.4** Integration tests for `App`: add, edit, delete, filter, clear completed, persistence (AC-1 to AC-7)

## Phase 6: Documentation and delivery

- [x] **T-6.1** README: features, setup, scripts, structure, list of components and what each does
- [x] **T-6.2** Work in small commits with clear messages
- [x] **T-6.3** Final check: `npm run lint`, `npm test`, `npm run build` all pass (AC-8)

## Backlog (future work, not in v1.0)

- [ ] **T-7.1** Due dates and priorities
- [ ] **T-7.2** Drag-and-drop reordering
- [ ] **T-7.3** Export / import tasks as JSON
- [ ] **T-7.4** Dark mode
- [ ] **T-7.5** Deploy to Vercel / Netlify / GitHub Pages and add the link to the README
