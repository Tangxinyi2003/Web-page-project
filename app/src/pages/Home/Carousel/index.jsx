import React from "react";
import { Box, Typography } from "@mui/material";

const Carousel = ({ selectedList }) => {
  const images = ["c1.webp", "c2.webp", "c3.webp"];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f0f0f0", borderRadius: 5 }}>
      <img
        src={images[selectedList - 1]}
        alt={`Image ${selectedList}`}
        width={600}
        height={400}
      />
    </Box>
  );
};

export default Carousel;