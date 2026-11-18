# Task Manager (React + Vite)

A simple task manager built with React. Tasks are saved in the browser, so they are still there after a refresh.

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
- Oxlint (linting)
- Plain CSS

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually http://localhost:5173).

Other scripts:

```bash
npm run build   # production build
npm run lint    # run the linter
```

## Project structure

```
src/
  App.jsx   # state, task logic and UI
  App.css   # styles
  main.jsx  # entry point
```

## Possible improvements

- Due dates and priorities
- Drag-and-drop reordering
- Unit tests with Vitest and React Testing Library