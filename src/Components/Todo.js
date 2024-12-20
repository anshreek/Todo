import React, { useState } from "react";
import Swal from "sweetalert2"; 
import "./Toda.css";

const Todo = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState(false);
  const [inputedit, setInputedit] = useState(todo.name);


  const updateLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const onchangedsave = (e) => {
    setInputedit(e.target.value);
  };

  const onSave = () => {
    setEdit(false);
    if (inputedit.trim()) {
      const updatedTodos = todos.map((item) =>
        item.id === todo.id ? { ...item, name: inputedit.trim() } : item
      );
      setTodos(updatedTodos);
      updateLocalStorage(updatedTodos);
      Swal.fire("Updated!", "Your task has been updated.", "success");
    } else {
      setInputedit(todo.name);
    }
  };

  const onDelete = () => {
   
    if (todo.timestamp === "YourConditionHere") {
      Swal.fire("Error!", "This task cannot be deleted.", "error");
      return;
    }

    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
    Swal.fire("Deleted!", "Your task has been deleted.", "success");
  };

  const onComplete = () => {
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
    Swal.fire(
      "Completed!",
      todo.completed
        ? "Task marked as incomplete."
        : "Your task has been completed.",
      "success"
    );
  };

  const onEdit = () => {
    setEdit(true);
  };

  if (edit) {
    return (
      <>
        <div className="todo-li">
          <li className="li-list">
            <input
              className="li-input"
              value={inputedit}
              onChange={onchangedsave}
            />

            <button className="button-save" onClick={onSave}>
              <span className="text-save">Save</span>
              <i className="fa fa-save"></i>
            </button>
          </li>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="todo-li">
          <li className={`li-list ${todo.completed ? "completed" : ""}`}>
            <input className="li-input" value={todo.name} readOnly />

            <button className="button-complete" onClick={onComplete}>
              <span className="text-complete">Complete</span>
              <i className="fa fa-check"></i>
            </button>

            <button className="button-edit" onClick={onEdit}>
              <span className="text-edit">Edit</span>
              <i className="fa fa-edit"></i>
            </button>

            <button className="button-delete" onClick={onDelete}>
              <span className="text-delete">Delete</span>
              <i className="fa fa-trash"></i>
            </button>
          </li>
        </div>
      </>
    );
  }
};

export default Todo;
