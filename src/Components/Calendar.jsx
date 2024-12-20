import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [notesList, setNotesList] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesList));
  }, [notesList]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (note.trim() !== "" && selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; 
      const newNote = {
        date: formattedDate,
        text: note,
      };

      if (editIndex !== null) {
        const updatedNotes = [...notesList];
        updatedNotes[editIndex] = newNote;
        setNotesList(updatedNotes);
        setEditIndex(null);

        Swal.fire({
          icon: "success",
          title: "Note Updated",
          text: "Your note has been successfully updated.",
        });
      } else {
        const existingNoteIndex = notesList.findIndex(
          (noteItem) => noteItem.date === formattedDate
        );

        if (existingNoteIndex !== -1) {
          const updatedNotes = [...notesList];
          updatedNotes[existingNoteIndex].text = newNote.text;
          setNotesList(updatedNotes);
        } else {
          setNotesList([...notesList, newNote]);
        }

        Swal.fire({
          icon: "success",
          title: "Note Saved",
          text: "Your note has been successfully saved.",
        });
      }

      setNote(""); 
    }
  };

  const handleEditNote = (index) => {
    setSelectedDate(new Date(notesList[index].date)); 
    setNote(notesList[index].text); 
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notesList.filter((_, i) => i !== index);
    setNotesList(updatedNotes);

    Swal.fire({
      icon: "success",
      title: "Note Deleted",
      text: "Your note has been successfully deleted.",
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Calendar Notes</h1>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="https://t3.ftcdn.net/jpg/02/77/18/82/360_F_277188285_BmZ7gYMS6mefo8uFUDTwtaeFZpgI5Dz6.jpg"
            alt="Calendar Notes"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <div className="mb-3 text-center">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              className="form-control"
              placeholderText="Select a date"
            />
          </div>

          {selectedDate && (
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  {editIndex !== null
                    ? `Edit Note for ${selectedDate.toLocaleDateString()}`
                    : `Add Note for ${selectedDate.toLocaleDateString()}`}
                </h5>
                <form onSubmit={handleAddNote}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Write your note here"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    {editIndex !== null ? "Update Note" : "Save Note"}
                  </button>
                </form>
              </div>
            </div>
          )}
          <div>
            <h4>Notes:</h4>
            <ul className="list-group">
              {notesList.length > 0 ? (
                notesList.map((noteItem, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{noteItem.date}:</strong> {noteItem.text}
                    </div>
                    <div>
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          background:
                            "radial-gradient(circle at 10% 20%, rgb(0, 95, 104) 0%, rgb(15, 156, 168) 90%)",
                          color: "white",
                        }}
                        onClick={() => handleEditNote(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteNote(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center">
                  No notes available.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
