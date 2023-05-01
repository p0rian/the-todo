import { useState, useRef } from "react";
import { todoDataSelector } from "./store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./store/slices/todoSlice";
import "./App.css";

export const App = () => {
  const todoData = useSelector(todoDataSelector);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [newItem, setNewItem] = useState("");
  const [listItems, setListItems] = useState([]);
  const addItem = () => {
    if (newItem.trim() !== "") {
      setListItems([...listItems, newItem]);
      setNewItem("");
      ref.current.value = "";
      dispatch(
        addTodo({
          title: newItem,
        })
      );

      console.log(todoData.todoItems);
    }
  };

  return (
    <div className="appContainer">
      <div className="listContainer">
        <div className="inputWrapper">
          <input
            ref={ref}
            type="text"
            onChange={(e) => setNewItem(e.target.value)}
          ></input>
          <button onClick={addItem}>Add Item</button>
        </div>
        <div className="todoList">
          <ul className="listStyle">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
