# Product Requirements Document (PRD): Task Manager

| | |
|---|---|
| **Product** | Task Manager (web app) |
| **Author** | Sean Donnelly |
| **Version** | 1.0 |
| **Status** | Implemented |
| **Tech** | React 19, Vite, Vitest |

## 1. Overview

Task Manager is a small single-page web app that lets a person write down what they need to do, mark it as done, and see only the tasks they care about. It runs entirely in the browser and keeps the data on the user's own device, so there is nothing to sign up for or install.

## 2. Problem statement

People who keep to-do lists on paper or in their heads forget items and lose track of what is finished. Many existing tools are heavy: they need accounts, sync, and many features the user never uses. A simple, fast tool that works instantly and remembers tasks between visits is enough for most personal use.

## 3. Goals

- G1: Let a user capture a task in a few seconds.
- G2: Let a user see at a glance what is still open.
- G3: Never lose tasks when the page is refreshed or the browser is closed.
- G4: Keep the code small, readable and tested, as a base for learning and for future features.

## 4. Non-goals (out of scope for v1.0)

- User accounts, login or multi-device sync
- A backend server or database
- Due dates, priorities, tags, reminders or notifications
- Drag-and-drop reordering
- Collaboration or sharing

## 5. Target users

**Primary user: "Busy student or individual"**
Needs a quick personal checklist for daily work. Is comfortable with a browser, does not want to learn a complex tool, and uses the app on one device.

## 6. User stories

| ID | As a... | I want to... | So that... |
|----|---------|--------------|-----------|
| US-1 | user | add a task by typing and pressing Add or Enter | I can capture it quickly |
| US-2 | user | mark a task as completed and undo it | I can track my progress |
| US-3 | user | edit the text of a task | I can fix mistakes or update details |
| US-4 | user | delete a task | I can remove things that no longer matter |
| US-5 | user | filter by All, Active or Completed | I can focus on what I need right now |
| US-6 | user | see how many tasks are left | I know how much work remains |
| US-7 | user | clear all completed tasks at once | my list stays clean |
| US-8 | user | find my tasks still there after a refresh | I never lose my list |

## 7. Functional requirements

| ID | Requirement | Story | Priority |
|----|-------------|-------|----------|
| FR-1 | The user can add a task with a text title. Leading and trailing spaces are removed. | US-1 | Must |
| FR-2 | Empty or whitespace-only titles are not added. | US-1 | Must |
| FR-3 | After adding, the input field is cleared. | US-1 | Must |
| FR-4 | Each task has a checkbox that toggles it between active and completed. Completed tasks are shown with a line-through. | US-2 | Must |
| FR-5 | Each task has an Edit button. Editing shows a text field with Save and Cancel; Enter saves and Escape cancels. | US-3 | Must |
| FR-6 | A task cannot be saved with an empty title; the original title is kept. | US-3 | Must |
| FR-7 | Each task has a Delete button that removes it immediately. | US-4 | Must |
| FR-8 | Filter buttons All / Active / Completed change which tasks are shown. The selected filter is visibly highlighted. | US-5 | Must |
| FR-9 | When no task matches the filter, the message "No tasks to show." is displayed. | US-5 | Should |
| FR-10 | The footer shows the number of active tasks, with correct singular/plural ("1 task left", "2 tasks left"). | US-6 | Must |
| FR-11 | A "Clear completed" button removes all completed tasks and is disabled when there are none. | US-7 | Should |
| FR-12 | Tasks are saved to `localStorage` after every change and loaded on start-up. | US-8 | Must |
| FR-13 | If `localStorage` is unavailable or contains invalid data, the app still works (starts with an empty list). | US-8 | Should |

## 8. Non-functional requirements

- **Performance:** The UI updates instantly for lists of up to several hundred tasks.
- **Usability:** Fully usable with keyboard only (Tab, Enter, Escape). Inputs and checkboxes have accessible labels (`aria-label`).
- **Compatibility:** Works in current versions of Chrome, Edge, Firefox and Safari. Layout is responsive and readable on mobile widths.
- **Privacy:** No data leaves the browser.
- **Maintainability:** Logic is split into small components, a custom hook and pure helper functions. ESLint passes with no errors.
- **Quality:** Automated tests cover helper functions, each component and the main user flows.

## 9. Data model

Tasks are stored as a JSON array under the `localStorage` key `task-manager-tasks`.

```json
{
  "id": "1731920000000-ab12cd",
  "title": "Write the report",
  "completed": false
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique id (timestamp plus random suffix) |
| `title` | string | Task text, trimmed, never empty |
| `completed` | boolean | `true` when the task is done |

## 10. UI overview

```
+--------------------------------------+
|             Task Manager             |
| [ Add a new task...        ] [ Add ] |
|        [All] [Active] [Completed]    |
| [ ] Buy milk              [Edit][Del]|
| [x] Call the bank         [Edit][Del]|
|--------------------------------------|
| 1 task left        [Clear completed] |
+--------------------------------------+
```

## 11. Architecture

The app follows a "lift state up" design: `App` owns the data and passes data and callbacks down to presentational components.

| Piece | Type | Responsibility |
|-------|------|----------------|
| `App` | component | Holds tasks and selected filter; defines add / toggle / edit / delete / clear actions |
| `TaskForm` | component | Input and Add button; validates and submits a new title |
| `FilterBar` | component | All / Active / Completed buttons |
| `TaskList` | component | Renders the list or the empty message |
| `TaskItem` | component | One task: checkbox, title, inline edit, delete |
| `TaskFooter` | component | Remaining count and Clear completed |
| `useLocalStorage` | hook | `useState` that is synced with `localStorage` |
| `utils/tasks.js` | helpers | `createTask`, `filterTasks`, `countRemaining`, `FILTERS` |

## 12. Acceptance criteria

- AC-1: Adding "Buy milk" shows it in the list and the footer shows "1 task left".
- AC-2: Submitting an empty or spaces-only title changes nothing.
- AC-3: Ticking a task moves it out of the Active filter and into the Completed filter.
- AC-4: Editing a task and pressing Enter updates its title; pressing Escape leaves it unchanged.
- AC-5: Deleting a task removes it from the list.
- AC-6: "Clear completed" removes only completed tasks.
- AC-7: After refreshing the page, all tasks and their completed state are still there.
- AC-8: `npm run lint`, `npm test` and `npm run build` all succeed.

## 13. Testing strategy

- **Unit tests** (Vitest) for pure helper functions.
- **Component tests** (Vitest + React Testing Library + user-event) for `TaskForm`, `FilterBar` and `TaskItem`, checking behaviour through the rendered UI.
- **Integration tests** for `App`: add, edit, delete, filter, clear completed and persistence.
- Tests run in a simulated browser (jsdom) with `localStorage` cleared between tests.

## 14. Risks and assumptions

| Risk / assumption | Mitigation |
|-------------------|-----------|
| `localStorage` can be disabled or full | Reads and writes are wrapped in `try/catch`; the app keeps working in memory |
| Data is tied to one browser and device | Documented as a non-goal; export/sync listed as future work |
| Browser data can be cleared by the user | Accepted for v1.0 |

## 15. Future work

- Due dates and priorities
- Drag-and-drop ordering
- Export / import as JSON
- Dark mode
- Optional cloud sync with accounts
