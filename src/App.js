import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, selectAllTodos } from "./store/slices/todoSlice";
import "./App.css";

export const App = () => {
  const todoData = useSelector(selectAllTodos); // use selectAllTodos selector
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setNewItem("");
      dispatch(addTodo(newItem));
    }
  };

  const removeItem = (id) => {
    dispatch(removeTodo(id));
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
                {item.title}
                <button onClick={() => removeItem(item.id)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
