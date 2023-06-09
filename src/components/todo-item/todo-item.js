import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "store/slices/todoSlice";
import { Button, Input, Box, Checkbox } from "@mui/material";
import PropTypes from "prop-types";

import css from "./todo-item.module.css";

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
        }),
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

  const handleCompletedStatus = () => {
    dispatch(
      updateTodo({
        id: item.id,
        changes: {
          isCompleted: !item.isCompleted,
        },
      }),
    );
  };

  return (
    <li>
      {editing ? (
        <div className={css.itemStyle}>
          <Input
            type='text'
            value={editedTitle}
            onChange={handleInputChange}
            inputProps={{ "aria-label": "Edit todo" }}
          />
          <Button onClick={handleFinishEditing}>Save</Button>
          <Button onClick={handleCancelEditing}>Cancel</Button>
        </div>
      ) : (
        <div className={css.itemStyle}>
          <Checkbox checked={item.isCompleted} onChange={handleCompletedStatus} />
          <Box component='span' onClick={handleStartEditing}>
            {item.title}
          </Box>
          <Button onClick={handleRemove}>X</Button>
        </div>
      )}
    </li>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    isCompleted: PropTypes.bool,
    id: PropTypes.string,
  }).isRequired,
};
