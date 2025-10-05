import { useState, useEffect } from "react";

const STORAGE_KEY = "tasks-list";
const initialTasks = ["Task 1", "Task 2", "Task 3", "Task 4"];

export default function DragDropList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function onDragStart(index) {
    setDragging(index);
  }

  function onDragOver(e, index) {
    e.preventDefault();
    if (dragging === index) return;

    const updated = [...tasks];
    const draggedItem = updated[dragging];
    updated.splice(dragging, 1);
    updated.splice(index, 0, draggedItem);

    setDragging(index);
    setTasks(updated);
  }

  function onDrop() {
    setDragging(null);
  }

  return (
    <>
      <h2 className="list-title">My Tasks</h2>
      <ul className="list">
        {tasks.map((t, i) => (
          <li
            key={t}
            className={`item ${dragging === i ? "dragging" : ""}`}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDrop={onDrop}
            aria-grabbed={dragging === i}
          >
            <span className="handle" aria-hidden>≡</span>
            <span className="item-text">{t}</span>
          </li>
        ))}
      </ul>
      <div className="note">Η σειρά αποθηκεύεται αυτόματα στο localStorage.</div>
    </>
  );
}
