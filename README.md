# 👑 Taskueen

> **Rule your day, one task at a time!**

Taskueen is a modern, responsive task management application built with **React 19**, **TypeScript**, and **Vite**. Designed with a glassmorphic aesthetic, it combines interactive productivity tracking with responsive theme customization and an interactive 9-direction cursor-following mascot animation.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Linter](https://img.shields.io/badge/Linter-Oxlint-FF6B6B)](https://oxc.rs/)

[Explore Code](https://github.com/ghezel1995/taskueen) • [Live Demo](#-live-demo)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Preview & Screenshots](#-preview--screenshots)
- [Features](#-features)
- [Interactive Cursor Follower](#-interactive-cursor-follower)
- [Tech Stack](#-tech-stack)
- [Architecture & Implementation Highlights](#-architecture--implementation-highlights)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Portfolio & Engineering Highlights](#-portfolio--engineering-highlights)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 🌟 Overview

Taskueen was built as a frontend engineering portfolio project to demonstrate clean component architecture, custom hook composition, strict type safety, advanced vanilla CSS styling (glassmorphism, CSS custom properties, and keyframe animations), and high-performance DOM manipulation with mathematical pointer tracking.

### 🔗 Live Demo

<!-- PLACEHOLDER: Replace this placeholder link with your production deployment URL (e.g., Vercel, Netlify, GitHub Pages) -->
> 🚀 **Live Demo:** [https://taskueen.vercel.app](https://taskueen.vercel.app) *(Deployment URL placeholder — update with your live link)*

---

## 🖼️ Preview & Screenshots

<!-- PLACEHOLDER: Add your application screenshots or demo GIFs below.
     Recommended: Save your screenshots inside an `assets/` or `docs/` folder (e.g., `docs/preview-light.png` and `docs/preview-dark.png`)
     and update the relative paths below. -->

| Light Mode | Dark Mode |
| :---: | :---: |
| ![Taskueen Light Mode Preview](https://placehold.co/600x400/f1e8fb/4a3d63?text=Taskueen+Light+Mode+Preview) | ![Taskueen Dark Mode Preview](https://placehold.co/600x400/2a2438/feffdf?text=Taskueen+Dark+Mode+Preview) |
| *Soft pastel lilac aesthetic with translucent glass cards* | *Twilight palette with glowing accents and deep contrast* |

> *Tip: Replace the placeholder images above with actual screenshots of your running application.*

---

## ✨ Features

- **Task Management**:
  - Add tasks with real-time input validation (whitespace trimming, preventing empty submissions).
  - Toggle task completion with custom-styled, animated circular checkboxes.
  - Delete tasks with an animated pink/rose glow button.
- **Interactive Metric Summary Cards**:
  - Displays dynamic counters for **Total**, **Completed**, and **Remaining** tasks.
  - Cards act as interactive filter controls—clicking any metric card immediately filters the task list accordingly.
- **Task Filtering**:
  - Filter tasks across three states: **All**, **Active**, and **Completed**.
  - Controlled through a custom-styled glassmorphic dropdown selector or by clicking the summary cards.
- **Dynamic Theme System (Light & Dark)**:
  - Seamless toggle between light pastel glassmorphism and twilight dark mode.
  - Animated theme toggle button with 360° icon spin transition (`🌙` / `☀️`).
  - Persistent theme preference saved in browser `localStorage`.
  - Zero-flash initial theme hydration synchronized directly to `<html data-theme="...">`.
- **Custom Cursor-Following Character ("Mascot")**:
  - Integrated header mascot that follows user pointer movement in real time across 9 directional angles.
  - Zero third-party animation libraries—built with vanilla geometry and `requestAnimationFrame`.
- **Accessibility & Device Awareness**:
  - Respects `prefers-reduced-motion` media queries by disabling heavy keyframes and fixing the character in its neutral frame.
  - Detects fine pointer support (`(hover: hover) and (pointer: fine)`) to avoid overhead on touch devices.
- **Friendly Empty State**:
  - Visual notification when no tasks are present to guide user interaction.

---

## 🐾 Interactive Cursor Follower

A distinctive visual element of Taskueen is the cursor-following character mounted in the application header:

```
          [up-left]       [up]       [up-right]
                 ↖         ↑         ↗
           [left] ←     [center]     → [right]
                 ↙         ↓         ↘
        [down-left]     [down]     [down-right]
```

### Real Implementation Details

Unlike standard GIF or CSS hover animations, this feature is implemented with mathematical rigor in `src/components/cursor-follower/`:

1. **Pre-rendered 9-Direction Sprite System**:
   - Uses 9 directional WebP assets (`center`, `up`, `down`, `left`, `right`, `up-left`, `up-right`, `down-left`, `down-right`) located in `public/animation/frames/`.
   - On component mount, all 9 frames are preloaded into memory via `new Image()` instances to guarantee zero-latency switching with no image flickering.

2. **Trigonometric Angle Resolution (`cursorDirection`)**:
   - Calculates relative pointer coordinates against the mascot's center point:
     $$\Delta x = \text{pointer.x} - \text{rect.left} - \frac{\text{width}}{2}$$
     $$\Delta y = \text{pointer.y} - \text{rect.top} - \frac{\text{height}}{2}$$
   - **Dead Zone**: If $\sqrt{\Delta x^2 + \Delta y^2} \le 36\text{px}$, the character returns to `center`.
   - **Octant Mapping**: Computes $\theta = \text{atan2}(\Delta y, \Delta x)$ and maps the angle into 8 radial 45° sectors.
   - **Boundary Hysteresis**: Applies an angular deadband threshold ($\frac{\pi}{8} + 0.1$) against the previous direction to eliminate jitter when the cursor hovers on the boundary between two directional sectors.

3. **Performance & Lifecycle Architecture**:
   - Updates are throttled using `requestAnimationFrame`, ensuring rendering remains locked to the display refresh rate without event flooding.
   - Event listeners (`pointermove`, `scroll`, `resize`, `blur`, `pointerleave`) are registered passively.
   - Automatically resets to `center` when the window loses focus (`blur`) or when the pointer leaves the viewport.
   - Fully encapsulated React wrapper (`CursorFollower.tsx`) with a complete teardown routine (`destroy()`) that removes all event listeners and cancels active animation frames on unmount.

---

## 🛠️ Tech Stack

### Core Technologies
- **[React 19](https://react.dev/)**: Modern component-based UI library utilizing functional components and hooks (`useState`, `useEffect`, `useRef`).
- **[TypeScript 6](https://www.typescriptlang.org/)**: Statically typed superset of JavaScript providing interfaces, union types, and prop contracts.
- **[Vite 8](https://vite.dev/)**: Next-generation frontend tooling with instant dev server startup and optimized Rollup production builds.

### UI & Styling
- **Modern Vanilla CSS3**:
  - CSS Custom Properties (Variables) for full theme orchestration.
  - Glassmorphic UI with backdrop filters (`backdrop-filter: blur(...) saturate(...)`).
  - Native color blending using `color-mix(in srgb, ...)`.
  - Ambient floating background gradients (`@keyframes driftA`, `@keyframes driftB`).
  - Text gradient shimmer effects (`@keyframes shimmer`).
  - Fully responsive layout via CSS Flexbox and media queries (`max-width: 560px`).
  - Accessibility handling for reduced motion preferences (`prefers-reduced-motion: reduce`).

### Development & Quality Tooling
- **[Oxlint](https://oxc.rs/)**: High-performance Rust-based JavaScript/TypeScript linter configured with React and React Hooks rules.
- **TypeScript Project References**: Separated configs (`tsconfig.app.json`, `tsconfig.node.json`) for clean client and tooling boundaries.

---

## 📐 Architecture & Implementation Highlights

### 1. State Separation via Custom Hook (`useTasks`)
Task state and business logic are decoupled from the view layer into `src/hooks/useTasks.ts`:
- Encapsulates `tasks` state.
- Exposes immutable handler functions:
  - `handleAddTask`: Creates a timestamped `Task` object with trimmed input.
  - `handleToggle`: Maps over tasks to toggle completion status.
  - `handleDelete`: Filters out tasks by unique ID.
- Keeps `App.tsx` clean and focused solely on layout, filtering, and theme orchestration.

### 2. Derived State vs. Redundant State
To avoid stale state and synchronization bugs, task metrics and visibility are derived on render:
```typescript
// Filtered visible tasks derived from base tasks and filter state
const visibleTasks = tasks.filter((t) => {
  if (filter === 'active') return !t.completed;
  if (filter === 'completed') return t.completed;
  return true;
});

// Summary metrics derived directly from tasks array
const totalCount = tasks.length;
const completedCount = tasks.filter((task) => task.completed).length;
const remainingCount = tasks.filter((t) => !t.completed).length;
```

### 3. Theme Synchronization & Persistence
Theme management uses a hybrid React state and DOM attribute synchronization approach:
- **Lazy Initialization**: Checks `localStorage.getItem('taskueen-theme')` inside `useState` initialization to prevent layout flashes.
- **DOM Binding**: Synchronizes the current theme to `document.documentElement.dataset.theme = theme`, enabling clean CSS attribute selectors (`:root[data-theme='dark']`).
- **Persistence**: Persists every change back to `localStorage`.

### 4. Component Composition & Type Safety
The component tree is modular, strongly typed, and follows clear single-responsibility principles:
- `TaskItem`: Individual item with strongly typed props (`TaskItemProps`), handling checkbox toggling and deletion.
- `TaskList`: Container mapping over task collections using stable keys (`task.id`).
- `Summary`: Interactive dashboard component providing aggregate metrics and filter callbacks.
- `CursorFollower`: Headless DOM integration wrapped in a React lifecycle container.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **[Node.js](https://nodejs.org/)** (v18.0.0 or higher recommended)
- **npm** (comes bundled with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ghezel1995/taskueen.git
   cd taskueen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local URL displayed in your terminal (typically `http://localhost:5173`).

---

## 📜 Available Scripts

In the project directory, you can run the following npm scripts:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type-checking (`tsc -b`) and builds the production bundle with Vite into `dist/`. |
| `npm run preview` | Locally serves the production build from `dist/` to verify release readiness. |
| `npm run lint` | Runs the ultra-fast Oxlint linter to detect code errors and React anti-patterns. |

---

## 📁 Project Structure

```text
taskueen/
├── public/
│   ├── animation/
│   │   └── frames/              # 9 directional WebP sprite frames for mascot
│   ├── favicon.svg              # SVG crown brand favicon
│   └── icons.svg                # Reusable SVG vector symbols
├── src/
│   ├── components/
│   │   ├── cursor-follower/
│   │   │   ├── CursorFollower.tsx   # React lifecycle wrapper with ref & cleanup
│   │   │   ├── cursor-follower.d.ts # TypeScript definitions for vanilla engine
│   │   │   └── cursor-follower.js   # Framework-agnostic pointer engine & math
│   │   ├── Summary.css          # Metric card layout & glass styling
│   │   ├── Summary.tsx          # Real-time metrics & filter trigger cards
│   │   ├── TaskItem.tsx         # Task item, custom checkbox, and delete action
│   │   └── TaskList.tsx         # Task collection rendering component
│   ├── hooks/
│   │   └── useTasks.ts          # Custom hook for task CRUD operations
│   ├── types/
│   │   └── task.ts              # Domain types: Task interface & Filter union
│   ├── App.css                  # Design system, CSS variables, themes, animations
│   ├── App.tsx                  # Root component: state wiring, filters, theme sync
│   ├── index.css                # Color utility references
│   └── main.tsx                 # Application entry point with StrictMode
├── .gitignore                   # Git exclusion rules
├── .oxlintrc.json               # Oxlint configuration
├── index.html                   # HTML entry point template
├── package.json                 # Dependencies and npm scripts
├── tsconfig.app.json            # TypeScript configuration for application source
├── tsconfig.json                # TypeScript root reference configuration
├── tsconfig.node.json           # TypeScript configuration for Vite tooling
└── vite.config.ts               # Vite configuration with React plugin
```

---

## 📖 Usage Guide

1. **Adding a Task**:
   - Type your task description into the input field (`What needs to be done?`).
   - Click the **Add task** button or press <kbd>Enter</kbd>.
   - Empty or whitespace-only inputs are ignored.
2. **Completing a Task**:
   - Click the circular checkbox beside any task.
   - The checkbox will animate with a green glow, and the text will be struck through.
3. **Deleting a Task**:
   - Click the trash can icon button (`🗑️`) on the right of the task item.
4. **Filtering Tasks**:
   - **Method A**: Use the dropdown selector to switch between **All**, **Active**, and **Completed**.
   - **Method B**: Click directly on the **Total**, **Completed**, or **Remaining** summary cards to filter the list instantly.
5. **Switching Themes**:
   - Click the floating theme button in the top-right corner (`🌙` / `☀️`) to toggle between Light and Dark themes. Your preference will be remembered on subsequent visits.

---

## 💡 Portfolio & Engineering Highlights

This project demonstrates core frontend engineering proficiencies suitable for production environments:

- **Component Modularity**: High cohesion and low coupling through clear separation of concerns (hooks, types, presentational components).
- **TypeScript Discipline**: Proper typing of domain models, function signatures, and component props without loose `any` types.
- **Advanced CSS Architecture**: Deep knowledge of modern CSS without relying on utility frameworks—using CSS variables for theme tokens, backdrop filters for glassmorphism, and responsive breakpoints.
- **Trigonometric & Canvas/DOM Integration**: Direct calculation of pointer angles and distance vectors, coupled with frame-rate synchronization (`requestAnimationFrame`) and hysteresis handling.
- **Performance Awareness**: Frame preloading, passive event listeners, zero redundant re-renders, and sub-millisecond linting with Oxlint.
- **User Experience Polish**: Micro-interactions, hover glow cycles, spring-like icon transitions, and accessible fallback modes.

---

## 🔮 Future Improvements

While Taskueen is fully functional as a frontend portfolio project, potential future enhancements include:

- [ ] **Task Persistence**: Persist tasks in `localStorage` or `IndexedDB` across browser reloads.
- [ ] **Inline Editing**: Allow double-clicking on a task title to edit it in place.
- [ ] **Drag-and-Drop Reordering**: Integrate native HTML Drag and Drop or a lightweight reordering mechanism to prioritize tasks.
- [ ] **Categories & Tags**: Support color-coded tags or priority flags (e.g., High, Medium, Low).
- [ ] **Due Dates & Reminders**: Add optional deadlines and countdown indicators.
- [ ] **Sound Effects**: Optional subtle audio feedback when completing or deleting tasks.

---

## 📄 License

This project currently does not have an open-source license declared. If you intend to distribute or open-source this project publicly, consider adding an [MIT License](https://opensource.org/licenses/MIT) or another license of your choice.

---

<p align="center">
  Crafted with care by <a href="https://github.com/ghezel1995">ghezel1995</a> 👑
</p>
