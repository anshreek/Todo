import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import Todolist from "./Components/Todolist";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Notes from "./Components/notes";
import Calendar from "./Components/Calendar";
import Records from "./Components/records";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <Router>
      <div className="App">
        <div className="header">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Form todos={todos} setTodos={setTodos} />
                  <Todolist todos={todos} setTodos={setTodos} />
                </>
              }
            />

            <Route path="/notes" element={<Notes />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="records" element={<Records />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
