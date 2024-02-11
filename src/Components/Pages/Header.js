import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./auth-jss";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";

import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../api/auth/AuthService";
function Header(props) {
  const { classes } = props;

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const logOut = () => {
    AuthService.logoutUser();
    navigate("/");
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: "#f2f2f2",
          position: "fixed",
          width: "100%",

          /* margin: 80px 0; */
          zIndex: 5,
        }}
      >
        <Grid item xs={10} className={classes.formContainer}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Link to="/companies-list" className={classes.link}>
                Show All data
              </Link>
              <Link to="/dashboard" className={classes.link}>
                Add New
              </Link>
            </div>
            <div>
              <Button variant="outlined" onClick={logOut}>
                Logout
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);
