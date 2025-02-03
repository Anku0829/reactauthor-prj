import React from "react";
import { AppBar, Button, Stack, Toolbar, Typography, Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { TbBrandBlackberry } from "react-icons/tb";
import { red } from "@mui/material/colors";

function NavBar() {
  return (
    <>
      <AppBar sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Roboto, sans-serif' ,backgroundColor: "black"}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: "white", marginRight: 100}}>
            Space
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
        variant="contained"
        sx={{
          backgroundColor: '#8B0000', 
          color: 'white', 
          textTransform: 'none', 
          '&:hover': {
            backgroundColor: "blueviolet", 
            color: '#fff', 
          },
        }}
      >
        Home
      </Button>
            </Link>
            <Link to="/Author" style={{ textDecoration: 'none' }}>
            <Button
        variant="contained"
        sx={{
          backgroundColor: '#8B0000', 
          color: 'white', // 
          textTransform: 'none', 
          '&:hover': {
            backgroundColor: "blueviolet", 
            color: '#fff', 
          },
        }}
      >
        Author
      </Button>
            </Link>
            <Link to="/Post" style={{ textDecoration: 'none' }}>
            <Button
        variant="contained"
        sx={{
          backgroundColor: '#8B0000', 
          color: 'white', 
          textTransform: 'none', 
          '&:hover': {
            backgroundColor: "blueviolet", 
            color: '#fff', 
          },
        }}
      >
        Post
      </Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>

    </>
  );
}

export default NavBar;
