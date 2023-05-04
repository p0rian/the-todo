import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "store/slices/todoSlice";
import { Button, Input, Box } from "@mui/material";

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
          <Input type="text" value={editedTitle} onChange={handleInputChange} />
          <Button onClick={handleFinishEditing}>Save</Button>
          <Button onClick={handleCancelEditing}>Cancel</Button>
        </>
      ) : (
        <>
          <Checkbox
            checked={item.isCompleted}
            onChange={handleCompletedStatus}
          ></Checkbox>
          <Box component="span" onClick={handleStartEditing}>
            {item.title}
          </Box>
          <Button onClick={handleRemove}>X</Button>
        </>
      )}
    </li>
  );
};
