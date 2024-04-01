import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, Container, Grid } from '@mui/material';
import './styles.css';
import Navigation from "../../components/navigation";

const Home = () => {

    return (
      <div>

        <Navigation />

        <Container
          maxWidth="md"
          sx={{ height: "100%", mt: 5 }}
          style={{
            background:
              "linear-gradient(0deg, rgb(230, 252, 255), rgb(255, 255, 255)) 0% 0% / auto repeat scroll padding-box border-box rgb(178, 212, 255)",
            borderRadius: "50px",
          }}
        >
          
        </Container>
      </div>
    );
};
export default Home;