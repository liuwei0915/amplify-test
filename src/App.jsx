import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import './App.css';

/**
 * The Data client is generated from your backend schema (amplify/data/resource).
 * It exposes typed CRUD + realtime methods under client.models.<ModelName>.
 */
const client = generateClient();

function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState('');

  // observeQuery() opens a live subscription: the list re-renders automatically
  // whenever a Todo is created, updated, or deleted — even from another tab.
  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos([...items]),
    });
    return () => sub.unsubscribe();
  }, []);

  async function addTodo() {
    const value = draft.trim();
    if (!value) return;
    await client.models.Todo.create({ content: value, done: false });
    setDraft('');
  }

  async function toggleTodo(todo) {
    await client.models.Todo.update({ id: todo.id, done: !todo.done });
  }

  async function removeTodo(id) {
    await client.models.Todo.delete({ id });
  }

  return (
    <main className="app">
      <h1>Amplify Learning App</h1>
      <p className="subtitle">
        Todos are stored in DynamoDB through an AppSync GraphQL API. The list
        updates live via a subscription.
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
          {todos.map((todo) => (
            <li key={todo.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={!!todo.done}
                  onChange={() => toggleTodo(todo)}
                />
                <span className={todo.done ? 'done' : ''}>{todo.content}</span>
              </label>
              <button
                className="remove"
                aria-label={`Remove ${todo.content}`}
                onClick={() => removeTodo(todo.id)}
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
