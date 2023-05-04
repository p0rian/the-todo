import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  selectAllTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from "store/slices/todoSlice";
import { TodoItem } from "components/todo-item/todo-item";
import { TodoFilter } from "components/todo-filter/todo-filter";

import css from "./todo-list.module.css";

export const TodoList = () => {
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    switch (filter) {
      case "active":
        return selectActiveTodos(state);
      case "completed":
        return selectCompletedTodos(state);
      default:
        return selectAllTodos(state);
    }
  });

  const handleAddClick = () => {
    if (newItem.trim() !== "") {
      setNewItem("");
      dispatch(addTodo(newItem));
    }
  };

  const handleFilterChange = (_, newFilter) => {
    setFilter(newFilter);
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
          <button onClick={handleAddClick}>Add Item</button>
        </div>
        <div className={css.todoList}>
          <ul className={css.listStyle}>
            {todos.map((item) => (
              <TodoItem key={item.id} item={item} />
            ))}
          </ul>
          <TodoFilter filter={filter} handleFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  );
};
