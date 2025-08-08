import NotesList from "./components/notesList"
import AddNote from "./components/addNote";

function App() {
    return (
      <div className="App">
        <h1>Notes App</h1>
        <NotesList/>
        <AddNote />
      </div>
    )
}

export default App;