import React from "react";
import { Box, Typography } from "@mui/material";
const List = ({ listId, selected, onClick }) => {
  const handleClick = () => {
    onClick(listId);
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        padding: 2,
        backgroundColor: selected ? "#f0f0f0" : "transparent",
        borderLeft: selected ? "4px solid rgb(0, 199, 229)" : "none",
        marginBottom: 2,
      }}
    >
      <Typography>
        <div>
          <h3>
            Example 
            {listId}
          </h3>
        </div>
      </Typography>
    </Box>
  );
};
export default List;