import { useState } from "react";

function AddNote() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleAddNote = (e) => {
        e.preventDefault();

        const newNote = { title, body };

        fetch("http://localhost:5000/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
        .then((res) => res.json())
        .then(() => {
            setTitle("");
            setBody("");
        })
        .catch((err) => console.error("Error adding note:", err));
    };
    
    return (
        <form onSubmit={handleAddNote}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />

            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <br />
            <button type="submit">Add Note</button>
        </form>
    );
}

export default AddNote;