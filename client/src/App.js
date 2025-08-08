import { useState, useEffect } from "react";
import NotesList from "./components/notesList";
import AddNote from "./components/addNote";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    try {
      await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      fetchNotes();
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const editNote = async (id, updatedNote) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      });
      fetchNotes();
    } catch (err) {
      console.error("Error editing note:", err);
    }
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <AddNote onAdd={addNote} />
      <NotesList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
}

export default App;
