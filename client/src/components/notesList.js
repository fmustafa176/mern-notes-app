import { useState } from "react";
import "./notesList.css";

function NotesList({ notes, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditBody(note.body);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editingId, { title: editTitle, body: editBody });
    setEditingId(null);
  };

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {editingId === note._id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                ></textarea>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <button onClick={() => startEdit(note)}>Edit</button>
                <button onClick={() => onDelete(note._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
