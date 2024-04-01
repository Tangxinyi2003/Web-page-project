import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, setAuth } from "../store/user/UserSlice";

const Navigation = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(clearUser());
        navigate("/login");
    };

  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <div className="navbar-left">
          <Link to="/">Trello</Link>
          <Link to="/workarea">WorkArea</Link>

        </div>
        <div className="navbar-right">
          <Button variant="contained" color="primary" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
