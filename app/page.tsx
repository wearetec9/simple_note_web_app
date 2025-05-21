'use client'
import React from 'react'

const page = () => {
  const editRef = React.useRef(null);
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const handleSubmit = () => {
    if (!editRef.current) return;

    const data = editRef.current.innerText.trim();
    if (!data) return;

    const noteId = Date.now(); // unique ID
    const newNote = { content: data, id: noteId };

    const updatedNotes = [...notes, newNote];

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);

    editRef.current.innerText = '';
  };

  const handleDeleteAll = () => {
    localStorage.removeItem('notes');
    setNotes([]);
  };

  const handleSingleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <div
        ref={editRef}
        className='border-2 border-black min-h-[100px] min-w-[500px] m-5 p-4 rounded-3xl'
        contentEditable
        placeholder='Write your note here...'
      >
        Write your note here...
      </div>

      <button
        onClick={handleSubmit}
        className='border-2 border-blue-400 bg-blue-600 p-3 rounded text-white font-bold m-1'
      >
        Save
      </button>

      <button
        onClick={handleDeleteAll}
        className='border-2 border-red-400 bg-red-600 p-3 rounded text-white font-bold m-1'
      >
        Delete All Notes
      </button>

      {/* Show notes */}
      <div className='w-[500px] mt-5'>
        <h2 className='text-xl font-bold mb-3'>Saved Notes:</h2>
        {notes.length === 0 ? (
          <p className='text-gray-500'>No notes available.</p>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className='border p-3 rounded mb-2 flex justify-between items-center bg-white shadow'
            >
              <p>{note.content}</p>
              <button
                onClick={() => handleSingleDelete(note.id)}
                className='text-red-500 font-semibold'
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
