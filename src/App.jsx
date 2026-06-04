import { useState } from 'react';
import './App.css';

/**
 * A minimal, self-contained starter component.
 *
 * This is a plain client-side React app — no backend wired in. The "todos"
 * list lives only in component state, so it resets on refresh. The Amplify
 * backend (under amplify/) can still be run locally via `npx ampx sandbox`
 * for learning; the hosted site stays static.
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState('');

  function addTodo() {
    const value = draft.trim();
    if (!value) return;
    setTodos((prev) => [...prev, value]);
    setDraft('');
  }

  function removeTodo(index) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="app">
      <h1>Amplify Learning App</h1>
      <p className="subtitle">
        A basic React + Vite frontend. Local state for now — wire it to Amplify
        Data next to make it persist.
      </p>

      <div className="todo-input">
        <input
          type="text"
          value={draft}
          placeholder="What needs doing?"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo();
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.length === 0 ? (
        <p className="empty">No todos yet. Add one above.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              <span>{todo}</span>
              <button
                className="remove"
                aria-label={`Remove ${todo}`}
                onClick={() => removeTodo(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
