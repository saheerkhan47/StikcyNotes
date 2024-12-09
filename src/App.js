import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);

  // Load saved notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("webpad-appData")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem("webpad-appData", JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = () => {
    const newNote = { id: Date.now().toString(), content: "", color: randomPastelColor() };
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  // Delete a note by its ID
  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Update note content
  const updateNote = (id, content) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, content } : note
      )
    );
  };

  // Random pastel color generator
  const randomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 80%)`;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="flex-between">
          <h1>Sticky</h1>
        </div>

        <div id="notesContainer">
          {notes.map(note => (
            <Note 
              key={note.id} 
              note={note} 
              onDelete={deleteNote} 
              onUpdate={updateNote} 
            />
          ))}
          <button id="addNote" onClick={addNote}>+</button>
        </div>
      </div>

      <footer>
        <div className="container">
          <p>Made with SK</p>
        </div>
      </footer>
    </div>
  );
};

const Note = ({ note, onDelete, onUpdate }) => {
  const handleChange = (event) => {
    onUpdate(note.id, event.target.value);
  };

  return (
    <textarea
      className="note"
      value={note.content}
      onChange={handleChange}
      placeholder="Take a note..."
      style={{ backgroundColor: note.color }}
      onDoubleClick={() => onDelete(note.id)}
    />
  );
};

export default App;
