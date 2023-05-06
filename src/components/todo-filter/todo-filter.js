import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export const TodoFilter = ({ filter, handleFilterChange }) => (
  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleFilterChange}
      aria-label='todo filter'
    >
      <ToggleButton value='all' aria-label='show all todos'>
        All
      </ToggleButton>
      <ToggleButton value='active' aria-label='show active todos'>
        Active
      </ToggleButton>
      <ToggleButton value='completed' aria-label='show completed todos'>
        Completed
      </ToggleButton>
    </ToggleButtonGroup>
  </Box>
);

TodoFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
