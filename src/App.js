import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  updateTodo,
  selectAllTodos,
} from "./store/slices/todoSlice";
import "./App.css";

export const App = () => {
  const todoData = useSelector(selectAllTodos);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState("");
  const [editing, setEditing] = useState({});
  const [editedTitle, setEditedTitle] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setNewItem("");
      dispatch(addTodo(newItem));
    }
  };

  const removeItem = (id) => {
    dispatch(removeTodo(id));
  };

  const startEditing = (id) => {
    setEditing((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const finishEditing = (id) => {
    if (editedTitle.trim() !== "") {
      dispatch(
        updateTodo({
          id,
          changes: {
            title: editedTitle,
          },
        })
      );
    }
    setEditing((prevState) => ({
      ...prevState,
      [id]: false,
    }));
    setEditedTitle("");
  };

  return (
    <div className="appContainer">
      <div className="listContainer">
        <div className="inputWrapper">
          <input
            value={newItem}
            type="text"
            onChange={(e) => setNewItem(e.target.value)}
          ></input>
          <button onClick={addItem}>Add Item</button>
        </div>
        <div className="todoList">
          <ul className="listStyle">
            {todoData.map((item) => (
              <li key={item.id}>
                {editing[item.id] ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    ></input>
                    <button onClick={() => finishEditing(item.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <span onClick={() => startEditing(item.id)}>
                      {item.title}
                    </span>
                    <button onClick={() => removeItem(item.id)}>X</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
