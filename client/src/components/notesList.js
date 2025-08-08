import { useState, useEffect } from "react";

function NotesList () {
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/api/notes')
        .then(res => res.json())
        .then(data => setNotes(data))
        .catch(err => console.error('Error fetching notes:', err));
    }, []);
    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h2>{note.title}</h2>
                        <p>{note.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotesList;