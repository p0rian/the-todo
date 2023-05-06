import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  selectAllTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from "store/slices/todoSlice";
import { TodoItem } from "components/todo-item/todo-item";
import { TodoFilter } from "components/todo-filter/todo-filter";
import { Paper, Input, Button } from "@mui/material";

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

  const allTodos = useSelector(selectAllTodos);
  const activeTodos = useSelector(selectActiveTodos);

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
      <Paper className={css.listContainer}>
        <div className={css.inputWrapper}>
          <Input
            className={css.inputStyle}
            value={newItem}
            type="text"
            onChange={(e) => setNewItem(e.target.value)}
          ></Input>
          <Button onClick={handleAddClick}>Add Item</Button>
        </div>
        <div className={css.todoList}>
          <ul className={css.listStyle}>
            {todos.map((item) => (
              <TodoItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <div className={css.filterStyle}>
          <div className={css.counterContainer}>
            <div className={css.counterStyle}>
              Total items: {allTodos.length}
            </div>
            <div className={css.counterStyle}>
              Active items left: {activeTodos.length}
            </div>
          </div>
          <TodoFilter filter={filter} handleFilterChange={handleFilterChange} />
        </div>
      </Paper>
    </div>
  );
};
