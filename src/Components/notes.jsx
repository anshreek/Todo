import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./note.css";

const Notes = () => {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notesList"));
    if (storedNotes) {
      setNotesList(storedNotes);
    }
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (note.trim() !== "") {
      const newNote = {
        text: note,
        timestamp: new Date().toLocaleString(),
      };

      const updatedNotesList = [...notesList, newNote];
      setNotesList(updatedNotesList);

      localStorage.setItem("notesList", JSON.stringify(updatedNotesList));

      setNote("");

      Swal.fire({
        icon: "success",
        title: "Note Added!",
        text: "Your note has been successfully added.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please write something before adding a note.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleDeleteNote = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedNotesList = notesList.filter((_, i) => i !== index);
        setNotesList(updatedNotesList);

        localStorage.setItem("notesList", JSON.stringify(updatedNotesList));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your note has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Notes</h1>
      <p className="text-center">
        Welcome to the Notes page! Here you can add and manage your notes.
      </p>

      <div className="row">
        <div className="col-md-6">
          <img
            style={{ height: "280px", width: "500px" }}
            src="https://media.istockphoto.com/id/1286091197/vector/female-routine-lifestyle-activities-temporal-distribution-young-woman-daily-schedule-life.jpg?s=612x612&w=0&k=20&c=YiytpcVrY0giFHEH3IMjkoCbU36vH0_zFLW2s4F47dk="
            alt="Notes"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Add a Note</h5>
              <form onSubmit={handleAddNote}>
                <div className="mb-3">
                  <label htmlFor="noteInput" className="form-label">
                    Your Note
                  </label>
                  <textarea
                    id="noteInput"
                    className="form-control"
                    rows="3"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write your note here"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ background: "#970747", color: "white" }}
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4>All Notes:</h4>
        <div className="row">
          {notesList.map((note, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <strong>{note.text}</strong>
                  <br />
                  <small className="text-muted">{note.timestamp}</small>
                  <div className="mt-2 text-center">
                    <button
                      className="btn-delete"
                      style={{
                        background: "#970747",
                        color: "white",
                        padding: "5px 5px",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleDeleteNote(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
