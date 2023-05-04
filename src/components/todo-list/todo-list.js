import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, selectAllTodos } from "store/slices/todoSlice";
import { TodoItem } from "components/todo-item/todo-item";

import css from "./todo-list.module.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const TodoList = () => {
  const todoData = useSelector(selectAllTodos);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setNewItem("");
      dispatch(addTodo(newItem));
    }
  };

  return (
    <div className={css.appContainer}>
      <div className={css.listContainer}>
        <div className={css.inputWrapper}>
          <input
            className={css.inputStyle}
            value={newItem}
            type="text"
            onChange={(e) => setNewItem(e.target.value)}
          ></input>
          <button onClick={addItem}>Add Item</button>
        </div>
        <div className={css.todoList}>
          <ul className={css.listStyle}>
            {todoData.map((item) => (
              <TodoItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <ToggleButtonGroup exclusive>
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed"> Completed</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};
