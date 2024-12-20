import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Form.css";

const Form = ({ todos, setTodos }) => {
  const [input, setInput] = useState("");

  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [setTodos]);

  const onchange = (e) => {
    setInput(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if (input.trim()) {
     
      const currentDateTime = new Date().toLocaleString();

      const newTodo = {
        name: input.trim(),
        completed: false,
        id: uuid(),
        timestamp: currentDateTime,
      };

      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
      setInput("");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={onsubmit} className="row g-2 justify-content-center">
        <div className="col-8 col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a task"
            autoComplete="off"
            value={input}
            onChange={onchange}
          />
        </div>
        <div className="col-auto">
          <button className="btn-add" type="submit">
            Add ✙
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
