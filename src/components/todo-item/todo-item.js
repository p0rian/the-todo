import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "store/slices/todoSlice";

export const TodoItem = ({ item }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTodo(item.id));
  };

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleFinishEditing = () => {
    if (editedTitle.trim() !== "") {
      dispatch(
        updateTodo({
          id: item.id,
          changes: {
            title: editedTitle,
          },
        })
      );
    }
    setEditing(false);
  };

  const handleCancelEditing = () => {
    setEditedTitle(item.title);
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleCompletedStatus = (e) => {
    dispatch(
      updateTodo({
        id: item.id,
        changes: {
          isCompleted: !item.isCompleted,
        },
      })
    );
  };

  return (
    <li>
      {editing ? (
        <>
          <input type="text" value={editedTitle} onChange={handleInputChange} />
          <button onClick={handleFinishEditing}>Save</button>
          <button onClick={handleCancelEditing}>Cancel</button>
        </>
      ) : (
        <>
          <Checkbox
            checked={item.isCompleted}
            onChange={handleCompletedStatus}
          ></Checkbox>
          <span onClick={handleStartEditing}>{item.title}</span>
          <button onClick={handleRemove}>X</button>
        </>
      )}
    </li>
  );
};
